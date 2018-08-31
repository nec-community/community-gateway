import ledger from 'ledgerco';
import Tx from 'ethereumjs-tx';
import Web3 from 'web3';
import config from '../constants/config.json';
import { log, toDecimal } from './utils';
import grenache from './grenacheService';
import keystore from './keystoreService';

let ledgerComm;
const defaultPath = '44\'/60\'/0\'/0';
let ledgerPath = defaultPath;

let ethPrice;
let necPrice;
let necConversionRate;
let totalFee;
let totalTokens;
let burningEnabled;

const setWeb3toMetamask = () => {
  window._web3 = new Web3(web3.currentProvider);
};

const setupWeb3 = () => {
  window._web3 = new Web3(config.providerUrl);
};

const getAccount = () => (
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window._web3.eth.getAccounts();
      if (!accounts.length) throw new Error('No accounts (Possibly locked)');
      resolve(accounts[0]);
    } catch (err) {
      reject(err);
    }
  })
);

const getBalance = async (_account) => {
  const account = _account || await getAccount();
  const balanceWei = await window._web3.eth.getBalance(account);
  const balanceEth = window._web3.utils.fromWei(balanceWei);
  // optionally convert to BigNumber here
  // return new window._web3.utils.BN(balanceEth);
  return balanceEth;
};

const isAdmin = async (_account) => {
  const account = _account || await getAccount();
  const proposalContract = await getProposalContract();
  return proposalContract.methods.isAdmin(account).call();
};

const weiToEth = weiVal =>
  window._web3.utils.fromWei(new window._web3.utils.BN(`${weiVal}`));

const ethToWei = ethVal =>
  window._web3.utils.toWei(`${ethVal}`);

const getBlockNumber = () => window._web3.eth.getBlockNumber();

const getNetwork = () => window._web3.eth.net.getId();

const getProposalContract = async () =>
  new window._web3.eth.Contract(config.proposalContract.abi, config.proposalContract.address);

const getTokenProposalContract = async () =>
  new window._web3.eth.Contract(config.tokenListingManager.abi, config.tokenListingManager.address);

const getAdvancedTokenProposalContract = async () =>
  new window._web3.eth.Contract(config.tokenListingManagerAdvanced.abi, config.tokenListingManagerAdvanced.address);

const getTokenContract = async (_address) =>
  new window._web3.eth.Contract(config.necTokenContract.abi, _address || config.necTokenContract.address);

const getVotingTokenContract = async _votingToken =>
  new window._web3.eth.Contract(config.necTokenContract.abi, _votingToken);

const getControllerContract = async () =>
  new window._web3.eth.Contract(config.necTokenControllerContract.abi, config.necTokenControllerContract.address);

const ledgerLogin = async (path) => {
  ledgerPath = path;
  if (!ledgerComm) ledgerComm = await ledger.comm_u2f.create_async(1000000);
  const eth = new ledger.eth(ledgerComm);
  const account = await eth.getAddress_async(ledgerPath);
  return account.address;
};

const ledgerListAccounts = async (pathPrefix, start, n) => {
  if (!ledgerComm) ledgerComm = await ledger.comm_u2f.create_async(1000000);
  const eth = new ledger.eth(ledgerComm);
  const accounts = [];
  for (let i = 0; i < n; i++) {
    const path = pathPrefix + '/' + (start + i);
    const account = await eth.getAddress_async(path);
    account.path = path;
    accounts.push(account);
  }
  return accounts;
};

const signAndSendLedger = async (contractCall, value = 0, gasPrice = config.defaultGasPrice) => {
  if (!ledgerComm) ledgerComm = await ledger.comm_u2f.create_async(1000000);
  const eth = new ledger.eth(ledgerComm);
  const account = await eth.getAddress_async(ledgerPath);
  log(`LEDGER account ${account.address}`);

  const encodedAbi = contractCall.encodeABI();
  log(`LEDGER encodedAbi ${encodedAbi}`);

  const nonce = await window._web3.eth.getTransactionCount(account.address);
  log(`LEDGER nonce ${nonce}`);

  const rawTx = {
    nonce: window._web3.utils.numberToHex(nonce),
    from: account.address,
    gasPrice: window._web3.utils.numberToHex(window._web3.utils.toWei(gasPrice.toString(), 'gwei')),
    to: contractCall._parent._address,
    data: encodedAbi,
    value: window._web3.utils.numberToHex(value),
    chainId: config.network,
    v: config.network,
  };

  const gasLimit = await window._web3.eth.estimateGas(rawTx);
  log(`LEDGER gasLimit ${gasLimit}`);
  rawTx.gasLimit = window._web3.utils.numberToHex(gasLimit);

  log('LEDGER rawTx', rawTx);

  const tx = new Tx(rawTx);
  log('LEDGER tx', tx);

  const signedTx = await eth.signTransaction_async(ledgerPath, tx.serialize().toString('hex'));
  log('LEDGER signedTx', signedTx);

  const tx2 = new Tx({
    ...rawTx,
    v: `0x${signedTx.v}`,
    r: `0x${signedTx.r}`,
    s: `0x${signedTx.s}`,
  });
  log('LEDGER tx2', tx2);

  return window._web3.eth.sendSignedTransaction(`0x${tx2.serialize().toString('hex')}`)
    .on('transactionHash', (transactionHash) => {
      log('LEDGER transactionHash', transactionHash);
    })
    .on('receipt', (res) => {
      log('LEDGER receipt', res);
    })
    .on('error', (err) => {
      log('LEDGER error', err);
    });
};

