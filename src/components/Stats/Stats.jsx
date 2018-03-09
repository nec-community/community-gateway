import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import eth from '../../services/ethereumService';
import Current from '../Voting/Current/Current';

import './Stats.scss';

class Stats extends Component {
  constructor() {
    super();

    this.state = {
      shown: 'current',
    };
  }

  toDecimal (num, decimals) {
    return num.substr(0, num.indexOf('.') + decimals + 1);
  }

  getNextDate () {
    let d = new Date(1521114341263);
    const now = new Date();
    while (d < now)
      d.setDate(d.getDate() + 30);
    return d;
  }

  dateToMonth (d) {
    return [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ][d.getMonth()].toUpperCase();
  }

  render() {
    return (
      <div className="stats-wrapper">
        <div className="bg-text stats-bg-text">statistics</div>

        <div className="stats-content-wrapper">
          <h2>Statistics</h2>
          <h3>This book is a treatise on the theory of ethics very popular during the Renaissance.</h3>
          <div className="stats-grid">
            <div>
              <div>Total fees pledged <br />to token holders:</div>
              <div className="stat-wrapper">
                <div className="stat">{eth.weiToEth(this.props.ethfinexData.totalFee)}</div>
                <div className="stat-addon">
                  <div>ETH</div>
                </div>
              </div>
            </div>
            <div>
              <div>Next token <br />distribution date:</div>
              <div className="stat-wrapper">
                <div className="stat">{this.getNextDate().getDate()}</div>
                <div className="stat-addon">
                  <div className="secondary">th</div>
                  <div>{this.dateToMonth(this.getNextDate())}</div>
                </div>
              </div>
            </div>
            <div className="token-supply">
              <div>Token <br />total supply:</div>
              <div className="stat-wrapper">
                <div className="stat">{this.toDecimal(eth.weiToEth(this.props.ethfinexData.totalTokens), 2)}</div>
              </div>
            </div>
            <div className="current-token">
              <div>Current <br />token value:</div>
              <div className="stat-wrapper">
                <div className="stat">{this.props.ethfinexData.necPrice}</div>
                <div className="stat-addon">
                  <div>USD</div>
                </div>
              </div>
            </div>
            <div className="trading-volume">
              <div>Ethfinex 30-day <br />trading volume:</div>
              <div className="stat-wrapper">
                <div className="stat">9999</div>
                <div className="stat-addon">
                  <div>USD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {};

const mapStateToProps = state => ({
  ethfinexData: state.account.ethfinexData,
});

export default connect(mapStateToProps, {})(Stats);
