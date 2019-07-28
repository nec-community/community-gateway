import { FETCH_TRADERS_BY_TOKEN, FETCH_TRADERS_BY_DATE } from '../actions/actionTypes';

const INITIAL_STATE = {
  traders: [],
  dates: [],
  token: '',
  volume: [],
  isTrader: true,
  isPairs: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRADERS_BY_TOKEN:
      return {
        ...state,
        traders: action.traders,
        dates: action.dates,
        token: action.token,
        volume: [],
        isTrader: true,
        isPairs: false,
      };
    case FETCH_TRADERS_BY_DATE:
      return {
        ...state,
        volume: action.traders,
        isTrader: false,
        isPairs: true,
      };
    default:
      return state;
  }
};
