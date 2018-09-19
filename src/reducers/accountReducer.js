import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  TOKEN_BALANCE,
  VOTING_TOKEN_BALANCE,
  VOTES_SPENT_BALANCE,
  UPDATE_ETHFINEX_DATA,
  OPEN_LOGIN,
  CLOSE_LOGIN,
  OPEN_HELP,
  CLOSE_HELP,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  account: '',
  accountType: '',
  accountBalance: '',
  accountError: '',
  isAdmin: false,
  tokenBalance: '0',
  votingTokenBalance: '0',
  tokenPayout: '0',
  ethfinexData: {
    ethPrice: 0,
    necPrice: 0,
    necConversionRate: 0,
    totalFee: '0',
    totalTokens: '0',
    burningEnabled: false,
  },
  loginOpen: false,
  helpOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.account,
        accountType: action.accountType,
        accountBalance: action.balance,
        tokenBalance: action.necBalance,
        votingTokenBalance: action.votingTokenBalance,
        votesSpentBalance: action.votesSpentBalance,
        accountError: '',
        isAdmin: action.isAdmin,
        loginOpen: false,
      };
    case GET_ACCOUNT_ERROR:
      return {
        ...state,
        account: '',
        accountType: '',
        accountBalance: '',
        tokenBalance: '',
        isAdmin: false,
        accountError: action.error,
      };
    case TOKEN_BALANCE:
      return {
        ...state,
        tokenBalance: action.balance,
        tokenPayout: action.payout,
      };
    case VOTING_TOKEN_BALANCE:
      return {
        ...state,
        votingTokenBalance: action.balance,
      };
    case VOTES_SPENT_BALANCE:
      return {
        ...state,
        votesSpentBalance: action.balance,
      };
    case UPDATE_ETHFINEX_DATA:
      return {
        ...state,
        ethfinexData: action.data,
      };
    case OPEN_LOGIN:
      return {
        ...state,
        loginOpen: true,
      };
    case CLOSE_LOGIN:
      return {
        ...state,
        loginOpen: false,
      };
    case OPEN_HELP:
      return {
        ...state,
        helpOpen: true,
      };
    case CLOSE_HELP:
      return {
        ...state,
        helpOpen: false,
      };
    default:
      return state;
  }
};
