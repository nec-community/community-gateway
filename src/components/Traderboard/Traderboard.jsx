import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-virtualized/styles.css';
// import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTraders, fetchTradersByDate } from '../../actions/traderAction';
import './Traderboard.scss';

const fishes = [
  { name: 'nectar', amount: '$1000' },
  { name: 'minnow', amount: '$100k' },
  { name: 'dolphin', amount: '$1m' },
  { name: 'shark', amount: '$2m' },
  { name: 'whale', amount: '$5m' },
];

const tokens = [
  'ALL',
  'ETH',
  'NEC',
  'DAI',
  'SCR',
  'USD',
  'MKR',
  'WBT',
  'OMG',
  'ZRX',
  'EDO',
  'BAT',
  'SAN',
  'SNT',
  'ENJ',
  'FUN',
  'TKN',
  'REP',
  'TSD',
  'UDC',
  'SPK',
];

class Traderboard extends Component {
  constructor(props) {
    super(props);

    // const oneMonthAgo = new Date();
    // oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    this.state = {
      token: 'ALL',
      dropdownDateValue: '30d',
      startDate: '',
      endDate: '',
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    // this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this.renderBadges = this.renderBadges.bind(this);
    this.renderPositionChanging = this.renderPositionChanging.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    const { fetchTraders } = this.props;

    const date = new Date();
    date.setDate(date.getDate() - 30);

    fetchTraders(date, token);
  }

  setStartDate(startDate) {
    this.setState({
      startDate,
    });
    const { endDate, token } = this.state;
    const { fetchTradersByDate } = this.props;
    fetchTradersByDate(startDate, endDate, token);
  }

  setEndDate(endDate) {
    this.setState({
      endDate,
    });
    const { startDate, token } = this.state;
    const { fetchTradersByDate } = this.props;
    fetchTradersByDate(startDate, endDate, token);
  }

  async handleTokenChange(e) {
    const { startDate, endDate } = this.state;
    const value = e.target.value;
    await this.props.fetchTradersByDate(startDate, endDate, value);
    this.setState({
      token: value,
    });
  }

  async handleDropdownChange(e) {
    const { token } = this.state;
    const { fetchTraders } = this.props;
    const { value } = e.target;

    const end = new Date();

    switch (value) {
      case '24h':
        end.setDate(end.getDate() - 1);
        await fetchTraders(end, token);
        break;
      case '7d':
        end.setDate(end.getDate() - 7);
        await fetchTraders(end, token);
        break;
      default:
        end.setDate(end.getDate() - 30);
        await fetchTraders(end, token);
        break;
    }
  }

  _noRowsRenderer() {
    return <div className="noRows">No records</div>;
  }

  renderBadges(trader) {
    const count = trader.USDValue || 0;
    let imgSrc = '';

    if (count >= 10 ** 5 && count < 10 ** 6) {
      imgSrc = 'minnow';
    } else if (count >= 10 ** 6 && count < 2 * 10 ** 6) {
      imgSrc = 'dolphin';
    } else if (count >= 2 * 10 ** 6 && count < 5 * 10 ** 6) {
      imgSrc = 'shark';
    } else if (count >= 5 * 10 ** 6) {
      imgSrc = 'whale';
    }

    return (
      <div className="fish__badges">
        {trader.isNECHolder ? <img src="/images/nectar.svg" alt="" /> : null}
        {count >= 10 ** 5 ? <img src={`/images/${imgSrc}.svg`} alt="" /> : null}
      </div>
    );
  }

  renderPositionChanging(trader, index) {
    const {
      traders: { length },
    } = this.props;
    let digit = trader.previousPosition - index;

    if (digit === 0) {
      return null;
    }

    if (trader.previousPosition === -1) {
      digit = length - index;
    }

    const direction = digit > 0 ? 'up' : 'down';

    return (
      <div className="position__change">
        <img
          className={digit > 0 ? 'triangle__increase' : 'triangle__decrease'}
          src={`/images/${direction}.svg`}
          alt=""
        />
        <span>{Math.abs(digit)}</span>
      </div>
    );
  }

  render() {
    const { startDate, endDate } = this.state;
    const { traders } = this.props;

    // const traderRowGetter = ({ index }) => traders[index];
    return (
      <div className="traderboard">
        <div className="container">
          <div>
            <h1>Traderboard</h1>
            <h3>
              Live rankings of every trader on{' '}
              <a href="https://deversifi.com" target="_blank">
                DeversiFi
              </a>
            </h3>
            <div className="info__block">
              <div className="left__part">
                <div className="fishes">
                  {fishes.map(({ name, amount }) => (
                    <div className="fish__item">
                      <div className="fish__icon">
                        <img src={`/images/${name}.svg`} alt="" />
                      </div>
                      <div className="fish__text">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                        <br /> {amount} monthly
                      </div>
                    </div>
                  ))}
                </div>
                <div className="actions">
                  <div className="select">
                    <select name="token" onChange={this.handleTokenChange}>
                      {tokens.map(el => (
                        <option key={el} value={el} selected={el === 'ALL'}>
                          {el === 'ALL' ? 'ALL TOKENS' : el}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select">
                    <select name="interval" onChange={this.handleDropdownChange}>
                      <option value="30d" selected>
                        Latest 30 days
                      </option>
                      <option value="7d">Latest 7 days</option>
                      <option value="24h">Latest 24 hours</option>
                    </select>
                  </div>
                  <div className="date__picker">
                    <DatePicker
                      disabled
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      onChange={this.setStartDate}
                      placeholderText="FROM"
                    />
                  </div>
                  <div className="date__picker">
                    <DatePicker
                      disabled
                      dateFormat="dd/MM/yyyy"
                      selected={endDate}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      onChange={this.setEndDate}
                      minDate={startDate}
                      placeholderText="TO"
                    />
                  </div>
                </div>
              </div>
              <div className="right__part">
                <div className="first__row">
                  <p className="bald__text">Competitions</p>
                  <p className="with__arrow">Start trading</p>
                </div>
                <div className="second__row">
                  <div>
                    <p>ETH/USD - 2 weeks</p>
                    <span>GET INVOLVED</span>
                  </div>
                  <div>
                    <p>XD/ETH - 2 weeks</p>
                    <span>SEE WINNERS</span>
                  </div>
                  <div>
                    <p>ZRX/ETH - 2 weeks</p>
                    <span>SEE WINNERS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {traders.length ? (
            <table>
              <thead>
                <tr>
                  <th>{}</th>
                  <th>WALLET ADDRESS</th>
                  <th>VOLUME</th>
                  <th>POSITION</th>
                  <th>TROPHIES</th>
                </tr>
              </thead>
              <tbody>
                {traders.map((trader, index) => (
                  <tr key={trader.address}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <p>{trader.address}</p>
                        {trader.isNewTrader ? (
                          <span className="new__trader">new trader!</span>
                        ) : null}
                      </div>
                    </td>
                    <td>{Math.floor(Number(trader.amount || trader.USDValue))}</td>
                    <td>{this.renderPositionChanging(trader, index)}</td>
                    <td>{this.renderBadges(trader)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            this._noRowsRenderer()
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  traders: state.traders.traders,
});

Traderboard.propTypes = {
  fetchTraders: PropTypes.func.isRequired,
  fetchTradersByDate: PropTypes.func.isRequired,
  traders: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  {
    fetchTraders,
    fetchTradersByDate,
  }
)(Traderboard);
