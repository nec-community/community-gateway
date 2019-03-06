function timeJump (time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
    }, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
/*
    web3.currentProvider.sendAsync({
    jsonrpc: '2.0',
    method: 'evm_increaseTime',
    params: [10000],
    id: new Date().getSeconds()
  }, (err, resp) => {
    if (!err) {
      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [],
        id: new Date().getSeconds(),
      }, (err, res) => {
        return err ? reject(err) : resolve(res);
      });
    }
  })
  });
  */
}

// Advances to time
async function advanceToTime (time) {
    await timeJump(time);
}

module.exports = {
    advanceToTime,
};
