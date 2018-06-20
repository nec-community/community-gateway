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
      token: 'Cortex',
      description: 'Cortex aims to provide state-of-the-art machine-learning models on the Cortex blockchain, within smart contracts. The ultimate goal is to implement a machine-learning platform which allows users to create and run AI DApps.',
      totalYes: votes.yesVotes[1],
      total: votes.totalVotes,
      logo: 'http://www.cortexlabs.ai/cortexImg/logo.png',
      discussions: 'http://www.cortexlabs.ai/',
      website: 'http://www.cortexlabs.ai/',
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
      token: 'Edenchain',
      description: 'Offering an enterprise blockchain infrastructure powered seamlessly by three distinctive layers, the distributed ledger; providing a decentralised database function, the validation layer; executing and verifying transactions and the bridge layer; connecting external data sources.',
      totalYes: votes.yesVotes[3],
      total: votes.totalVotes,
      logo: 'https://edenchain.io/wp-content/uploads/2018/06/edenmain.png',
      discussions: 'https://edenchain.io/',
      website: 'https://edenchain.io/',
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
      token: 'Hydro Protocol',
      description: 'Hydro Protocol Token (HOT) is designed to improve liquidity for decentralised exchanges by incentivising professional market makers to add liquidity, in much the same way as NEC on Ethfinex.',
      totalYes: votes.yesVotes[6],
      total: votes.totalVotes,
      logo: 'https://www.currencycalculate.com/res/img/cryptocurrencies/hydro-protocol.png',
      discussions: 'https://thehydrofoundation.com/',
      website: 'https://thehydrofoundation.com/',
    }, {
      id: 7,
      token: 'Cindicator',
      description: 'Cindicator CND tokens give access to tools needed to make effective investment and trading decisions under the the high uncertainty of the new economy, by combining a large number of diverse financial analysts and a set of machine-learning models into a single system.',
      totalYes: votes.yesVotes[7],
      total: votes.totalVotes,
      logo: 'https://coinlookup.co/wp-content/uploads/2018/03/cindicator.png',
      discussions: 'https://cindicator.com/',
      website: 'https://cindicator.com/',
    }, {
      id: 8,
      token: 'Nucleus Vision',
      description: 'Developing end to end technology to capture and provide inaccessible data on consumers to retail businesses. Consumers themselves are rewarded in tokens for being part of the network and authorising the sharing of their data.',
      totalYes: votes.yesVotes[8],
      total: votes.totalVotes,
      logo: 'https://www.bitprime.co.nz/wp-content/uploads/2018/03/NCASH.png',
      discussions: 'https://nucleus.vision/',
      website: 'https://nucleus.vision/',
    }, {
      id: 9,
      token: 'Stox',
      description: 'Predicting the outcome of events, from Sports and Politics to Finance & World Cup. Stox targets mainstream audiences via an Ethereum based prediction market platform.',
      totalYes: votes.yesVotes[9],
      total: votes.totalVotes,
      logo: 'https://coinnext.net/wp-content/uploads/2017/12/stox.png',
      discussions: 'https://www.stox.com/',
      website: 'https://www.stox.com/',
    }, {
      id: 10,
      token: 'Lala World',
      description: 'LALA World is an ecosystem for migrants and their unbanked families. LaLa is a new age, one-stop wallet allowing investors to capitalise on the rise of blockchain, as well as the entry of underbanked into the financial ecosystem.',
      totalYes: votes.yesVotes[10],
      total: votes.totalVotes,
      logo: 'https://en.bitcoinwiki.org/upload/en/images/thumb/9/98/LaLa_World_Logo.png/300px-LaLa_World_Logo.png',
      discussions: 'https://www.ethfinex.com/token_listings/34/social_category/200/LALA',
      website: 'https://lalaworld.io/',
    }, {
      id: 11,
      token: 'Consensus AI',
      description: 'Consensus is the open-sourced, decentralized artificial intelligence platform, powered by native cryptocurrency and built with the vision to improve the governance mechanisms at all levels of organizational structures. Once fully realized, it will be able to offer automated, data-driven solutions to the most complex problems of our collective co-existence.',
      totalYes: votes.yesVotes[11],
      total: votes.totalVotes,
      logo: 'https://consensus.ai/launch/images/sign.svg',
      discussions: 'https://www.ethfinex.com/token_listings/47/social_category/281/SEN',
      website: 'https://consensus.ai/',
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
