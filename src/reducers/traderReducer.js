import { FETCH_TRADERS_BY_TOKEN } from '../actions/actionTypes';

const INITIAL_STATE = {
  traders: [],
  dates: [],
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRADERS_BY_TOKEN:
      return {
        ...state,
        traders: action.traders,
        dates: action.dates,
        token: action.token,
      };
    default:
      return state;
  }
};
