import { FETCHED_PROPOSALS, FETCHED_ACTIVE_PROPOSALS } from './actionTypes';
import eth from '../services/ethereumService';
import grenache from '../services/grenacheService';
import { openLogin } from './accountActions';
import { notify, notifyError } from './notificationActions';

const fetchedProposals = proposals => ({
  type: FETCHED_PROPOSALS,
  proposals,
});

export const getProposals = () => async (dispatch) => {
  const proposals = await Promise.all(await eth.getProposals());
  console.log(proposals);
  dispatch(fetchedProposals(proposals));
};

const fetchedActiveProposals = proposals => ({
  type: FETCHED_ACTIVE_PROPOSALS,
  proposals,
});

export const getActiveProposals = () => async (dispatch) => {
  const proposals = await Promise.all(await eth.getActiveProposals());
  console.log(proposals);
  dispatch(fetchedActiveProposals(proposals));
};

export const submitProposal = (duration, description) => async (dispatch, getState) => {
  if (!getState().account.accountType)
    return dispatch(openLogin());
  const descriptionHash = await grenache.put(description);
  try {
    await eth.submitProposal(duration, descriptionHash, getState().account.accountType);
    notify('Your proposal has been submitted and will need to be approved by the Ethfinex moderation team before a vote can begin', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

export const voteForProposal = (id, vote) => async (dispatch, getState) => {
  if (!getState().account.accountType)
    return dispatch(openLogin());
  try {
    await eth.vote(id, vote, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
