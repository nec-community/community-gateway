import { FETCHED_TOKENS } from './actionTypes';
import eth from '../services/ethereumService';
import { openLogin } from './accountActions';
import { notify, notifyError } from './notificationActions';

const fetchedTokens = (tokens, endingTime) => ({
  type: FETCHED_TOKENS,
  tokens,
  endingTime,
});

export const getTokenVotes = () => async (dispatch) => {
  const votes = await eth.getTokenDetails();
  const tokens = [
    {
      id: 0,
      token: 'Wings',
      description: 'Wings DAO is building a platform for better crowdsourced price discovery and ICO forecasting. They want to combine the wisdom of the crowd with AI and reward forecasters for their analysis of ICOs.',
      totalYes: votes.yesVotes[0],
      total: votes.totalVotes,
      logo: 'https://www.cryptocompare.com/media/1382758/1wings.png',
      discussions: 'https://www.ethfinex.com/token_listings/10/social_category/59/WINGS',
      website: 'https://www.wings.ai/',
    }, {
      id: 1,
      token: 'Auctus',
      description: 'Auctus is the first blockchain based retirement plan platform, allowing users to create portfolios consisting of traditional asset classes and cryptocurrencies. Auctus aims to empower the retirement saver to take well-informed decisions.',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2653.png',
      discussions: 'https://www.ethfinex.com/token_listings/45/social_category/269/AUC',
      website: 'https://auctus.org/',
    }, {
      id: 2,
      token: 'Cindicator',
      description: 'Cindicator CND tokens give access to tools needed to make effective investment and trading decisions under the the high uncertainty of the new economy, by combining a large number of diverse financial analysts and a set of machine-learning models into a single system.',
      totalYes: votes.yesVotes[2],
      total: votes.totalVotes,
      logo: 'https://coinlookup.co/wp-content/uploads/2018/03/cindicator.png',
      discussions: 'https://cindicator.com/',
      website: 'https://cindicator.com/',
    }, {
      id: 3,
      token: 'Internet Node Token',
      description: 'INT will build a framework for machines and devices and create a token which will be used to facilitate the exchange amongst these nodes. INT will enable new business models focused on interconnected and autonomous devices.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2399.png',
      discussions: 'https://www.ethfinex.com/token_listings/30/social_category/179/INT',
      website: 'https://intchain.io/',
    }, {
      id: 4,
      token: 'Icon',
      description: 'Icon (ICX) is the token of a public blockchain connecting a network of private permissioned blockchains, thereby making them interoperable. Each private chain runs an Icon node and can take part in governance of the network.',
      totalYes: votes.yesVotes[4],
      total: votes.totalVotes,
      logo: 'https://coinmarketdaddy.com/upload/coin/11523185991.png',
      discussions: 'https://icon.foundation/',
      website: 'https://icon.foundation/',
    }, {
      id: 5,
      token: 'BlockEx',
      description: 'The Digital Asset Exchange Token (symbol: DAXT) is BlockEx’s token. It is a utility token allowing holders access to ICOs on a pre-sale basis before the public at large.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/dGCsSd/logo_png_rj.png',
      discussions: 'https://daxt.io/',
      website: 'https://daxt.io/',
    }, {
      id: 6,
      token: 'Polymath',
      description: 'Polymath wants to become a platform for securities tokens, empowering trillions of dollars of financial securities to effortlessly migrate to the blockchain.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://global-uploads.webflow.com/5a46fad33472ef00014b540a/5a46fad33472ef00014b5453_Polymath-Logos_Color_r5.svg',
      discussions: 'https://www.polymath.network/',
      website: 'https://www.polymath.network/',
    }, {
      id: 7,
      token: 'Fusion',
      description: 'FUSION is a public blockchain devoting itself to creating an inclusive cryptofinancial platform by providing cross-chain, cross-organization, and cross-datasource smart contracts.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2530.png',
      discussions: 'https://www.fusion.org/',
      website: 'https://www.fusion.org/',
    }, {
      id: 8,
      token: 'DragonChain',
      description: 'Originally created as Disney\'s private blockchain, Dragonchain will be a new blockchain targeted at enterprise as well as an incubator for other projects.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://dragonchain.com/assets/images/dragon.png',
      discussions: 'https://www.ethfinex.com/token_listings/13/social_category/76/DRGN',
      website: 'https://dragonchain.com/',
    }, {
      id: 9,
      token: 'CommerceBlock',
      description: 'CommerceBlock is an infrastructure company that provides a suite of tools for traditional asset markets to leverage the highly flexible and powerful qualities of blockchain based digital asset protocols. Utilizing the CommerceBlock toolchain, developers will be able to easily deploy federated sidechains that enable businesses to manage their process flows and fulfill the vital stages of their contractual obligations',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://www.commerceblock.com/wp-content/themes/commerceblock/public/img/int/logo-small.png',
      discussions: 'https://www.commerceblock.com/',
      website: 'https://www.commerceblock.com/',
    }, {
      id: 10,
      token: 'Hubii',
      description: 'Hubii Network is a blockchain-based decentralised content marketplace that facilitates transactions between creators, distributors and consumers by leveraging the power of smart contracts.',
      totalYes: votes.yesVotes[10],
      total: votes.totalVotes,
      logo: 'https://cdn-images-1.medium.com/max/1600/0*NVI3KkOEvbz0_Ff0.',
      discussions: 'https://www.ethfinex.com/token_listings/36/social_category/212/HBT',
      website: 'https://www.hubii.com/',
    }, {
      id: 11,
      token: 'Aeternity',
      description: 'æternity aims to be a scalable blockchain platform that particularly focuses on enabling high bandwidth transacting, purely-functional smart contracts, and decentralized oracles.',
      totalYes: votes.yesVotes[11],
      total: votes.totalVotes,
      logo: 'https://logos-download.com/wp-content/uploads/2018/05/Aeternity_logo_coin.png',
      discussions: 'https://www.ethfinex.com/token_listings/49/social_category/292/AE',
      website: 'https://aeternity.com/',
    },
  ];
  dispatch(fetchedTokens(tokens, votes.endingTime));
};

export const voteForToken = id => async (dispatch, getState) => {
  if (!getState().account.votingTokenBalance ||
   getState().account.votingTokenBalance < 0.1) return notifyError('You first need voting tokens!')(dispatch);

  try {
    await eth.voteTokens(id, getState().account.accountType);
    notify('Thanks for voting!', 'success')(dispatch);
  } catch (err) {
    notifyError(err)(dispatch);
  }
};
