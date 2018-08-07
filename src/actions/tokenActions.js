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
      token: 'Populous (PPT)',
      description: 'Populous World is creating a platform that allows business to trade invoices on the blockchain. The Populous Platform Tokens serve as a profit sharing mechanism and creates a trading environment for investors and invoice sellers alike.',
      totalYes: votes.yesVotes[0],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/gXaVto/Populous.png',
      discussions: 'https://t.me/populous',
      website: 'https://populous.world/',
    }, {
      id: 1,
      token: 'District0x (DNT)',
      description: 'District0x is creating a network of marketplaces and communities (“districts”) that exist and interact with each other within the district0x digital environment. Using the DNT token, all ‘citizens’ will be able to post listings, offer skills and create marketplaces for their products and services as fully decentralised autonomous organisations (DAOs).',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1856.png',
      discussions: 'https://t.me/district0x',
      website: 'https://district0x.io/',
    }, {
      id: 2,
      token: 'Melon (MLN)',
      description: 'Melonport is the first of its kind in autonomous systems, designed specifically for the purposes of crypto asset management. They aim to provide a system of tools that empower users to set-up, manage and invest in digital assets.',
      totalYes: votes.yesVotes[2],
      total: votes.totalVotes,
      logo: 'https://d33wubrfki0l68.cloudfront.net/a925598e7831981f53d573bb90b63ca172a90726/98ed3/assets/images/loading-logo.png',
      discussions: 'https://t.me/melonport',
      website: 'https://melonport.com/',
    }, {
      id: 3,
      token: 'Loom (LOOM)',
      description: 'Loom Network is the next-generation blockchain platform for highly scalable games and social apps. The Loom SDK now makes it possible for developers to easily create their own high throughput sidechains or choose to run their DApps on shared chains (such as ZombieChain), all of which are backed by the trust and security of Ethereum.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://cdn-images-1.medium.com/max/1200/1*K76UVoLq-FOL7l-_Fag-Qw@2x.png',
      discussions: 'https://loomx.io/',
      website: 'https://loomx.io/',
    }, {
      id: 4,
      token: 'Autonio (NIO)',
      description: 'AI-powered trading bots for both amateur and professional traders, with truly automated trading and allow users to create their own algorithm as well as connect to their favourite exchange via API.',
      totalYes: votes.yesVotes[4],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/huexke/autonio_logo_white.png',
      discussions: 'https://t.me/Autonio',
      website: 'https://auton.io/',
    }, {
      id: 5,
      token: 'Sonm (SNM)',
      description: 'Decentralized worldwide fog supercomputer for any general purpose computing from CGI rendering to scientific computations, with global scalability and existing applications including infrastructure for blockchain applications, machine learning, video rendering, site hosting, scientific research, and mining.',
      totalYes: votes.yesVotes[5],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/j4cEyz/SONM.jpg',
      discussion: 'https://t.me/sonm_eng',
      website: 'https://sonm.com/',
    }, {
      id: 6,
      token: 'Musereum (ETM)',
      description: 'Musereum is creating a platform for music tokenization, copyright sharing and automated licensing. Using an ICO model, they are aiming to build an ecosystem that gives artists new ways to capitalise on their talents whilst preserving their creative license and freedom of expression.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/b4sX68/Musereum.png',
      discussions: 'https://t.me/joinchat/AxlyZhDrU1JxQeE27eiTVQ',
      website: 'https://musereum.org/',
    }, {
      id: 7,
      token: 'Digix Gold (DGX)',
      description: 'Digix is a blockchain based platform offering digital tokens backed by 99.99% gold cast bars from London Bullion Market Association-approved refiners. Acting as a digital representation of physical gold, each DGX token represents 1 gram. The transparency, security, traceability of the blockchain ensures that DGX tokens can be transferred with full visibility and auditability.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://assets.coingecko.com/coins/images/4171/large/DGX_Token.png?1530715109',
      discussions: 'https://twitter.com/@DigixGlobal',
      website: 'https://digix.global/',
    }, {
      id: 8,
      token: 'Kleros (PNK)',
      description: 'Blockchain dispute resolution layer that works as decentralised third party to arbitrate disputes, relying on game theoretic incentives to have jurors rule cases correctly in a fast, cheap, reliable and decentralized way.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://slack.kleros.io/images/pinakion.png',
      discussion: 'https://t.me/kleros',
      website: 'https://kleros.io/#',
    }, {
      id: 9,
      token: 'Centrality (CENNZ)',
      description: 'Centrality is a venture studio that partners with leading innovators in key industries to create a marketplace of applications. These applications allow consumers to manage everyday tasks and experiences using peer-to-peer transactions - all via one login and using blockchain-enabled infrastructure.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/nqYU4T/CENNZ_blue.png',
      discussions: 'https://t.me/centralityofficialtelegram',
      website: 'https://www.centrality.ai',
    }, {
      id: 10,
      token: 'Banyan Network (BBN)',
      description: 'Bayan Network’s goal is to create a trusted data connection network with third-party data integration, governance, data applications and open market development. They are building a positive and interactive linked-value network by establishing standards, providing channels, and issuing tokens.',
      totalYes: votes.yesVotes[10],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/eLJBzT/Banyan.png',
      discussions: 'https://t.me/BBNGlobalFans',
      website: 'https://www.banyanbbt.org/',
    }, {
      id: 11,
      token: 'Publica (PBL)',
      description: 'Publica is a platform aiming to revolutionise the publishing industry by offering authors the ability to crowdfunding their works through the blockchain. Utilising smart contracts, Publica’s ecosystem will back the automated performance of agreements like derivative rights for movies, games, and sequels. Readers are able to then fund development of not yet realised works.',
      totalYes: votes.yesVotes[11],
      total: votes.totalVotes,
      logo: 'https://cryptoindex.co/coinlogo/publica.png',
      discussions: 'https://t.me/publicaofficial',
      website: 'https://www.exchangeunion.com/',
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
      description: 'Harnessing the power of design, technology and social intelligence, Ethos proposes a universal wallet & fiat gateway designed to make buying, trading, and managing your crypto assets consumer-friendly.',
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
