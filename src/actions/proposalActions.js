import {
  FETCHED_PROPOSALS,
  FETCHED_ACTIVE_PROPOSALS,
  FETCHED_NONAPPROVED_PROPOSALS,
} from './actionTypes';
import eth from '../services/ethereumService';
import grenache from '../services/grenacheService';
import { openLogin } from './accountActions';
import { notify, notifyError } from './notificationActions';
import { log } from '../services/utils';

const fetchedProposals = proposals => ({
  type: FETCHED_PROPOSALS,
  proposals,
});

export const getProposals = () => async (dispatch) => {
  const proposals = await Promise.all(await eth.getProposals());
  log(proposals);
  dispatch(fetchedProposals(proposals));
};

const fetchedActiveProposals = proposals => ({
  type: FETCHED_ACTIVE_PROPOSALS,
  proposals,
});

export const getActiveProposals = () => async (dispatch) => {
  const proposals = await Promise.all(await eth.getActiveProposals());
  log(proposals);
  dispatch(fetchedActiveProposals(proposals));
};

const fetchedNonApprovedProposals = proposals => ({
  type: FETCHED_NONAPPROVED_PROPOSALS,
  proposals,
});

export const getNonApprovedProposals = () => async (dispatch) => {
  const proposals = await Promise.all(await eth.getNonApprovedProposals());
  log(proposals);
  dispatch(fetchedNonApprovedProposals(proposals));
};

export const submitProposal = (duration, description, email) => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    const descriptionHash = await grenache.put(description, email);
    await eth.submitProposal(duration, descriptionHash, getState().account.accountType);
    notify(`Your proposal has been submitted and will need to be approved
    by the Ethfinex moderation team before a vote can begin`, 'success')(dispatch);
    // go to home
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

export const voteForProposal = (id, vote) => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    await eth.vote(id, vote, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

export const voteForMission = vote => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    await eth.voteMission(vote, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
