import { FETCH_TRADERS_BY_TOKEN, FETCH_TRADERS_START, FETCH_TRADERS_ERROR } from './actionTypes';

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

async function getPositionChange(traders, token, endDate) {
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const tokenAPI = token === 'ALL' ? '' : token;

  return fetch(`${endpoint}${api}${tokenAPI}?startDate=${startDateTimestamp}&endDate=${endDate}`)
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
  dispatch(startFetching());
  const endDateTimestamp = formatDate(endDate);
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const tokenAPI = token === 'ALL' ? '' : token;

  try {
    const promiseResponse = await fetch(`${endpoint}${api}${tokenAPI}`);
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
    dispatch(fetchingError({ err }));
    console.log(err);
  }
};

export const fetchTradersByDate = (startDate, endDate, token) => async dispatch => {
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

    await Promise.all([get30DaysVolume(response), getNewTraders(response)]);

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
