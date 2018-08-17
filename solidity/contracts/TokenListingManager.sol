pragma solidity ^0.4.24;

import "./DestructibleMiniMeTokenFactory.sol";
import "./Ownable.sol";

/*
    Copyright 2018, Will Harborne @ Ethfinex
*/

/*
    Improvement ideas

    Basic Parameters:
        Number of candidates included in the vote
        Number of winners in the vote
        Criteria to win the vote (i.e. top 3, all tokens receiving over a certain number of votes)
        Duration of vote 

    Advanced Vote Styles:
        Carry over of votes and tokens to next round (i.e. half life on votes carried over to next round)
        Infinitely growing list of tokens included on list instead of replaced each time
        Allow delegation of votes to be set automatically by users (i.e. delegate votes always to go to a certain address to vote on your behalf)
        Have two separate lists which can be voted on using the same tokens (i.e. pre-ICO tokens on one list and post-ICO tokens on another)
        Most numbers of distinct voters over a certain size of EVT instead of total number of EVT to win


    *** add finish proposal (can be called after timeout)


    we can set some maximum on maximum possible number of candidates
    second seems to be pretty much same as 
*/

/// @title ProposalManager Contract
/// @author Will Harborne @ Ethfinex
contract TokenListingManager is Ownable {

    address public constant NECTAR_TOKEN = 0xCc80C051057B774cD75067Dc48f8987C4Eb97A5e;
    address public constant TOKEN_FACTORY = 0x6EB97237B8bc26E8057793200207bB0a2A83C347;

    struct TokenProposal {
        address[] consideredTokens;
        uint startBlock;
        uint startTime;
        uint duration;
        address votingToken;
        uint[] yesVotes;
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
    /// @param tokens the list of tokens in consideration during this period
    function startTokenVotes(address[] tokens, uint duration) public onlyAdmins {
        uint _proposalId = tokenBatches.length;
        if (_proposalId > 0) {
            TokenProposal memory op = tokenBatches[_proposalId - 1];
            DestructibleMiniMeToken(op.votingToken).recycle();
        }
        tokenBatches.length++;
        TokenProposal storage p = tokenBatches[_proposalId];
        p.duration = duration * (1 days);

        p.consideredTokens = tokens;
        p.yesVotes = new uint[](tokens.length);

        p.votingToken = tokenFactory.createDestructibleCloneToken(
                nectarToken,
                getBlockNumber(),
                appendUintToString("EfxTokenVotes-", _proposalId),
                MiniMeToken(nectarToken).decimals(),
                appendUintToString("EfxTokenVotes-", _proposalId),
                true);

        p.startTime = now;
        p.startBlock = getBlockNumber();

        emit NewTokens(_proposalId);
    }

    /// @notice Vote for specific token with yes
    /// @param _tokenIndex is the position from 0-9 in the token array of the chosen token
    function vote(uint _tokenIndex) public {
        // voting only on the most recent set of proposed tokens
        require(tokenBatches.length > 0);
        uint _proposalId = tokenBatches.length - 1;
        require(_tokenIndex < 10);

        TokenProposal memory p = tokenBatches[_proposalId];

        require(now < p.startTime + p.duration);

        uint amount = DestructibleMiniMeToken(p.votingToken).balanceOf(msg.sender);
        require(amount > 0);

        require(DestructibleMiniMeToken(p.votingToken).transferFrom(msg.sender, address(this), amount));

        tokenBatches[_proposalId].yesVotes[_tokenIndex] += amount;

        emit Vote(_proposalId, msg.sender, tokenBatches[_proposalId].consideredTokens[_tokenIndex], amount);
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
