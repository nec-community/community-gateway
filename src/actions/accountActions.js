import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  TOKEN_BALANCE,
  VOTING_TOKEN_BALANCE,
  UPDATE_ETHFINEX_DATA,
  OPEN_LOGIN,
  CLOSE_LOGIN,
  OPEN_HELP,
  CLOSE_HELP,
} from './actionTypes';
import ethService from '../services/ethereumService';
import keystoreService from '../services/keystoreService';
import config from '../constants/config.json';
import { nameOfNetwork, log, toDecimal } from '../services/utils';
import { notify, notifyError } from './notificationActions';

export const accountSuccess = (
  account,
  type,
  balance,
  necBalance,
  votingTokenBalance,
  isAdmin
) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  accountType: type,
  balance,
  necBalance,
  votingTokenBalance,
  isAdmin,
});

export const accountError = error => ({
  type: GET_ACCOUNT_ERROR,
  error,
});

export const loginMetamask = silent => async (dispatch, getState) => {
  try {
    const isMetamaskApproved = await ethService.isMetamaskApproved();

    if (silent && !isMetamaskApproved) throw new Error('Provider not preapproved');

    await ethService.metamaskApprove();

    ethService.setWeb3toMetamask();

    const network = await ethService.getNetwork();
    if (config.network !== network)
      throw new Error(`Wrong network - please set Metamask to ${nameOfNetwork(config.network)}`);

    const account = await ethService.getAccount();

    if (getState().account.account !== account) {
      log(`Metamask account found ${account}`);
      const balance = toDecimal(await ethService.getBalance(account));
      const necBalance = toDecimal(ethService.weiToEth(await ethService.getTokenBalance(account)));
      console.log('necBalance', necBalance)
      /*
      const votingBalance = toDecimal(
        ethService.weiToEth(await ethService.getVotingTokenBalance(account))
      );
      */
      const votingBalance = 0
      // const isAdmin = await ethService.isAdmin(account);
      const isAdmin = false
      dispatch(accountSuccess(account, 'metamask', balance, necBalance, votingBalance, isAdmin));
      notify(`Metamask account found ${account}`, 'success')(dispatch);
    }
  } catch (err) {
    const errorMessage = err.message || err;
    ethService.setupWeb3();
    console.error(err);
    if (!silent) {
      dispatch(accountError(errorMessage));
      notify(errorMessage, 'error')(dispatch);
    }
  }
};

export const ledgerListAddresses = (path, page) => async dispatch => {
  try {
    const addressesPerPage = 5;
    const accounts = await ethService.ledgerListAccounts(
      path,
      page * addressesPerPage,
      addressesPerPage
    );
    return Promise.all(
      accounts.map(async acc => {
        acc.balance = toDecimal(await ethService.getBalance(acc.address));
        acc.NECbalance = toDecimal(
          ethService.weiToEth(await ethService.getTokenBalance(acc.address))
        );
        return acc;
      })
    );
  } catch (err) {
    if (err.message) {
      dispatch(accountError(err.message));
      notify(err.message, 'error')(dispatch);
      return [];
    }
    if (err === 'Invalid status 6801') err += ' - Ledger possibly locked';
    dispatch(accountError(err));
    notify(err, 'error')(dispatch);
    return [];
  }
};

export const loginLedger = path => async dispatch => {
  try {
    log(`Path ${path}`);
    const account = await ethService.ledgerLogin(path);
    log(`Ledger account found ${account}`);
    const balance = toDecimal(await ethService.getBalance(account));
    const necBalance = toDecimal(ethService.weiToEth(await ethService.getTokenBalance(account)));
    /*
    const votingBalance = toDecimal(
      ethService.weiToEth(await ethService.getVotingTokenBalance(account))
    );
    */
    const votingBalance = 0
    const isAdmin = false
    // const isAdmin = await ethService.isAdmin(account);
    dispatch(accountSuccess(account, 'ledger', balance, necBalance, votingBalance, isAdmin));
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

export const loginKeystore = (keystoreJson, password) => async dispatch => {
  try {
    const keystore = keystoreService.unlockKeystore(keystoreJson, password);
    log(keystore);
    const account = keystore.address;
    log(`Keystore account found ${account}`);
    const balance = toDecimal(await ethService.getBalance(account));
    const necBalance = toDecimal(ethService.weiToEth(await ethService.getTokenBalance(account)));

    /*
    const votingBalance = toDecimal(
      ethService.weiToEth(await ethService.getVotingTokenBalance(account))
    );
    */
    const votingBalance = 0
    const isAdmin = false
    // const isAdmin = await ethService.isAdmin(account);
    dispatch(accountSuccess(account, 'keystore', balance, necBalance, votingBalance, isAdmin));
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
  // const payout = await ethService.estimatePayout(balance);
  const payout = 0
  log(`Payout for balance ${balance} is ${payout}`);
  dispatch(
    tokenBalance(toDecimal(ethService.weiToEth(balance)), toDecimal(ethService.weiToEth(payout)))
  );
};

const votingTokenBalance = balance => ({
  type: VOTING_TOKEN_BALANCE,
  balance,
});

export const getVotingTokenBalance = () => async (dispatch, getState) => {
  const balance = await ethService.getVotingTokenBalance(getState().account.account);
  dispatch(votingTokenBalance(ethService.weiToEth(balance)));
};

const updateEthfinexData = data => ({
  type: UPDATE_ETHFINEX_DATA,
  data,
});

export const fetchEthfinexData = () => async dispatch => {
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

export const openHelp = () => ({
  type: OPEN_HELP,
});

export const closeHelp = () => ({
  type: CLOSE_HELP,
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
