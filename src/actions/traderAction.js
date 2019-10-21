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
  const formattedEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return fetch(`${endpoint}USDRanking?startDate=${startDateTimestamp}&endDate=${formattedEnd}`)
    .then(resp => resp.json())
    .then(resp => {
      const allTradersAddresses = resp.map(el => el.address);
      return traders.forEach(el => (el.isNewTrader = !allTradersAddresses.includes(el.address)));
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

export const fetchTraders = (endDate, token) => async dispatch => {
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  const endDateTimestamp = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  try {
    const promiseResponse = await fetch(`${endpoint}${api}${token === 'ALL' ? '' : token}`);
    const response = await promiseResponse.json();

    await Promise.all([
      getNECHolders(response),
      getNewTraders(response),
      getPositionChange(response, token, endDateTimestamp),
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

export const fetchTradersByDate = (endDate, token) => async dispatch => {
  const endDateTimestamp = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';

  try {
    const promiseResponse = await fetch(
      `${endpoint}${api}${
        token === 'ALL' ? '' : token
      }?startDate=${startDateTimestamp}&endDate=${endDateTimestamp}`
    );
    const response = await promiseResponse.json();

    await Promise.all([
      getNECHolders(response),
      getNewTraders(response),
      getPositionChange(response, token, endDateTimestamp),
    ]);

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
