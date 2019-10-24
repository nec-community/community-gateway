import { FETCH_COMPETITIONS_BY_TAG } from '../actions/actionTypes';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPETITIONS_BY_TAG:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
