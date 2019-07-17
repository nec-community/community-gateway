import React, { Component } from 'react';
import MaterialTable from 'material-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTraders, fetchTradersByDate } from '../../actions/traderAction';
import './Traderboard.scss';

class Traderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: 'token',
      token: 'ETH',
      date: new Date(),
    };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleQueryType = this.toggleQueryType.bind(this);
  }
  componentDidMount() {
    const { token } = this.state;
    this.props.fetchTraders(token);
  }

  toggleQueryType(e) {
    e.preventDefault();
    this.setState({
      queryType: e.target.value,
    });
  }

  handleDateChange(date) {
    this.setState({
      date,
    });
    this.props.fetchTradersByDate(date);
  }

  async handleTokenChange(e) {
    e.preventDefault();
    const token = e.target.value;
    await this.props.fetchTraders(token);
    this.setState({
      token,
    });
  }

  render() {
    const { queryType, date, token } = this.state;
    const { ranking } = this.props.traders;
    return (
      <div className="traderboard">
        <div className="container">
          <div>
            <h1>Trader Board Listings</h1>
            <div className="actions">
              <label htmlFor="Query">
                Filter by
                <select
                  value={queryType}
                  onChange={e => this.toggleQueryType(e)}
                >
                  <option value="token">Tokens</option>
                  <option value="date">Date</option>
                </select>
              </label>
              {queryType === 'token' && (
                <div>
                  <select
                    value={token}
                    onChange={e => this.handleTokenChange(e)}
                  >
                    <option value="ETH">ETH</option>
                    <option value="DAI">DAI</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              )}
              {queryType === 'date' && (
                <DatePicker selected={date} onChange={this.handleDateChange} />
              )}
            </div>
          </div>
          <MaterialTable
            columns={[
              { title: 'Address', field: 'address' },
              {
                title: 'Amount',
                render: rowData =>
                  `${Number(rowData.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${token}`,
              },
            ]}
            data={ranking}
            title="Traders Leaderboard"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  traders: state.trader.traders,
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
