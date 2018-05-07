import { FETCHED_TOKENS } from './actionTypes';
import eth from '../services/ethereumService';
import { openLogin } from './accountActions';
import { notify, notifyError } from './notificationActions';

const fetchedTokens = tokens => ({
  type: FETCHED_TOKENS,
  tokens,
});

export const getTokenVotes = () => async (dispatch) => {
  const tokens = [
    {
      id: 1,
      token: 'Aragon',
      description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words',
      totalYes: 170,
      logo: 'https://wiki.aragon.one/design/logo/png/isotype.png',
      website: 'https://aragon.one',
      yesPercentage: 83,
    }, {
      id: 2,
      token: 'VeChain',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
      totalYes: 35,
      logo: 'http://www.freelogovectors.net/wp-content/uploads/2018/02/VeChain-Logo-768x725.png',
      website: 'https://vechain.org',
      yesPercentage: 17,
    },
  ];
  console.log(tokens);
  dispatch(fetchedTokens(tokens));
};

export const voteForToken = (id, vote) => async (dispatch, getState) => {
  if (!getState().account.accountType) return dispatch(openLogin());
  try {
    await eth.vote(id, vote, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
