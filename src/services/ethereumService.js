import TransportU2F from '@ledgerhq/hw-transport-u2f';
import Eth from '@ledgerhq/hw-app-eth';
import Tx from 'ethereumjs-tx';
import Web3 from 'web3';
import config from '../constants/config.json';
import abis from '../constants/abis.json';
import { log, toDecimal } from './utils';
import grenache from './grenacheService';
import keystore from './keystoreService';

let ledgerComm;
const defaultPath = "44'/60'/0'/0";
let ledgerPath = defaultPath;

let ethPrice;
let necPrice;
let necConversionRate;
let totalFee;
let totalTokens;
let burningEnabled;

const setWeb3toMetamask = () => {
  if (window.ethereum) {
    return (window._web3 = new Web3(ethereum));
  } else if (window.web3) {
    return (window._web3 = new Web3(web3.currentProvider));
  }
  throw new Error('Web3 provider not found');
};

const setupWeb3 = () => {
  window._web3 = new Web3(config.providerUrl);
};

const isMetamaskApproved = async () => {
  if (!window.ethereum) return true;
  if (!window.ethereum.enable) return true;
  if (!window.ethereum._metamask) return false;
  if (!window.ethereum._metamask.isApproved) return false;
  return window.ethereum._metamask.isApproved();
};

const metamaskApprove = async () => {
  if (window.ethereum && window.ethereum.enable) return window.ethereum.enable();
};

const getAccount = async () => {
  const accounts = await window._web3.eth.getAccounts();
  if (!accounts.length) throw new Error('No accounts (Possibly locked)');
  return accounts[0];
};

const getNecEth = async () => {
  const tickerRes = await fetch('https://api.deversifi.com/bfx/v2/candles/trade:1D:tNECETH/hist');
  const ticker = await tickerRes.json();
  return ticker;
}

const getNecUsdByTimestamp = async timeStamp => {
  const tickerRes = await fetch(`https://api.deversifi.com/bfx/v2/candles/trade:1h:tNECUSD/last?limit=1&start=${timeStamp}`)
  const ticker = await tickerRes.json();
  return ticker[2];
}

const getNecUsd = async () => {
  const tickerRes = await fetch('https://api.deversifi.com/bfx/v2/candles/trade:1D:tNECUSD/hist?limit=7');
  const ticker = await tickerRes.json();
  return ticker;
}

const getBalance = async _account => {
  const account = _account || (await getAccount());
  const balanceWei = await window._web3.eth.getBalance(account);
  const balanceEth = window._web3.utils.fromWei(balanceWei);
  // optionally convert to BigNumber here
  // return new window._web3.utils.BN(balanceEth);
  return balanceEth;
};

const isAdmin = async _account => {
  const account = _account || (await getAccount());
  const proposalContract = getProposalContract();
  return proposalContract.methods.isAdmin(account).call();
};

const weiToEth = weiVal => window._web3.utils.fromWei(new window._web3.utils.BN(`${weiVal}`));

const ethToWei = ethVal => window._web3.utils.toWei(`${ethVal}`);

const getBlockNumber = () => window._web3.eth.getBlockNumber();

const getChartBlockRange = async days => {
  if (!days) {
    days = config.chartDuration;
  }
  const toBlock = await getBlockNumber();
  const blocksInDays = Math.floor((days * 24 * 60 * 60) / 17);
  const fromBlock = Math.floor(toBlock - blocksInDays);
  return { fromBlock, toBlock };
};


const getBlockByNumber = block => window._web3.eth.getBlock(block);

const getNetwork = () => window._web3.eth.net.getId();

const getProposalContract = () =>
  new window._web3.eth.Contract(abis.proposalContract, config.proposalContract);

const getSimpleVoteContract = () =>
  new window._web3.eth.Contract(abis.simpleVoteContract, config.simpleVoteContract);

const getAdvancedTokenProposalContract = () =>
  new window._web3.eth.Contract(abis.tokenListingManager, config.tokenListingManager);

const getTokenContract = _address =>
  new window._web3.eth.Contract(abis.necTokenContract, _address || config.necTokenContract);

