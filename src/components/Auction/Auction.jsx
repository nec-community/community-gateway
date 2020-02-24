import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatNumber, formatEth } from '../../services/utils'
import './Auction.scss';
import Diagram from './Diagrams/Diagram';
import Description from './Description';
import { convertToken } from '../../actions/traderAction';
import {
  fetchCirculatingNec,
  fetchBurnedNec,
  fetchDeversifiNecEth,
  fetchDeversifiNecUsd,
  fetchCurrentActionSummary,
  fetchAuctionIntervalData,
  sellInAuctionStart,
  fetchAuctionTransactions,
  fetchEthPrice,
  fetchNecPrice,
  sellAndBurn,
  fetchNextAuctionDate
} from '../../actions/auctionActions';
import Circle from './Diagrams/Circle';
import Loading from '../Loading';

const TABS = [
  {
    name: 'Circulating NEC',
    titleAmount: 100,
    Component: Diagram,
    title: 'circulatingNecData',
  },
  {
    name: 'Burned NEC',
    titleAmount: 50,
    Component: Diagram,
    title: 'burnedNecData',
  },
  {
    name: 'DeversiFi NEC/ETH Price',
    titleAmount: 140,
    Component: Diagram,
    title: 'deversifiNecEthData',
  },
  {
    name: 'Deversifi NEC/USD Price',
    Component: Diagram,
    titleAmount: 140,
    title: 'deversifiNecUsdData'
  }
];

