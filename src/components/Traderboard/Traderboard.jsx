import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-virtualized/styles.css';
import { Table, Column, AutoSizer } from 'react-virtualized';
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

class Traderboard extends Component {
  constructor(props) {
    super(props);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    this.state = {
      token: 'ETH',
      startDate: oneWeekAgo,
      endDate: new Date(),
    };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

    this._noRowsRenderer = this._noRowsRenderer.bind(this);
  }

  componentDidMount() {
    const { token, startDate, endDate } = this.state;
    this.props.fetchTradersByDate(startDate, endDate, token);
  }

  setStartDate(startDate) {
    this.setState({
      startDate,
    });
    const { endDate, token } = this.state;
    this.props.fetchTradersByDate(startDate, endDate, token);
  }

  setEndDate(endDate) {
    this.setState({
      endDate,
    });
    const { startDate, token } = this.state;
    this.props.fetchTradersByDate(startDate, endDate, token);
  }

  async handleTokenChange(e) {
    const { startDate, endDate } = this.state;
    const value = e.target.value;
    await this.props.fetchTradersByDate(startDate, endDate, value);
    this.setState({
      token: value,
    });
  }

  _noRowsRenderer() {
    return <div className="noRows">No records</div>;
  }

  render() {
    const { startDate, endDate, token } = this.state;
    const { traders } = this.props;

    const traderRowGetter = ({ index }) => traders[index];
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
                    <select name="" id="" onChange={this.handleTokenChange}>
                      <option value="ALL">ALL TOKENS</option>
                      <option value="ETH" selected>
                        ETH
                      </option>
                      <option value="DAI">DAI</option>
                      <option value="SCR">XD</option>
                      <option value="USD">USDt</option>
                      <option value="MKR">MKR</option>
                      <option value="WBT">wBTC</option>
                      <option value="OMG">OMG</option>
                      <option value="ZRX">ZRX</option>
                      <option value="EDO">EDO</option>
                      <option value="BAT">BAT</option>
                      <option value="SAN">SAN</option>
                      <option value="SNT">SNT</option>
                      <option value="ENJ">ENJ</option>
                      <option value="FUN">FUN</option>
                      <option value="TKN">TKN</option>
                      <option value="REP">REP</option>
                      <option value="TSD">TUSD</option>
                      <option value="UDC">USDC</option>
                      <option value="SPK">SPANK</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="" id="" onChange={this.handleIntervalChange}>
                      <option value="" selected>
                        Latest 30 days
                      </option>
                      <option value="">Latest 7 days</option>
                      <option value="">Latest 24 hours</option>
                    </select>
                  </div>
                  <div className="actions_item_date">
                    From:
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      onChange={this.setStartDate}
                    />
                    To:
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={endDate}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      onChange={this.setEndDate}
                      minDate={startDate}
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
                <tr>
                  <td>{index + 1}</td>
                  <td>{trader.address}</td>
                  <td>{Math.round(Number(trader.amount || trader.USDValue))}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
