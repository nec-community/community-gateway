pragma solidity ^0.4.24;

import "./DestructibleMiniMeTokenFactory.sol";
import "./Ownable.sol";

/*
    Copyright 2018, Will Harborne @ Ethfinex
*/

/// @title ProposalManager Contract
/// @author Will Harborne @ Ethfinex
contract TokenListingManager is Ownable {

    address public constant NECTAR_TOKEN = 0xCc80C051057B774cD75067Dc48f8987C4Eb97A5e;
    address public constant TOKEN_FACTORY = 0x6EB97237B8bc26E8057793200207bB0a2A83C347;
    uint public constant MAX_CANDIDATES = 20;

    struct TokenProposal {
        address[] consideredTokens;
        uint startBlock;
        uint startTime;
        uint duration;
        address votingToken;
        uint[] yesVotes;
        // criteria values
        // 0. only first one win the vote; 
        // 1. top N (number in extraData) win the vote;
        // 2. All over N (number in extra data) votes win the vote;
        uint criteria; 
        uint extraData;
    }

    TokenProposal[] public tokenBatches;

    DestructibleMiniMeTokenFactory public tokenFactory;
    address public nectarToken;
    mapping(address => bool) public admins;

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
    function startTokenVotes(address[] _tokens, uint _duration, uint _criteria, uint _extraData) public onlyAdmins {
        require(_tokens.length <= MAX_CANDIDATES);

        if (_criteria == 1) {
            // in other case all tokens would be winners
            require(_extraData < _tokens.length);
        }

        uint _proposalId = tokenBatches.length;
        if (_proposalId > 0) {
            TokenProposal memory op = tokenBatches[_proposalId - 1];
            DestructibleMiniMeToken(op.votingToken).recycle();
        }
        tokenBatches.length++;
        TokenProposal storage p = tokenBatches[_proposalId];
        p.duration = _duration * (1 days);

        p.consideredTokens = _tokens;
        p.yesVotes = new uint[](_tokens.length);

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
        // voting only on the most recent set of proposed tokens
        require(tokenBatches.length > 0);
        uint _proposalId = tokenBatches.length - 1;
        require(_tokenIndex < 10);

        TokenProposal memory p = tokenBatches[_proposalId];

        require(now < p.startTime + p.duration);

        uint amount = DestructibleMiniMeToken(p.votingToken).balanceOf(msg.sender);
        require(amount >= _amount);

        require(DestructibleMiniMeToken(p.votingToken).transferFrom(msg.sender, address(this), _amount));

        tokenBatches[_proposalId].yesVotes[_tokenIndex] += _amount;

        emit Vote(_proposalId, msg.sender, tokenBatches[_proposalId].consideredTokens[_tokenIndex], _amount);
    }

    function getWinners(uint _proposalId) public view returns(address[] winners) {
        require(_proposalId < tokenBatches.length);

        TokenProposal memory p = tokenBatches[_proposalId];

        // there is only one winner in criteria 0
        if (p.criteria == 0) {
            winners = new address[](1);
            uint max = 0;

            for (uint i=0; i < p.consideredTokens.length; i++) {
                if (p.yesVotes[i] > p.yesVotes[max]) {
                    max = i;
                }
            }

            winners[0] = p.consideredTokens[max];
        }

        // there is N winners in criteria 1
        if (p.criteria == 1) {
            uint[] memory indexesWithMostVotes = new uint[](p.extraData);
            winners = new address[](p.extraData);

            // for each token we check if he has more votes than last one,
            // if it has we put it in array and always keep array sorted
            for (i = 0; i < p.consideredTokens.length; i++) {
                uint last = p.extraData - 1;
                if (p.yesVotes[i] > p.yesVotes[indexesWithMostVotes[last]]) {
                    indexesWithMostVotes[last] = i;

                    for (uint j=last; j > 0; j--) {
                        if (p.yesVotes[indexesWithMostVotes[j]] > p.yesVotes[indexesWithMostVotes[j-1]]) {
                            uint help = indexesWithMostVotes[j];
                            indexesWithMostVotes[j] = indexesWithMostVotes[j-1];
                            indexesWithMostVotes[j-1] = help; 
                        }
                    }
                }
            }

            for (i = 0; i < p.extraData; i++) {
                winners[i] = p.consideredTokens[indexesWithMostVotes[i]];
            }
        }

        // everybody who has over N votes are winners in criteria 2
        if (p.criteria == 2) {
            uint numOfTokens = 0;
            for (i = 0; i < p.consideredTokens.length; i++) {
                if (p.yesVotes[i] > p.extraData) {
                    numOfTokens++;
                }
            }

            winners = new address[](numOfTokens);
            uint count = 0;
            for (i = 0; i < p.consideredTokens.length; i++) {
                if (p.yesVotes[i] > p.extraData) {
                    winners[count] = p.consideredTokens[i];
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
        _votes = p.yesVotes;
        _tokens = p.consideredTokens;
        _votingToken = p.votingToken;
        _hasBalance = (p.votingToken == 0x0) ? false : (DestructibleMiniMeToken(p.votingToken).balanceOf(msg.sender) > 0);
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