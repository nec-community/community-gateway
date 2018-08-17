const TokenListingManager = artifacts.require("./TokenListingManager.sol");  
const NectarToken = artifacts.require("./MiniMeToken.sol");
const DestructibleMiniMe = artifacts.require("./DestructibleMiniMeToken");
const advanceToBlock = require('./helpers/advanceToBlock').advanceToBlock;

contract('TokenListingManager', async (accounts) => {

    let tlm, nectar;

    before(async () => {
        tlm = await TokenListingManager.deployed();
        nectar = await NectarToken.deployed();
        let amount = 100000;

        await nectar.generateTokens(accounts[0], amount);
        await nectar.generateTokens(accounts[1], amount);
    });

    it("...should be able to start voting proposal if you are admin", async () => {
        
        let proposal = await tlm.startTokenVotes(['0x0', '0x1', '0x2'], 17);

        assert.equal(proposal.logs[0].event, 'NewTokens', "Event for new tokens should be emitted");
    });

    it("...shouldn't be able to start voting proposal if you are not admin", async () => {
        let proposal;

        try {
            proposal = await tlm.startTokenVotes(['0x0', '0x1', '0x2'], 17, {'from': accounts[1]});
        } catch (error) {
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
                assert.ok(false, "Transactions shouldn't pass when called from non admin");
            }
        }
    });

    it("...should be able to get data about proposal", async () => {
        let proposal = await tlm.startTokenVotes(['0x0', '0x1', '0x2'], 17);
        let proposalId = proposal.logs[0].args['idProposal'];
        
        let data = await tlm.proposal(proposalId);

        await advanceToBlock(web3.eth.blockNumber+5);

        let votingToken = DestructibleMiniMe.at(data[7]);
        let parentToken = await votingToken.parentToken();

        assert.equal(parentToken, nectar.address, "Parent token for proposal should be same as nectar token");
    });

    it("...should be able to vote on last proposal", async () => {
        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        let proposal = await tlm.proposal(proposalId);

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[0]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(0);

        proposal = await tlm.proposal(proposalId);

        assert.equal(proposal[5][0].toString(), myBalance.toString(), "Votes for token 0 should be same as my balance.");
    });
});