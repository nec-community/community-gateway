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
      token: 'Polymath',
      description: 'Polymath wants to become a platform for securities tokens, empowering trillions of dollars of financial securities to effortlessly migrate to the blockchain.',
      totalYes: votes.yesVotes[2],
      total: votes.totalVotes,
      logo: 'https://global-uploads.webflow.com/5a46fad33472ef00014b540a/5a46fad33472ef00014b5453_Polymath-Logos_Color_r5.svg',
      discussions: 'https://www.polymath.network/',
      website: 'https://www.polymath.network/',
    }, {
      id: 3,
      token: 'BlockV',
      description: 'BLOCKv provides a platform for the developer community to create and distribute vAtoms: dynamic, compelling digital goods that provide new models of blockchain utility and commerce potential.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://getcrypto.info/blockv/images/logo.png',
      discussions: 'https://www.ethfinex.com/token_listings/33/social_category/197/VEE',
      website: 'https://blockv.io/',
    }, {
      id: 4,
      token: 'DragonChain',
      description: 'Originally created as Disney\'s private blockchain, Dragonchain will be a new blockchain targeted at enterprise as well as an incubator for other projects.',
      totalYes: votes.yesVotes[4],
      total: votes.totalVotes,
      logo: 'https://dragonchain.com/assets/images/dragon.png',
      discussions: 'https://www.ethfinex.com/token_listings/13/social_category/76/DRGN',
      website: 'https://dragonchain.com/',
    }, {
      id: 5,
      token: 'Kin',
      description: 'A decentralized ecosystem of digital services for daily life, Kin is designed specifically to bring people together in a new shared economy and will serve as the foundation for a decentralized ecosystem of digital services.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://www.kik.com/images/kin/kin-logo-onblue.svg',
      discussions: 'https://www.ethfinex.com/token_listings/25/social_category/146/KIN',
      website: 'https://www.kik.com/kin/',
    }, {
      id: 6,
      token: 'Internet Node Token',
      description: 'INT will build a framework for machines and devices and create a token which will be used to facilitate the exchange amongst these nodes. INT will enable new business models focused on interconnected and autonomous devices.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2399.png',
      discussions: 'https://www.ethfinex.com/token_listings/30/social_category/179/INT',
      website: 'https://intchain.io/',
    }, {
      id: 7,
      token: 'Dadi',
      description: 'DADI is a global, decentralized cloud platform, focused on the provision of web services to help customers build, scale and grow your digital products.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2535.png',
      discussions: 'https://dadi.cloud/',
      website: 'https://dadi.cloud/',
    }, {
      id: 8,
      token: 'Utrust',
      description: 'UTRUST is a payment platform that empowers buyers to pay with cryptocurrencies whilst providing a purchase protection mechanism. The UTRUST platform aims to provide the consumer protection that buyers take for granted in traditional online purchases, acting as a mediator, resolving conflicts and enabling the possibility of refunds to mitigate fraud, while shielding the merchant from crypto-market volatility.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2320.png',
      discussions: 'https://www.ethfinex.com/token_listings/35/social_category/209/UTRUST',
      website: 'https://utrust.io/',
    }, {
      id: 9,
      token: 'Lympo',
      description: 'Lympo aim to monetize sports and healthcare data via the blockchain, giving users more control and value from their personal data.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://cryptocoincharts.info/img/coins/lym.svg',
      discussions: 'https://lympo.io/',
      website: 'https://lympo.io/',
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
