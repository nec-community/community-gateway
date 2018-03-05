import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import Web3 from 'web3';
import TradingReward from '../TradingReward/TradingReward';
import Voting from '../Voting/Voting';
import { checkAccount } from '../../actions/accountActions';
import './Landing.scss';

class App extends Component {
  componentWillMount() {
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
    } else {
      window.web3 = new Web3('wss://mainnet.infura.io/ws');
    }
    console.log('App mounted');
    this.props.checkAccount();
  }

  render() {
    return (
      <div className="landing-wrapper">
        <section className="hero">
          <h1>welcome to
            <b>Nectar.community</b>
          </h1>
          <div className="hero-footer">
            <div>
              <span className="vertical">scroll down</span>
            </div>
            <div>
              <h2>
                The Ethfinex Nectar token (NEC) is used for governance and entitles the holders to
                claim a share of the fees collected on Ethfinex.
              </h2>
            </div>
            <div></div>
          </div>
        </section>

        <section className="statistics">
          <div className="container">
            <h2>Statistics</h2>
            <h3>Statistics subtitle statistics subtitle statistics subtitle statistics</h3>
            <div className="stats-grid">
              <div>
                <div>Total fees pledged <br />to token holders:</div>
                <div className="stat-wrapper">
                  <div className="stat">4254.98</div>
                  <div className="stat-addon">
                    <div>ETH</div>
                  </div>
                </div>
              </div>
              <div>
                <div>Next token <br />distribution date:</div>
                <div className="stat-wrapper">
                  <div className="stat">15</div>
                  <div className="stat-addon">
                    <div className="secondary">th</div>
                    <div>MARCH</div>
                  </div>
                </div>
              </div>
              <div className="token-supply">
                <div>Token <br />total supply:</div>
                <div className="stat-wrapper">
                  <div className="stat">1,000,000,000</div>
                </div>
              </div>
              <div className="current-token">
                <div>Current <br />token value:</div>
                <div className="stat-wrapper">
                  <div className="stat">4213.93</div>
                  <div className="stat-addon">
                    <div>USD</div>
                  </div>
                </div>
              </div>
              <div className="trading-volume">
                <div>Ethfinex 30-day <br />trading volume:</div>
                <div className="stat-wrapper">
                  <div className="stat">5436.21</div>
                  <div className="stat-addon">
                    <div>USD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="calculator">
          <div className="container">
            <TradingReward/>
          </div>
        </section>

        <section className="voting">
          <div className="container">
            <Voting />
          </div>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  showNotif: PropTypes.bool.isRequired,
  notifMessage: PropTypes.string.isRequired,
  notifType: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  accountError: PropTypes.string.isRequired,
  checkAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  account: state.account.account,
  accountError: state.account.accountError,
  showNotif: state.notification.displayed,
  notifMessage: state.notification.message,
  notifType: state.notification.type,
});

export default connect(mapStateToProps, {
  checkAccount,
})(App);
