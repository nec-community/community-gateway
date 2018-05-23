import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dateToMonth, ordinalExtension } from '../../services/utils';

import './Stats.scss';

class Stats extends Component {
  getNextDate() {
    const d = new Date(1521114341263);
    const now = new Date();
    while (d < now) d.setDate(d.getDate() + 30);
    return d;
  }

  toDecimal(num, decimals) {
    return num.substr(0, num.indexOf('.') + decimals + 1);
  }

  render() {
    return (
      <div className="stats-wrapper">
        <div className="bg-text stats-bg-text">statistics</div>

        <div className="stats-content-wrapper">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div>
              <div>Total fees pledged <br />to token holders:</div>
              <div className="stat-wrapper">
                <div className="stat">{this.props.ethfinexData.totalFee}</div>
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
                  <div className="secondary">{ordinalExtension(this.getNextDate().getDate())}</div>
                  <div>{dateToMonth(this.getNextDate()).toUpperCase()}</div>
                </div>
              </div>
            </div>
            <span className="breaker" />
            <div className="token-supply">
              <div>Token <br />total supply:</div>
              <div className="stat-wrapper">
                <div className="stat">{this.props.ethfinexData.totalTokens}</div>
              </div>
            </div>
            <span className="breaker" />
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

Stats.propTypes = {
  ethfinexData: PropTypes.shape({
    totalFee: PropTypes.string.isRequired,
    totalTokens: PropTypes.string.isRequired,
    necPrice: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  ethfinexData: state.account.ethfinexData,
});

export default connect(mapStateToProps, {})(Stats);
