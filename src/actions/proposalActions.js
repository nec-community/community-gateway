import { FETCHED_PROPOSALS, FETCHED_ACTIVE_PROPOSALS } from './actionTypes';
import eth from '../services/ethereumService';
import grenache from '../services/grenacheService';

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

export const submitProposal = (duration, description) => async (dispatch) => {
  const descriptionHash = await grenache.put(description);
  eth.submitProposal(duration, descriptionHash);
};
