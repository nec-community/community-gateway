import { FETCHED_TOKENS, FETCHED_POOL_TOKENS } from './actionTypes';
import eth from '../services/ethereumService';
import kleros from '../services/klerosService';
import { notify, notifyError } from './notificationActions';
import { getVotingTokenBalance } from './accountActions';
import tokenData from './tokenData';
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
    const tokens = (await Promise.all(currentLeaderboard.map(kleros.getTokenInfo)))
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
  const tokens = proposalData._tokens
    .map((address) => {
      if (tokenData[address]) {
        const name = tokenData[address].token;
        const symbolBreak = name.indexOf(' (');
        const shortName = name.substr(0, symbolBreak);
        const symbol = name.substr(symbolBreak + 2, name.length - symbolBreak - 3);
        return {
          address,
          ...tokenData[address],
          shortName,
          symbol,
        };
      }
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
    .filter(token => token.address !== '0x0000000000000000000000000000000000000000');
  dispatch(fetchedTokens(tokens, proposalData.endingTime, proposalData._active));
};

export const voteForToken = (id, amount) => async (dispatch, getState) => {
  if (!getState().account.votingTokenBalance ||
    getState().account.votingTokenBalance - getState().account.votesSpentBalance < 0.1) {
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

const fetchedPoolTokens = (poolTokens) => ({
  type: FETCHED_POOL_TOKENS,
  poolTokens,
});

export const getPoolTokens = () => async (dispatch) => {
  const tokens = (await kleros.getApprovedTokens())
    .map((token) => {
      const extraData = proposedTokenData[token.address.toLowerCase()];
      return {
        ...token,
        description: extraData && extraData.description,
        website: extraData && extraData.website,
      };
    });
  dispatch(fetchedPoolTokens(tokens));
};
