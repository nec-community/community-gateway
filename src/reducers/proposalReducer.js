import {
  FETCHED_PROPOSALS,
  FETCHED_ACTIVE_PROPOSALS,
  FETCHED_NONAPPROVED_PROPOSALS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  proposals: [],
  activeProposals: [],
  nonApprovedProposals: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_PROPOSALS:
      return {
        ...state,
        proposals: action.proposals,
      };
    case FETCHED_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: action.proposals,
      };
    case FETCHED_NONAPPROVED_PROPOSALS:
      return {
        ...state,
        nonApprovedProposals: action.proposals,
      };
    default:
      return state;
  }
};
