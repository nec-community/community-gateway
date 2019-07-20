import { FETCH_TRADERS_BY_TOKEN, FETCH_TRADERS_BY_DATE } from './actionTypes';

const fetchedTraders = (traders, token, dates) => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders,
  token,
  dates,
});

const fetchTraderPairsByDate = () => ({
  type: FETCH_TRADERS_BY_DATE,
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
      console.log('Date ', response);
      // dispatch(fetchTraderPairsByDate(response));
    })
    .catch(err => console.log(err));
};
