import config from '../constants/config.json';
import { log } from './utils';
import grenache from './grenacheService';

const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
const LedgerWalletSubproviderFactory = require('ledger-wallet-provider').default;


const ledgerLogin = async () => {
};

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
  web3.utils.toWei(new web3.utils.BN(`${ethVal}`));

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
  const feeTotal = await totalPledgedFees();
  log(`Total fees on contract ${weiToEth(feeTotal)}`);
  const totalTokens = await totalSupply();
  log(`Total NEC supply on contract ${weiToEth(totalTokens)}`);
  const feeValueOfTokens = (feeTotal * tokensToBurn) / totalTokens;
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
  return controllerContract.methods.contributeForMakers(account).send({
    value: web3.utils.toWei('0.01', 'ether'),
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
  const storageHash = details._storageHash.substr(2, 40);
  // const storageHash = web3.utils.toAscii(details._storageHash).replace(/\u0000/g, '');
  let description = await grenache.get(storageHash);
  const title = description.substr(0, description.indexOf('\n'));
  description = description.substr(description.indexOf('\n')).trim();
  const yesPercentage = 100 * (parseInt(details._totalYes) / (parseInt(details._totalYes) + parseInt(details._totalNo)));
  const noPercentage = 100 * (parseInt(details._totalNo) / (parseInt(details._totalYes) + parseInt(details._totalNo)));
  return {
    id,
    ...details,
    title,
    description,
    yesPercentage,
    noPercentage,
    duration: details._duration / 24 / 60 / 60,
    startTime: new Date(parseInt(`${details._startTime}000`, 10)),
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

export default {
  getAccount,
  getBalance,
  getNetwork,
  weiToEth,
  ethToWei,
  getTokenBalance,
  estimatePayout,
  submitProposal,
  getProposals,
  getActiveProposals,
  vote,
};

setTimeout(ledgerLogin, 1000);
