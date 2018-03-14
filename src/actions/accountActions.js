import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  TOKEN_BALANCE,
  UPDATE_ETHFINEX_DATA,
  OPEN_LOGIN,
  CLOSE_LOGIN,
} from './actionTypes';
import ethService from '../services/ethereumService';
import keystoreService from '../services/keystoreService';
import config from '../constants/config.json';
import { nameOfNetwork, log, toDecimal } from '../services/utils';
import { notify, notifyError } from './notificationActions';

export const accountSuccess = (account, type, balance, necBalance, isAdmin) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  accountType: type,
  balance,
  necBalance,
  isAdmin,
});

export const accountError = error => ({
  type: GET_ACCOUNT_ERROR,
  error,
});

export const loginMetamask = silent => async (dispatch, getState) => {
  try {
    ethService.setWeb3toMetamask();
    const network = await ethService.getNetwork();
    if (config.network !== network) {
      throw new Error(`Wrong network - please set Metamask to ${nameOfNetwork(config.network)}`);
    }
    const account = await ethService.getAccount();
    if (getState().account.account !== account) {
      log(`Metamask account found ${account}`);
      notify(`Metamask account found ${account}`, 'success')(dispatch);
      const balance = await ethService.getBalance(account);
      const necBalance = await ethService.getTokenBalance(account);
      const isAdmin = await ethService.isAdmin(account);
      dispatch(accountSuccess(account, 'metamask', balance, necBalance, isAdmin));
    }
  } catch (err) {
    ethService.setupWeb3();
    if (!silent) {
      dispatch(accountError(err.message));
      notify(err.message, 'error')(dispatch);
    }
  }
};

export const loginLedger = path => async (dispatch) => {
  try {
    log(`Path ${path}`);
    const account = await ethService.ledgerLogin(path);
    log(`Ledger account found ${account}`);
    const balance = await ethService.getBalance(account);
    const necBalance = await ethService.getTokenBalance(account);
    const isAdmin = await ethService.isAdmin(account);
    dispatch(accountSuccess(account, 'ledger', balance, necBalance, isAdmin));
    notify(`Ledger account found ${account}`, 'success')(dispatch);
  } catch (err) {
    if (err.message) {
      dispatch(accountError(err.message));
      return notify(err.message, 'error')(dispatch);
    }
    if (err === 'Invalid status 6801') err += ' - Ledger possibly locked';
    dispatch(accountError(err));
    notify(err, 'error')(dispatch);
  }
};

export const loginKeystore = (keystoreJson, password) => async (dispatch) => {
  try {
    const keystore = keystoreService.unlockKeystore(keystoreJson, password);
    log(keystore);
    const account = keystore.address;
    log(`Keystore account found ${account}`);
    const balance = await ethService.getBalance(account);
    const necBalance = await ethService.getTokenBalance(account);
    const isAdmin = await ethService.isAdmin(account);
    dispatch(accountSuccess(account, 'keystore', balance, necBalance, isAdmin));
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

export const getTokenBalance = () => async (dispatch, getState) => {
  const balance = await ethService.getTokenBalance(getState().account.account);
  const payout = await ethService.estimatePayout(balance);
  log(`Payout for balance ${balance} is ${payout}`);
  dispatch(tokenBalance(
    toDecimal(ethService.weiToEth(balance)),
    toDecimal(ethService.weiToEth(payout)),
  ));
};

const updateEthfinexData = data => ({
  type: UPDATE_ETHFINEX_DATA,
  data,
});

export const fetchEthfinexData = () => async (dispatch) => {
  const data = await ethService.fetchData();
  log(data);
  dispatch(updateEthfinexData(data));
  setTimeout(() => fetchEthfinexData()(dispatch), 5 * 60 * 1000);
};

export const openLogin = () => ({
  type: OPEN_LOGIN,
});

export const closeLogin = () => ({
  type: CLOSE_LOGIN,
});

export const burnNec = amount => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    await ethService.burnNec(amount, getState().account.accountType);
    notify('NEC reward claimed!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
