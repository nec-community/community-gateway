import { FETCH_TRADERS_BY_TOKEN } from './actionTypes';

const fetchedTraders = payload => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders: payload.ranking,
  token: payload.token,
  dates: payload.dates,
});

const endpoint = 'https://api.deversifi.com/api/v1/';
const startDate = new Date('2019/01/01');
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

async function getNECHolders(traders) {
  return fetch(`${endpoint}tokenRanking/NEC`)
    .then(resp => resp.json())
    .then(resp => {
      const NECHoldersAddresses = resp.filter(el => el.amount >= 1000).map(el => el.address);
      return traders.forEach(el => (el.isNECHolder = NECHoldersAddresses.includes(el.address)));
    });
}

async function getNewTraders(traders) {
  const end = new Date();
  end.setDate(end.getDate() - 7);
  const formattedEnd = formatDate(end);

  return fetch(`${endpoint}USDRanking?startDate=${startDateTimestamp}&endDate=${formattedEnd}`)
    .then(resp => resp.json())
    .then(resp => {
      const allTradersAddresses = resp.map(el => el.address);
      return traders.map(el => {
        return { ...el, isNewTrader: !allTradersAddresses.includes(el.address) };
      });
    });
}

async function getPositionChange(traders, token, endDate) {
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';

  return fetch(
    `${endpoint}${api}${
      token === 'ALL' ? '' : token
    }?startDate=${startDateTimestamp}&endDate=${endDate}`
  )
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

export const fetchTraders = (endDate, token) => async dispatch => {
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const endDateTimestamp = formatDate(endDate);

  try {
    const promiseResponse = await fetch(`${endpoint}${api}${token === 'ALL' ? '' : token}`);
    const response = await promiseResponse.json();

    await Promise.all([
      getNewTraders(response),
      getPositionChange(response, token, endDateTimestamp),
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
    console.log(err);
  }
};

export const fetchTradersByDate = (startDate, endDate, token) => async dispatch => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';

  console.log('1111111111111111111111111', token);

  try {
    const promiseResponse = await fetch(
      `${endpoint}${api}${token === 'ALL' ? '' : token}?startDate=${start}&endDate=${end}`
    );
    const response = await promiseResponse.json();

    await Promise.all([get30DaysVolume(response), getNewTraders(response)]);

    dispatch(
      fetchedTraders({
        ranking: response,
        token,
        dates: [startDate, endDate],
      })
    );
  } catch (err) {
    console.log(err);
  }
};
