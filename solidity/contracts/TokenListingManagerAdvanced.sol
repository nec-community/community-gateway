pragma solidity ^0.4.24;

import "./DestructibleMiniMeTokenFactory.sol";
import "./Ownable.sol";

/*
    Copyright 2018, Will Harborne @ Ethfinex
*/

/// @title ProposalManager Contract
/// @author Will Harborne @ Ethfinex
contract TokenListingManagerAdvanced is Ownable {

    address public constant NECTAR_TOKEN = 0xCc80C051057B774cD75067Dc48f8987C4Eb97A5e;
    address public constant TOKEN_FACTORY = 0x6EB97237B8bc26E8057793200207bB0a2A83C347;
    uint public constant MAX_CANDIDATES = 20;

    struct TokenProposal {
        uint startBlock;
        uint startTime;
        uint duration;
        address votingToken;
        // criteria values
        // 0. only first one win the vote; 
        // 1. top N (number in extraData) win the vote;
        // 2. All over N (number in extra data) votes win the vote;
        uint criteria; 
        uint extraData;
    }

    struct Delegate {
        address user;
        bytes32 storageHash;
        bool exists;
    }

    TokenProposal[] public tokenBatches;
    Delegate[] public allDelegates;

    uint[] public yesVotes;
    address[] public consideredTokens;

    DestructibleMiniMeTokenFactory public tokenFactory;
    address public nectarToken;
    mapping(address => bool) public admins;
    mapping(address => bool) public isWinner;
    mapping(address => bool) public tokenExists;
    mapping(address => uint) public lastVote;

    mapping(address => address[]) public myVotes;
    mapping(address => address) public myDelegate;
    mapping(address => bool) public isDelegate;

    modifier onlyAdmins() {
        require(isAdmin(msg.sender));
        _;
    }

    constructor(address _tokenFactory, address _nectarToken) public {
        tokenFactory = DestructibleMiniMeTokenFactory(_tokenFactory);
        nectarToken = _nectarToken;
        admins[msg.sender] = true;
    }

    /// @notice Admins are able to approve proposal that someone submitted
    /// @param _tokens the list of tokens in consideration during this period
    /// @param _duration number of days for voting
    /// @param _criteria number that determines how winner is selected
    /// @param _extraData extra data for criteria parameter
    /// @param _previousWinners addresses that won previous proposal
    function startTokenVotes(address[] _tokens, uint _duration, uint _criteria, uint _extraData, address[] _previousWinners) public onlyAdmins {
        require(_tokens.length <= MAX_CANDIDATES);
        require(_previousWinners.length <= consideredTokens.length);

        for (uint i=0; i < _previousWinners.length; i++) {
            isWinner[_previousWinners[i]] = true;
        }

        if (_criteria == 1) {
            // in other case all tokens would be winners
            require(_extraData < consideredTokens.length);
        }

        uint _proposalId = tokenBatches.length;
        if (_proposalId > 0) {
            TokenProposal memory op = tokenBatches[_proposalId - 1];
            DestructibleMiniMeToken(op.votingToken).recycle();
        }
        tokenBatches.length++;
        TokenProposal storage p = tokenBatches[_proposalId];
        p.duration = _duration * (1 days);

        for (i = 0; i < _tokens.length; i++) {
            require(!tokenExists[_tokens[i]]);

            consideredTokens.push(_tokens[i]);
            yesVotes.push(0);
            lastVote[_tokens[i]] = _proposalId;
            tokenExists[_tokens[i]] = true;
        }

        p.votingToken = tokenFactory.createDestructibleCloneToken(
                nectarToken,
                getBlockNumber(),
                appendUintToString("EfxTokenVotes-", _proposalId),
                MiniMeToken(nectarToken).decimals(),
                appendUintToString("EVT-", _proposalId),
                true);

        p.startTime = now;
        p.startBlock = getBlockNumber();
        p.criteria = _criteria;
        p.extraData = _extraData;

        emit NewTokens(_proposalId);
    }

    /// @notice Vote for specific token with yes
    /// @param _tokenIndex is the position from 0-9 in the token array of the chosen token
    function vote(uint _tokenIndex, uint _amount) public {
        require(myDelegate[msg.sender] == address(0));
        require(!isWinner[consideredTokens[_tokenIndex]]);
        
        // voting only on the most recent set of proposed tokens
        require(tokenBatches.length > 0);
        uint _proposalId = tokenBatches.length - 1;
        
        require(isActive(_proposalId));

        TokenProposal memory p = tokenBatches[_proposalId];

        require(now < p.startTime + p.duration);

        if (lastVote[consideredTokens[_tokenIndex]] < _proposalId) {
            // if voting for this token for first time, we need to deduce votes
            // we deduce number of yes votes for diff of current proposal and lastVote time multiplied by 2
            yesVotes[_tokenIndex] /= 2*(_proposalId - lastVote[consideredTokens[_tokenIndex]]);
            lastVote[consideredTokens[_tokenIndex]] = _proposalId;
        }

        uint toBurn = _amount;
        uint balance = DestructibleMiniMeToken(p.votingToken).balanceOf(msg.sender);
        
        if (balance >= toBurn) {
            DestructibleMiniMeToken(p.votingToken).destroyTokens(msg.sender, toBurn);
            toBurn = 0;
        } else {
            DestructibleMiniMeToken(p.votingToken).destroyTokens(msg.sender, balance);
            toBurn -= balance;
        }
        
        for (uint i=0; i < myVotes[msg.sender].length; i++) {
            if (toBurn == 0) {
                break;
            }

            address user = myVotes[msg.sender][i];
            balance = DestructibleMiniMeToken(p.votingToken).balanceOf(user);
        
            if (balance >= toBurn) {
                DestructibleMiniMeToken(p.votingToken).destroyTokens(user, toBurn);
                toBurn = 0;
            } else {
                DestructibleMiniMeToken(p.votingToken).destroyTokens(user, balance);
                toBurn -= balance;
            }
        }
        // if not 0 that means that user sent more to burn than he has
        require(toBurn == 0);

        yesVotes[_tokenIndex] += _amount;

        emit Vote(_proposalId, msg.sender, consideredTokens[_tokenIndex], _amount);
    }

    function registerAsDelegate(bytes32 _storageHash) public {
        if (myDelegate[msg.sender] != address(0)) {
            address delegate = myDelegate[msg.sender];

            for (uint i=0; i < myVotes[delegate].length; i++) {
                if (myVotes[delegate][i] == msg.sender) {
                    myVotes[delegate][i] = myVotes[delegate][myVotes[delegate].length-1];

                    delete myVotes[delegate][myVotes[delegate].length-1];
                    myVotes[delegate].length--;

                    break;
                }
            }
            myDelegate[msg.sender] = address(0);
        }

        isDelegate[msg.sender] = true;
        allDelegates.push(Delegate({
            user: msg.sender,
            storageHash: _storageHash,
            exists: true
        }));
    }

    function delegateCount() public view returns(uint) {
        return allDelegates.length;
    }

    /// @notice Delegate vote to other address
    /// @param _to address who will be able to vote instead of you
    function delegateVote(address _to) public {
        require(isDelegate[_to]);
        require(!isDelegate[msg.sender]);

        if (myDelegate[msg.sender] != address(0)) {
            address delegate = myDelegate[msg.sender];

            for (uint i=0; i < myVotes[delegate].length; i++) {
                if (myVotes[delegate][i] == msg.sender) {
                    myVotes[delegate][i] = myVotes[delegate][myVotes[delegate].length-1];

                    delete myVotes[delegate][myVotes[delegate].length-1];
                    myVotes[delegate].length--;

                    break;
                }
            }
        }

        myDelegate[msg.sender] = _to;
        myVotes[_to].push(msg.sender);
    }

    event Log(address a, uint votes);
    event LogWin(address a);

    function getWinners() public view returns(address[] winners) {
        uint _proposalId = tokenBatches.length - 1;

        TokenProposal memory p = tokenBatches[_proposalId];

        // there is only one winner in criteria 0
        if (p.criteria == 0) {
            winners = new address[](1);
            uint max = 0;

            for (uint i=0; i < consideredTokens.length; i++) {
                if (isWinner[consideredTokens[i]]) {
                    continue;
                }

                if (isWinner[consideredTokens[max]]) {
                    max = i;
                }

                if (getCurrentVotes(i) > getCurrentVotes(max)) {
                    max = i;
                }
            }

            winners[0] = consideredTokens[max];
        }

        // there is N winners in criteria 1
        if (p.criteria == 1) {
            uint count = 0;
            uint[] memory indexesWithMostVotes = new uint[](p.extraData);
            winners = new address[](p.extraData);

            // for each token we check if he has more votes than last one,
            // if it has we put it in array and always keep array sorted
            for (i = 0; i < consideredTokens.length; i++) {
                if (isWinner[consideredTokens[i]]) {
                    continue;
                }
                if (count < p.extraData) {
                    indexesWithMostVotes[count] = i;
                    count++;
                    continue;
                }

                // so we just do it once, sort all in descending order
                if (count == p.extraData) {
                    for (j = 0; j < indexesWithMostVotes.length; j++) {
                        for (uint k = j+1; k < indexesWithMostVotes.length; k++) {
                            if (getCurrentVotes(indexesWithMostVotes[j]) < getCurrentVotes(indexesWithMostVotes[k])) {
                                uint help = indexesWithMostVotes[j];
                                indexesWithMostVotes[j] = indexesWithMostVotes[k];
                                indexesWithMostVotes[k] = help; 
                            }
                        }
                    }
                }

                uint last = p.extraData - 1;
                if (getCurrentVotes(i) > getCurrentVotes(indexesWithMostVotes[last])) {
                    indexesWithMostVotes[last] = i;

                    for (uint j=last; j > 0; j--) {
                        if (getCurrentVotes(indexesWithMostVotes[j]) > getCurrentVotes(indexesWithMostVotes[j-1])) {
                            help = indexesWithMostVotes[j];
                            indexesWithMostVotes[j] = indexesWithMostVotes[j-1];
                            indexesWithMostVotes[j-1] = help; 
                        }
                    }
                }
            }

            for (i = 0; i < p.extraData; i++) {
                winners[i] = consideredTokens[indexesWithMostVotes[i]];
            }
        }

        // everybody who has over N votes are winners in criteria 2
        if (p.criteria == 2) {
            uint numOfTokens = 0;
            for (i = 0; i < consideredTokens.length; i++) {
                if (isWinner[consideredTokens[i]]) {
                    continue;
                }
                if (getCurrentVotes(i) > p.extraData) {
                    numOfTokens++;
                }
            }

            winners = new address[](numOfTokens);
            count = 0;
            for (i = 0; i < consideredTokens.length; i++) {
                if (isWinner[consideredTokens[i]]) {
                    continue;
                }
                if (getCurrentVotes(i) > p.extraData) {
                    winners[count] = consideredTokens[i];
                    count++;
                }
            }
        }
    }

    /// @notice Get number of proposals so you can know which is the last one
    function numberOfProposals() public view returns(uint) {
        return tokenBatches.length;
    }

    /// @notice Any admin is able to add new admin
    /// @param _newAdmin Address of new admin
    function addAdmin(address _newAdmin) public onlyAdmins {
        admins[_newAdmin] = true;
    }

    /// @notice Only owner is able to remove admin
    /// @param _admin Address of current admin
    function removeAdmin(address _admin) public onlyOwner {
        admins[_admin] = false;
    }

    /// @notice Get data about specific proposal
    /// @param _proposalId Id of proposal
    function proposal(uint _proposalId) public view returns(
        uint _startBlock,
        uint _startTime,
        uint _duration,
        bool _active,
        bool _finalized,
        uint[] _votes,
        address[] _tokens,
        address _votingToken,
        bool _hasBalance
    ) {
        require(_proposalId < tokenBatches.length);

        TokenProposal memory p = tokenBatches[_proposalId];
        _startBlock = p.startBlock;
        _startTime = p.startTime;
        _duration = p.duration;
        _finalized = (_startTime+_duration < now);
        _active = !_finalized && (p.startBlock < getBlockNumber());
        _votes = getVotes();
        _tokens = getConsideredTokens();
        _votingToken = p.votingToken;
        _hasBalance = (p.votingToken == 0x0) ? false : (DestructibleMiniMeToken(p.votingToken).balanceOf(msg.sender) > 0);
    }

    function getConsideredTokens() public view returns(address[] tokens) {
        tokens = new address[](consideredTokens.length);
        
        for (uint i = 0; i < consideredTokens.length; i++) {
            if (!isWinner[consideredTokens[i]]) {
                tokens[i] = consideredTokens[i];
            } else {
                tokens[i] = address(0);
            }
        }
    }

    function getVotes() public view returns(uint[] votes) {
        votes = new uint[](consideredTokens.length);
        
        for (uint i = 0; i < consideredTokens.length; i++) {
            votes[i] = getCurrentVotes(i);
        }
    }

    function getCurrentVotes(uint index) public view returns(uint) {
        uint _proposalId = tokenBatches.length - 1;
        uint vote = yesVotes[index];
        if (_proposalId > lastVote[consideredTokens[index]]) {
            vote = yesVotes[index] / (2 * (_proposalId - lastVote[consideredTokens[index]]));
        }

        return vote;
    }

    function isAdmin(address _admin) public view returns(bool) {
        return admins[_admin];
    }

    function proxyPayment(address ) public payable returns(bool) {
        return false;
    }

    function onTransfer(address, address, uint ) public pure returns(bool) {
        return true;
    }

    function onApprove(address, address, uint ) public pure returns(bool) {
        return true;
    }

    function getBlockNumber() internal constant returns (uint) {
        return block.number;
    }

    function isActive(uint id) internal view returns (bool) {
        bool _finalized = (_startTime+_duration < now);
        return !_finalized && (tokenBatches[id].startBlock < getBlockNumber());
    }

    function appendUintToString(string inStr, uint v) private pure returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        if (v == 0) {
            reversed[i++] = byte(48);
        } else {
            while (v != 0) {
                uint remainder = v % 10;
                v = v / 10;
                reversed[i++] = byte(48 + remainder);
            }
        }
        bytes memory inStrb = bytes(inStr);
        bytes memory s = new bytes(inStrb.length + i);
        uint j;
        for (j = 0; j < inStrb.length; j++) {
            s[j] = inStrb[j];
        }
        for (j = 0; j < i; j++) {
            s[j + inStrb.length] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    event Vote(uint indexed idProposal, address indexed _voter, address chosenToken, uint amount);
    event NewTokens(uint indexed idProposal);
}
