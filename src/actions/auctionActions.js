import {
  FETCH_CIRCULATING_NEC_DATA,
  FETCH_BURNED_NEC,
  FETCH_DEVERSIFI_NEC_ETH_DATA,
  FETCH_NEXT_AUCTION_ETH_DATA,
  FETCH_DEVERSIFI_NEC_USD_DATA,
  FETCH_CURRENT_AUCTION_SUMMARY,
  FETCH_AUCTION_INTERVAL_DATA,
  SELL_IN_AUCTION_START,
  FETCH_AUCTION_TRANSACTIONS,
  FETCH_ETH_PRICE,
  FETCH_NEC_PRICE,
  SELL_AND_BURN_NEC,
  FETCH_NEXT_AUCTION_DATE
} from './actionTypes';
import Web3 from 'web3';
import config from '../constants/config.json';
import eth from '../services/ethereumService';
import { formatEth } from '../services/utils';
import { notify, notifyError } from './notificationActions';
import _ from 'lodash';
import { openLogin } from './accountActions';
import BN from 'bignumber.js'


const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.providerUrl));

export const fetchNextAuctionDate = () => async dispatch => {
  const engineContract = eth.getEngineContract();

  const {nextStartTimeSeconds} = await engineContract.methods.getNextAuction().call();

  dispatch({ type: FETCH_NEXT_AUCTION_DATE, nextAuctionDate: nextStartTimeSeconds - Date.now() / 1000 })
}

export const fetchBurnedNec = () => async dispatch => {
  const engineContract = eth.getEngineContract();
  const blockRange = await eth.getChartBlockRange(7);
  const burnedNec = [];
  let pastEvents = await engineContract.getPastEvents('AuctionClose', blockRange);

  await Promise.all(pastEvents.map(async (event, index) => {
    const { timestamp } = await eth.getBlockByNumber(event.blockNumber);

    burnedNec.push({
      name: new Date(timestamp * 1000).toLocaleDateString(),
      pv: event.returnValues.necBurned / 1000000000000000000,
      amt: event.event,
    });
  }));

  dispatch({
    type: FETCH_BURNED_NEC,
    burnedNecData: _.uniqBy(_.orderBy(burnedNec, ['name'], ['asc']), 'name')
  });
};

export async function getCirculatingNEC() {
  const tokenContract = eth.getTokenContract();
  const blockRange = await eth.getChartBlockRange();
  const blockDiff = Math.floor((blockRange.toBlock - blockRange.fromBlock) / 7);
  const circulatingNec = [];

  for(let block = blockRange.fromBlock; block <= blockRange.toBlock; block += blockDiff) {
    const supply = await tokenContract.methods.totalSupplyAt(blockRange.fromBlock).call();
    const { timestamp } = await eth.getBlockByNumber(block);

    circulatingNec.push({
      name:  new Date(timestamp * 1000).toLocaleDateString(),
      pv: Math.floor(supply/1000000000000000000)
    });
  }

  const orderedTransactions = circulatingNec.sort((a, b) => new Date(a.name) - new Date(b.name));

  return _.uniqBy(orderedTransactions, 'name');
}

export async function getDeversifiNecEth() {
  const necEth = await eth.getNecEth();

  const transactions = necEth.slice(0,7).map((transaction, index) => ({
    name: new Date(transaction[0]).toLocaleDateString(),
    pv: transaction[2]
  })).reverse();

  return transactions;
}

export const fetchDeversifiNecUsd = () => async dispatch => {
  const necEth = await eth.getNecUsd();

  const transactions = necEth.slice(0,7).map((transaction, index) => ({
    name: new Date(transaction[0]).toLocaleDateString(),
    pv: transaction[2]
  })).reverse();

  dispatch({ type: FETCH_DEVERSIFI_NEC_USD_DATA, deversifiNecUsdData: transactions })
}

export const fetchCirculatingNec = () => async dispatch => {
  const circulatingNecData = await getCirculatingNEC();

  dispatch({ type: FETCH_CIRCULATING_NEC_DATA, circulatingNecData });
};

export const fetchDeversifiNecEth = () => async dispatch => {
  const deversifiNecEthData = await getDeversifiNecEth();
  dispatch({ type: FETCH_DEVERSIFI_NEC_ETH_DATA, deversifiNecEthData });
};

