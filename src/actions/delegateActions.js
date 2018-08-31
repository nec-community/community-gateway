import { FETCHED_DELEGATES } from './actionTypes';
import eth from '../services/ethereumService';
import grenache from '../services/grenacheService';
import { notify, notifyError } from './notificationActions';
import { openLogin } from './accountActions';
import { log } from '../services/utils';

const fetchedDelegates = delegates => ({
  type: FETCHED_DELEGATES,
  delegates,
});

export const getDelegates = () => async (dispatch) => {
  const delegates = await eth.getDelegates();
  const promises = delegates.map(delegate => grenache.get(delegate.storageHash.substr(2, 40)));
  console.log(promises);

  Promise.all(promises)
    .then((descriptions) => {
      const parsedDelegates = delegates.map((delegate, i) => ({ ...delegate, description: descriptions[i] }));
      log(delegates);
      dispatch(fetchedDelegates(parsedDelegates));
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
    // go to home
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
