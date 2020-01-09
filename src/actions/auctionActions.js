import {
  FETCH_CIRCULATING_NEC_DATA,
  FETCH_BURNED_NEC,
  FETCH_DEVERSIFI_NEC_ETH_DATA,
  FETCH_NEXT_AUCTION_ETH_DATA
} from './actionTypes';
import Web3 from 'web3';
import abis from '../constants/abis.json';
import config from '../constants/config.json';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.providerUrl));

export async function getBurnedNEC() {
  const account = await web3.eth.getAccounts().then(res => res[0]);
  const engineContract = new web3.eth.Contract(
    abis.engineContract,
    config.necEngineContract,
    {
      from: account
    }
  )

  return engineContract.methods.getNextAuction().call().then(res => {
    return res;
  })
}

export const fetchCirculatingNec = data => ({
  type: FETCH_CIRCULATING_NEC_DATA,
  circulatingNecData: [
    {
      name: 'Page A',
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      pv: 4300,
      amt: 2100,
    },
  ]
})

export const fetchBurnedNec = data => {
  const burnedNec = getBurnedNEC();
  return {
    type: FETCH_BURNED_NEC,
    burnedNecData: [
      {
        name: 'Page A',
        pv: 1200,
        amt: 1200,
      },
      {
        name: 'Page B',
        pv: 2398,
        amt: 1210,
      },
      {
        name: 'Page C',
        pv: 8800,
        amt: 3290,
      },
      {
        name: 'Page D',
        pv: 2908,
        amt: 3000,
      },
      {
        name: 'Page E',
        pv: 5800,
        amt: 1181,
      },
      {
        name: 'Page F',
        pv: 4800,
        amt: 1500,
      },
      {
        name: 'Page G',
        pv: 5300,
        amt: 3100,
      },
    ]
  }
}

export const fetchDeversifiNecEth = data => ({
  type: FETCH_DEVERSIFI_NEC_ETH_DATA,
  deversifiNecEthData: [
    {
      name: 'Page A',
      pv: 3000,
      amt: 2000,
    },
    {
      name: 'Page B',
      pv: 798,
      amt: 2210,
    },
    {
      name: 'Page C',
      pv: 8900,
      amt: 2290,
    },
    {
      name: 'Page D',
      pv: 1908,
      amt: 2000,
    },
    {
      name: 'Page E',
      pv: 4080,
      amt: 2181,
    },
    {
      name: 'Page F',
      pv: 3008,
      amt: 2500,
    },
    {
      name: 'Page G',
      pv: 9300,
      amt: 2100,
    },
  ]
})

export const fetchNextAuctionEth = data => ({
  type: FETCH_NEXT_AUCTION_ETH_DATA,
  nextAuctionEthData: [
    {
      name: 'Page A',
      pv: 5400,
      amt: 2400,
    },
    {
      name: 'Page B',
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      pv: 6800,
      amt: 2290,
    },
    {
      name: 'Page D',
      pv: 9908,
      amt: 2000,
    },
    {
      name: 'Page E',
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      pv: 300,
      amt: 2100,
    },
  ]
})
