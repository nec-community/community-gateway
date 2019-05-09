import { FETCHED_TOKENS, FETCHED_POOL_TOKENS } from '../actions/actionTypes';

const INITIAL_STATE = {
  tokens: [],
  endingTime: new Date(),
  isActive: false,
  pool: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_TOKENS:
      return {
        ...state,
        tokens: action.tokens,
        endingTime: action.endingTime,
        isActive: action.isActive,
        evtAddress: action.evtAddress,
      };
    case FETCHED_POOL_TOKENS:
      return {
        ...state,
        pool: action.poolTokens,
      };
    default:
      return state;
  }
};