class Auction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 1,
      convert: 1,
      tokensForSell: '',
      data: [],
      summaryValues: [],
      sellAndBurnLoading: false,
      circulatingNecDataLoading: false,
      burnedNecDataLoading: true,
      deversifiNecEthDataLoading: true,
      nextAuctionEthDataLoading: true,
      descriptionVisible: false
    };
  }

  componentDidMount() {
    this.fetchBurnData();

    this.dataPolling = setInterval(
      () => {
        this.fetchBurnData();
      }, 60000);

    convertToken('NEC', 'ETH').then(res =>
      this.setState({
        convert: res.toFixed(5),
      })
    );
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  fetchBurnData = async () => {
    this.props.fetchNextAuctionDate();
    await this.props.fetchBurnedNec();
    this.setState({ burnedNecDataLoading: true });
    await this.props.fetchCirculatingNec();
    this.setState({ circulatingNecDataLoading: false });
    await this.props.fetchDeversifiNecEth();
    await this.props.fetchDeversifiNecUsd();
    this.setState({ deversifiNecEthDataLoading: false });
    this.props.fetchCurrentActionSummary();
    this.props.fetchAuctionIntervalData();
    this.props.fetchAuctionTransactions();
    this.props.fetchEthPrice();
    this.props.fetchNecPrice();
  }

  onTabClick = async index => {
    const { activeTabIndex } = this.state;

    if (index === activeTabIndex) {
      return null;
    }

    this.setState({
      activeTabIndex: index,
    });
  };

  timeCountdown = (date) => {
    if (date < 0) {
      return '0 minutes'
    }
    let minutes = Math.floor((date / (60)) % 60)
    let hours = Math.floor((date / (60 * 60)) % 24)
    const days = Math.floor(date / (60 * 60 * 24))

    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes

    if (days == 0 && hours == 0) {
      return `${minutes}m`
    }
    if (days == 0) {
      return `${hours}h ${minutes}m`
    }
    return `${days}d ${hours}h ${minutes}m`
  }

  formatTimeNextAuction = () => {
    const { nextAuctionDate } = this.props;

    const timestampMs = Date.now() + nextAuctionDate * 1000;
    return new Date(timestampMs).toLocaleString();
  }

  changeInputValue = e => {
    const { value } = e.target;

    this.setState({
      tokensForSell: value,
    });
  };

  sellTokens = async () => {
    this.setState({ sellAndBurnLoading: true })
    await this.props.sellInAuctionStart()

    const { currentAuctionSummary } = this.props
    const { tokensForSell } = this.state
    await this.props.sellAndBurn(tokensForSell, currentAuctionSummary)
    this.setState({ sellAndBurnLoading: false })
  }

  renderTabTileAmount = (title) => {
    if(this.props[title].length > 0) {
      switch(title) {
        case 'deversifiNecEthData':
          return this.props.deversifiNecEthData ? this.props[title][this.props[title].length - 1].pv.toFixed(6) : 0
        default:
          return formatNumber(this.props[title][this.props[title].length - 1].pv);
      }
    }
  }

  renderTabPrice = title => {
    const { necPrice, ethPrice } = this.props;

    if(this.props[title].length > 0) {
      switch(title) {
        case 'deversifiNecUsdData':
          return ''
        case 'burnedNecData':
          return `US $ ${formatNumber((this.props[title][this.props[title].length - 1].pv * necPrice).toFixed(2))}`;
        case 'deversifiNecEthData':
          return `US $ ${formatNumber((this.props[title][this.props[title].length - 1].pv * ethPrice).toFixed(2))}`;
        default:
          return `US $ ${formatNumber((this.props[title][this.props[title].length - 1].pv * necPrice).toFixed(2))}`;
      }
    }
  }

  calcEthPercentage = () => {
    const { remainingEth, initialEth } = this.props.currentAuctionSummary;

    return (100 - (remainingEth * 100) / initialEth)
  }

  calcTimestampPercentage = () => {
    const { nextPriceChange, startTimeSeconds, priceChangeLengthSeconds } = this.props;

    const initialPercentage = 100 * nextPriceChange / priceChangeLengthSeconds;

    return Math.floor(100 - initialPercentage)
  }

  render() {
    const { activeTabIndex, tokensForSell, sellAndBurnLoading } = this.state;
    const ActiveTabComponent = TABS[activeTabIndex].Component;
    const { currentAuctionSummary, nextPriceChange, auctionTransactions, ethPrice } = this.props;

    return (
      <div className="auction">
        <div className="container">
          <div className="overview">
            <div className="overview__header">
              <h1>necBurn</h1>
              <p>Overview of NEC Auctions</p>
            </div>
            <div className="overview__text">
              <p>
                Once per week DeversiFi exchange trading fees that are pledged to NEC token holders
                are auctioned. NEC holders can sell their NEC in exchange for the auctioned ETH. Any
                NEC tokens sold in the auctions are burned. &nbsp;
                <strong onClick={() => this.setState({ descriptionVisible: true })} className="overview__link">See details</strong>
              </p>
              <div className="overview__auction">
                <p>
                  Auction: <span className="auction__status">{this.props.nextAuctionDate > 0 ? 'live' : 'closed'}</span>
                </p>
                <p className="little__text">Next auction start</p>
                <p>{this.timeCountdown(this.props.nextAuctionDate)}</p>
                <p className="little__text">{this.formatTimeNextAuction()}</p>
              </div>
            </div>
            <Description
              visible={this.state.descriptionVisible}
              closeDescription={() => this.setState({ descriptionVisible: false })}
            />
          </div>
          {currentAuctionSummary && currentAuctionSummary.remainingEth > 0.01 && (
            <>
              <section className="summary">
                <h3>Summary</h3>
                <ul className="tabs">
                  {TABS.map((tab, index) => (
                    <li key={tab.name}>
                      <button
                        className={`tab__button ${index === activeTabIndex ? 'active__tab' : null}`}
                        onClick={() => this.onTabClick(index)}
                      >
                        <p>{tab.name}</p>
                        <span>
                          {this.state[`${this.props[tab.title]}Loading`] ? <Loading /> : this.renderTabTileAmount(tab.title)}
                        </span>
                        <span className="little__text">{this.props[tab.title] && this.renderTabPrice(tab.title)}</span>
                      </button>
                    </li>
                   ))}
                </ul>
                <ActiveTabComponent
                  tabContent={TABS[activeTabIndex]}
                  data={this.props[TABS[activeTabIndex].title]}
                />
              </section>

              <section>
                <h3 className="current-auction__header">Current Auction - live</h3>
                <div className="current-auction">
                  <div className="current-auction__card">
                    <span className="current-auction__title">
                      Current Auction <br /> NEC Price
                    </span>
                    <div>
                      <span className="current-auction__value">
                        {currentAuctionSummary.currentNecPrice} <small>ETH</small>
                      </span>
                      <small className="current-auction__usd">
                        {`USD $ ${(currentAuctionSummary.currentNecPrice * ethPrice).toFixed(5)}`}
                      </small>
                    </div>
                  </div>
                  <div className="current-auction__card">
                    <span className="current-auction__title">
                      Next Price<br /> NEC Price
                    </span>
                    <div>
                      <span className="current-auction__value">
                        {currentAuctionSummary.nextNecPrice} <small>ETH</small>
                      </span>

                      <small className="current-auction__usd">
                        {`USD $ ${(currentAuctionSummary.nextNecPrice * ethPrice).toFixed(5)}`}
                      </small>
                    </div>

                  </div>
                </div>
                <div className="graphics__container">
                  <Circle
                   percentage={this.calcTimestampPercentage()}
                   title="Next price change"
                  >
                    <text x="18" y="20" className="chart-title">
                      {this.timeCountdown(nextPriceChange)}
                    </text>
                  </Circle>
                  <Circle
                    percentage={this.calcEthPercentage()}
                    title="ETH Remaining"
                  >
                    <text x="18" y="10" className="chart-title">
                      <tspan x="18"  dy="1.2em">
                        {formatEth(currentAuctionSummary.remainingEth)}
                      </tspan>
                      <tspan x="18"  dy="1.2em">of</tspan>
                      <tspan  x="18" dy="1.2em">
                        {formatEth(currentAuctionSummary.initialEth)}
                      </tspan>
                    </text>
                  </Circle>
                </div>
                <div className="current-auction">
                  <div className="current-auction__card">
                    <span className="current-auction__title">
                      NEC burned in Auction
                    </span>
                    <span className="current-auction__value">
                      {formatNumber(currentAuctionSummary.purchasedNec.toFixed(3))}
                    </span>
                  </div>
                  <div className="current-auction__card">
                    <span className="current-auction__title">
                      Burned <br />average price
                    </span>
                    <div>
                      <span className="current-auction__value">
                        {currentAuctionSummary.necAveragePrice} <small>ETH</small>
                      </span>
                      <small className="current-auction__usd">
                        {`USD $ ${(currentAuctionSummary.necAveragePrice * ethPrice).toFixed(5)}`}
                      </small>
                    </div>
                  </div>
                </div>
              </section>
                <div className="sell__tokens">
                <span>SELL</span>
                <div className="input__container">
                  <input value={tokensForSell} onChange={this.changeInputValue} />
                  <span>NEC</span>
                </div>
                <span>FOR</span>
                <div className="input__container">
                  <p>{(currentAuctionSummary.currentNecPrice * this.state.tokensForSell).toFixed(5)}</p>
                  <span>ETH</span>
                </div>
                <button
                  onClick={this.sellTokens}
                  disabled={!this.state.tokensForSell || this.state.tokensForSell < 0 || sellAndBurnLoading}
                >
                  {sellAndBurnLoading ? <Loading /> : 'SELL'}
                </button>
              </div>
            </>
          )}
          <div className="table__container">
            <h3>Transaction History</h3>
            <h4 className="auction__subtitle">A full list of transactions is available on Etherscan
              <a rel="noopener noreferrer" href="https://etherscan.io/address/0xe96f714a38bc4b2c12dada2aeac08cffab50435e#tokentxns" target="_blank">here</a>
            </h4>
            <table>
              <thead>
                <tr>
                  <th>Block Number</th>
                  <th></th>
                  <th>WALLET ADDRESS</th>
                  <th>NEC</th>
                  <th>ETH</th>
                  <th>PRICE NEC/ETH</th>
                  <th>PRICE NEC/USD</th>
                  <th>USD</th>
                </tr>
              </thead>
              <tbody>
                {auctionTransactions ?
                  auctionTransactions.map((trxn, index) => (
                    <tr key={index}>
                      <td>{trxn.blockNumber}</td>
                      <td></td>
                      <td>{trxn.wallet_address}</td>
                      <td>{trxn.nec}</td>
                      <td>{trxn.eth}</td>
                      <td>{trxn.price_nec_eth}</td>
                      <td>{trxn.price_nec_usd}</td>
                      <td>{trxn.usd}</td>
                    </tr>
                  )) : <tr className="table__loading"><Loading /></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Auction.propTypes = {
  fetchCirculatingNec: PropTypes.func.isRequired,
  fetchBurnedNec: PropTypes.func.isRequired,
  fetchDeversifiNecEth: PropTypes.func.isRequired,
  fetchCurrentActionSummary: PropTypes.func.isRequired,
  fetchAuctionIntervalData: PropTypes.func.isRequired,
  sellInAuctionStart: PropTypes.func.isRequired,
  fetchAuctionTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  circulatingNecData: state.auction.circulatingNecData,
  burnedNecData: state.auction.burnedNecData,
  deversifiNecEthData: state.auction.deversifiNecEthData,
  deversifiNecUsdData: state.auction.deversifiNecUsdData,
  nextAuctionEthData: state.auction.nextAuctionEthData,
  currentAuctionSummary: state.auction.currentAuctionSummary,
  auctionIntervalData: state.auction.auctionIntervalData,
  sellInAuctionData: state.auction.sellInAuctionData,
  auctionTransactions: state.auction.auctionTransactions,
  necPrice: state.auction.necPrice,
  ethPrice: state.auction.ethPrice,
  nextPriceChange: state.auction.nextPriceChange,
  startTimeSeconds: state.auction.startTimeSeconds,
  nextAuctionDate: state.auction.nextAuctionDate,
  priceChangeLengthSeconds: state.auction.priceChangeLengthSeconds
});

export default connect(mapStateToProps, {
  fetchCirculatingNec,
  fetchBurnedNec,
  fetchDeversifiNecEth,
  fetchDeversifiNecUsd,
  fetchCurrentActionSummary,
  fetchAuctionIntervalData,
  sellInAuctionStart,
  fetchAuctionTransactions,
  fetchEthPrice,
  fetchNecPrice,
  sellAndBurn,
  fetchNextAuctionDate
})(Auction);
