import { FETCHED_PROPOSALS, FETCHED_ACTIVE_PROPOSALS } from '../actions/actionTypes';

const INITIAL_STATE = {
  proposals: [],
  activeProposals: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_PROPOSALS:
      return {
        ...state,
        proposals: action.proposals,
        // .sort()
      };
    case FETCHED_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: action.proposals,
        // .sort()
      };
    default:
      return state;
  }
};
