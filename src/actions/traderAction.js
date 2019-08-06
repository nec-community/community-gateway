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

export const fetchTradersByDate = (
  startDate,
  endDate,
  token,
) => async (dispatch) => {
  const startDateTimestamp = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );

  const endDateTimestamp = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );
  await fetch(
    `https://competition.nectar.community/api/v1/resultsByToken/
	${token}?startDate=${startDateTimestamp}&endDate=${endDateTimestamp}`,
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
