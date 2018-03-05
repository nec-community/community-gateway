import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  TOKEN_BALANCE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  account: '',
  accountBalance: '',
  accountError: '',
  tokenBalance: 'loading',
  tokenPayout: 'loading',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.account,
        accountBalance: action.balance,
        accountError: '',
      };
    case GET_ACCOUNT_ERROR:
      return {
        ...state,
        account: '',
        accountBalance: '',
        accountError: action.error,
      };
    case TOKEN_BALANCE:
      return {
        ...state,
        tokenBalance: action.balance,
        tokenPayout: action.payout,
      };
    default:
      return state;
  }
};
