const TokenListingManagerAdvanced = artifacts.require("./TokenListingManagerAdvanced.sol");  
const NectarToken = artifacts.require("./MiniMeToken.sol");
const DestructibleMiniMe = artifacts.require("./DestructibleMiniMeToken");
const advanceToBlock = require('./helpers/advanceToBlock').advanceToBlock;

contract('TokenListingManagerAdvanced', async (accounts) => {

    let tlm, nectar, amount;

    before(async () => {
        tlm = await TokenListingManagerAdvanced.deployed();
        nectar = await NectarToken.deployed();
        amount = 100000;

        await nectar.generateTokens(accounts[0], 2 * amount);
        await nectar.generateTokens(accounts[1], amount);
    });

    it("...should be able to start voting proposal if you are admin", async () => {
        
        let proposal = await tlm.startTokenVotes(['0x0', '0x1', '0x2'], 17, 0, 0, []);

        assert.equal(proposal.logs[0].event, 'NewTokens', "Event for new tokens should be emitted");
    });

    it("...shouldn't be able to start voting proposal if you are not admin", async () => {
        let proposal;

        try {
            proposal = await tlm.startTokenVotes(['0x0', '0x1', '0x2'], 17, 0, 0, [], {'from': accounts[1]});
        } catch (error) {
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
                assert.ok(false, "Transactions shouldn't pass when called from non admin");
            }
        }
    });

    it("...should be able to get data about proposal", async () => {
        let proposal = await tlm.startTokenVotes(['0x3', '0x4', '0x5'], 17, 0, 0, ['0x0', '0x2']);
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
        let myVote = 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[0]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(myVote, myBalance);

        proposal = await tlm.proposal(proposalId);

        assert.equal(proposal[5][myVote].toString(), myBalance.toString(), "Votes for token 0 should be same as my balance.");
    });

    it("...should be able to return winner when criteria is 0", async () => {
        let proposal = await tlm.startTokenVotes(['0x6', '0x7', '0x8', '0x9', '0x10', '0x11'], 2, 0, 0, ['0x4']);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[0]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(myVote, myBalance);

        let winners = await tlm.getWinners(proposalId);
        
        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be the only winner with criteria 0");
    });

    it("...should be able to return 2 winners sorted when criteria is 1", async () => {
        let proposal = await tlm.startTokenVotes(['0x12', '0x13', '0x14', '0x15', '0x16', '0x17'], 2, 1, 2, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = 1;
        let otherVote = 3;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);
        let otherBalance = await votingToken.balanceOf(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(myVote, myBalance);
        await tlm.vote(otherVote, otherBalance, {'from': accounts[1]});

        let winners = await tlm.getWinners(proposalId);
        
        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be first winner with criteria 1");
        assert.equal(winners[1], proposal[6][otherVote], "Token other voted for should be second winner with criteria 1");
    });

    it("...should be able to return winners when criteria is 2", async () => {
        let proposal = await tlm.startTokenVotes(['0x18', '0x19', '0x20', '0x21', '0x22', '0x23'], 2, 2, amount+1, ['0x15', '0x16', '0x17']);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = 1;
        let otherVote = 3;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);
        let otherBalance = await votingToken.balanceOf(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(myVote, myBalance);
        await tlm.vote(otherVote, otherBalance/2, {'from': accounts[1]});

        let winners = await tlm.getWinners(proposalId);
        
        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be first winner with criteria 1");
        assert.ok(winners.length == 1, "Only my token should be winner");
    });

    it("...should be able to carry over votes for tokens", async () => {
        let proposal = await tlm.startTokenVotes(['0x24', '0x25'], 2, 2, amount+1, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = proposal[6].length - 1;
        let otherVote = proposal[6].length - 2;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);
        let otherBalance = await votingToken.balanceOf(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(myVote, myBalance);
        await tlm.vote(otherVote, otherBalance, {'from': accounts[1]});

        // after vote check if in new proposal those tokens has half of my votes

        proposal = await tlm.startTokenVotes(['0x26', '0x27'], 2, 2, amount+1, []);
        proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        
        assert.equal(proposal[5][myVote], myBalance/2 , "Token I voted for should have half of my balance in new round");
        assert.equal(proposal[5][otherVote], otherBalance/2 , "Token other voted for should have half of other balance in new round");
    });

    it("...should be able to delegate votes", async () => {
        let proposal = await tlm.startTokenVotes(['0x28', '0x29'], 2, 0, 0, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = proposal[6].length - 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);
        let otherBalance = await votingToken.balanceOf(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.registerAsDelegate();
        await tlm.delegateVote(accounts[0], {'from': accounts[1]});

        await tlm.vote(myVote, parseInt(myBalance)+parseInt(otherBalance));

        let winners = await tlm.getWinners(proposalId);
        proposal = await tlm.proposal(proposalId);

        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be first winner");
        assert.ok(winners.length == 1, "Only my token should be winner");

        assert.equal(proposal[5][myVote], parseInt(myBalance)+parseInt(otherBalance), "Token I voted for should have my + other balance after I vote");
    });

    it("...should be able to delegate votes and vote for two different proposals", async () => {
        let proposal = await tlm.startTokenVotes(['0x30', '0x31'], 2, 1, 2, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = proposal[6].length - 1;
        let otherVote = proposal[6].length - 2;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);
        let otherBalance = await votingToken.balanceOf(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.registerAsDelegate();
        await tlm.delegateVote(accounts[0], {'from': accounts[1]});

        await tlm.vote(myVote, parseInt(myBalance));
        await tlm.vote(otherVote, parseInt(otherBalance));

        let winners = await tlm.getWinners(proposalId);
        proposal = await tlm.proposal(proposalId);
        
        assert.equal(parseInt(myBalance), parseInt(proposal[5][myVote]), "Token I voted for should have votes of myBalance");
        assert.equal(parseInt(otherBalance), parseInt(proposal[5][otherVote]), "Token other voted for should have votes of otherBalance");
        assert.ok(winners.length == 2, "There should be two winners");
    });
});