const signAndSendKeystore = async (contractCall, value = 0, gasPrice = config.defaultGasPrice) => {
  const account = keystore.getWallet();
  log(`KEYSTORE account ${account.address}`);

  const encodedAbi = contractCall.encodeABI();
  log(`KEYSTORE encodedAbi ${encodedAbi}`);

  const nonce = await window._web3.eth.getTransactionCount(account.address);
  log(`KEYSTORE nonce ${nonce}`);

  const rawTx = {
    nonce: window._web3.utils.numberToHex(nonce),
    from: account.address,
    gasPrice: window._web3.utils.numberToHex(window._web3.utils.toWei(gasPrice.toString(), 'gwei')),
    to: contractCall._parent._address,
    data: encodedAbi,
    value: window._web3.utils.numberToHex(value),
    chainId: config.network,
    v: config.network,
  };

  const gasLimit = await window._web3.eth.estimateGas(rawTx);
  log(`KEYSTORE gasLimit ${gasLimit}`);
  rawTx.gasLimit = window._web3.utils.numberToHex(gasLimit);

  log('KEYSTORE rawTx', rawTx);

  const tx = new Tx(rawTx);
  log('KEYSTORE tx', tx);

  await account.signRawTransaction(tx);
  log('KEYSTORE signed tx', tx);

  return window._web3.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
    .on('transactionHash', (transactionHash) => {
      log(`KEYSTORE Vote successful: https://etherscan.io/tx/${transactionHash}`);
    })
    .on('receipt', (res) => {
      log('KEYSTORE receipt', res);
    })
    .on('error', (err) => {
      log('KEYSTORE error', err);
    });
};

const totalPledgedFees = async () => {
  const tokenContract = await getTokenContract();
  return tokenContract.methods.totalPledgedFees().call();
};

const totalSupply = async () => {
  const tokenContract = await getTokenContract();
  return tokenContract.methods.totalSupply().call();
};

const estimatePayout = async (tokensToBurn) => {
  if (!totalFee) totalFee = await totalPledgedFees();
  log(`Total fees on contract ${weiToEth(totalFee)}`);
  if (!totalTokens) totalTokens = await totalSupply();
  log(`Total NEC supply on contract ${weiToEth(totalTokens)}`);
  const feeValueOfTokens = (totalFee * tokensToBurn) / totalTokens;
  log(`Burning ${weiToEth(tokensToBurn)} tokens will pay out ${weiToEth(feeValueOfTokens)}`);
  return Math.floor(feeValueOfTokens);
};

const getTokenBalance = async (_account) => {
  const account = _account || await getAccount();
  log(`token balance for ${account}`);
  const tokenContract = await getTokenContract();
  return tokenContract.methods.balanceOf(account).call();
};

const getVotingTokenBalance = async (_account) => {
  const tokenProposalContract = await getTokenProposalContract();
  let _votingToken;
  try {
    const details = await tokenProposalContract.methods.proposal(5).call(); // TODO fetch active proposal from contract
    _votingToken = details._votingToken;
  } catch (err) {
    log('Error getting voting token balance', err);
    return 0;
  }
  const account = _account || await getAccount();
  log(`voting token balance for ${account}`);
  const votingTokenContract = await getVotingTokenContract(_votingToken);
  return votingTokenContract.methods.balanceOf(account).call();
};

// dev
const contribute = async () => {
  const controllerContract = await getControllerContract();
  const account = await getAccount();
  log(`Contributing from account ${account}`);
  return controllerContract.methods.contributeForMakers(account).send({
    value: window._web3.utils.toWei('0.01', 'ether'),
    from: account,
  });
};

