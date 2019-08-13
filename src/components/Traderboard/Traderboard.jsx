import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-virtualized/styles.css';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchTraders,
  fetchTradersByDate,
} from '../../actions/traderAction';
import './Traderboard.scss';

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

  setStartDate(date) {
    this.setState({
      startDate: date,
    });
    const { endDate, token } = this.state;
    this.props.fetchTradersByDate(date, endDate, token);
  }

  setEndDate(date) {
    this.setState({
      endDate: date,
    });
    const { startDate, token } = this.state;
    this.props.fetchTradersByDate(startDate, date, token);
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
    const {
      startDate, endDate, token,
    } = this.state;
    const {
      traders,
    } = this.props;

    const traderRowGetter = ({ index }) => traders[index];
    return (
      <div className="traderboard">
        <div className="container">
          <div>
            <h1>Trader Board Listings</h1>
            <div className="actions">
              <div className="select">
                <select name="" id="" onChange={this.handleTokenChange}>
                  <option value="ALL">ALL TOKENS</option>
                  <option value="ETH" selected="selected">ETH</option>
                  <option value="DAI">DAI</option>
                  <option value="USD">USD</option>
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
          <table>
            <th>WALLET ADDRESS</th>
            <th>AMOUNT</th>
            {
              traders.map(trader => (
                <tr>
                  <td>{trader.address}</td>
                  <td>
                    {`${Number(trader.amount)
                      .toFixed(4)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${token === 'ALL' ? 'USD' : token}`}
                  </td>
                </tr>
              ))
            }
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
  },
)(Traderboard);
