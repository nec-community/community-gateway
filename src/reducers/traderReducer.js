import {
  FETCH_TRADERS_BY_TOKEN,
  FETCH_TRADERS_START,
  FETCH_TRADERS_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  traders: [],
  dates: [],
  token: '',
  volume: [],
  isFetching: false,
  error: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRADERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_TRADERS_BY_TOKEN:
      return {
        ...state,
        traders: action.traders,
        dates: action.dates,
        token: action.token,
        volume: [],
        isFetching: false,
      };
    case FETCH_TRADERS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.err,
      };
    default:
      return state;
  }
};
