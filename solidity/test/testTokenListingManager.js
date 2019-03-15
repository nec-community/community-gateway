const TokenListingManager = artifacts.require('./TokenListingManager.sol')
const NectarToken = artifacts.require("./NEC.sol");
const DestructibleMiniMe = artifacts.require("./DestructibleMiniMeToken");
const advanceToBlock = require('./helpers/advanceToBlock').advanceToBlock;
const DestructibleMiniMeTokenFactory = artifacts.require("./DestructibleMiniMeTokenFactory");
const BigNumber = require('bignumber.js');

const {shouldFail} = require('openzeppelin-test-helpers');

const increaseTime = function (duration) {
    const id = Date.now()

    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_increaseTime',
            params: [duration],
            id: id,
        }, err1 => {
            if (err1) return reject(err1)

            web3.currentProvider.send({
                jsonrpc: '2.0',
                method: 'evm_mine',
                id: id + 1,
            }, (err2, res) => {
                return err2 ? reject(err2) : resolve(res)
            })
        })
    })
}

contract('TokenListingManager', async (accounts) => {

    let tlm, nectar, factory, testToken, amount;

    before(async () => {
        tlm = await TokenListingManager.deployed();
        nectar = await NectarToken.deployed();

        factory = await DestructibleMiniMeTokenFactory.deployed();
        testToken = await factory.createDestructibleCloneToken(nectar.address, 0, 'TokenA', 18, 'TA', true);
    });

    it("...should be able to start voting proposal if you are admin", async () => {

        let proposal = await tlm.startTokenVotes(['0x0000000000000000000000000000000000000000', '0x1000000000000000000000000000000000000000', '0x2000000000000000000000000000000000000000'], 1, 0, 0);

        assert.equal(proposal.logs[0].event, 'NewTokens', "Event for new tokens should be emitted");
    });

    it("...shouldn't be able to start voting proposal if you are not admin", async () => {
        let proposal;

        try {
            proposal = await tlm.startTokenVotes(['0x0000000000000000000000000000000000000000', '0x1000000000000000000000000000000000000000', '0x2000000000000000000000000000000000000000'], 17, 0, 0, {'from': accounts[1]});
        } catch (error) {
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
                assert.ok(false, "Transactions shouldn't pass when called from non admin");
            }
        }
    });

    it("...should be able to get data about proposal", async () => {
        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;

        let data = await tlm.proposal(proposalId);
        await advanceToBlock(web3.eth.blockNumber + 5);

        let votingToken = await DestructibleMiniMe.at(data[7]);
        let parentToken = await votingToken.parentToken.call();

        assert.equal(parentToken, nectar.address, "Parent token for proposal should be same as nectar token");
    });

    it("...should not be able to start new vote until previous proposal completed", async () => {
        let proposal;

        try {
            proposal = await tlm.startTokenVotes(['0x0000000000000000000000000000000000000000', '0x1000000000000000000000000000000000000000', '0x2000000000000000000000000000000000000000'], 1, 0, 0, {'from': accounts[0]});
        } catch (error) {
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
                assert.ok(false, "Transactions shouldn't pass when called from non admin");
            }
        }
    });

    it("...should be able to vote on last proposal with factor applied", async () => {
        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        let proposal = await tlm.proposal(proposalId);
        let myVote = 1;
        let tokens = proposal[6];
        let votingToken = await DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[0]);
        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        const firstAmount = new BigNumber(myBalance.toString())
        const hash = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(hash)
        const blockTime = block.timestamp;

        const weighted = firstAmount.multipliedBy(2).minus(firstAmount.multipliedBy(blockTime - proposal[1]).dividedBy(proposal[2]));
        await tlm.vote(proposalId, myVote, myBalance);
        proposal = await tlm.proposal(proposalId);

        assert.equal(proposal[5][myVote].toString(), weighted.toFixed(0).toString(), "Votes for token 0 should be same as my balance.");
    });

    it("...should be able to return winner when criteria is 0", async () => {
        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;

        proposal = await tlm.proposal(proposalId);
        let myVote = 1;

        let tokens = proposal[6];
        let votingToken = await DestructibleMiniMe.at(proposal[7]);
        let myBalance = await votingToken.balanceOf(accounts[0]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        await tlm.vote(proposalId, myVote, myBalance);
        const winners = await tlm.getWinnerIndices(proposalId);

        assert.equal(proposal[6][winners[0]], proposal[6][myVote], "Token I voted for should be the only winner with criteria 0");
    });

    it("...should be able to return 2 winners sorted when criteria is 1", async () => {

        await increaseTime(7 * 24 * 60 * 60);

        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        try {
            const end = await tlm.endTokenVote(proposalId);
            let proposal = await tlm.startTokenVotes([
                '0x0000000000000000000000000000000000000000',
                '0x1000000000000000000000000000000000000000',
                '0x2000000000000000000000000000000000000000',
                '0x3000000000000000000000000000000000000000',
                '0x4000000000000000000000000000000000000000',
                '0x5000000000000000000000000000000000000000'], 2, 1, 2);
        } catch (error) {
            console.log(error)
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
            }
        }
        numberOfProposals = await tlm.numberOfProposals();
        proposalId = numberOfProposals - 1;
        proposal = await tlm.proposal(proposalId);
        let myVote = 1;
        let otherVote = 3;

        let tokens = proposal[6];
        let votingToken = await DestructibleMiniMe.at(proposal[7]);

        await votingToken.transfer(accounts[1], 1, {from: accounts[0]})
        let myBalance = await votingToken.balanceOf.call(accounts[0]);
        let otherBalance = await votingToken.balanceOf.call(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");
        await tlm.vote(proposalId, myVote, myBalance);
        await tlm.vote(proposalId, otherVote, otherBalance, {'from': accounts[1]});
        let winners = await tlm.getWinnerIndices(proposalId);

        assert.equal(tokens[winners[0]], tokens[myVote], "Token I voted for should be first winner with criteria 1");
        assert.equal(tokens[winners[1]], tokens[otherVote], "Token other voted for should be second winner with criteria 1");
    });

    it("...should be able to return 1 winner when criteria is 2", async () => {

        await increaseTime(7 * 24 * 60 * 60);

        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        try {
            const end = await tlm.endTokenVote(proposalId);
            let proposal = await tlm.startTokenVotes([
                '0x0000000000000000000000000000000000000000',
                '0x1000000000000000000000000000000000000000',
                '0x2000000000000000000000000000000000000000',
                '0x3000000000000000000000000000000000000000',
                '0x4000000000000000000000000000000000000000',
                '0x5000000000000000000000000000000000000000'], 2, 2, 2);
        } catch (error) {
            console.log(error)
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
            }
        }
        numberOfProposals = await tlm.numberOfProposals();
        proposalId = numberOfProposals - 1;
        proposal = await tlm.proposal(proposalId);
        let myVote = 1;
        let otherVote = 3;

        let tokens = proposal[6];
        let votingToken = await DestructibleMiniMe.at(proposal[7]);

        await votingToken.transfer(accounts[1], 1, {from: accounts[0]})
        let myBalance = await votingToken.balanceOf.call(accounts[0]);
        let otherBalance = await votingToken.balanceOf.call(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");
        await tlm.vote(proposalId, myVote, myBalance);
        await tlm.vote(proposalId, otherVote, otherBalance, {'from': accounts[1]});
        let winners = await tlm.getWinnerIndices(proposalId);

        assert.equal(winners.length, 1, "Number of winning tokens should be 1");
        assert.equal(tokens[winners[0]], tokens[myVote], "Token I voted for should be first winner with criteria 1");
    });

    it("...should not be able to vote after time expires", async () => {
        await increaseTime(7 * 24 * 60 * 60);

        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        try {
            const end = await tlm.endTokenVote(proposalId);
            let proposal = await tlm.startTokenVotes([
                '0x0000000000000000000000000000000000000000',
                '0x1000000000000000000000000000000000000000',
                '0x2000000000000000000000000000000000000000',
                '0x3000000000000000000000000000000000000000',
                '0x4000000000000000000000000000000000000000',
                '0x5000000000000000000000000000000000000000'], 2, 2, 2);
        } catch (error) {
            console.log(error)
            assert.ok(error.message.includes('revert'), "Transaction should be reverted if called from non admin");
        } finally {
            if (proposal != undefined) {
            }
        }
        numberOfProposals = await tlm.numberOfProposals();
        proposalId = numberOfProposals - 1;
        proposal = await tlm.proposal(proposalId);

        await increaseTime(7 * 24 * 60 * 60);

        let tokens = proposal[6];
        let votingToken = await DestructibleMiniMe.at(proposal[7]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");

        let myVote = 1;
        let myBalance = await votingToken.balanceOf.call(accounts[0]);
        shouldFail(tlm.vote(proposalId, myVote, myBalance));
    });
});
