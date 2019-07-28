import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-virtualized/styles.css';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { fetchTraders, fetchTradersByDate } from '../../actions/traderAction';
import './Traderboard.scss';

class Traderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ETH',
      date: new Date(),
    };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this._noRowsRenderer = this._noRowsRenderer.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    this.props.fetchTraders(token);
  }

  handleDateChange(date) {
    this.setState({
      date,
    });
    this.props.fetchTradersByDate(date);
  }

  async handleTokenChange(token) {
    await this.props.fetchTraders(token);
    this.setState({
      token,
    });
  }

  _noRowsRenderer() {
    return <div className="noRows">No records</div>;
  }

  render() {
    const { date, token } = this.state;
    const {
      traders, volume, isTrader, isPairs,
    } = this.props;

    const traderRowGetter = ({ index }) => traders[index];
    const volumeRowGetter = ({ index }) => volume[index];
    return (
      <div className="traderboard">
        <div className="container">
          <div>
            <h1>Trader Board Listings</h1>
            <div className="actions">
              <div
                className={token === 'ETH' ? 'selected' : null}
                onClick={() => this.handleTokenChange('ETH')}
              >
                <span className="actions_item__query">ETH</span>
              </div>
              <div
                className={token === 'DAI' ? 'selected' : null}
                onClick={() => this.handleTokenChange('DAI')}
              >
                <span className="actions_item__query">DAI</span>
              </div>
              <div
                className={token === 'USD' ? 'selected' : null}
                onClick={() => this.handleTokenChange('USD')}
              >
                <span className="actions_item__query">USD</span>
              </div>
              <div className="actions_item_date">
                <DatePicker
                  selected={date}
                  calendarClassName="calendar"
                  filterDate={date => moment() > date}
                  onChange={this.handleDateChange}
                />
              </div>
            </div>
          </div>
          {isTrader && (
            <AutoSizer>
              {({ width, height }) => (
                <Table
                  width={width}
                  height={300}
                  headerHeight={30}
                  rowCount={traders.length}
                  rowGetter={traderRowGetter}
                  noRowsRenderer={this._noRowsRenderer}
                  rowHeight={30}
                  headerClassName="table_header"
                >
                  <Column
                    width={600}
                    label="Wallet Address"
                    dataKey="address"
                  />
                  <Column
                    width={200}
                    label="Amount"
                    dataKey="amount"
                    cellRenderer={({ cellData }) =>
                      `${Number(cellData)
                        .toFixed(4)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${token}`
                    }
                  />
                </Table>
              )}
            </AutoSizer>
          )}
          {isPairs && (
            <AutoSizer>
              {({ width, height }) => (
                <Table
                  width={width}
                  height={300}
                  headerHeight={30}
                  rowCount={volume.length}
                  rowGetter={volumeRowGetter}
                  noRowsRenderer={this._noRowsRenderer}
                  rowHeight={30}
                  headerClassName="table_header"
                >
                  <Column
                    width={600}
                    label="Wallet Address"
                    dataKey="address"
                  />
                  <Column
                    width={200}
                    label="Symbol"
                    dataKey="value"
                    cellRenderer={({ cellData }) => {
                      if (cellData.ETH && cellData.USD) {
                        return 'ETH/USD';
                      } else if (cellData.USD && cellData.ZRX) {
                        return 'ZRX/USD';
                      }
                    }}
                  />
                  <Column
                    width={200}
                    label="Total in USD"
                    dataKey="totalUsd"
                    cellRenderer={({ cellData }) =>
                      `${Number(cellData)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')} USD`
                    }
                  />
                </Table>
              )}
            </AutoSizer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  traders: state.traders.traders,
  volume: state.traders.volume,
  isTrader: state.traders.isTrader,
  isPairs: state.traders.isPairs,
});

Traderboard.defaultProps = {
  volume: [],
};

Traderboard.propTypes = {
  fetchTraders: PropTypes.func.isRequired,
  fetchTradersByDate: PropTypes.func.isRequired,
  traders: PropTypes.instanceOf(Object).isRequired,
  volume: PropTypes.instanceOf(Object),
  isTrader: PropTypes.bool.isRequired,
  isPairs: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  {
    fetchTraders,
    fetchTradersByDate,
  },
)(Traderboard);
