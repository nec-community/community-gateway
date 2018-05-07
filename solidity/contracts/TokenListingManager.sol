pragma solidity ^0.4.18;

import "./MiniMeToken.sol";
import "./Ownable.sol";

/*
    Copyright 2018, Will Harborne @ Ethfinex
*/

/// @title ProposalManager Contract
/// @author Will Harborne @ Ethfinex
contract TokenListingManager is Ownable {

    address constant NECTAR_TOKEN = 0xCc80C051057B774cD75067Dc48f8987C4Eb97A5e;
    address constant TOKEN_FACTORY = 0x003ea7f54b6Dcf6cEE86986EdC18143A35F15505;
    uint constant VOTING_DURATION = 14;

    struct TokenProposal {
        address[10] consideredTokens;
        uint startBlock;
        uint startTime;
        uint duration;
        address votingToken;
        uint[10] yesVotes;
    }

    TokenProposal[] tokensToBeListed;

    MiniMeTokenFactory public tokenFactory;
    address nectarToken;
    mapping(address => bool) admins;

    modifier onlyAdmins() {
        require(isAdmin(msg.sender));
        _;
    }

    function TokenListingManager() public {
        tokenFactory = MiniMeTokenFactory(TOKEN_FACTORY);
        nectarToken = NECTAR_TOKEN;
        admins[msg.sender] = true;
    }

    /// @notice Admins are able to approve proposal that someone submitted
    /// @param tokens the list of tokens in consideration during this period
    function startTokenVotes(address[10] tokens) public onlyAdmins {
        uint _proposalId = tokensToBeListed.length;
        tokensToBeListed.length++;
        TokenProposal storage p = tokensToBeListed[_proposalId];
        p.duration = VOTING_DURATION * (1 days);

        p.consideredTokens = tokens;

        p.votingToken = tokenFactory.createCloneToken(
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
        uint _proposalId = tokensToBeListed.length - 1;
        require(_tokenIndex < 10);

        TokenProposal memory p = tokensToBeListed[_proposalId];

        require(p.startTime + p.duration < now);

        uint amount = MiniMeToken(p.votingToken).balanceOf(msg.sender);
        require(amount > 0);

        require(MiniMeToken(p.votingToken).transferFrom(msg.sender, address(this), amount));

        tokensToBeListed[_proposalId].yesVotes[_tokenIndex] += amount;

        emit Vote(_proposalId, msg.sender, tokensToBeListed[_proposalId].consideredTokens[_tokenIndex], amount);
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
        uint[10] _votes,
        address[10] _tokens,
        bool _hasBalance
    ) {
        require(_proposalId < tokensToBeListed.length);

        TokenProposal memory p = tokensToBeListed[_proposalId];
        _startBlock = p.startBlock;
        _startTime = p.startTime;
        _duration = p.duration;
        _finalized = (_startTime+_duration < now);
        _active = !_finalized && (p.startBlock < getBlockNumber());
        _votes = p.yesVotes;
        _tokens = p.consideredTokens;
        _hasBalance = (p.votingToken == 0x0) ? false : (MiniMeToken(p.votingToken).balanceOf(msg.sender) > 0);
    }

    function appendUintToString(string inStr, uint v) private pure returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        if (v==0) {
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

    function isAdmin(address _admin) public view returns(bool) {
        return admins[_admin];
    }

    function proxyPayment(address ) public payable returns(bool) {
        return false;
    }

    function onTransfer(address , address , uint ) public pure returns(bool) {
        return true;
    }

    function onApprove(address , address , uint ) public pure returns(bool) {
        return true;
    }

    function getBlockNumber() internal constant returns (uint) {
        return block.number;
    }

    event Vote(uint indexed idProposal, address indexed _voter, address chosenToken, uint amount);
    event NewTokens(uint indexed idProposal);
}
