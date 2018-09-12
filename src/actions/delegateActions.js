import { FETCHED_DELEGATES, MY_DELEGATE } from './actionTypes';
import eth from '../services/ethereumService';
import grenache from '../services/grenacheService';
import { notify, notifyError } from './notificationActions';
import { openLogin } from './accountActions';
import { log } from '../services/utils';

const fetchedDelegates = (delegates, canPickDelegates) => ({
  type: FETCHED_DELEGATES,
  delegates,
  canPickDelegates,
});

export const getDelegates = () => async (dispatch) => {
  const isTokenProposalActive = false; //await eth.isTokenProposalActive(); // TODO uncomment when contract is updated
  const delegates = await eth.getDelegates();
  const promises = delegates.map(delegate => grenache.get(delegate.storageHash.substr(2, 40)));

  Promise.all(promises)
    .then((descriptions) => {
      const parsedDelegates = delegates.map((delegate, i) => ({ ...delegate, description: descriptions[i] }));
      log(delegates);
      dispatch(fetchedDelegates(parsedDelegates, !isTokenProposalActive));
    })
    .catch((error) => {
      log(error);
    });
};

export const becomeDelegate = description => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    const descriptionHash = await grenache.put(description);
    await eth.becomeDelegate(descriptionHash, getState().account.accountType);
    notify('Your request to become a delegate has been submitted', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

export const delegateVote = to => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    await eth.delegateVote(to, getState().account.accountType);
    notify('Your votes have been delegated', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

export const undelegate = () => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    await eth.undelegate(getState().account.accountType);
    notify('Your votes have been undelegated', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

const myDelegate = myDelegate => ({
  type: MY_DELEGATE,
  myDelegate,
});

export const getMyDelegate = () => async (dispatch, getState) => {
  const delegate = await eth.getDelegate(getState().account.account);
  dispatch(myDelegate(delegate));
};
