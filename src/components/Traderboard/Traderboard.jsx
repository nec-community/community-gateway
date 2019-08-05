import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-virtualized/styles.css';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTraders, fetchTradersByDate } from '../../actions/traderAction';
import './Traderboard.scss';

class Traderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ETH',
      startDate: new Date(),
      endDate: new Date(),
    };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

    this._noRowsRenderer = this._noRowsRenderer.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    this.props.fetchTraders(token);
  }

  setStartDate(date) {
    this.setState({
      startDate: date,
    });
  }

  setEndDate(date) {
    this.setState({
      endDate: date,
    });
    const { startDate, endDate, token } = this.state;
    this.props.fetchTradersByDate(new Date(startDate).getTime(), new Date(endDate).getTime(), token);
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
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={this.setStartDate}
                />

                <DatePicker
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
          <AutoSizer>
            {({ width }) => (
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