const getEngineContract = _address =>
  new window._web3.eth.Contract(abis.engineContract, _address || config.necEngineContract);

const getVotingTokenContract = _votingToken =>
  new window._web3.eth.Contract(abis.necTokenContract, _votingToken);

const getControllerContract = () =>
  new window._web3.eth.Contract(abis.necTokenControllerContract, config.necTokenControllerContract);

const getLedgerTransport = async () => {
  if (!ledgerComm) {
    ledgerComm = await TransportU2F.create();
  }
  return ledgerComm;
};

const ledgerLogin = async path => {
  ledgerPath = path;
  const _transport = await getLedgerTransport();
  const eth = new Eth(_transport);
  const account = await eth.getAddress(ledgerPath);
  return account.address;
};

const ledgerListAccounts = async (pathPrefix, start, n) => {
  const _transport = await getLedgerTransport();
  const eth = new Eth(_transport);
  const accounts = [];
  for (let i = 0; i < n; i++) {
    const path = `${pathPrefix}/${start + i}`;
    const account = await eth.getAddress(path);
    account.path = path;
    accounts.push(account);
  }
  return accounts;
};

const signAndSendLedger = async (contractCall, value = 0, gasPrice = config.defaultGasPrice) => {
  const _transport = await getLedgerTransport();
  const eth = new Eth(_transport);
  const account = await eth.getAddress(ledgerPath);
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
  };

  const gasLimit = await window._web3.eth.estimateGas(rawTx);
  log(`LEDGER gasLimit ${gasLimit}`);
  rawTx.gasLimit = window._web3.utils.numberToHex(gasLimit);
  rawTx.chainId = config.network;
  rawTx.v = config.network;

  log('LEDGER rawTx', rawTx);

  const tx = new Tx(rawTx);
  log('LEDGER tx', tx);

  const signedTx = await eth.signTransaction(ledgerPath, tx.serialize().toString('hex'));
  log('LEDGER signedTx', signedTx);

  const tx2 = new Tx({
    ...rawTx,
    v: `0x${signedTx.v}`,
    r: `0x${signedTx.r}`,
    s: `0x${signedTx.s}`,
  });
  log('LEDGER tx2', tx2);

  return window._web3.eth
    .sendSignedTransaction(`0x${tx2.serialize().toString('hex')}`)
    .on('transactionHash', transactionHash => {
      log('LEDGER transactionHash', transactionHash);
    })
    .on('receipt', res => {
      log('LEDGER receipt', res);
    })
    .on('error', err => {
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
  };

  const gasLimit = await window._web3.eth.estimateGas(rawTx);
  log(`KEYSTORE gasLimit ${gasLimit}`);
  rawTx.gasLimit = window._web3.utils.numberToHex(gasLimit);
  rawTx.chainId = config.network;
  rawTx.v = config.network;

  log('KEYSTORE rawTx', rawTx);

  const tx = new Tx(rawTx);
  log('KEYSTORE tx', tx);

  await account.signRawTransaction(tx);
  log('KEYSTORE signed tx', tx);

  return window._web3.eth
    .sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
    .on('transactionHash', transactionHash => {
      log(`KEYSTORE Vote successful: https://etherscan.io/tx/${transactionHash}`);
    })
    .on('receipt', res => {
      log('KEYSTORE receipt', res);
    })
    .on('error', err => {
      log('KEYSTORE error', err);
    });
};

const totalPledgedFees = async () => {
  const tokenContract = getTokenContract();
  return tokenContract.methods.totalPledgedFees().call();
};

const totalSupply = async () => {
  const tokenContract = getTokenContract();
  return tokenContract.methods.totalSupply().call();
};

const estimatePayout = async tokensToBurn => {
  if (!totalFee) totalFee = await totalPledgedFees();
  log(`Total fees on contract ${weiToEth(totalFee)}`);
  if (!totalTokens) totalTokens = await totalSupply();
  log(`Total NEC supply on contract ${weiToEth(totalTokens)}`);
  const feeValueOfTokens = (totalFee * tokensToBurn) / totalTokens;
  log(`Burning ${weiToEth(tokensToBurn)} tokens will pay out ${weiToEth(feeValueOfTokens)}`);
  return Math.floor(feeValueOfTokens);
};

