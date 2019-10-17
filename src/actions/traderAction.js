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

  try {
    const promiseResponse = await fetch(`${endpoint}${api}${token === 'ALL' ? '' : token}`, {
      method: 'get',
      mode: 'cors',
    });
    const response = await promiseResponse.json();
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
  const startDateTimestamp = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  const endDateTimestamp = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const endpoint = 'https://api.deversifi.com/api/v1/';
  const api = token === 'ALL' ? 'USDRanking' : 'tokenRanking/';

  try {
    const promiseResponse = await fetch(
      `${endpoint}${api}${
        token === 'ALL' ? '' : token
      }?startDate=${startDateTimestamp}&endDate=${endDateTimestamp}`,
      {
        method: 'get',
        mode: 'cors',
      }
    );
    const response = await promiseResponse.json();

    const promiseNECTokens = await fetch('https://api.deversifi.com/api/v1/tokenRanking/NEC');
    const NECHolders = await promiseNECTokens.json();
    const NECHoldersAddresses = NECHolders.filter(el => el.amount >= 1000).map(el => el.address);

    response.forEach(el => (el.isNECHolder = NECHoldersAddresses.includes(el.address)));

    // const addresses = response.map(el => el.address);
    //
    // Promise.all(
    //   addresses.map(async address => {
    //     const promiseResp = await fetch(`https://api.deversifi.com/api/v1/30DaysVolume/${address}`);
    //     const pastVolume = promiseResp.json();
    //     console.log(pastVolume);
    //   })
    // );

    // const start = new Date('2019/01/01');
    // const end = new Date();
    // end.setDate(end.getDate() - 7);
    //
    // const formattedStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    // const formattedEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    //
    // const respAllTraders = await fetch(
    //   `${endpoint}${api}?startDate=${formattedStart}&endDate=${formattedEnd}`
    // );
    // const allTraders = await respAllTraders.json();
    // const formattedAllTraders = allTraders.map(el => el.address);
    //
    // response.forEach(el => (el.isNewTrader = !formattedAllTraders.includes(el.address)));
    //
    // console.log(response);

    console.log(response);

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
