const TokenListingManagerAdvanced = artifacts.require("./TokenListingManagerAdvanced.sol");  
const NectarToken = artifacts.require("./NEC.sol");
const DestructibleMiniMe = artifacts.require("./DestructibleMiniMeToken");
const advanceToBlock = require('./helpers/advanceToBlock').advanceToBlock;

contract('TokenListingManagerAdvanced', async (accounts) => {

    let tlm, nectar, amount;

    before(async () => {
        tlm = await TokenListingManagerAdvanced.deployed();
        nectar = await NectarToken.deployed();
        amount = 100000;

        await nectar.generateTokens(accounts[0], 2 * amount);

        const accs = accounts.slice(1);
        const fundsPromises = accs.map(a => nectar.generateTokens(a,amount));
        await Promise.all(fundsPromises);

    });

    it("...should transfer tokens between users if they didn't vote and don't have a delegate set", async () => {
        let proposal = await tlm.startTokenVotes(['0x111', '0x112'], 4, 0, 0, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);

        let votingToken1 = DestructibleMiniMe.at(proposal[7], { from: accounts[5] });
        let votingToken2 = DestructibleMiniMe.at(proposal[7], { from: accounts[6] });

        await votingToken1.transfer(accounts[6], amount, { from: accounts[5] });

        let myBalance1 = await votingToken1.balanceOf(accounts[5]);
        let myBalance2 = await votingToken2.balanceOf(accounts[6]);

        assert.ok(myBalance1.valueOf() == 0 && myBalance2.valueOf() == amount * 2, "funds should get updated");
    });

    it('...should call delegate vote for a 100 users and let the choosen delegate vote', async () => {

        if (accounts.length < 101) {
            return;
        }

        let proposal = await tlm.startTokenVotes(['0x99', '0x98'], 4, 0, 0, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = proposal[6].length - 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.registerAsDelegate("storageHash", {from: accounts[0]});

        const accs = accounts.slice(1);

        const delegatePromises = accs.map(a => tlm.delegateVote(accounts[0], {from: a}));

        await Promise.all(delegatePromises);

        const res = await tlm.vote(myVote, (100000*100));

        console.log(res.receipt.cumulativeGasUsed);

        assert.ok(res.receipt.cumulativeGasUsed < 1200000);
    });
   
    it("...should be able to start voting proposal if you are admin", async () => {
        let proposal = await tlm.startTokenVotes(['0x0', '0x1', '0x2'], 17, 0, 0, []);

        assert.equal(proposal.logs[0].event, 'NewTokens', "Event for new tokens should be emitted");
    });

    it("...should be able to start voting proposal with criteria 1 ", async () => {
        let proposal = await tlm.startTokenVotes(['0x88', '0x99', '0x77'], 17, 1, 2, []);

        assert.equal(proposal.logs[0].event, 'NewTokens', "Event for new tokens should be emitted");
    });

    it("...shouldn't be able to start voting proposal if you add the same token", async () => {
        try {
            await tlm.startTokenVotes(['0x0', '0x7', '0x8'], 17, 0, 0, []);
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if called from non admin");
        }

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

    it("...shouldn't be able to vote on last proposal, if the amount is too big", async () => {
        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        let proposal = await tlm.proposal(proposalId);
        let myVote = 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[4]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        try {
            await tlm.vote(myVote, myBalance + 1, {from: accounts[4]});
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if amount is too big");
        }
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

        let winners = await tlm.getWinners();
        
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

        let winners = await tlm.getWinners();
        proposal = await tlm.proposal(proposalId);
        
        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be first winner with criteria 1");
        assert.equal(winners[1], proposal[6][otherVote], "Token other voted for should be second winner with criteria 1");
    });

    it("...should be able to return winners when criteria is 2", async () => {
        let proposal = await tlm.startTokenVotes(['0x18', '0x19', '0x20', '0x21', '0x22', '0x23'], 2, 2, amount+1, ['0x15', '0x16', '0x17']);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = 1;
        let otherVote = 6;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let myBalance = await votingToken.balanceOf(accounts[0]);
        let otherBalance = await votingToken.balanceOf(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(myVote, myBalance);
        await tlm.vote(otherVote, otherBalance/2, {'from': accounts[1]});

        let winners = await tlm.getWinners();
        
        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be first winner with criteria 1");
        assert.ok(winners.length == 1, "Only my token should be winner");
    });

    it("...shouldn't be able to vote for an already set winner token", async () => {
        let proposal = await tlm.startTokenVotes(['0x38', '0x39', '0x46'], 2, 0, 0, ['0x1']);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[0]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        try {
            await tlm.vote(myVote, myBalance);
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if token is already set");
        }
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
        
        assert.equal(parseInt(proposal[5][myVote]), parseInt(myBalance/2) , "Token I voted for should have half of my balance in new round");
        assert.equal(parseInt(proposal[5][otherVote]), parseInt(otherBalance/2) , "Token other voted for should have half of other balance in new round");
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

        await tlm.registerAsDelegate("storageHash");
        await tlm.delegateVote(accounts[0], {'from': accounts[1]});

        await tlm.vote(myVote, parseInt(myBalance)+parseInt(otherBalance));

        let winners = await tlm.getWinners();
        proposal = await tlm.proposal(proposalId);

        assert.equal(winners[0], proposal[6][myVote], "Token I voted for should be first winner");
        assert.ok(winners.length == 1, "Only my token should be winner");

        assert.equal(proposal[5][myVote], parseInt(myBalance)+parseInt(otherBalance), "Token I voted for should have my + other balance after I vote");
    });

    it("...shouldn't be able to delegate votes if you're already a delegate", async () => {
        await tlm.registerAsDelegate("storageHash", {from: accounts[4]});

        try {
            await tlm.delegateVote(accounts[1], {'from': accounts[4]});
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if you're already a delegate");
        }
    });


    it("...shouldn't be able to vote if the user already delegated his votes", async () => {
        let proposal = await tlm.startTokenVotes(['0x51', '0x62'], 2, 0, 0, []);
        let proposalId = proposal.logs[0].args['idProposal'];

        proposal = await tlm.proposal(proposalId);
        let myVote = proposal[6].length - 1;

        let tokens = proposal[6];
        let votingToken = DestructibleMiniMe.at(proposal[7]);

        let balance = await votingToken.balanceOf(accounts[2]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.delegateVote(accounts[0], {'from': accounts[2]});

        try {
            await tlm.vote(myVote, parseInt(balance), {'from': accounts[2]});
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if called from non admin");
        }
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

        await tlm.registerAsDelegate("storageHash");
        await tlm.delegateVote(accounts[0], {'from': accounts[1]});

        await tlm.vote(myVote, parseInt(myBalance));
        await tlm.vote(otherVote, parseInt(otherBalance));

        let winners = await tlm.getWinners();
        proposal = await tlm.proposal(proposalId);
        
        assert.equal(parseInt(myBalance), parseInt(proposal[5][myVote]), "Token I voted for should have votes of myBalance");
        assert.equal(parseInt(otherBalance), parseInt(proposal[5][otherVote]), "Token other voted for should have votes of otherBalance");
        assert.ok(winners.length == 2, "There should be two winners");
    });

    it("...should be able to add new admins if you are a admin", async () => {
        await tlm.addAdmin(accounts[1], {from: accounts[0]});

        const isAdmin = await tlm.isAdmin(accounts[1]);
        assert.ok(isAdmin == true, "account[1] is a new admin now");
    });

    it("...shouldn't be able to add new admin if you are not a admin", async () => {
        try {
            await tlm.addAdmin(accounts[1], {from: accounts[4]});
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if called from non admin");
        }
    });

    it("...should be able to remove an admin if you're the owner", async () => {
        await tlm.removeAdmin(accounts[1], {from: accounts[0]});

        const isAdmin = await tlm.isAdmin(accounts[1]);
        assert.ok(isAdmin == false, "account[1] is removed from admin list");
    });

    it("...shouldn't be able to remove an admin if you're not the owner", async () => {
        try {
            await tlm.removeAdmin(accounts[1], {from: accounts[4]});
        } catch(err) {
            assert.ok(err.message.includes('revert'), "Transaction should be reverted if called from non owner");
        }
    });

});