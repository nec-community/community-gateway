import { FETCH_TRADERS_BY_TOKEN } from './actionTypes';

const fetchedTraders = payload => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders: payload.ranking,
  token: payload.token,
  dates: payload.dates,
});

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

export const fetchTradersByDate = (startDate, endDate, token) => async (dispatch) => {
  await fetch(
    `https://competition.nectar.community/api/v1/resultsByToken/${token}?startDate=${startDate}&endDate=${endDate}`,
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
