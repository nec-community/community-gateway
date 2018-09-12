import { FETCHED_DELEGATES, MY_DELEGATE } from '../actions/actionTypes';

const INITIAL_STATE = {
  delegates: [],
  canPickDelegates: true,
  myDelegate: '0x0000000000000000000000000000000000000000',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_DELEGATES:
      return {
        ...state,
        delegates: action.delegates,
        canPickDelegates: action.canPickDelegates
      };
    case MY_DELEGATE:
      return {
        ...state,
        myDelegate: action.myDelegate,
      };
    default:
      return state;
  }
};
