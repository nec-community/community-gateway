import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  TOKEN_BALANCE,
} from './actionTypes';
import ethService from '../services/ethereumService';
import config from '../constants/config.json';
import { nameOfNetwork, log } from '../services/utils';
import { notify } from './notificationActions';

export const accountSuccess = (account, balance) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  balance,
});

export const accountError = error => ({
  type: GET_ACCOUNT_ERROR,
  error,
});

export const checkAccount = () => async (dispatch, getState) => {
  try {
    const network = await ethService.getNetwork();
    if (config.network !== network) {
      throw new Error(`Wrong network - please set Metamask to ${nameOfNetwork(config.network)}`);
    }

    const account = await ethService.getAccount();
    if (getState().account.account !== account) {
      if (getState().account.account === '') {
        log('Unlocked or initially loaded account');
        const balance = await ethService.getBalance(account);
        dispatch(accountSuccess(account, balance));
      } else {
        log('Changed account');
        // window.location.reload();
      }
    }
  } catch (err) {
    if (getState().account.accountError !== err.message) {
      dispatch(accountError(err.message));
      // notify('No account found - voting disabled', 'error')(dispatch);
    }
  }

  setTimeout(() => checkAccount()(dispatch, getState), 1000);
};

export const getAccount = () => async (dispatch) => {
  try {
    const account = await ethService.getAccount();
    const balance = await ethService.getBalance(account);
    dispatch(accountSuccess(account, balance));
  } catch (err) {
    dispatch(accountError(err.message));
  }
};

const tokenBalance = (balance, payout) => ({
  type: TOKEN_BALANCE,
  balance,
  payout,
});

export const getTokenBalance = () => async (dispatch) => {
  const balance = await ethService.getTokenBalance();
  const payout = await ethService.estimatePayout(balance);
  log(`Payout for balance ${balance} is ${payout}`);
  dispatch(tokenBalance(ethService.weiToEth(balance), ethService.weiToEth(payout)));
};
