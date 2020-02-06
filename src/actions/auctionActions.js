import {
  FETCH_CIRCULATING_NEC_DATA,
  FETCH_BURNED_NEC,
  FETCH_DEVERSIFI_NEC_ETH_DATA,
  FETCH_NEXT_AUCTION_ETH_DATA,
  FETCH_CURRENT_AUCTION_SUMMARY,
  FETCH_AUCTION_INTERVAL_DATA,
  SELL_IN_AUCTION_START,
  FETCH_AUCTION_TRANSACTIONS,
  FETCH_ETH_PRICE,
  SELL_AND_BURN_NEC
} from './actionTypes';
import Web3 from 'web3';
import config from '../constants/config.json';
import eth from '../services/ethereumService';
import { formatEth } from '../services/utils';
import { notify, notifyError } from './notificationActions';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.providerUrl));

export async function getBurnedNEC() {
  // const account = await eth.getAccount();
  const engineContract = eth.getEngineContract();
  const blockRange = await eth.getChartBlockRange();
  const burnedNec = [];
  let pastEvents = await engineContract.getPastEvents('AuctionClose', blockRange);

  console.log('pastEvents getBurnedNEC ', pastEvents);
  // Dummy data below, needs to be removed
  pastEvents = [
    {
      address: '0x8AaEEa652EBD90fB8D64A6cac09a0293CE62dD45',
      blockHash: '0xdb165110dd56c1b1107854de915c239506a7ce3fc88a03c1dcae56379c7c80c7',
      blockNumber: 15939734,
      logIndex: 1,
      removed: false,
      transactionHash: '0xac0c5460f5f9f9510ede073c2c62f47509f650d99efdac8733abdcb6550d6b93',
      transactionIndex: 0,
      transactionLogIndex: '0x1',
      type: 'mined',
      id: 'log_9aa9fa3f',
      returnValues: {
        '0': '15',
        '1': '1000000000000000000',
        '2': '1000000000000000000',
        auctionCounter: '15',
        totalEtherConsumed: '1000000000000000000',
        necBurned: '1000000000000000000',
      },
      event: 'AuctionClose',
      signature: '0xa6cc937511bcbe4aa9f9693416797c7d255412e27bda9ef791a45903f7e97d4e',
      raw: {
        data: 'x0000',
        topics: [Array],
      },
    },
    {
      address: '0x8AaEEa652EBD90fB8D64A6cac09a0293CE62dD45',
      blockHash: '0xdb165110dd56c1b1107854de915c239506a7ce3fc88a03c1dcae56379c7c80c7',
      blockNumber: 15939734,
      logIndex: 1,
      removed: false,
      transactionHash: '0xac0c5460f5f9f9510ede073c2c62f47509f650d99efdac8733abdcb6550d6b93',
      transactionIndex: 0,
      transactionLogIndex: '0x1',
      type: 'mined',
      id: 'log_9aa9fa3f',
      returnValues: {
        '0': '16',
        '1': '1000000000000000000',
        '2': '2000000000000000000',
        auctionCounter: '16',
        totalEtherConsumed: '1000000000000000000',
        necBurned: '2000000000000000000',
      },
      event: 'AuctionClose',
      signature: '0xa6cc937511bcbe4aa9f9693416797c7d255412e27bda9ef791a45903f7e97d4e',
      raw: {
        data: 'x0000',
        topics: [Array],
      },
    },
    {
      address: '0x8AaEEa652EBD90fB8D64A6cac09a0293CE62dD45',
      blockHash: '0xdb165110dd56c1b1107854de915c239506a7ce3fc88a03c1dcae56379c7c80c7',
      blockNumber: 15939734,
      logIndex: 1,
      removed: false,
      transactionHash: '0xac0c5460f5f9f9510ede073c2c62f47509f650d99efdac8733abdcb6550d6b93',
      transactionIndex: 0,
      transactionLogIndex: '0x1',
      type: 'mined',
      id: 'log_9aa9fa3f',
      returnValues: {
        '0': '17',
        '1': '500000000000000000',
        '2': '2500000000000000000',
        auctionCounter: '17',
        totalEtherConsumed: '500000000000000000',
        necBurned: '2500000000000000000',
      },
      event: 'AuctionClose',
      signature: '0xa6cc937511bcbe4aa9f9693416797c7d255412e27bda9ef791a45903f7e97d4e',
      raw: {
        data: 'x0000',
        topics: [Array],
      },
    },
    {
      address: '0x8AaEEa652EBD90fB8D64A6cac09a0293CE62dD45',
      blockHash: '0xdb165110dd56c1b1107854de915c239506a7ce3fc88a03c1dcae56379c7c80c7',
      blockNumber: 15939734,
      logIndex: 1,
      removed: false,
      transactionHash: '0xac0c5460f5f9f9510ede073c2c62f47509f650d99efdac8733abdcb6550d6b93',
      transactionIndex: 0,
      transactionLogIndex: '0x1',
      type: 'mined',
      id: 'log_9aa9fa3f',
      returnValues: {
        '0': '17',
        '1': '1000000000000000000',
        '2': '2000000000000000000',
        auctionCounter: '17',
        totalEtherConsumed: '1000000000000000000',
        necBurned: '2000000000000000000',
      },
      event: 'AuctionClose',
      signature: '0xa6cc937511bcbe4aa9f9693416797c7d255412e27bda9ef791a45903f7e97d4e',
      raw: {
        data: 'x0000',
        topics: [Array],
      },
    },
    {
      address: '0x8AaEEa652EBD90fB8D64A6cac09a0293CE62dD45',
      blockHash: '0xdb165110dd56c1b1107854de915c239506a7ce3fc88a03c1dcae56379c7c80c7',
      blockNumber: 15939734,
      logIndex: 1,
      removed: false,
      transactionHash: '0xac0c5460f5f9f9510ede073c2c62f47509f650d99efdac8733abdcb6550d6b93',
      transactionIndex: 0,
      transactionLogIndex: '0x1',
      type: 'mined',
      id: 'log_9aa9fa3f',
      returnValues: {
        '0': '18',
        '1': '1000000000000000000',
        '2': '1000000000000000000',
        auctionCounter: '168',
        totalEtherConsumed: '1000000000000000000',
        necBurned: '1000000000000000000',
      },
      event: 'AuctionClose',
      signature: '0xa6cc937511bcbe4aa9f9693416797c7d255412e27bda9ef791a45903f7e97d4e',
      raw: {
        data: 'x0000',
        topics: [Array],
      },
    },
  ];
  let burnedSum = 0
  pastEvents.map((event, index) => {
    burnedSum = burnedSum + event.returnValues.necBurned / 10 ** 18
    burnedNec.push({
      name: `Point ${index}`,
      pv: burnedSum,
      amt: event.event,
    });
  });
  return burnedNec;
}

