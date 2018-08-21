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
      token: 'Ultra (UTA)',
      description: 'Ultra is a games distribution platform and marketplace built upon blockchain and is empowered by proprietary software download technology already in use in the gaming industry. Players, Influencers and developers alike are incentivised via referrals, markets, beta testing, advertisement and revenue sharing.',
      totalYes: votes.yesVotes[0],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/NhTTBKB.png',
      discussions: 'https://t.me/ultra_io',
      website: 'https://ultra.io/',
    }, {
      id: 1,
      token: 'Contentbox (BOX)',
      description: 'Contentbox aims to build an ecosystem for the digital content industry. Being decentralized, autonomous and open source community driven, Contentbox will benefit all involved in content creation, from creators to distributors, consumers to advertisers by providing platform features such as shared content and user  pools, along with a unified payout system.',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/2nbWY1t.png',
      discussions: 'https://t.me/BoxCommunity',
      website: 'https://contentbox.one/',
    }, {
      id: 2,
      token: 'Rate3 (RTE)',
      description: 'Rate3 bridges the gap between enterprises and the blockchain through asset tokenization on the ethereum and stellar networks, as well as a cross-chain identity management protocol.  Incentivizing users of the platform with staking and third party service providers with RTE tokens promotes an active ecosystem.',
      totalYes: votes.yesVotes[2],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/ycazGCt.png',
      discussions: 'https://t.me/OfficialRate3',
      website: 'https://www.rate3.network/',
    }, {
      id: 3,
      token: 'TokenCard (TKN)',
      description: 'Tokencard is a debit card that enables the user to purchase goods or services with Ethereum and ERC20 tokens as they would do with a traditional fiat backed debit card. Payments made with Tokencard\'s TKN tokens are exempt from licensing fees, and holders of TKN are able to burn their tokens in return for a pro-rata share of collectd licensing fees.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/NfVxEeZ.png',
      discussions: 'https://t.me/TokenCard',
      website: 'https://tokencard.io/',
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
      token: 'Universa (UTNP)',
      description: 'Universa is a blockchain cryptoprotocol platform allowing its userbase to execute smart contracts and conduct transactions with speeds of 20,000+ tps on full nodes. Universa nodes are responsible for the verification of transactions and smart contracts, with no mining.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2524.png',
      discussions: 'https://t.me/Uplatform',
      website: 'https://www.universa.io',
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
      token: 'Sonm (SNM)',
      description: 'Decentralized worldwide fog supercomputer for any general purpose computing from CGI rendering to scientific computations, with global scalability and existing applications including infrastructure for blockchain applications, machine learning, video rendering, site hosting, scientific research, and mining.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/j4cEyz/SONM.jpg',
      discussion: 'https://t.me/sonm_eng',
      website: 'https://sonm.com/',
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
      token: 'Civic (CVC)',
      description: 'Civic makes it easy to control and protect your identity with blockchain-powered decentralized authentication solutions, reusable identity elements & KYC tools.',
      totalYes: votes.yesVotes[13],
      total: votes.totalVotes,
      logo: 'https://cdn-images-1.medium.com/max/397/1*PnSOAdezv4moUQ2kCuJxCA.png',
      discussions: 'https://t.me/civicplatform',
      website: 'https://www.civic.com/',
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
