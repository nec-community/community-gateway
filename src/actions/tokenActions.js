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
      token: 'Aeternity (AE)',
      description: 'æternity aims to be a scalable blockchain platform that particularly focuses on enabling high bandwidth transacting, purely-functional smart contracts, and decentralized oracles.',
      totalYes: votes.yesVotes[0],
      total: votes.totalVotes,
      logo: 'https://logos-download.com/wp-content/uploads/2018/05/Aeternity_logo_coin.png',
      discussions: 'https://www.ethfinex.com/token_listings/49/social_category/292/AE',
      website: 'https://aeternity.com/',
    }, {
      id: 1,
      token: 'Republic Protocol (REN)',
      description: 'A protocol for decentralised dark pool exchange - designed to faciliate large volumes of cryptocurrency trading with minimal impact on the market.',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2539.png',
      discussions: 'https://republicprotocol.com/',
      website: 'https://republicprotocol.com/',
    }, {
      id: 2,
      token: 'Bancor (BNT)',
      description: 'Bancor is a Decentralized Liquidity Network that allows you to hold any Ethereum token and convert it to any other token on the network, with no counter party, at an automatically calculated price, using a simple web wallet. ',
      totalYes: votes.yesVotes[2],
      total: votes.totalVotes,
      logo: 'https://cdn.freebiesupply.com/logos/large/2x/bancor-2-logo-png-transparent.png',
      discussions: 'https://www.reddit.com/r/Bancor/',
      website: 'https://bancor.network/',
    }, {
      id: 3,
      token: 'Fantom (FTM)',
      description: 'FANTOM is the world\'s first DAG based smart contract platform that solves the issue of scalability and confirmation time of the existing blockchain technology.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://www.fantom.foundation/images/icon-fantom@2x.png',
      discussions: 'https://t.me/Fantom_English',
      website: 'https://www.fantom.foundation',
    }, {
      id: 4,
      token: 'Zilliqa (ZIL)',
      description: 'Zilliqa is a new platform that is designed to scale in an open, permission-less distributed network securely. The core feature that makes Zilliqa scalable is sharding — dividing the network into several smaller component networks (called shards) capable of processing transactions in parallel.',
      totalYes: votes.yesVotes[4],
      total: votes.totalVotes,
      logo: 'https://seeklogo.com/images/Z/zilliqa-logo-3AF6BFB223-seeklogo.com.png',
      discussions: 'https://twitter.com/zilliqa',
      website: 'https://zilliqa.com/',
    }, {
      id: 5,
      token: 'Walton (WTC)',
      description: 'Waltonchain is a decentralized platform combining blockchain with the Internet of Things (IoT) via RFID technology. Their blockchain is implemented in the foundational layer, through their patented RFID chips, which are able to read and write directly to the blockchain, creating a genuine, trustworthy, and traceable business ecosystem.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1925.png',
      discussions: 'https://www.reddit.com/r/waltonchain/',
      website: 'https://www.waltonchain.org/',
    }, {
      id: 6,
      token: 'Stox (STX)',
      description: 'Predicting the outcome of events, from Sports and Politics to Finance & World Cup. Stox targets mainstream audiences via an Ethereum based prediction market platform.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://coinnext.net/wp-content/uploads/2017/12/stox.png',
      discussions: 'https://www.stox.com/',
      website: 'https://www.stox.com/',
    }, {
      id: 7,
      token: 'Enigma (ENG)',
      description: 'Enigma uses privacy technologies to build the first platform for scalable, end-to-end decentralized applications. With Enigma, "smart contracts" become "secret contracts", where input data is kept hidden from nodes in the Enigma network that execute code.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2044.png',
      discussions: 'https://www.reddit.com/r/EnigmaProject/',
      website: 'https://enigma.co/',
    }, {
      id: 8,
      token: 'Ethos (ETHOS)',
      description: 'Harnessing the power of design, technology and social intelligence, Ethos proposes a universal wallet & fiat gateway designed to make buying, trading, and managing your crypto assets consumer-friendly.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/j2fCC8/Ethos_Logo_white_knockout.png',
      discussions: 'https://www.ethos.io/',
      website: 'https://www.ethos.io/',
    }, {
      id: 9,
      token: 'WePower (WPR)',
      description: 'WePower is a blockchain-based green energy financing and trading platform. It connects energy buyers directly with the producers and creates an opportunity to purchase energy upfront at below market rates. Smart Energy Contracts ensure liquidity and extends access to capital.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/dzfCXJ/Wepower_logo_256x256.png',
      discussions: 'https://t.me/WePowerNetwork',
      website: 'https://wepower.network/',
    }, {
      id: 10,
      token: 'Naga (NGC)',
      description: 'The Naga Coin is the fuel that makes the trading of cryptocurrencies, virtual products and stocks accessible to everyone on the NAGA platform. It will serve as a decentralised unit of account for all parts of the NAGA ecosystem such as a virtual goods marketplace  and an academy for becoming a trading expert. ',
      totalYes: votes.yesVotes[10],
      total: votes.totalVotes,
      logo: 'https://i.vimeocdn.com/portrait/21759767_300x300',
      discussions: 'https://t.me/official_nagacoin',
      website: 'https://naga.com/coin/',
    }, {
      id: 11,
      token: 'Exchange Union (XUC)',
      description: 'Exchange Union (XU) will create a \'meta-exchange\' which will form a decentralised network of digital asset exchanges, enabling instantaneous, trustless trades between various platforms whilst providing opportunities for new trading pairs, and aim to achieve best execution for customers.',
      totalYes: votes.yesVotes[11],
      total: votes.totalVotes,
      logo: 'https://seeklogo.com/images/E/exchange-union-xuc-logo-D69254C1A4-seeklogo.com.png',
      discussions: 'https://www.exchangeunion.com/',
      website: 'https://www.exchangeunion.com/',
    }, {
      id: 12,
      token: 'Chainlink (LINK)',
      description: 'ChainLink is blockchain middleware that allows smart contracts to access key off-chain resources like data feeds, various web APIs, and traditional bank account payments.',
      totalYes: votes.yesVotes[12],
      total: votes.totalVotes,
      logo: 'https://cdn.worldvectorlogo.com/logos/chainlink-1.svg',
      discussions: 'https://telegram.me/chainlink',
      website: 'https://www.smartcontract.com/link#chainlink',
    }, {
      id: 13,
      token: 'Nebulas (NAS)',
      description: 'Nebulas is used to search smart contracts, distributed applications (DApps) and users’ assets on blockchains.In addition, Nebulas is being built on a decentralized search framework with open-source algorithms, verifiable computing, and distributed data stores.',
      totalYes: votes.yesVotes[13],
      total: votes.totalVotes,
      logo: 'http://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Nebulas-NAS-icon.png',
      discussions: 'https://t.me/nebulasio',
      website: 'https://nebulas.io/',
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
