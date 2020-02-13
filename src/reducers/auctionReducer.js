import {
  FETCH_CIRCULATING_NEC_DATA,
  FETCH_BURNED_NEC,
  FETCH_DEVERSIFI_NEC_ETH_DATA,
  FETCH_NEXT_AUCTION_ETH_DATA,
  FETCH_CURRENT_AUCTION_SUMMARY,
  FETCH_AUCTION_INTERVAL_DATA,
  SELL_IN_AUCTION_START,
  FETCH_AUCTION_TRANSACTIONS,
  FETCH_ETH_PRICE,
  FETCH_NEXT_AUCTION_DATE
} from '../actions/actionTypes';

const INITIAL_STATE = {
  circulatingNecData: [],
  burnedNecData: [],
  deversifiNecEthPriceData: [],
  nextAuctionEthData: [],
  necPrice: '',
  nextPriceChange: '',
  nextAuctionDate: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CIRCULATING_NEC_DATA:
      return {
        ...state,
        circulatingNecData: action.circulatingNecData,
      };
    case FETCH_BURNED_NEC:
      return {
        ...state,
        burnedNecData: action.burnedNecData,
        totalBurned: action.totalBurned
      };
    case FETCH_DEVERSIFI_NEC_ETH_DATA:
      return {
        ...state,
        deversifiNecEthData: action.deversifiNecEthData,
      };
    case FETCH_NEXT_AUCTION_ETH_DATA:
      return {
        ...state,
        nextAuctionEthData: action.nextAuctionEthData,
      };
    case FETCH_NEXT_AUCTION_DATE:
      return {
        ...state,
        nextAuctionDate: action.nextAuctionDate
      };
    case FETCH_CURRENT_AUCTION_SUMMARY:
      return {
        ...state,
        currentAuctionSummary: action.currentAuctionSummary,
        nextPriceChange: action.nextPriceChange,
        startTimeSeconds: action.startTimeSeconds,
        priceChangeLengthSeconds: action.priceChangeLengthSeconds,
      };
    case FETCH_AUCTION_INTERVAL_DATA:
      return {
        ...state,
        auctionIntervalData: action.auctionIntervalData,
      };
    case SELL_IN_AUCTION_START:
      return {
        ...state,
        sellInAuctionData: action.sellInAuctionData,
      };
    case FETCH_AUCTION_TRANSACTIONS:
      return {
        ...state,
        auctionTransactions: action.auctionTransactions,
      };
    case FETCH_ETH_PRICE:
      return {
        ...state,
        necPrice: action.necPrice
      }
    default:
      return state;
  }
};