const fetchedCurrentActionSummary = data => async dispatch => {
  const engineContract = eth.getEngineContract();

  try {
    const current = await engineContract.methods.getCurrentAuction().call();
    const auctionLength = await engineContract.methods.thawingDelay().call();
    const blockRange = await eth.getChartBlockRange();
    const transactions = await engineContract.getPastEvents('Burn', blockRange);

    let purchasedNec = 0
    let sumEth = 0
    let necAveragePrice = 'N/A'

    if(transactions.length) {
      transactions.forEach(transaction => {
        purchasedNec = purchasedNec + +transaction.returnValues.amount
        sumEth = sumEth + +transaction.returnValues.amount / +transaction.returnValues.price
      })
      purchasedNec = purchasedNec / 1000000000000000000
      necAveragePrice = (sumEth / purchasedNec).toFixed(5)
    }
    const currentNecPrice = (1000000000000000000/current.currentPrice).toFixed(7)

    dispatch({
      type: FETCH_CURRENT_AUCTION_SUMMARY,
      nextPriceChange: current.nextPriceChangeSeconds - Date.now() / 1000,
      startTimeSeconds: Number(current.startTimeSeconds),
      priceChangeLengthSeconds: auctionLength / 35,
      currentAuctionSummary: {
        currentNecPrice: currentNecPrice,
        nextNecPrice: (1000000000000000000/current.nextPrice).toFixed(7),
        remainingEth: current.remainingEthAvailable,
        initialEth: current.initialEthAvailable,
        necAveragePrice: necAveragePrice,
        purchasedNec: purchasedNec
      }
    });
  } catch(e) {
    dispatch({
      type: FETCH_CURRENT_AUCTION_SUMMARY,
      currentAuctionSummary: null
    });
  }
};

export const fetchCurrentActionSummary = data => async dispatch => {
  dispatch(fetchedCurrentActionSummary());
};

export const fetchAuctionIntervalData = () => async dispatch => {
  const engineContract = await eth.getEngineContract();
  const necPrice = await eth.getNecPrice();
  const blockRange = await eth.getChartBlockRange();
  const transactions = await engineContract.getPastEvents('Burn', blockRange);

  const data = transactions.map(transaction => ({
    nec: transaction.returnValues.amount,
    eth: formatEth(transaction.returnValues.price)
  }));

  dispatch({ type: FETCH_AUCTION_INTERVAL_DATA, auctionIntervalData: data });
};

const sellInAuctionEnd = data => ({
  type: SELL_IN_AUCTION_START,
  sellInAuctionData: [],
});

export const sellInAuctionStart = data => async dispatch => {
  dispatch(sellInAuctionEnd());
};


export const fetchAuctionTransactions = data => async dispatch => {
  const engineContract = await eth.getEngineContract();
  const necPrice = await eth.getNecPrice();
  const nec_eth = await eth.getNecPriceInEth();
  const blockRange = await eth.getChartBlockRange();
  const transactions = await engineContract.getPastEvents('Burn', blockRange);

  const transactionsList = await Promise.all(transactions.slice(0,20).map(async transaction => {
    const { timestamp } = await eth.getBlockByNumber(transaction.blockNumber);

    const price_nec_usd = await eth.getNecUsdByTimestamp(timestamp * 1000);

    return {
      timestamp,
      blockNumber: transaction.blockNumber,
      wallet_address: transaction.returnValues.burner,
      nec: formatEth(transaction.returnValues.amount),
      eth: (transaction.returnValues.amount / transaction.returnValues.price).toFixed(5),
      price_nec_eth: nec_eth,
      price_nec_usd,
      usd: (formatEth(transaction.returnValues.amount) * necPrice).toFixed(2),
    }
  }));

  dispatch({ type: FETCH_AUCTION_TRANSACTIONS, auctionTransactions: _.orderBy(transactionsList, ['timestamp'], ['desc']) });
};

export const fetchNecPrice = () => async dispatch => {
  const necPrice = await eth.getNecPrice();

  dispatch({ type: FETCH_NEC_PRICE, necPrice })
}

export const fetchEthPrice = () => async dispatch => {
  const ethPrice = await eth.getEthPrice();

  dispatch({ type: FETCH_ETH_PRICE, ethPrice })
}

export const sellAndBurn = (necAmount, auctionSummary) => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin())

  const userTokenBalance = getState().account.tokenBalance

  if (necAmount < 1) {
    return notifyError('This is below the minimum you can sell')(dispatch)
  }

  if (!userTokenBalance || userTokenBalance < 0.1) {
    return notifyError('You first need nectar tokens in your wallet')(dispatch)
  }

  if (userTokenBalance < necAmount) {
    return notifyError(`You only have: ${userTokenBalance} NEC in your wallet`)(dispatch)
  }

  const maxNec = formatEth(new BN(auctionSummary.remainingEth).div(auctionSummary.currentNecPrice))

  if (necAmount > +maxNec) {
    notify(`Your order will be reduced to sell ${maxNec} NEC (the max at this price)`)(dispatch)
    necAmount = maxNec 
  }

  try {
    await eth.sellAndBurn(necAmount, getState().account.accountType)
    notify('You have sold NEC!', 'success')(dispatch)
    dispatch({ type: SELL_AND_BURN_NEC })
  } catch(err) {
    notifyError(err)(dispatch)
  }
}
