import { FETCHED_TOKENS } from '../actions/actionTypes';

const INITIAL_STATE = {
  tokens: [],
  endingTime: new Date(),
  isActive: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_TOKENS:
      return {
        ...state,
        tokens: action.tokens,
        endingTime: action.endingTime,
        isActive: action.isActive,
      };
    default:
      return state;
  }
};
