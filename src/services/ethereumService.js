const Web3 = require('web3');
import ledger from 'ledgerco';
import Tx from 'ethereumjs-tx';

import config from '../constants/config.json';
import { log } from './utils';
import grenache from './grenacheService';

let ledgerComm;
const defaultPath = '44\'/60\'/0\'/0';

let ethPrice;
let necPrice;
let necConversionRate;
let totalFee;
let totalTokens;

const getAccount = () => (
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) throw new Error('No accounts (Possibly locked)');
      resolve(accounts[0]);
    } catch (err) {
      // console.log(err);
      reject(err);
    }
  })
);

const getBalance = async (_account) => {
  const account = _account || await getAccount();
  const balanceWei = await web3.eth.getBalance(account);
  const balanceEth = web3.utils.fromWei(balanceWei);
  // optionally convert to BigNumber here
  // return new web3.utils.BN(balanceEth);
  return balanceEth;
};

const weiToEth = weiVal =>
  web3.utils.fromWei(new web3.utils.BN(`${weiVal}`));

const ethToWei = ethVal =>
  web3.utils.toWei(`${ethVal}`);

const getBlockNumber = () => web3.eth.getBlockNumber();

const getNetwork = () => web3.eth.net.getId();

const getProposalContract = async () =>
  new web3.eth.Contract(config.proposalContract.abi, config.proposalContract.address);

const getTokenContract = async () =>
  new web3.eth.Contract(config.tokenContract.abi, config.tokenContract.address);

const getControllerContract = async () =>
  new web3.eth.Contract(config.controllerContract.abi, config.controllerContract.address);

const totalPledgedFees = async () => {
  const tokenContract = await getTokenContract();
  return tokenContract.methods.totalPledgedFees().call();
};

const totalSupply = async () => {
  const tokenContract = await getTokenContract();
  return tokenContract.methods.totalSupply().call();
};

