import { FETCHED_TOKENS, FETCHED_POOL_TOKENS } from './actionTypes';
import eth from '../services/ethereumService';
import { getTokenInfo, getApprovedTokens } from '../services/klerosService';
import { notify, notifyError } from './notificationActions';
import { getVotingTokenBalance } from './accountActions';
import proposedTokenData from '../../proposed_tokens';
import { log } from '../services/utils';
import currentLeaderboard from '../components/TokenListings/currentLeaderboard';

const fetchedTokens = (tokens, endingTime, isActive) => ({
  type: FETCHED_TOKENS,
  tokens,
  endingTime,
  isActive,
});

export const getTokenVotes = () => async (dispatch) => {
  const proposalData = await eth.getTokenProposalDetails();
  if (!proposalData._tokens || proposalData._finalized) {
    log('No active token proposal');
    const tokens = (await Promise.all(currentLeaderboard.map(getTokenInfo)))
      .map((token) => {
        const extraData = proposedTokenData[token.address.toLowerCase()];
        return {
          ...token,
          description: extraData && extraData.description,
          website: extraData && extraData.website,
        };
      });
    dispatch(fetchedTokens(tokens, new Date(), false));
    return;
  }
  const tokens =
    (await Promise.all(proposalData._tokens.map(getTokenInfo)))
      .map((token, i) => ({
        ...token,
        totalYes: proposalData.yesVotes[i],
        total: proposalData.totalVotes,
      }))
      .filter(token => token.address !== '0x0000000000000000000000000000000000000000');
  dispatch(fetchedTokens(tokens, proposalData.endingTime, proposalData._active));
};

export const voteForToken = (id, amount) => async (dispatch, getState) => {
  if (!getState().account.votingTokenBalance ||
    getState().account.votingTokenBalance < 0.1) {
    return notifyError('You first need voting tokens!')(dispatch);
  }

  try {
    await eth.voteTokens(id, amount, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
    getTokenVotes()(dispatch);
    getVotingTokenBalance()(dispatch, getState);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};

const fetchedPoolTokens = poolTokens => ({
  type: FETCHED_POOL_TOKENS,
  poolTokens,
});

export const getPoolTokens = () => async (dispatch) => {
  const tokens = (await getApprovedTokens());
  dispatch(fetchedPoolTokens(tokens));
};
