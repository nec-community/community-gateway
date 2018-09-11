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
      token: 'TaTaTu (TTU)',
      description: 'TaTaTu is the first Social Media Platform that rewards users and content providers in a fair and transparent way for their activity.',
      totalYes: votes.yesVotes[0],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2886.png',
      discussions: 'https://t.me/joinchat/GgHdfUhVY-w9zlfwD-jf1Q',
      website: 'https://www.tatatu.com',
    }, {
      id: 1,
      token: 'Content Neutrality Network (CNN)',
      description: 'CNN content distribution platform built on the blockchain featuring a contribution based revenue sharing model which ensures fair rewards distribution.',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2735.png',
      discussions: 'https://t.me/cnn_blockchain_official',
      website: 'https://cnntoken.io',
    }, {
      id: 3,
      token: 'VideoCoin (VID)',
      description: 'VideoCoin provides video encoding, video storage and content distribution services. Users are incentivised with VID tokens as rewards to promote organic platform growth.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/Wf5GvPd.png',
      discussions: 'https://t.me/videocoin',
      website: 'https://www.videocoin.io',
    }, {
      id: 4,
      token: 'Credits (CS)',
      description: 'Credits is a blockchain platform enabling the development of dApps in a wide range of industries, from banking to logistics. With a decentralized data model and integrated smart contract functionality, the Credits financial system and inherent CS token provide a complete solution to businesses with Blockchain interest.',
      totalYes: votes.yesVotes[4],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/whRRJIb.png',
      discussions: 'https://t.me/creditscom',
      website: 'https://credits.com',
    }, {
      id: 5,
      token: 'Contentbox (BOX)',
      description: 'Contentbox aims to build an ecosystem for the digital content industry. Being decentralized, autonomous and open source community driven, Contentbox will benefit all involved in content creation, from creators to distributors, consumers to advertisers by providing platform features such as shared content and user  pools, along with a unified payout system.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/2nbWY1t.png',
      discussions: 'https://t.me/BoxCommunity',
      website: 'https://contentbox.one/',
    }, {
      id: 6,
      token: 'OneLedger (OLT)',
      description: 'OneLedger aims to simplify businesses\' adoption of blockchain, by bridging the gap between traditional business practises and these emerging technologies. The OLT utility token can be used in the system for paying fees, staking in order to validate consensus, and revenue generation for developers.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2921.png',
      discussions: 'https://t.me/oneledger',
      website: 'https://oneledger.io/',
    }, {
      id: 7,
      token: 'Libra Credit (LBA)',
      description: 'LibraCredit is a decentralized lending platform that enables open access to credit without location restrictions. With crypto to crypto and crypto to fiat lending goals, the Libra Credit ecosystem is comprised of a proprietary AI-based Credit Model, along with customer acquisition, exchange, lending and identity verification partnerships.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2760.png',
      discussions: 'https://t.me/oneledger',
      website: 'https://www.libracredit.io/',
    }, {
      id: 8,
      token: 'Yggdrash (YEED)',
      description: 'YGGDRASH is a trust-based, "multi-dimensional" blockchain system. YGGDRASH aims to connect disparate blockchain networks through use of \'branches\' designed to improve data capacity, speed and expandability. YYGDRASH ultimately aims to function as an ecosystem through which businesses can build flexible blockchain platforms.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://investment-prod.s3.amazonaws.com/email/ygg/YGG.png',
      discussions: 'https://t.me/joinchat/GjaZ6VEGciYxMNa3pD32hg',
      website: 'https://yggdrash.io/',
    }, {
      id: 9,
      token: 'KIN (KIN)',
      description: 'A decentralized ecosystem of digital services for daily life, Kin is designed specifically to bring people together in a new shared economy and will serve as the foundation for a decentralized ecosystem of digital services.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://www.kik.com/images/kin/kin-logo-onblue.svg',
      discussion: 'https://t.me/kinfoundation',
      website: 'https://www.kik.com/kin/',
    }, {
      id: 10,
      token: 'Bounty0x (BNTY)',
      description: 'Bounty0x is a decentralized bounty hunting platform, enabling users to manage bounty programs and bounty hunters to receive payment for completing bounty tasks.',
      totalYes: votes.yesVotes[10],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2310.png',
      discussions: 'https://t.me/bounty0x',
      website: 'https://bounty0x.io/',
    }, {
      id: 11,
      token: 'Centrality (CENNZ)',
      description: 'Centrality is a venture studio that partners with leading innovators in key industries to create a marketplace of applications. These applications allow consumers to manage everyday tasks and experiences using peer-to-peer transactions - all via one login and using blockchain-enabled infrastructure.',
      totalYes: votes.yesVotes[11],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/nqYU4T/CENNZ_blue.png',
      discussions: 'https://t.me/centralityofficialtelegram',
      website: 'https://www.centrality.ai',
    }, {
      id: 12,
      token: 'BankEx (BKX)',
      description: 'BANKEX is developing a solution to transform any asset class into a digital token, providing it with flexiblity, liquidity, and auditability.',
      totalYes: votes.yesVotes[12],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2390.png',
      discussions: 'https://bankex.com/',
      website: 'https://bankex.com/',
    }, {
      id: 13,
      token: 'DragonChain (DRGN)',
      description: 'Originally created as Disney\'s private blockchain, Dragonchain will be a new blockchain targeted at enterprise as well as an incubator for other projects.',
      totalYes: votes.yesVotes[13],
      total: votes.totalVotes,
      logo: 'https://dragonchain.com/assets/images/dragon.png',
      discussions: 'https://dragonchain.com/',
      website: 'https://dragonchain.com/',
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
