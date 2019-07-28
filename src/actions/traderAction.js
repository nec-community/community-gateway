import { FETCH_TRADERS_BY_TOKEN, FETCH_TRADERS_BY_DATE } from './actionTypes';

const fetchedTraders = payload => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders: payload.ranking,
  token: payload.token,
  dates: payload.dates,
});

const fetchTraderPairsByDate = payload => ({
  type: FETCH_TRADERS_BY_DATE,
  traders: payload,
});

const formatDate = (date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 101).toString().substring(1);
  const day = (date.getDate() + 100).toString().substring(1);
  return `${year}/${month}/${day}`;
};

export const fetchTraders = token => async (dispatch) => {
  await fetch(
    `https://competition.nectar.community/api/v1/resultsByToken/${token}`,
    {
      method: 'get',
      mode: 'cors',
    },
  )
    .then(response => response.json())
    .then((response) => {
      dispatch(fetchedTraders(response));
    })
    .catch(err => console.log(err));
};

export const fetchTradersByDate = date => async (dispatch) => {
  await fetch(
    `https://competition.nectar.community/api/v1/date/${formatDate(date)}`,
    {
      method: 'get',
      mode: 'cors',
    },
  )
    .then(response => response.json())
    .then((response) => {
      const array = Object.keys(response.volume).map(address => ({
        address,
        value: response.volume[address],
        totalUsd: response.volume[address].totalUsd,
      }));
      dispatch(fetchTraderPairsByDate(array));
    })
    .catch(err => console.log(err));
};
