const ListingRewardManager = artifacts.require("./ListingRewardManager.sol");
const TokenListingManager = artifacts.require("./TokenListingManager.sol");
const NectarToken = artifacts.require("./NEC.sol");
const ERC20Mintable = artifacts.require("./ERC20Mintable");
const DestructibleMiniMeToken = artifacts.require("./DestructibleMiniMeToken");
const advanceToBlock = require('./helpers/advanceToBlock').advanceToBlock;

const increaseTime = function(duration) {
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
        id: id+1,
      }, (err2, res) => {
        return err2 ? reject(err2) : resolve(res)
      })
    })
  })
}

contract('ListingRewardManager', async (accounts) => {

  let lrm;
  let tlm, nectar, factory, testToken, amount;

    before(async () => {
        lrm = await ListingRewardManager.deployed();

        tlm = await TokenListingManager.deployed();
        nectar = await NectarToken.deployed();

        testToken = await ERC20Mintable.deployed()
        testToken.mint(accounts[0], 1000000000000000)
    });

    it("...should be possible to see that there are no pending rewards before deposits", async () => {
        let pendingRewards = await lrm.getDepositedRewards(testToken.address);
        assert.equal(pendingRewards.valueOf(), 0, "there are deposited rewards when there should not be");
    });

    it("...should not be possible to deposit the test token if it has not won", async () => {
        await testToken.approve(lrm.address, 1000000000000000);
        let deposit;
        try {
            deposit = await lrm.depositRewards(testToken.address, 1000000);
        } catch (error) {
            assert.ok(error.message.includes('revert'), "Deposit should be reverted if called for non winner");
        } finally {
            if (deposit != undefined) {
                assert.ok(false, "Deposit shouldn't pass when called for non winner");
            }
        }

        let pendingRewards = await lrm.getDepositedRewards(testToken.address);
        assert.equal(pendingRewards.valueOf(), 0, "there are deposited rewards");
    });

    it("...should be possible to deposit after token is considered a winner", async () => {

        await increaseTime(7 * 24 * 60 * 60);
        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        let proposal = await tlm.startTokenVotes([
                  '0x0000000000000000000000000000000000000000',
                  testToken.address,
                  '0x2000000000000000000000000000000000000000',
                  '0x3000000000000000000000000000000000000000',
                  '0x4000000000000000000000000000000000000000',
                  '0x5000000000000000000000000000000000000000'], 2, 0, 0);

          numberOfProposals = await tlm.numberOfProposals();
          proposalId = numberOfProposals - 1;
          proposal = await tlm.proposal(proposalId);
          let myVote = 1;
          let otherVote = 3;

          let tokens = proposal[6];
          let votingToken = await DestructibleMiniMeToken.at(proposal[7]);

          let myBalance = await votingToken.balanceOf.call(accounts[0]);
          let otherBalance = await votingToken.balanceOf.call(accounts[1]);

          assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");
          await tlm.vote(proposalId, myVote, myBalance);
          await tlm.vote(proposalId, otherVote, otherBalance, {'from': accounts[1]});
          let winners = await tlm.getWinnerIndices(proposalId);

          assert.equal(tokens[winners[0]], testToken.address, "TestToken Should have won the vote");

          await increaseTime(7 * 24 * 60 * 60);

          assert.equal(await tlm.isWinner.call(testToken.address), false, "it is already a winning token")
          await tlm.endTokenVote(proposalId);
          assert.equal(await tlm.isWinner.call(testToken.address), true, "did not get marked as winning token")

        await lrm.depositRewards(testToken.address, 1000000);
        let pendingRewards = await lrm.getDepositedRewards(testToken.address);
        assert.equal(pendingRewards.valueOf(), 1000000, "there are deposited rewards");
    });


    it("...should be possible to claim tokens if you voted", async () => {

        assert.equal(await tlm.isWinner.call(testToken.address), true, "did not get marked as winning token")


        const claim = await lrm.claimPendingReward(testToken.address);
        assert.equal(claim.logs[0].event, 'RewardsClaimed', 'RewardsClaimed' + ' event should fire.');
        assert.equal(claim.logs[0].args[1], 1000000, 'Reward should be full amount');
    });

    it("...should not be possible to claim rewards a second time", async () => {

        assert.equal(await tlm.isWinner.call(testToken.address), true, "did not get marked as winning token")

        const claim = await lrm.claimPendingReward(testToken.address);
        assert.equal(claim.logs[0].event, 'RewardsClaimed', 'RewardsClaimed' + ' event should fire.');
        assert.equal(claim.logs[0].args[1], 0, 'Reward should be full amount');
    });

    it("...should not be possible to claim rewards if you did not vote", async () => {

        assert.equal(await tlm.isWinner.call(testToken.address), true, "did not get marked as winning token")

        await lrm.depositRewards(testToken.address, 1000000);
        let pendingRewards = await lrm.countPendingRewards(testToken.address);
        assert.equal(pendingRewards.valueOf(), 1000000, "there are deposited rewards");

        const claim = await lrm.claimPendingReward(testToken.address, {'from': accounts[1]});
        assert.equal(claim.logs[0], undefined, 'There should not be an event');
    });

    it("...should be possible for multiple voters to all claim correct amounts", async () => {
        const testToken2 = await ERC20Mintable.new()
        await testToken2.mint(accounts[0], 1000000000000000)
        await testToken2.approve(lrm.address, 1000000000000000);

        await increaseTime(7 * 24 * 60 * 60);

              let numberOfProposals = await tlm.numberOfProposals();
              let proposalId = numberOfProposals - 1;
              let proposal = await tlm.startTokenVotes([
                        '0x0000000000000000000000000000000000000000',
                        '0x1000000000000000000000000000000000000000',
                        '0x2000000000000000000000000000000000000000',
                        '0x3000000000000000000000000000000000000000',
                        '0x4000000000000000000000000000000000000000',
                        testToken2.address], 2, 0, 0);

                numberOfProposals = await tlm.numberOfProposals();
                proposalId = numberOfProposals - 1;
                proposal = await tlm.proposal(proposalId);
                let voteFor = 5;

                let tokens = proposal[6];
                let votingToken = await ERC20Mintable.at(proposal[7]);

                let myBalance = await votingToken.balanceOf.call(accounts[0]);
                let otherBalance = await votingToken.balanceOf.call(accounts[1]);
                let threeBalance = await votingToken.balanceOf.call(accounts[2]);
                let fourBalance = await votingToken.balanceOf.call(accounts[3]);

                assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");
                await tlm.vote(proposalId, voteFor, myBalance);
                await increaseTime(6 * 60 * 60);
                await tlm.vote(proposalId, voteFor, otherBalance, {'from': accounts[1]});
                await increaseTime(6 * 60 * 60);
                await tlm.vote(proposalId, voteFor, threeBalance, {'from': accounts[2]});
                await increaseTime(6 * 60 * 60);
                await tlm.vote(proposalId, voteFor, fourBalance, {'from': accounts[3]});
                let winners = await tlm.getWinnerIndices(proposalId);

                assert.equal(tokens[winners[0]], testToken2.address, "TestToken Should have won the vote");

                await increaseTime(7 * 24 * 60 * 60);

                assert.equal(await tlm.isWinner.call(testToken2.address), false, "it is already a winning token")
                await tlm.endTokenVote(proposalId);
                assert.equal(await tlm.isWinner.call(testToken2.address), true, "did not get marked as winning token")

              await lrm.depositRewards(testToken2.address, 1000000);
              let pendingRewards = await lrm.getDepositedRewards(testToken2.address);
              assert.equal(pendingRewards.valueOf(), 1000000, "there are deposited rewards");
    });

    it("...should be possible to claim all winnings", async () => {
        const testToken3 = await ERC20Mintable.new()
        await testToken3.mint(accounts[0], 1000000000000000)
        await testToken3.approve(lrm.address, 1000000000000000);

        await increaseTime(7 * 24 * 60 * 60);

        let numberOfProposals = await tlm.numberOfProposals();
        let proposalId = numberOfProposals - 1;
        let proposal = await tlm.startTokenVotes([
            '0x0000000000000000000000000000000000000000',
            '0x1000000000000000000000000000000000000000',
            '0x2000000000000000000000000000000000000000',
            '0x3000000000000000000000000000000000000000',
            '0x4000000000000000000000000000000000000000',
            testToken3.address], 2, 0, 0);

        numberOfProposals = await tlm.numberOfProposals();
        proposalId = numberOfProposals - 1;
        proposal = await tlm.proposal(proposalId);
        let voteFor = 5;

        let tokens = proposal[6];
        let votingToken = await ERC20Mintable.at(proposal[7]);

        let myBalance = await votingToken.balanceOf.call(accounts[0]);
        let otherBalance = await votingToken.balanceOf.call(accounts[1]);

        assert.ok(tokens.length > 0, "Number of tokens must be greater than 0");
        await tlm.vote(proposalId, voteFor, myBalance);
        await increaseTime(6 * 60 * 60);
        await tlm.vote(proposalId, voteFor, otherBalance, {'from': accounts[1]});
        let winners = await tlm.getWinnerIndices(proposalId);

        assert.equal(tokens[winners[0]], testToken3.address, "TestToken Should have won the vote");

        await increaseTime(7 * 24 * 60 * 60);

        assert.equal(await tlm.isWinner.call(testToken3.address), false, "it is already a winning token")
        await tlm.endTokenVote(proposalId);
        assert.equal(await tlm.isWinner.call(testToken3.address), true, "did not get marked as winning token")

        await lrm.depositRewards(testToken3.address, 1000000);
        let pendingRewards = await lrm.getDepositedRewards(testToken3.address);
        assert.equal(pendingRewards.valueOf(), 1000000, "there are deposited rewards");

        await lrm.claimAllPendingRewards();
    });

});
