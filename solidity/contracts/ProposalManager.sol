    address constant NECTAR_TOKEN = 0x4c88D00971467aBd70381541AED6417B0e541C41;
    address constant TOKEN_FACTORY = 0x0E59f06f597Af0a7c30d79B0a7988fa45eEaf292;
pragma solidity ^0.4.18;

import "./MiniMeToken.sol";
import "./Ownable.sol";

/*
    Copyright 2018, Nikola Klipa @ Decenter
*/

/// @title ProposalManager Contract
/// @author Nikola Klipa @ Decenter
contract ProposalManager is Ownable {

    address constant NECTAR_TOKEN = 0xCc80C051057B774cD75067Dc48f8987C4Eb97A5e;
    address constant TOKEN_FACTORY = 0x003ea7f54b6Dcf6cEE86986EdC18143A35F15505;
    uint constant MIN_PROPOSAL_DURATION = 7;
    uint constant MAX_PROPOSAL_DURATION = 45;

    struct Proposal {
        address proposer;
        uint startBlock;
        uint startTime;
        uint duration;
        address token;
        bytes32 storageHash;
        bool approved;
        uint yesVotes;
        uint noVotes;
        bool denied;
    }

    Proposal[] proposals;

    MiniMeTokenFactory public tokenFactory;
    address nectarToken;
    mapping(address => bool) admins;

    modifier onlyAdmins() { 
        require(isAdmin());
        _; 
    }

    function ProposalManager() public {
        tokenFactory = MiniMeTokenFactory(TOKEN_FACTORY);
        nectarToken = NECTAR_TOKEN;
        admins[msg.sender] = true;
    }

    /// @notice Add new proposal and put it in list to be approved
    /// @param _duration Duration of proposal in days after it is approved
    /// @param _storageHash Hash to text of proposal
    /// @return Created proposal id
    function addProposal(
        uint _duration, // number of days
        bytes32 _storageHash) public returns (uint _proposalId)
    {
        require(_duration >= MIN_PROPOSAL_DURATION);
        require(_duration <= MAX_PROPOSAL_DURATION);

        uint amount = MiniMeToken(nectarToken).balanceOf(msg.sender);
        assert(amount > 0); // user can't submit proposal if doesn't own any tokens

        _proposalId = proposals.length;
        proposals.length++;

        Proposal storage p = proposals[_proposalId];
        p.storageHash = _storageHash;
        p.duration = _duration * (1 days);
        p.proposer = msg.sender;
        
        emit NewProposal(_proposalId, _duration, _storageHash);
    }

    /// @notice Admins are able to approve proposal that someone submitted
    /// @param _proposalId Id of proposal that admin approves
    function approveProposal(uint _proposalId) public onlyAdmins {
        require(proposals.length > _proposalId);
        require(!proposals[_proposalId].denied);

        Proposal storage p = proposals[_proposalId];

        // if not checked, admin is able to restart proposal
        require(!p.approved);

        p.token = tokenFactory.createCloneToken(
                nectarToken,
                getBlockNumber(),
                appendUintToString("NectarProposal-", _proposalId),
                MiniMeToken(nectarToken).decimals(),
                appendUintToString("NP-", _proposalId),
                true);

        p.approved = true;
        p.startTime = now;
        p.startBlock = getBlockNumber();

        emit Approved(_proposalId);
    }

    /// @notice Vote for specific proposal with yes or no
    /// @param _proposalId Id of proposal that we user is voting for
    /// @param _yes True if user is voting for yes and false if no
    function vote(uint _proposalId, bool _yes) public {
        require(_proposalId < proposals.length);
        require(checkIfCurrentlyActive(_proposalId));
        require(!proposals[_proposalId].denied);
        
        Proposal memory p = proposals[_proposalId];

        uint amount = MiniMeToken(p.token).balanceOf(msg.sender);      
        assert(amount > 0);

        require(MiniMeToken(p.token).transferFrom(msg.sender, address(this), amount));

        if (_yes) {
            proposals[_proposalId].yesVotes += amount;    
        }else {
            proposals[_proposalId].noVotes += amount;
        }
        
        emit Vote(_proposalId, msg.sender, _yes, amount);
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
        address _proposer,
        uint _startBlock,
        uint _startTime,
        uint _duration,
        bytes32 _storageHash,
        bool _active,
        bool _finalized,
        uint _totalYes,
        uint _totalNo,
        address _token,
        bool _approved,
        bool _denied,
        bool _hasBalance
    ) {
        require(_proposalId < proposals.length);

        Proposal memory p = proposals[_proposalId];
        _proposer = p.proposer;
        _startBlock = p.startBlock;
        _startTime = p.startTime;
        _duration = p.duration;
        _storageHash = p.storageHash;
        _finalized = (_startTime+_duration < now);
        _active = !_finalized && (p.startBlock < getBlockNumber()) && p.approved;
        _totalYes = p.yesVotes;
        _totalNo = p.noVotes;
        _token = p.token;
        _approved = p.approved;
        _denied = p.denied;
        _hasBalance = (p.token == 0x0) ? false : (MiniMeToken(p.token).balanceOf(msg.sender) > 0);
    }

    function denyProposal(uint _proposalId) public {
        require(!proposals[_proposalId].approved);

        proposals[_proposalId].denied = true;
    }

    /// @notice Get all not approved proposals
    /// @dev looping two times through array so we can make array with exact count
    ///       because of Solidity limitation to make dynamic array in memory
    function getNotApprovedProposals() public view returns(uint[]) {
        uint count = 0;
        for (uint i=0; i<proposals.length; i++) {
            if (!proposals[i].approved && !proposals[i].denied) {
                count++;
            }
        }

        uint[] memory notApprovedProposals = new uint[](count);
        count = 0;
        for (i=0; i<proposals.length; i++) {
            if (!proposals[i].approved && !proposals[i].denied) {
                notApprovedProposals[count] = i;
                count++;
            }
        }

        return notApprovedProposals;
    }

    /// @notice Get all approved proposals
    /// @dev looping two times through array so we can make array with exact count
    ///       because of Solidity limitation to make dynamic array in memory
    function getApprovedProposals() public view returns(uint[]) {
        uint count = 0;
        for (uint i=0; i<proposals.length; i++) {
            if (proposals[i].approved && !proposals[i].denied) {
                count++;
            }
        }

        uint[] memory approvedProposals = new uint[](count);
        count = 0;
        for (i=0; i<proposals.length; i++) {
            if (proposals[i].approved && !proposals[i].denied) {
                approvedProposals[count] = i;
                count++;
            }
        }

        return approvedProposals;
    }

    /// @notice Get all active proposals
    /// @dev looping two times through array so we can make array with exact count
    ///       because of Solidity limitation to make dynamic array in memory
    function getActiveProposals() public view returns(uint[]) {
        uint count = 0;
        for (uint i=0; i<proposals.length; i++) {
            if (checkIfCurrentlyActive(i)) {
                count++;
            }
        }

        uint[] memory activeProposals = new uint[](count);
        count = 0;
        for (i=0; i<proposals.length; i++) {
            if (checkIfCurrentlyActive(i)) {
                activeProposals[count] = i;
                count++;
            }
        }

        return activeProposals;
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

    function nProposals() public view returns(uint) {
        return proposals.length;
    }

    function isAdmin() public view returns(bool) {
        return admins[msg.sender];
    }

    function checkIfCurrentlyActive(uint _proposalId) private view returns(bool) {
        Proposal memory p = proposals[_proposalId];
        return (p.startTime + p.duration > now && p.startTime < now && p.approved && !proposals[i].denied);    
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

    event Vote(uint indexed idProposal, address indexed _voter, bool yes, uint amount);
    event Approved(uint indexed idProposal);
    event NewProposal(uint indexed idProposal, uint duration, bytes32 storageHash);
}