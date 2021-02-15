import { FETCHED_DELEGATES, MY_DELEGATE } from '../actions/actionTypes';

const INITIAL_STATE = {
  delegates: [],
  myDelegate: '0x0000000000000000000000000000000000000000',
  userHasVoted: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_DELEGATES:
      return {
        ...state,
        delegates: action.delegates,
      };
    case MY_DELEGATE:
      return {
        ...state,
        myDelegate: action.myDelegate,
        userHasVoted: action.userHasVoted,
      };
    default:
      return state;
  }
};
