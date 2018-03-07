import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import Web3 from 'web3';
import Routes from '../../routes';
import { checkAccount, fetchEthfinexData } from '../../actions/accountActions';
import './App.scss';

class App extends Component {
  componentWillMount() {
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
    } else {
      window.web3 = new Web3('wss://mainnet.infura.io/ws');
    }
    this.props.checkAccount();
    this.props.fetchEthfinexData();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div className={`notification-wrapper ${this.props.showNotif ? 'active' : ''}`}>
            <div className={`notification-inner-wrapper ${this.props.notifType}`}>
              {this.props.notifMessage}
            </div>
          </div>
          <nav>
            <Link to="/">Current</Link>
            <Link to="/past">Past Proposals</Link>
            <Link to="/submit">Submit a Proposal</Link>
            <Link to="/tokens">Nectar Tokens</Link>
          </nav>
          {
            this.props.accountError && false &&
            <h2 className="account-error-wrapper">Voting disabled - {this.props.accountError}</h2>
          }
          <Routes />
        </div>
      </HashRouter>
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
  fetchEthfinexData,
})(App);
