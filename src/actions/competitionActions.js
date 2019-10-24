import { FETCH_COMPETITIONS_BY_TAG } from './actionTypes';

const { GHOST_API_URL } = process.env;
const { GHOST_CONTENT_API_KEY } = process.env;
const API = 'ghost/api/v2/content/';

const fetchedPosts = payload => ({
  type: FETCH_COMPETITIONS_BY_TAG,
  posts: payload.posts,
});

export const fetchPostsByTag = () => async dispatch => {
  // const endpoint = `${GHOST_API_URL}${API}posts/?key=${GHOST_CONTENT_API_KEY}&include=tags`;
  const endpoint =
    'https://deversifi-2.ghost.io/ghost/api/v2/content/posts/?key=1b9232f0014d858f227e5d6b11&include=tags';

  try {
    const promiseResp = await fetch(endpoint);
    const resp = await promiseResp.json();

    const filteredPosts = resp.posts.filter(el => el.title.includes('Competition'));

    dispatch(
      fetchedPosts({
        posts: filteredPosts,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
