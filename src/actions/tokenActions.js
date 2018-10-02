import { FETCHED_TOKENS } from './actionTypes';
import eth from '../services/ethereumService';
import { notify, notifyError } from './notificationActions';
import { getVotingTokenBalance } from './accountActions';
import tokenData from './tokenData';
import { log } from '../services/utils';

const fetchedTokens = (tokens, endingTime, isActive) => ({
  type: FETCHED_TOKENS,
  tokens,
  endingTime,
  isActive,
});

export const getTokenVotes = () => async (dispatch) => {
  const proposalData = await eth.getTokenProposalDetails();
  if (!proposalData._tokens) {
    log('No active token proposal');
    return;
  }
  const tokens = proposalData._tokens
    .map(address => {
      if (tokenData[address])
        return {
          address,
          ...tokenData[address]
        };
      return {
        address,
        token: address,
        description: 'No data found',
      };
    })
    .map((token, i) => ({
      ...token,
      totalYes: proposalData.yesVotes[i],
      total: proposalData.totalVotes,
    }))
    .filter((token) => {
      console.log(token);
      return token.address !== '0x0000000000000000000000000000000000000000';
    });
  dispatch(fetchedTokens(tokens, proposalData.endingTime, proposalData._active));
};

export const voteForToken = (id, amount) => async (dispatch, getState) => {
  if (!getState().account.votingTokenBalance ||
   getState().account.votingTokenBalance - getState().account.votesSpentBalance < 0.1) return notifyError('You first need voting tokens!')(dispatch);

  try {
    await eth.voteTokens(id, amount, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
    getTokenVotes()(dispatch);
    getVotingTokenBalance()(dispatch, getState);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
