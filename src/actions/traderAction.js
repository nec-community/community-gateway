import { FETCH_TRADERS_BY_TOKEN } from './actionTypes';

const fetchedTraders = payload => ({
  type: FETCH_TRADERS_BY_TOKEN,
  traders: payload.ranking,
  token: payload.token,
  dates: payload.dates,
});

export const fetchTraders = token => async dispatch => {
  const endpoint = 'https://api.deversifi.com/api/v1/';
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  await fetch(`${endpoint}${api}${token === 'ALL' ? '' : token}`, {
    method: 'get',
    mode: 'cors',
  })
    .then(response => response.json())
    .then(response => {
      dispatch(
        fetchedTraders({
          ranking: response,
          token,
          dates: [],
        })
      );
    })
    .catch(err => console.log(err));
};

export const fetchTradersByDate = (startDate, endDate, token) => async dispatch => {
  const startDateTimestamp = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  const endDateTimestamp = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const endpoint = 'https://api.deversifi.com/api/v1/';
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';
  await fetch(
    `${endpoint}${api}${
      token === 'ALL' ? '' : token
    }?startDate=${startDateTimestamp}&endDate=${endDateTimestamp}`,
    {
      method: 'get',
      mode: 'cors',
    }
  )
    .then(response => response.json())
    .then(response => {
      dispatch(
        fetchedTraders({
          ranking: response,
          token,
          dates: [startDate, endDate],
        })
      );
    })
    .catch(err => console.log(err));
};