export async function getCirculatingNEC() {
  const tokenContract = eth.getTokenContract();
  const blockRange = await eth.getChartBlockRange();
  const blockDiff = Math.floor((blockRange.toBlock - blockRange.fromBlock) / 7);
  const circulatingNec = [];
  //This should be totalSupplyAt()
  for (let block = blockRange.fromBlock; block <= blockRange.toBlock; block += blockDiff) {
    tokenContract.methods.totalSupply().call(null, block, (error, totalSupply) => {
      circulatingNec.push({
        name: `Point ${block}`,
        pv: Math.floor(totalSupply / 10 ** 18),
      });
    });
  }
  console.log('Circulating NEC Data ', circulatingNec);
  return circulatingNec;
}

export async function getDeversifiNecEth() {
  // const account = await eth.getAccount();
  const engineContract = eth.getEngineContract();
  const blockRange = await eth.getChartBlockRange();
  const deversifiNecEth = [];
  let pastEvents = await engineContract.getPastEvents('Burn', blockRange);
  console.log('pastEvents getDeversifiNecEth ', pastEvents);
  // Dummy data below, needs to be removed
  // pastEvents = [
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '129875000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '121875000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '121575000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '121815000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '121895000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '111875000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '121375000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  //   {
  //     returnValues: {
  //       '0': '1234556789',
  //       '1': '121875000000000000000',
  //       '2': '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //       amount: '1234556789',
  //       price: '121855000000000000000',
  //       burner: '0x14d06788090769F669427B6AEA1c0240d2321f34',
  //     },
  //     event: 'Burn',
  //   },
  // ];
  pastEvents.map((event, index) => {
    deversifiNecEth.push({
      name: `Point ${index}`,
      pv: Math.floor(event.returnValues.price / 10 ** 18),
    });
  });
  return deversifiNecEth;
}

const fetchedBurnedNec = burnedNecData => ({
  type: FETCH_BURNED_NEC,
  burnedNecData,
});

export const fetchBurnedNec = () => async dispatch => {
  const burnedNecData = await Promise.all(await getBurnedNEC());
  dispatch(fetchedBurnedNec(burnedNecData));
};

const fetchedCirculatingNec = circulatingNecData => ({
  type: FETCH_CIRCULATING_NEC_DATA,
  circulatingNecData,
});

