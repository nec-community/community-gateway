pragma solidity ^0.4.18;

import "./MiniMeToken.sol";
import "./Ownable.sol";

/*
    Copyright 2018, Nikola Klipa @ Decenter
*/

/// @title ProposalManager Contract
/// @author Nikola Klipa @ Decenter
contract ProposalManager is Ownable {

    address constant NECTAR_TOKEN = 0x4c88D00971467aBd70381541AED6417B0e541C41;
    address constant TOKEN_FACTORY = 0x0E59f06f597Af0a7c30d79B0a7988fa45eEaf292;

    struct Proposal {
        uint startBlock;
        uint startTime;
        uint duration;
        address token;
        bytes32 storageHash;
        bool approved;
        uint yesVotes;
        uint noVotes;
    }

    Proposal[] proposals;

    MiniMeTokenFactory public tokenFactory;
    address nectarToken;
    mapping(address => bool) admins;

    modifier onlyAdmins() { 
        require(admins[msg.sender]);
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

        _proposalId = proposals.length;
        proposals.length++;

        Proposal storage p = proposals[_proposalId];
        p.storageHash = _storageHash;
        p.duration = _duration * (1 days);
        p.token = tokenFactory.createCloneToken(
                nectarToken,
                getBlockNumber(),
                "NectarClone",
                MiniMeToken(nectarToken).decimals(),
                "NECC",
                true);

        uint amount = MiniMeToken(p.token).balanceOf(msg.sender);
        assert(amount > 0); // user can't submit proposal if doesn't own any tokens
        
        NewProposal(_proposalId, _duration, _storageHash);
    }

    /// @notice Admins are able to approve proposal that someone submitted
    /// @param _proposalId Id of proposal that admin approves
    function approveProposal(uint _proposalId) public onlyAdmins {
        require(proposals.length > _proposalId);

        Proposal storage p = proposals[_proposalId];

        // if not checked, admin is able to restart proposal
        require(!p.approved);

        p.approved = true;
        p.startTime = now;
        p.startBlock = getBlockNumber();

        Approved(_proposalId);
    }

    /// @notice Vote for specific proposal with yes or no
    /// @param _proposalId Id of proposal that we user is voting for
    /// @param _yes True if user is voting for yes and false if no
    function vote(uint _proposalId, bool _yes) public {
        require(_proposalId < proposals.length);
        require(checkIfCurrentlyActive(_proposalId));
        
        Proposal memory p = proposals[_proposalId];

        uint amount = MiniMeToken(p.token).balanceOf(msg.sender);      
        assert(amount > 0);

        require(MiniMeToken(p.token).transferFrom(msg.sender, address(this), amount));

        if (_yes) {
            proposals[_proposalId].yesVotes += amount;    
        }else {
            proposals[_proposalId].noVotes += amount;
        }
        
        Vote(_proposalId, msg.sender, _yes, amount);
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
        bytes32 _storageHash,
        bool _active,
        bool _finalized,
        uint _totalYes,
        uint _totalNo,
        address _token,
        bool _approved,
        bool _hasBalance
    ) {
        require(_proposalId < proposals.length);

        Proposal memory p = proposals[_proposalId];
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
        _hasBalance = (MiniMeToken(p.token).balanceOf(msg.sender) > 0);
    }

    /// @notice Get all approved proposals
    /// @dev looping two times through array so we can make array with exact count
    ///       because of Solidity limitation to make dynamic array in memory
    function getApprovedProposals() public view returns(uint[]) {
        uint count = 0;
        for (uint i=0; i<proposals.length; i++) {
            if (proposals[i].approved) {
                count++;
            }
        }

        uint[] memory approvedProposals = new uint[](count);
        count = 0;
        for (i=0; i<proposals.length; i++) {
            if (proposals[i].approved) {
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

    function nProposals() public view returns(uint) {
        return proposals.length;
    }

    function checkIfCurrentlyActive(uint _proposalId) private view returns(bool) {
        Proposal memory p = proposals[_proposalId];
        return (p.startTime + p.duration > now && p.startTime < now && p.approved);    
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
