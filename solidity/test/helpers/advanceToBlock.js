function advanceBlock () {
    return new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: Date.now(),
      }, (err, res) => {
        return err ? reject(err) : resolve(res);
      });
    });
}


  // Advances the block number so that the last mined block is `number`.
async function advanceToBlock (number) {
    if (web3.eth.blockNumber > number) {
      return;
      // throw Error(`block number ${number} is in the past (current is ${web3.eth.blockNumber})`);
    }

    while (web3.eth.blockNumber < number) {
      await advanceBlock();
    }
}

async function advanceXBlocks (number) {

    const blockToReach = web3.eth.blockNumber + number;
    while (web3.eth.blockNumber < blockToReach) {
      await advanceBlock();
    }
}

module.exports = {
    advanceToBlock,
};