export const fetchCirculatingNec = () => async dispatch => {
  const circulatingNecData = await getCirculatingNEC();
  dispatch(fetchedCirculatingNec(circulatingNecData));
};

const fetchedDeversifiNecEth = deversifiNecEthData => ({
  type: FETCH_DEVERSIFI_NEC_ETH_DATA,
  deversifiNecEthData,
});

export const fetchDeversifiNecEth = () => async dispatch => {
  const deversifiNecEthData = await getDeversifiNecEth();
  dispatch(fetchedDeversifiNecEth(deversifiNecEthData));
};

const fetchedNextAuctionEth = data => ({
  type: FETCH_NEXT_AUCTION_ETH_DATA,
  nextAuctionEthData: [
    {
      name: 'Page A',
      pv: 5400,
      amt: 2400,
    },
    {
      name: 'Page B',
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      pv: 6800,
      amt: 2290,
    },
    {
      name: 'Page D',
      pv: 9908,
      amt: 2000,
    },
    {
      name: 'Page E',
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      pv: 300,
      amt: 2100,
    },
  ],
});

export const fetchNextAuctionEth = data => async (dispatch, getState) => {
  const engineContract = eth.getEngineContract();
  const next = await engineContract.methods.getNextAuction().call();

  dispatch(fetchedNextAuctionEth());
};

const fetchedCurrentActionSummary = data => async dispatch => {
  const engineContract = eth.getEngineContract();

  try {
    const current = await engineContract.methods.getCurrentAuction().call();
    const blockRange = await eth.getChartBlockRange();
    const lastThaw = await engineContract.methods.lastThaw().call()
    let pastEvents = await engineContract.getPastEvents('AuctionClose', blockRange);
    const necPrice = await eth.getNecPrice();

    // let pastEvents = await engineContract.getPastEvents('allEvents');
    console.log('currentAuctionSummary', current)

    dispatch({
      type: FETCH_CURRENT_AUCTION_SUMMARY,
      nextPriceChange: current.nextPriceChangeSeconds,
      currentAuctionSummary: [
        {
          title: 'Sold',
          token_price: formatEth(current.initialEthAvailable) - formatEth(current.remainingEthAvailable),
          dollar_price: ((current.initialEthAvailable - current.remainingEthAvailable) * necPrice).toFixed(2),
        },
        {
          title: 'Purchased',
          token_price: 24,
          dollar_price: 0.006,
        },
        {
          title: 'Remaining',
          token_price: formatEth(current.remainingEthAvailable),
          dollar_price: (current.remainingEthAvailable * necPrice).toFixed(2),
        },
        {
          title: 'Sold NEC Average Price',
          token_price: 0.00035,
          dollar_price: 0.055,
        },
      ],
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


const fetchedAuctionIntervalData = data => ({
  type: FETCH_AUCTION_INTERVAL_DATA,
  auctionIntervalData: [
    {
      name: 'Page A',
      uv: 2,
    },
    {
      name: 'Page B',
      uv: 4,
    },
    {
      name: 'Page C',
      uv: 6,
    },
    {
      name: 'Page D',
      uv: 7,
    },
    {
      name: 'Page E',
      uv: 8,
    },
    {
      name: 'Page F',
      uv: 9,
    },
    {
      name: 'Page G',
      uv: 11,
    },
  ],
});

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
  const blockRange = await eth.getChartBlockRange();
  const transactions = await engineContract.getPastEvents('Burn', blockRange);

  const transactionsList = transactions.map(transaction => ({
    blockNumber: transaction.blockNumber,
    wallet_address: transaction.returnValues.burner,
    nec: transaction.returnValues.amount,
    eth: formatEth(transaction.returnValues.price),
    price_nec_eth: (transaction.returnValues.amount/formatEth(transaction.returnValues.price)).toFixed(3),
    price_nec_usd: necPrice,
    usd: (transaction.returnValues.amount * necPrice).toFixed(2),
  }));

  dispatch({ type: FETCH_AUCTION_TRANSACTIONS, auctionTransactions: transactionsList });
};

export const fetchEthPrice = () => async dispatch => {
  const necPrice = await eth.getNecPrice();

  dispatch({ type: FETCH_ETH_PRICE, necPrice })
}

export const sellAndBurn = (necAmount, userAccount) => async dispatch => {
  const engineContract = await eth.getEngineContract();
  try {
    const response = await engineContract.methods.sellAndBurnNec(necAmount)
    debugger
    dispatch({ type: SELL_AND_BURN_NEC })
  } catch(err) {
    console.log(err)
    notifyError(err)(dispatch);
  }
}
