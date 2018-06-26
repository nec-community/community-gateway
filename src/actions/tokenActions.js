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
      token: 'Loom',
      description: 'Loom Network is the next-generation blockchain platform for highly scalable games and social apps. The Loom SDK now makes it possible for developers to easily create their own high throughput sidechains or choose to run their DApps on shared chains (such as ZombieChain), all of which are backed by the trust and security of Ethereum.',
      totalYes: votes.yesVotes[0],
      total: votes.totalVotes,
      logo: 'https://cdn-images-1.medium.com/max/1200/1*K76UVoLq-FOL7l-_Fag-Qw@2x.png',
      discussions: 'https://loomx.io/',
      website: 'https://loomx.io/',
    }, {
      id: 1,
      token: 'Data (DTA)',
      description: 'DATA is working on a blockchain-based advertising protocol that provides revolutionary digital data authentication to prevent fraud in digital ad sales. The DTA token is earned by users for viewing advertisements.',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'https://data.eco/images/logo.DATA.svg',
      discussions: 'https://data.eco/',
      website: 'https://data.eco/',
    }, {
      id: 2,
      token: 'Republic Protocol',
      description: 'A protocol for decentralised dark pool exchange - designed to faciliate large volumes of cryptocurrency trading with minimal impact on the market.',
      totalYes: votes.yesVotes[2],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2539.png',
      discussions: 'https://republicprotocol.com/',
      website: 'https://republicprotocol.com/',
    }, {
      id: 3,
      token: 'Kin',
      description: 'A decentralized ecosystem of digital services for daily life, Kin is designed specifically to bring people together in a new shared economy and will serve as the foundation for a decentralized ecosystem of digital services.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://www.kik.com/images/kin/kin-logo-onblue.svg',
      discussions: 'https://www.ethfinex.com/token_listings/25/social_category/146/KIN',
      website: 'https://www.kik.com/kin/',
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
      token: 'Hydro Protocol',
      description: 'Hydro Protocol Token (HOT) is designed to improve liquidity for decentralised exchanges by incentivising professional market makers to add liquidity, in much the same way as NEC on Ethfinex.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://www.currencycalculate.com/res/img/cryptocurrencies/hydro-protocol.png',
      discussions: 'https://thehydrofoundation.com/',
      website: 'https://thehydrofoundation.com/',
    }, {
      id: 6,
      token: 'Hubii',
      description: 'Hubii Network is a blockchain-based decentralised content marketplace that facilitates transactions between creators, distributors and consumers by leveraging the power of smart contracts.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://cdn-images-1.medium.com/max/1600/0*NVI3KkOEvbz0_Ff0.',
      discussions: 'https://www.ethfinex.com/token_listings/36/social_category/212/HBT',
      website: 'https://www.hubii.com/',
    }, {
      id: 7,
      token: 'Stox',
      description: 'Predicting the outcome of events, from Sports and Politics to Finance & World Cup. Stox targets mainstream audiences via an Ethereum based prediction market platform.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://coinnext.net/wp-content/uploads/2017/12/stox.png',
      discussions: 'https://www.stox.com/',
      website: 'https://www.stox.com/',
    }, {
      id: 8,
      token: 'Lala World',
      description: 'LALA World is an ecosystem for migrants and their unbanked families. LaLa is a new age, one-stop wallet allowing investors to capitalise on the rise of blockchain, as well as the entry of underbanked into the financial ecosystem.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://en.bitcoinwiki.org/upload/en/images/thumb/9/98/LaLa_World_Logo.png/300px-LaLa_World_Logo.png',
      discussions: 'https://www.ethfinex.com/token_listings/34/social_category/200/LALA',
      website: 'https://lalaworld.io/',
    }, {
      id: 9,
      token: 'Ethos',
      description: 'Harnessing the power of design, technology and social intelligence, Ethos proposes a universal wallet & fiat gateway designed to make buying, trading, and managing your crypto assets consumer-friendly.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/j2fCC8/Ethos_Logo_white_knockout.png',
      discussions: 'https://www.ethos.io/',
      website: 'https://www.ethos.io/',
    }, {
      id: 10,
      token: 'IPSX',
      description: 'IPSX will be one of the first regulated securities exchange offering a proxy for direct investment in institutional-grade commercial property. Providing access to this asset class for both institutional and private investors, IPSX aims to take tokenized commercial property mainstream.',
      totalYes: votes.yesVotes[10],
      total: votes.totalVotes,
      logo: 'https://cryptoindex.co/coinlogo/ip-exchange.png',
      discussions: 'https://www.ipsx.com/',
      website: 'https://www.ipsx.com/',
    }, {
      id: 11,
      token: 'Human Protocol',
      description: 'Human Protocol powers hCaptcha, a revolutionary alternative to the traditional reCAPTCHA. It aims to provide a simple, easy and above all reliable bot-detection service, rewarding website owners for every user who submits correct answers, and using the data to train machine learning algorithms.',
      totalYes: votes.yesVotes[11],
      total: votes.totalVotes,
      logo: 'https://hcaptcha.com/static/img/site/human-token.png',
      discussions: 'https://hcaptcha.com/',
      website: 'https://hcaptcha.com/',
    }, {
      id: 12,
      token: 'Naga',
      description: 'The Naga Coin is the fuel that makes the trading of cryptocurrencies, virtual products and stocks accessible to everyone on the NAGA platform. It will serve as a decentralised unit of account for all parts of the NAGA ecosystem such as a virtual goods marketplace  and an academy for becoming a trading expert. ',
      totalYes: votes.yesVotes[12],
      total: votes.totalVotes,
      logo: 'https://i.vimeocdn.com/portrait/21759767_300x300',
      discussions: 'https://naga.com/coin/',
      website: 'https://naga.com/coin/',
    }, {
      id: 13,
      token: 'Exchange Union',
      description: 'Exchange Union (XU) will create a \'meta-exchange\' which will form a decentralised network of digital asset exchanges, enabling instantaneous, trustless trades between various platforms whilst providing opportunities for new trading pairs, and aim to achieve best execution for customers.',
      totalYes: votes.yesVotes[13],
      total: votes.totalVotes,
      logo: 'https://seeklogo.com/images/E/exchange-union-xuc-logo-D69254C1A4-seeklogo.com.png',
      discussions: 'https://www.exchangeunion.com/',
      website: 'https://www.exchangeunion.com/',
    }
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
