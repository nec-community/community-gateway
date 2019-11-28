import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';
import 'react-virtualized/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTraders, fetchTradersByCustomDate, convertToken } from '../../actions/traderAction';
import { fetchPostsByTag } from '../../actions/competitionActions';
import './Traderboard.scss';

const fishes = [
  { id: 0, name: 'nectar', amount: '1000 NEC' },
  { id: 1, name: 'minnow', amount: '$100k monthly' },
  { id: 2, name: 'dolphin', amount: '$1m monthly' },
  { id: 3, name: 'shark', amount: '$2m monthly' },
  { id: 4, name: 'whale', amount: '$5m monthly' },
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

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 60);

    this.state = {
      token: 'ALL',
      oldDate,
      dropdownDate: oneMonthAgo,
      dropdownDateTextValue: '30d',
      startDate: '',
      endDate: '',
      dateIntervalMode: false,
      conversionRate: 1,
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this.renderBadges = this.renderBadges.bind(this);
    this.renderPositionChanging = this.renderPositionChanging.bind(this);
    this.onClickOutsideSendRequest = this.onClickOutsideSendRequest.bind(this);
  }

  componentDidMount() {
    const { oldDate, dropdownDate, token } = this.state;
    const { fetchTraders, fetchPostsByTag } = this.props;

    fetchTraders(oldDate, dropdownDate, token);
    fetchPostsByTag();
  }

  setStartDate(startDate) {
    this.setState({
      startDate,
    });
  }

  setEndDate(endDate) {
    this.setState({
      endDate,
    });
  }

  onClickOutsideSendRequest() {
    const { startDate, endDate, token } = this.state;
    const { fetchTradersByCustomDate } = this.props;

    if (startDate && endDate) {
      this.setState({
        dateIntervalMode: true,
      });
      const intervalSelect = document.getElementsByName('interval')[0];
      intervalSelect.selectedIndex = -1;
      fetchTradersByCustomDate(startDate, endDate, token);
    } else {
      return null;
    }
  }

  async handleTokenChange(e) {
    const { startDate, endDate, oldDate, dropdownDate, dateIntervalMode } = this.state;
    const { fetchTraders, fetchTradersByCustomDate } = this.props;
    const { value } = e.target;

    if (value === 'ALL' || value === 'USD') {
      this.setState({
        token: value,
        conversionRate: 1,
      });
    } else {
      this.setState(
        {
          token: value,
        },
        () => {
          convertToken(value).then(resp =>
            this.setState({
              conversionRate: resp,
            })
          );
        }
      );
    }

    if (dateIntervalMode) {
      await fetchTradersByCustomDate(startDate, endDate, value);
    } else {
      await fetchTraders(oldDate, dropdownDate, value);
    }
  }

  async handleDropdownChange(e) {
    const { token } = this.state;
    const { fetchTraders } = this.props;
    const { value } = e.target;

    const date = new Date();
    const old = new Date();

    if (value === '24h') {
      old.setDate(old.getDate() - 2);
      date.setDate(date.getDate() - 1);
    } else if (value === '7d') {
      old.setDate(old.getDate() - 14);
      date.setDate(date.getDate() - 7);
    } else {
      old.setDate(old.getDate() - 60);
      date.setDate(date.getDate() - 30);
    }

    this.setState({
      oldDate: old,
      dropdownDate: date,
      dropdownDateTextValue: value,
      dateIntervalMode: false,
      startDate: '',
      endDate: '',
    });

    await fetchTraders(old, date, token);
  }

  _noRowsRenderer(text) {
    return <div className="noRows">{text}</div>;
  }

  calculateVolume(trader) {
    const { conversionRate } = this.state;
    const { isFetching } = this.props;

    if (isFetching) {
      return null;
    }

    const amount = trader.amount || trader.USDValue;

    return Math.floor(amount * conversionRate)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  renderBadges(trader) {
    const { isFetching } = this.props;

    if (isFetching) {
      return null;
    }

    const amount = trader.lastMonthAmount;
    let imgSrc = '';

    if (amount >= 10 ** 5 && amount < 10 ** 6) {
      imgSrc = 'minnow';
    } else if (amount >= 10 ** 6 && amount < 2 * 10 ** 6) {
      imgSrc = 'dolphin';
    } else if (amount >= 2 * 10 ** 6 && amount < 5 * 10 ** 6) {
      imgSrc = 'shark';
    } else if (amount >= 5 * 10 ** 6) {
      imgSrc = 'whale';
    }

    return (
      <div className="fish__badges">
        {trader.tokenNEC >= 1000 ? <img src="/images/nectar.png" alt="" /> : null}
        {amount >= 10 ** 5 ? (
          <img src={`/images/${imgSrc}.svg`} className="animated" alt="" />
        ) : null}
      </div>
    );
  }

  renderPositionChanging(trader, index) {
    const { startDate, endDate, dateIntervalMode } = this.state;
    const { isFetching } = this.props;

    if ((startDate && endDate) || (isFetching && !dateIntervalMode)) {
      return null;
    }

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
    const { startDate, endDate, dropdownDateTextValue } = this.state;
    const { traders, isFetching, posts } = this.props;

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
                  {fishes.map(({ id, name, amount }) => (
                    <div key={id} className="fish__item">
                      <div className="fish__icon">
                        {name === 'nectar' ? (
                          <img src="/images/nectar.png" alt="" />
                        ) : (
                          <img src={`/images/${name}.svg`} alt="" />
                        )}
                      </div>
                      <div className="fish__text">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                        <br /> {amount}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="actions">
                  <div className="selects">
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
                          Rolling 30 days
                        </option>
                        <option value="7d">Rolling 7 days</option>
                        <option value="24h">Rolling 24 hours</option>
                      </select>
                    </div>
                  </div>
                  <div className="pickers">
                    <div className="date__picker">
                      <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="p"
                        onChange={this.setStartDate}
                        placeholderText="FROM"
                        shouldCloseOnSelect={false}
                        onClickOutside={this.onClickOutsideSendRequest}
                      />
                    </div>
                    <div className="date__picker">
                      <DatePicker
                        selected={endDate}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                        onChange={this.setEndDate}
                        placeholderText="TO"
                        shouldCloseOnSelect={false}
                        onClickOutside={this.onClickOutsideSendRequest}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="right__part">
                <div className="first__row">
                  <p className="bald__text">Competitions</p>
                  <p className="with__arrow">
                    <a href="https://app.deversifi.com" target="_blank">
                      Start trading
                    </a>
                  </p>
                </div>
                <div className="second__row">
                  {posts.map(post => (
                    <div key={post.id}>
                      <p>{post.title}</p>
                      <a href={post.url} target="_blank">
                        READ POST
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {isFetching && !traders.length ? (
            this._noRowsRenderer('Loading...')
          ) : traders.length ? (
            <div className={isFetching ? 'table__container__blur' : 'table__container'}>
              <table>
                <thead>
                <tr>
                  <th>{}</th>
                  <th>WALLET ADDRESS</th>
                  <th>USD VOLUME</th>
                  <th
                    data-tip={`A previous ${dropdownDateTextValue} period is used for comparison.`}
                  >
                    POSITION
                  </th>
                  <th>TROPHIES</th>
                </tr>
                </thead>
                <tbody>
                {traders.map((trader, index) => (
                  <tr key={trader.address}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <a
                          href={`https://etherscan.io/address/${trader.address}`}
                          target="_blank"
                        >
                          {trader.address}
                        </a>
                        {trader.isNewTrader ? (
                          <span className="new__trader">new trader!</span>
                        ) : null}
                      </div>
                    </td>
                    <td>{this.calculateVolume(trader)}</td>
                    <td>{this.renderPositionChanging(trader, index)}</td>
                    <td>{this.renderBadges(trader)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              <ReactTooltip />
            </div>
          ) : (
            this._noRowsRenderer('No records')
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  traders: state.traders.traders,
  isFetching: state.traders.isFetching,
  posts: state.competitions.posts,
});

Traderboard.propTypes = {
  fetchTraders: PropTypes.func.isRequired,
  fetchTradersByCustomDate: PropTypes.func.isRequired,
  traders: PropTypes.instanceOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.instanceOf(Object).isRequired,
  fetchPostsByTag: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    fetchTraders,
    fetchTradersByCustomDate,
    fetchPostsByTag,
  }
)(Traderboard);