const getTokenBalance = async _account => {
  const account = _account || (await getAccount());
  log(`token balance for ${account}`);
  const tokenContract = getTokenContract();
  return tokenContract.methods.balanceOf(account).call();
};

// dev
const contribute = async () => {
  const controllerContract = getControllerContract();
  const account = await getAccount();
  log(`Contributing from account ${account}`);
  return controllerContract.methods.contributeForMakers(account).send({
    value: window._web3.utils.toWei('0.01', 'ether'),
    from: account,
  });
};

// dev
const authorize = async address => {
  const controllerContract = getControllerContract();
  const account = await getAccount();
  return controllerContract.methods.authoriseMaker(address).send({
    from: account,
  });
};

const approveProposal = async (id, accountType) => {
  const proposalContract = getProposalContract();
  const contractCall = proposalContract.methods.approveProposal(id);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const denyProposal = async (id, accountType) => {
  const proposalContract = getProposalContract();
  const contractCall = proposalContract.methods.denyProposal(id);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const submitProposal = async (duration, hash, accountType) => {
  const proposalContract = getProposalContract();
  const contractCall = proposalContract.methods.addProposal(
    duration,
    window._web3.utils.toHex(hash)
  );
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const vote = async (id, vote, accountType) => {
  const proposalContract = getProposalContract();
  const contractCall = proposalContract.methods.vote(id, vote);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const voteMission = async (vote, accountType) => {
  const simpleVoteContract = getSimpleVoteContract();
  const contractCall = simpleVoteContract.methods.vote(vote);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const voteTokens = async (tokenId, amount, accountType) => {
  const tokenProposalContract = getAdvancedTokenProposalContract();
  let activeProposal = await tokenProposalContract.methods.numberOfProposals().call();
  activeProposal = parseInt(activeProposal, 10) - 1;
  const contractCall = tokenProposalContract.methods.vote(
    activeProposal,
    tokenId,
    ethToWei(amount)
  );
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const sellAndBurn = async (amount, accountType) => {
  const account = await getAccount()

  const engineContract = getEngineContract()
  const nectarContract = getTokenContract()
  const allowance = await nectarContract.methods.allowance(account, engineContract._address).call()
  if (+allowance < +ethToWei(amount)) {
    const approveCall = nectarContract.methods.approve(
      engineContract._address,
      '10000000000000000000000000000000')
    if (accountType === 'ledger') await signAndSendLedger(approveCall)
    if (accountType === 'keystore') await signAndSendKeystore(approveCall)
    if (accountType === 'metamask') await approveCall.send({from: account})
  }

  const contractCall = engineContract.methods.sellAndBurnNec(
    ethToWei(amount)
  )
  if (accountType === 'ledger') return signAndSendLedger(contractCall)
  if (accountType === 'keystore') return signAndSendKeystore(contractCall)

  return contractCall.send({
    from: account,
  })
}

const hasUserVoted = async (proposalId, address) => {
  if (!address) return false;
  const proposalContract = getProposalContract();
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
  const tokenContract = getTokenContract(proposalToken);
  return tokenContract.methods.balanceOf(account).call();
};

const getProposalDetails = async id => {
  const proposalContract = getProposalContract();
  const details = await proposalContract.methods.proposal(id).call();
  log(details);
  const storageHash = details._storageHash.substr(2, 40);

  let description = await grenache.get(storageHash);
  const separator =
    description.indexOf('\n') === -1 ? description.length : description.indexOf('\n');
  const title = description.substr(0, separator);
  description = description.substr(separator).trim();

  let yesPercentage =
    100 *
    (parseInt(details._totalYes, 10) /
      (parseInt(details._totalYes, 10) + parseInt(details._totalNo, 10)));
  if (isNaN(yesPercentage)) yesPercentage = 0;
  else yesPercentage = Math.floor(yesPercentage * 100) / 100;

  let totalYes = weiToEth(details._totalYes);
  totalYes = Math.floor(totalYes * 100) / 100;
  let totalNo = weiToEth(details._totalNo);
  totalNo = Math.floor(totalNo * 100) / 100;

  let noPercentage =
    100 *
    (parseInt(details._totalNo, 10) /
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

const getActiveTokenListingProposal = async () => {
  const tokenListingManager = getAdvancedTokenProposalContract();
  let activeProposal = await tokenListingManager.methods.numberOfProposals().call();
  activeProposal = parseInt(activeProposal, 10) - 1;
  if (activeProposal < 0) return false;
  const proposalData = await tokenListingManager.methods.proposal(activeProposal).call();
  log('Active token proposal', proposalData);
  return proposalData;
};

const getTokenProposalDetails = async () => {
  try {
    const details = await getActiveTokenListingProposal();
    if (!details) throw new Error('No active token proposal');
    const yesVotes = details._votes.map(x => weiToEth(x));
    const totalVotes = yesVotes.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    const endingTime = new Date(details._startTime * 1000 + details._duration * 1000);
    return {
      ...details,
      yesVotes,
      totalVotes,
      endingTime,
    };
  } catch (err) {
    log(err);
    return {
      totalVotes: 0,
      yesVotes: new Array(14 + 1)
        .join('0')
        .split('')
        .map(parseFloat),
      endingTime: new Date(),
    };
  }
};

const getVotingTokenBalance = async _account => {
  let _votingToken;
  try {
    const details = await getActiveTokenListingProposal();
    if (!details) return 0;
    _votingToken = details._votingToken;
  } catch (err) {
    log('Error getting voting token balance', err);
    return 0;
  }
  const account = _account || (await getAccount());

  const votingTokenContract = getVotingTokenContract(_votingToken);
  const ownBalance = await votingTokenContract.methods.balanceOf(account).call();
  log(`voting token balance for ${account} = ${ownBalance}`);

  const totalBalance = new window._web3.utils.BN(ownBalance);

  log(`total voting token balance for ${account} = ${totalBalance}`);

  return totalBalance.toString();
};

/*
const getVotesSpentBalance = async (_account) => {
  const tokenListingManager = getAdvancedTokenProposalContract();
  let activeProposal;
  try {
    activeProposal = await tokenListingManager.methods.numberOfProposals().call();
    if (!activeProposal) return 0;
    activeProposal = parseInt(activeProposal, 10) - 1;
  } catch (err) {
    log('Error getting votes spent', err);
    return 0;
  }
  const account = _account || await getAccount();
  return tokenListingManager.methods.votesSpentThisRound(activeProposal, account).call();
};
*/

const getProposals = async () => {
  const proposalContract = getProposalContract();
  const proposalIDs = await proposalContract.methods.getApprovedProposals().call();
  log('getApprovedProposals', proposalIDs);
  return proposalIDs.map(id => getProposalDetails(id));
};

const getActiveProposals = async () => {
  const proposalContract = getProposalContract();
  const proposalIDs = await proposalContract.methods.getActiveProposals().call();
  log('getActiveProposals', proposalIDs);
  return proposalIDs.map(id => getProposalDetails(id));
};

const getNonApprovedProposals = async () => {
  const proposalContract = getProposalContract();
  const proposalIDs = await proposalContract.methods.getNotApprovedProposals().call();
  log('getActiveProposals', proposalIDs);
  return proposalIDs
    .sort((a, b) => parseInt(b) - parseInt(a))
    .filter(id => !(config.hiddenProposals || []).includes(parseInt(id)))
    .map(id => getProposalDetails(id));
};

const getDelegates = async () =>
  new Promise(async (resolve, reject) => {
    const advancedTokenProposalContract = getAdvancedTokenProposalContract();
    const delegateCount = await advancedTokenProposalContract.methods.delegateCount().call();
    log(delegateCount);
    const ids = [...Array(parseInt(delegateCount, 10)).keys()];
    const promises = ids.map(id => advancedTokenProposalContract.methods.allDelegates(id).call());

    Promise.all(promises)
      .then(async delegates => {
        log(delegates);
        resolve(delegates);
      })
      .catch(error => {
        reject(error);
      });
  });

const becomeDelegate = async (storageHash, accountType) => {
  const advancedTokenProposalContract = getAdvancedTokenProposalContract();
  log(storageHash, web3.fromAscii(storageHash));
  const contractCall = advancedTokenProposalContract.methods.registerAsDelegate(
    window._web3.utils.toHex(storageHash)
  );
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const delegateVote = async (to, accountType) => {
  const advancedTokenProposalContract = getAdvancedTokenProposalContract();
  const contractCall = advancedTokenProposalContract.methods.delegateVote(to);
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const undelegate = async accountType => {
  const advancedTokenProposalContract = getAdvancedTokenProposalContract();
  const contractCall = advancedTokenProposalContract.methods.undelegateVote();
  if (accountType === 'ledger') return signAndSendLedger(contractCall);
  if (accountType === 'keystore') return signAndSendKeystore(contractCall);
  const account = await getAccount();
  return contractCall.send({
    from: account,
  });
};

const getDelegate = account => {
  const advancedTokenProposalContract = getAdvancedTokenProposalContract();
  return advancedTokenProposalContract.methods.myDelegate(account).call();
};

const hasVotedOnTokenListing = async account => {
  const activeProposal = await getActiveTokenListingProposal();
  if (!activeProposal._active) return false;
  const advancedTokenProposalContract = getAdvancedTokenProposalContract();
  return advancedTokenProposalContract.methods.gaveVote(account).call();
};

const delegatedTokenBalance = async (account, _votingToken) => {
  const advancedTokenProposalContract = getAdvancedTokenProposalContract();
  let balance = new window._web3.utils.BN('0');
  for (let i = 0; i < 1000000; i++) {
    try {
      const delegator = await advancedTokenProposalContract.methods.myVotes(account, i).call();
      const votingTokenContract = getVotingTokenContract(_votingToken);
      const delegatorBalance = await votingTokenContract.methods.balanceOf(delegator).call();
      balance = balance.add(new window._web3.utils.BN(delegatorBalance));
    } catch (e) {
      break;
    }
  }
  return balance.toString();
};

const getEthPrice = async () => {
  const tickerRes = await fetch('https://api.deversifi.com/bfx/v2/ticker/tETHUSD');
  const ticker = await tickerRes.json();
  return ticker[6];
};

const getNecPrice = async () => {
  const tickerRes = await fetch('https://api.deversifi.com/bfx/v2/ticker/tNECUSD');
  const ticker = await tickerRes.json();
  return ticker[6];
};

const getNecPriceInEth = async () => {
  const tickerRes = await fetch('https://api.deversifi.com/bfx/v2/ticker/tNECETH');
  const ticker = await tickerRes.json();
  return ticker[6];
}

const calculateNecReward = async volume => {
  if (!ethPrice) ethPrice = await getEthPrice();
  log(`Eth price ${ethPrice}`);
  const volumeFee = volume * 0.001; // Assume fee is 0.1%
  const feeInEth = volumeFee / ethPrice;
  log(`Volume fee in eth ${feeInEth}`);
  if (!necConversionRate) {
    const controllerContract = getControllerContract();
    necConversionRate = await controllerContract.methods.getFeeToTokenConversion(1).call();
  }
  const necReward = necConversionRate * feeInEth;
  log(`NEC reward ${necConversionRate * feeInEth}`);
  return necReward;
};

const burnNec = async (necTokens, accountType) => {
  const tokenContract = getTokenContract();
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
  const controllerContract = getControllerContract();
  necConversionRate = await controllerContract.methods.getFeeToTokenConversion(1).call();
  const tokenContract = getTokenContract();
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
  isMetamaskApproved,
  metamaskApprove,
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
  voteMission,
  voteTokens,
  getActiveTokenListingProposal,
  getTokenProposalDetails,
  sellAndBurn,
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
  delegateVote,
  undelegate,
  getDelegate,
  hasVotedOnTokenListing,
  getEngineContract,
  getTokenContract,
  getChartBlockRange,
  getNecPrice,
  getEthPrice,
  getNecPriceInEth,
  getBlockByNumber,
  getNecEth,
  getNecUsd,
  getNecUsdByTimestamp
};
