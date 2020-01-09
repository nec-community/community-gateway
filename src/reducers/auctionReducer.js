import {
  FETCH_CIRCULATING_NEC_DATA,
  FETCH_BURNED_NEC,
  FETCH_DEVERSIFI_NEC_ETH_DATA,
  FETCH_NEXT_AUCTION_ETH_DATA
} from '../actions/actionTypes';

const INITIAL_STATE = {
  circulatingNecData: [],
  burnedNecData: [],
  deversifiNecEthPriceData: [],
  nextAuctionEthData: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CIRCULATING_NEC_DATA:
      return {
        ...state,
        circulatingNecData: action.circulatingNecData
      }
    case FETCH_BURNED_NEC:
      return {
        ...state,
        burnedNecData: action.burnedNecData
      }
    case FETCH_DEVERSIFI_NEC_ETH_DATA:
      return {
        ...state,
        deversifiNecEthData: action.deversifiNecEthData
      }
    case FETCH_NEXT_AUCTION_ETH_DATA:
      return {
        ...state,
        nextAuctionEthData: action.nextAuctionEthData
      }
    default:
      return state;
  }
};
