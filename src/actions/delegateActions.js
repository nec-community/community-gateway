import { FETCHED_DELEGATES, MY_DELEGATE } from './actionTypes';
import eth from '../services/ethereumService';
import grenache from '../services/grenacheService';
import { notify, notifyError } from './notificationActions';
import { openLogin } from './accountActions';
import { log } from '../services/utils';

const fetchedDelegates = delegates => ({
  type: FETCHED_DELEGATES,
  delegates,
});

export const getDelegates = () => async dispatch => {
  const delegates = await eth.getDelegates();
  const promises = delegates.map(delegate => grenache.get(delegate.storageHash.substr(2, 40)));

  Promise.all(promises)
    .then(descriptions => {
      const parsedDelegates = delegates.map((delegate, i) => ({
        ...delegate,
        description: descriptions[i],
      }));
      log(delegates);
      dispatch(fetchedDelegates(parsedDelegates));
    })
    .catch(error => {
      log(error);
    });
};

export const becomeDelegate = description => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    if (await eth.hasVotedOnTokenListing(getState().account.account)) {
      throw new Error("You've already voted and can not become a delegate in this round. ");
    }
    const descriptionHash = await grenache.put(description);
    await eth.becomeDelegate(descriptionHash, getState().account.accountType);
    notify('Your request to become a delegate has been submitted', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

export const delegateVote = to => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  if (await eth.hasVotedOnTokenListing(getState().account.account)) {
    throw new Error("You've already voted and can not delegate your vote in this round.");
  }
  if (await eth.hasVotedOnTokenListing(to)) {
    throw new Error(
      'The chosen address has already voted in this round and currently can not be a delegate.'
    );
  }
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

const myDelegate = (myDelegate, userHasVoted) => ({
  type: MY_DELEGATE,
  myDelegate,
  userHasVoted,
});

export const getMyDelegate = () => async (dispatch, getState) => {
  const delegate = await eth.getDelegate(getState().account.account);
  const userHasVoted = await eth.hasVotedOnTokenListing(getState().account.account);
  dispatch(myDelegate(delegate, userHasVoted));
};
