import { FETCHED_TOKENS } from '../actions/actionTypes';

const INITIAL_STATE = {
  tokens: [],
  endingTime: new Date(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_TOKENS:
      return {
        ...state,
        tokens: action.tokens,
        endingTime: action.endingTime,
      };
    default:
      return state;
  }
};
