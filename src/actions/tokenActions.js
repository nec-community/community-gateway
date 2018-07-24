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
      token: 'Fantom (FTM)',
      description: 'FANTOM is the world\'s first DAG based smart contract platform that solves the issue of scalability and confirmation time of the existing blockchain technology.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://i.imgur.com/W5Rv0SY.png',
      discussions: 'https://t.me/Fantom_English',
      website: 'https://www.fantom.foundation',
    }, {
      id: 4,
      token: 'BlockPass (PASS)',
      description: 'Blockpass gives individuals control over their own data whilst eliminating the friction of repetitively submitting KYC data for every financial service they sign up for. For businesses, Blockpass is a shared KYC platform where a pool of pre-verified users is shared between businesses thus reducing the cost and time of onboarding new customers.',
      totalYes: votes.yesVotes[4],
      total: votes.totalVotes,
      logo: 'https://miro.medium.com/fit/c/240/240/1*JrzELkcCFLgUzMhp5TD1dg.png',
      discussions: 'https://t.me/blockpass',
      website: 'https://blockpass.org/',
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
      description: 'Digix is a blockchain based platform offering digital tokens backed by 99.99% gold cast bars from London Bullion Market Association-approved refiners. Acting as a digital representation of physical gold, each DGX token represents 1 gram of gold on Ethereum. The transparency, security, traceability of the blockchain ensures that DGX tokens can be transacted and transferred with full visibility and auditability.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://assets.coingecko.com/coins/images/4171/large/DGX_Token.png?1530715109',
      discussions: 'https://twitter.com/@DigixGlobal',
      website: 'https://digix.global/',
    }, {
      id: 8,
      token: 'Matrix (MAN)',
      description: 'Matrix is an open source blockchain platform capable of supporting smart contracts and machine learning services. Built on AI toolsets, users are able to execute smart contracts in a more efficient way, with ease, speed and safety fundamental aspects of the process.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://cryptoindex.co/coinlogo/matrix-ai-network.png',
      discussions: 'https://t.me/matrixainetwork',
      website: 'https://www.matrix.io/',
    }, {
      id: 9,
      token: 'Zebi (ZCO)',
      description: 'Zebi is a enterprise grade company that specializes in providing Blockchain based offerings to governments and companies, enabling that to leverage and protect their high value and sensitive data. Zebi’s has created a solution to make high value and sensitive data readily available for legitimate use.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://cryptoindex.co/coinlogo/zebi.png',
      discussions: 'https://t.me/ZebiData',
      website: 'https://www.zebi.io',
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
      token: 'The Abyss (ABYSS)',
      description: 'The Abyss is a digital distribution platform for video games. It offers a motivational and multilevel referral system, allowing gamers to earn from in-game and social activities, and other gamers’ payments as well. By joining The Abyss, developers will reduce their marketing expenses and receive an extra income from referral payments made in other games on the platform.',
      totalYes: votes.yesVotes[12],
      total: votes.totalVotes,
      logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2847.png',
      discussions: 'https://t.me/theabyss',
      website: 'https://www.theabyss.com/',
    }, {
      id: 13,
      token: 'Ethos (ETHOS)',
      description: 'Harnessing the power of design, technology and social intelligence, Ethos proposes a universal wallet & fiat gateway designed to make buying, trading, and managing your crypto assets consumer-friendly.',
      totalYes: votes.yesVotes[13],
      total: votes.totalVotes,
      logo: 'https://image.ibb.co/j2fCC8/Ethos_Logo_white_knockout.png',
      discussions: 'https://www.ethos.io/',
      website: 'https://www.ethos.io/',
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
