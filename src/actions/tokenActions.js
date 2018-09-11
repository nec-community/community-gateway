import { FETCHED_TOKENS } from './actionTypes';
import eth from '../services/ethereumService';
import { notify, notifyError } from './notificationActions';
import tokenData from './tokenData';

const fetchedTokens = (tokens, endingTime) => ({
  type: FETCHED_TOKENS,
  tokens,
  endingTime,
});

export const getTokenVotes = () => async (dispatch) => {
  const proposalData = await eth.getTokenProposalDetails();
  console.log(proposalData._tokens);
  const tokens = proposalData._tokens
    .map(address => tokenData[address])
    .map((token, i) => ({
      ...token,
      totalYes: proposalData.yesVotes[i],
      total: proposalData.totalVotes,
    }));
  dispatch(fetchedTokens(tokens, proposalData.endingTime));
};

export const voteForToken = (id, amount) => async (dispatch, getState) => {
  if (!getState().account.votingTokenBalance ||
   getState().account.votingTokenBalance < 0.1) return notifyError('You first need voting tokens!')(dispatch);

  try {
    await eth.voteTokens(id, amount, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
