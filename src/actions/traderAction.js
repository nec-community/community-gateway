import { FETCH_TRADERS_BY_TOKEN } from './actionTypes';

const fetchedTraders = (traders, token, dates) => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders,
  token,
  dates,
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

export const fetchTradersAsPairs = date => async (dispatch) => {
  await fetch(
    `https://competition.nectar.community/api/v1/${date}`,
    {
      method: 'get',
      mode: 'cors',
    },
  )
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      // dispatch(fetchedTraders(response));
    })
    .catch(err => console.log(err));
};