const estimatePayout = async (tokensToBurn) => {
  if (!totalFee)
    totalFee = await totalPledgedFees();
  log(`Total fees on contract ${weiToEth(totalFee)}`);
  if (!totalTokens)
    totalTokens = await totalSupply();
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

const contribute = async () => {
  const controllerContract = await getControllerContract();
  const account = await getAccount();
  log(`Contributing from account ${account}`);
  return controllerContract.methods.contributeForMakers(account).send({
    value: web3.utils.toWei('0.01', 'ether'),
    from: account,
  });
};

const authorize = async (address) => {
  const controllerContract = await getControllerContract();
  const account = await getAccount();
  return controllerContract.methods.authoriseMaker(address).send({
    from: account,
  });
};

const submitProposal = async (duration, hash) => {
  const account = await getAccount();
  const proposalContract = await getProposalContract();
  return proposalContract.methods.addProposal(duration, web3.utils.toHex(hash)).send({
    from: account,
  });
};

const vote = async (id, vote) => {
  const account = await getAccount();
  const proposalContract = await getProposalContract();
  return proposalContract.methods.vote(id, vote).send({
    from: account,
  });
};

const getProposalDetails = async (id) => {
  const proposalContract = await getProposalContract();
  const details = await proposalContract.methods.proposal(id).call();
  console.log(details);
  const storageHash = details._storageHash.substr(2, 40);
  // const storageHash = web3.utils.toAscii(details._storageHash).replace(/\u0000/g, '');
  let description = await grenache.get(storageHash);
  const separator = description.indexOf('\n') === -1
    ? description.length
    : description.indexOf('\n');
  const title = description.substr(0, separator);
  description = description.substr(separator).trim();
  let yesPercentage = 100 * (parseInt(details._totalYes, 10) /
    (parseInt(details._totalYes, 10) + parseInt(details._totalNo, 10)));
  if (isNaN(yesPercentage)) yesPercentage = 0;
  let noPercentage = 100 * (parseInt(details._totalNo, 10) /
    (parseInt(details._totalYes, 10) + parseInt(details._totalNo, 10)));
  if (isNaN(noPercentage)) noPercentage = 0;
  const startTime = new Date(parseInt(`${details._startTime}000`, 10));
  const remainingDays = Math.floor(
    ((startTime.valueOf() + parseInt(`${details._duration}000`)) - (new Date()).valueOf())
    / (24 * 60 * 60 * 1000)
  );
  return {
    id,
    ...details,
    title,
    description,
    yesPercentage,
    noPercentage,
    duration: details._duration / 24 / 60 / 60,
    startTime,
    remainingDays,
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

const getEthPrice = async () => {
  const tickerRes = await fetch('https://api.bitfinex.com/v2/ticker/tETHUSD');
  const ticker = await tickerRes.json();
  return ticker[6];
};

const getNecPrice = async () => {
  const tickerRes = await fetch('https://api.bitfinex.com/v2/ticker/tNECUSD');
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

const burnNec = async (necTokens) => {
  const account = await getAccount();
  const tokenContract = await getTokenContract();
  log(`Burning ${necTokens} NEC tokens`);
  return tokenContract.methods.burnAndRetrieve(necTokens).send({
    from: account,
  });
};

const fetchData = async () => {
  ethPrice = await getEthPrice();
  necPrice = await getNecPrice();
  const controllerContract = await getControllerContract();
  necConversionRate = await controllerContract.methods.getFeeToTokenConversion(1).call();
  totalFee = await totalPledgedFees();
  totalTokens = await totalSupply();
  return {
    ethPrice,
    necPrice,
    necConversionRate,
    totalFee,
    totalTokens,
  };
};

const ledgerLogin = async (path = defaultPath) => {
  if (!ledgerComm) ledgerComm = await ledger.comm_u2f.create_async(1000000);
  const eth = new ledger.eth(ledgerComm);
  const account = await eth.getAddress_async(path);
  return account.address;
};

const signAndSendLedger = async (contractCall, value = 0, gasPrice = 5, path = defaultPath) => {
  if (!ledgerComm) ledgerComm = await ledger.comm_u2f.create_async(1000000);
  const eth = new ledger.eth(ledgerComm);
  const account = await eth.getAddress_async(path);
  log(`LEDGER account`, account);

  let encodedAbi = contractCall.encodeABI();
  log(`LEDGER encodedAbi ${encodedAbi}`);

  const nonce = await web3.eth.getTransactionCount(account.address);
  log(`LEDGER nonce ${nonce}`);

  let rawTx = {
    nonce: web3.utils.numberToHex(nonce),
    from: account.address,
    gasPrice: web3.utils.numberToHex(web3.utils.toWei(gasPrice.toString(), 'gwei')),
    to: contractCall._parent._address,
    data: encodedAbi,
    value: web3.utils.numberToHex(value),
    chainId: config.network,
    v: config.network,
  };

  const gasLimit = await web3.eth.estimateGas(rawTx);
  log(`LEDGER gasLimit ${gasLimit}`);
  rawTx.gasLimit = web3.utils.numberToHex(gasLimit);

  log(`LEDGER rawTx`, rawTx);

  const tx = new Tx(rawTx);
  log(`LEDGER tx`, tx);

  const signedTx = await eth.signTransaction_async(path, tx.serialize().toString('hex'));
  log(`LEDGER signedTx`, signedTx);

  const tx2 = new Tx({
    ...rawTx,
    v: '0x' + signedTx.v,
    r: '0x' + signedTx.r,
    s: '0x' + signedTx.s,
  });
  log(`LEDGER tx2`, tx2);

  web3.eth.sendSignedTransaction('0x' + tx2.serialize().toString('hex'))
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

export default {
  getAccount,
  getBalance,
  getNetwork,
  weiToEth,
  ethToWei,
  getTokenBalance,
  estimatePayout,
  submitProposal,
  getProposalDetails,
  getProposals,
  getActiveProposals,
  vote,
  calculateNecReward,
  burnNec,
  fetchData,
  ledgerLogin,
  signAndSendLedger,
};

setTimeout(async () => {
  const proposalContract = await getProposalContract();
  // let contractCall = proposalContract.methods.addProposal(20, web3.utils.toHex('test'));
  let contractCall = proposalContract.methods.nProposals();
  // const controllerContract = await getControllerContract();
  // let contractCall = controllerContract.methods.contributeForMakers();
  // signAndSendLedger(contractCall);
}, 1000);
