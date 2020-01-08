import Web3 from 'web3';
import {
  FETCH_TRADERS_BY_TOKEN,
  FETCH_TRADERS_START,
  FETCH_TRADERS_ERROR,
  FETCH_CIRCULATING_NEC_DATA,
  FETCH_BURNED_NEC,
  FETCH_DEVERSIFI_NEC_ETH_DATA,
  FETCH_NEXT_AUCTION_ETH_DATA,
} from './actionTypes';
import abis from '../constants/abis.json';
import config from '../constants/config.json';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.providerUrl));

const startFetching = () => ({
  type: FETCH_TRADERS_START,
});

const fetchingError = () => ({
  type: FETCH_TRADERS_ERROR,
});

const fetchedTraders = payload => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders: payload.ranking,
  token: payload.token,
  dates: payload.dates,
});

const endpoint = 'https://api.deversifi.com/v1/pub/';
const startDate = new Date('2020/01/01');
const startDateTimestamp = Date.UTC(
  startDate.getFullYear(),
  startDate.getMonth(),
  startDate.getDate()
);

function formatDate(date) {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
}

async function getAddressNectarBalance(address) {
  const contract = new web3.eth.Contract(abis.necTokenContract, config.necTokenContract);

  return contract.methods.balanceOf(address).call();
}

async function getNECHolders(traders) {
  return traders.forEach(el =>
    getAddressNectarBalance(el.address).then(res => (el.tokenNEC = res / 10 ** 18))
  );
}

async function getNewTraders(traders) {
  const end = new Date();
  end.setDate(end.getDate() - 7);
  const formattedEnd = formatDate(end);

  return fetch(`${endpoint}USDRanking?startDate=${startDateTimestamp}&endDate=${formattedEnd}`)
    .then(resp => resp.json())
    .then(resp => {
      const allTradersAddresses = resp.map(el => el.address);
      return traders.forEach(el => (el.isNewTrader = !allTradersAddresses.includes(el.address)));
    });
}

async function getPositionChange(traders, token, oldStart, oldEnd) {
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const tokenAPI = token === 'ALL' ? '' : token;

  return fetch(`${endpoint}${api}${tokenAPI}?startDate=${oldStart}&endDate=${oldEnd}`)
    .then(resp => resp.json())
    .then(resp => {
      const tradersAddresses = resp.map(el => el.address);
      return traders.forEach(el => (el.previousPosition = tradersAddresses.indexOf(el.address)));
    });
}

async function get30DaysVolume(traders) {
  const api = '30DaysVolume/';

  traders.map(el => {
    return fetch(endpoint + api + el.address)
      .then(resp => resp.json())
      .then(resp => {
        el.lastMonthAmount = resp.TotalUSDValue;
        el.tokens = resp.tokens;
      });
  });
}

export const fetchTraders = (oldDate, date, token) => async dispatch => {
  dispatch(startFetching());
  const oldStart = formatDate(oldDate);
  const start = formatDate(date);
  const end = formatDate(new Date());
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const tokenAPI = token === 'ALL' ? '' : token;

  try {
    const promiseResponse = await fetch(
      `${endpoint}${api}${tokenAPI}?startDate=${start}&endDate=${end}`
    );
    const response = await promiseResponse.json();

    await Promise.all([
      getNECHolders(response),
      getNewTraders(response),
      getPositionChange(response, token, oldStart, start),
      get30DaysVolume(response),
    ]);

    dispatch(
      fetchedTraders({
        ranking: response,
        token,
        dates: [],
      })
    );
  } catch (err) {
    dispatch(fetchingError({ err }));
    console.log(err);
  }
};

export const fetchTradersByCustomDate = (startDate, endDate, token) => async dispatch => {
  dispatch(startFetching());
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const tokenAPI = token === 'ALL' ? '' : token;

  try {
    const promiseResponse = await fetch(
      `${endpoint}${api}${tokenAPI}?startDate=${start}&endDate=${end}`
    );
    const response = await promiseResponse.json();

    await Promise.all([
      getNECHolders(response),
      get30DaysVolume(response),
      getNewTraders(response),
    ]);

    dispatch(
      fetchedTraders({
        ranking: response,
        token,
        dates: [startDate, endDate],
      })
    );
  } catch (err) {
    dispatch(fetchingError({ err }));
    console.log(err);
  }
};

export async function convertToken(token) {
  const api = 'https://api.deversifi.com/bfx/v2/tickers?symbols=t';

  const response = await fetch(`${api}${token}USD`);
  const result = await response.json();

  return result[0][1];
}

export async function getBurnedNEC() {
  const account = await web3.eth.getAccounts().then(res => res[0]);
  const engineContract = new web3.eth.Contract(abis.engineContract, config.necEngineContract, {
    from: account,
  });

  return engineContract.methods
    .getNextAuction()
    .call()
    .then(res => {
      return res;
    });
}

export const fetchCirculatingNec = data => ({
  type: FETCH_CIRCULATING_NEC_DATA,
  circulatingNecData: [
    {
      name: 'Page A',
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      pv: 3908,
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
      pv: 4300,
      amt: 2100,
    },
  ],
});

export const fetchBurnedNec = data => {
  const burnedNec = getBurnedNEC();
  return {
    type: FETCH_BURNED_NEC,
    burnedNecData: [
      {
        name: 'Page A',
        pv: 1200,
        amt: 1200,
      },
      {
        name: 'Page B',
        pv: 2398,
        amt: 1210,
      },
      {
        name: 'Page C',
        pv: 8800,
        amt: 3290,
      },
      {
        name: 'Page D',
        pv: 2908,
        amt: 3000,
      },
      {
        name: 'Page E',
        pv: 5800,
        amt: 1181,
      },
      {
        name: 'Page F',
        pv: 4800,
        amt: 1500,
      },
      {
        name: 'Page G',
        pv: 5300,
        amt: 3100,
      },
    ],
  };
};

export const fetchDeversifiNecEth = data => ({
  type: FETCH_DEVERSIFI_NEC_ETH_DATA,
  deversifiNecEthData: [
    {
      name: 'Page A',
      pv: 3000,
      amt: 2000,
    },
    {
      name: 'Page B',
      pv: 798,
      amt: 2210,
    },
    {
      name: 'Page C',
      pv: 8900,
      amt: 2290,
    },
    {
      name: 'Page D',
      pv: 1908,
      amt: 2000,
    },
    {
      name: 'Page E',
      pv: 4080,
      amt: 2181,
    },
    {
      name: 'Page F',
      pv: 3008,
      amt: 2500,
    },
    {
      name: 'Page G',
      pv: 9300,
      amt: 2100,
    },
  ],
});

export const fetchNextAuctionEth = data => ({
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
