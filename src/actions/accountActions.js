import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  TOKEN_BALANCE,
  UPDATE_ETHFINEX_DATA,
} from './actionTypes';
import ethService from '../services/ethereumService';
import keystoreService from '../services/keystoreService';
import config from '../constants/config.json';
import { nameOfNetwork, log } from '../services/utils';
import { notify } from './notificationActions';

export const accountSuccess = (account, type, balance) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  accountType: type,
  balance,
});

export const accountError = error => ({
  type: GET_ACCOUNT_ERROR,
  error,
});

export const loginMetamask = (silent) => async (dispatch, getState) => {
  try {
    const network = await ethService.getNetwork();
    if (config.network !== network) {
      throw new Error(`Wrong network - please set Metamask to ${nameOfNetwork(config.network)}`);
    }
    const account = await ethService.getAccount();
    if (getState().account.account !== account) {
      log(`Metamask account found ${account}`);
      notify(`Metamask account found ${account}`, 'success')(dispatch);
      const balance = await ethService.getBalance(account);
      dispatch(accountSuccess(account, 'metamask', balance));
    }
  } catch (err) {
    if(!silent) {
      dispatch(accountError(err.message));
      notify(err.message, 'error')(dispatch);
    }
  }
};

export const loginLedger = (path) => async (dispatch, getState) => {
  try {
    log(`Path ${path}`);
    const account = await ethService.ledgerLogin(path);
    log(`Ledger account found ${account}`);
    const balance = await ethService.getBalance(account);
    dispatch(accountSuccess(account, 'ledger', balance));
    notify(`Ledger account found ${account}`, 'success')(dispatch);
  } catch (err) {
    if (err === 'Invalid status 6801')
      err += ' - Ledger possibly locked';
    dispatch(accountError(err));
    notify(err, 'error')(dispatch);
  }
};

export const loginKeystore = (keystoreJson, password) => async (dispatch, getState) => {
  try {
    const keystore = keystoreService.unlockKeystore(keystoreJson, password);
    log(keystore);
    const account  = keystore.address;
    log(`Keystore account found ${account}`);
    const balance = await ethService.getBalance(account);
    dispatch(accountSuccess(account, 'keystore', balance));
    notify(`Keystore account found ${account}`, 'success')(dispatch);
  } catch (err) {
    dispatch(accountError(err.message));
    notify(err.message, 'error')(dispatch);
  }
};

// export const getAccount = () => async (dispatch) => {
//   try {
//     const account = await ethService.getAccount();
//     const balance = await ethService.getBalance(account);
//     dispatch(accountSuccess(account, balance));
//   } catch (err) {
//     dispatch(accountError(err.message));
//   }
// };

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

const updateEthfinexData = (data) => ({
  type: UPDATE_ETHFINEX_DATA,
  data,
});

export const fetchEthfinexData = () => async (dispatch) => {
  const data = await ethService.fetchData();
  log(data);
  dispatch(updateEthfinexData(data));
  setTimeout(() => fetchEthfinexData()(dispatch), 5 * 60 * 1000);
};
