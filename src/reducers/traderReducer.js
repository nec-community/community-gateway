import { FETCH_TRADERS } from '../actions/actionTypes';

const INITIAL_STATE = {
  traders: [],
  dates: [],
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRADERS:
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
