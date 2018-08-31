import { FETCHED_DELEGATES } from '../actions/actionTypes';

const INITIAL_STATE = {
  delegates: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_DELEGATES:
      return {
        ...state,
        delegates: action.delegates,
      };
    default:
      return state;
  }
};