// dev
const authorize = async (address) => {
  const controllerContract = await getControllerContract();
  const account = await getAccount();
  return controllerContract.methods.authoriseMaker(address).send({
    from: account,
  });
};

const approveProposal = async (id, accountType) => {
  const proposalContract = await getProposalContract();
  const contractCall = proposalContract.methods.approveProposal(id);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const denyProposal = async (id, accountType) => {
  const proposalContract = await getProposalContract();
  const contractCall = proposalContract.methods.denyProposal(id);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const submitProposal = async (duration, hash, accountType) => {
  const proposalContract = await getProposalContract();
  const contractCall = proposalContract.methods.addProposal(duration, window._web3.utils.toHex(hash));
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const vote = async (id, vote, accountType) => {
  const proposalContract = await getProposalContract();
  const contractCall = proposalContract.methods.vote(id, vote);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const voteTokens = async (tokenId, amount, accountType) => {
  const tokenProposalContract = await getTokenProposalContract();
  const contractCall = tokenProposalContract.methods.vote(tokenId, amount);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const hasUserVoted = async (proposalId, address) => {
  if (!address) return false;
  const proposalContract = await getProposalContract();
  const events = await proposalContract.getPastEvents('Vote', {
    filter: {
      idProposal: proposalId.toString(),
      _voter: address,
    },
    fromBlock: 0,
    toBlock: 'latest',
  });
  log(`User ${address} has voted on proposal ${proposalId} ${events.length} times`);
  log(events);
  return events.length > 0 && (events[0].returnValues.yes ? 'Yes' : 'No');
};

const userBalanceOnProposal = async (account, proposalToken) => {
  const tokenContract = await getTokenContract(proposalToken);
  return tokenContract.methods.balanceOf(account).call();
};

const getProposalDetails = async (id) => {
  const proposalContract = await getProposalContract();
  const details = await proposalContract.methods.proposal(id).call();
  log(details);
  const storageHash = details._storageHash.substr(2, 40);

  let description = await grenache.get(storageHash);
  const separator = description.indexOf('\n') === -1
    ? description.length
    : description.indexOf('\n');
  const title = description.substr(0, separator);
  description = description.substr(separator).trim();

  let yesPercentage = 100 * (parseInt(details._totalYes, 10) /
    (parseInt(details._totalYes, 10) + parseInt(details._totalNo, 10)));
  if (isNaN(yesPercentage)) yesPercentage = 0;
  else yesPercentage = Math.floor(yesPercentage * 100) / 100;

  let totalYes = weiToEth(details._totalYes);
  totalYes = Math.floor(totalYes * 100) / 100;
  let totalNo = weiToEth(details._totalNo);
  totalNo = Math.floor(totalNo * 100) / 100;

  let noPercentage = 100 * (parseInt(details._totalNo, 10) /
    (parseInt(details._totalYes, 10) + parseInt(details._totalNo, 10)));
  if (isNaN(noPercentage)) noPercentage = 0;
  else noPercentage = Math.floor(noPercentage * 100) / 100;

  const startTime = new Date(parseInt(`${details._startTime}000`, 10));
  const endTime = new Date(startTime.valueOf() + parseInt(`${details._duration}000`, 10));
  return {
    id,
    ...details,
    title,
    description,
    yesPercentage,
    noPercentage,
    duration: details._duration / 24 / 60 / 60,
    startTime,
    endTime,
    totalYes,
    totalNo,
  };
};

const getTokenDetails = async () => {
  const tokenProposalContract = await getTokenProposalContract();
  let totalVotes;
  let yesVotes;
  let endingTime = new Date();
  try {
    const details = await tokenProposalContract.methods.proposal(5).call();
    yesVotes = details._votes.map(x => weiToEth(x));
    totalVotes = yesVotes.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    endingTime = new Date(details._startTime * 1000 + details._duration * 1000);
  } catch (err) {
    totalVotes = 0;
    yesVotes = new Array(14 + 1).join('0').split('').map(parseFloat);
    log(err);
  }

  return {
    yesVotes,
    totalVotes,
    endingTime,
  };
};

const getProposals = async () => {
  const proposalContract = await getProposalContract();
  const proposalIDs = await proposalContract.methods.getApprovedProposals().call();
  log('getApprovedProposals', proposalIDs);
  return proposalIDs.map(id => getProposalDetails(id));
};

const getActiveProposals = async () => {
  const proposalContract = await getProposalContract();
  const proposalIDs = await proposalContract.methods.getActiveProposals().call();
  log('getActiveProposals', proposalIDs);
  return proposalIDs.map(id => getProposalDetails(id));
};

const getNonApprovedProposals = async () => {
  const proposalContract = await getProposalContract();
  const proposalIDs = await proposalContract.methods.getNotApprovedProposals().call();
  log('getActiveProposals', proposalIDs);
  return proposalIDs.map(id => getProposalDetails(id));
};

const getDelegates = async () =>
  new Promise(async (resolve, reject) => {
    const advancedTokenProposalContract = await getAdvancedTokenProposalContract();
    const delegateCount = await advancedTokenProposalContract.methods.delegateCount().call();
    console.log(delegateCount);
    const ids = [...Array(parseInt(delegateCount, 10)).keys()];
    const promises = ids.map(id => advancedTokenProposalContract.methods.allDelegates(id).call());

    Promise.all(promises)
      .then(async (delegates) => {
        console.log(delegates);
        resolve(delegates);
      })
      .catch((error) => {
        reject(error);
      });
    // return [
    //   {
    //     address: '0x00158a74921620b39e5c3afe4dca79feb2c2c143',
    //     description: 'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal ' +
    //       'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal',
    //   },
    //   {
    //     address: '0x00158a74921620b39e5c3afe4dca79feb2c2c143',
    //     description: 'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal ' +
    //       'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal',
    //   },
    //   {
    //     address: '0x00158a74921620b39e5c3afe4dca79feb2c2c143',
    //     description: 'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal ' +
    //       'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal',
    //   },
    //   {
    //     address: '0x00158a74921620b39e5c3afe4dca79feb2c2c143',
    //     description: 'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal ' +
    //       'Lorem Ipsum is not simply random text. It has roots in a piece of classiacal',
    //   },
    // ];
  });

const becomeDelegate = async (storageHash, accountType) => {
  const advancedTokenProposalContract = await getAdvancedTokenProposalContract();
  console.log(storageHash, web3.fromAscii(storageHash));
  const contractCall = advancedTokenProposalContract.methods.registerAsDelegate(window._web3.utils.toHex(storageHash));
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const getEthPrice = async () => {
  const tickerRes = await fetch('https://api.ethfinex.com/v2/ticker/tETHUSD');
  const ticker = await tickerRes.json();
  return ticker[6];
};

const getNecPrice = async () => {
  const tickerRes = await fetch('https://api.ethfinex.com/v2/ticker/tNECUSD');
  const ticker = await tickerRes.json();
  return ticker[6];
};

const calculateNecReward = async (volume) => {
  if (!ethPrice) ethPrice = await getEthPrice();
  log(`Eth price ${ethPrice}`);
  const volumeFee = volume * 0.001; // Assume fee is 0.1%
  const feeInEth = volumeFee / ethPrice;
  log(`Volume fee in eth ${feeInEth}`);
  if (!necConversionRate) {
    const controllerContract = await getControllerContract();
    necConversionRate = await controllerContract.methods.getFeeToTokenConversion(1).call();
  }
  const necReward = necConversionRate * feeInEth;
  log(`NEC reward ${necConversionRate * feeInEth}`);
  return necReward;
};

const burnNec = async (necTokens, accountType) => {
  const tokenContract = await getTokenContract();
  log(`Burning ${necTokens} NEC tokens`);
  const contractCall = tokenContract.methods.burnAndRetrieve(necTokens);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const fetchData = async () => {
  ethPrice = await getEthPrice();
  necPrice = await getNecPrice();
  const controllerContract = await getControllerContract();
  necConversionRate = await controllerContract.methods.getFeeToTokenConversion(1).call();
  const tokenContract = await getTokenContract();
  burningEnabled = await tokenContract.methods.burningEnabled().call();
  totalFee = toDecimal(weiToEth(await totalPledgedFees()), 2);
  totalTokens = toDecimal(weiToEth(await totalSupply()), 2);
  return {
    ethPrice,
    necPrice,
    necConversionRate,
    totalFee,
    totalTokens,
    burningEnabled,
  };
};

export default {
  setWeb3toMetamask,
  setupWeb3,
  getAccount,
  getBalance,
  getNetwork,
  isAdmin,
  weiToEth,
  ethToWei,
  getTokenBalance,
  getVotingTokenBalance,
  estimatePayout,
  submitProposal,
  getProposalDetails,
  getProposals,
  getActiveProposals,
  getNonApprovedProposals,
  vote,
  voteTokens,
  getTokenDetails,
  hasUserVoted,
  userBalanceOnProposal,
  calculateNecReward,
  burnNec,
  fetchData,
  ledgerLogin,
  ledgerListAccounts,
  signAndSendLedger,
  approveProposal,
  denyProposal,
  getDelegates,
  becomeDelegate,
};

// setTimeout(contribute, 3000);
