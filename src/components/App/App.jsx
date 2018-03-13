import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import Web3 from 'web3';
import config from '../../constants/config.json';
import Routes from '../../routes';
import Login from '../../components/Login/Login';
import { loginMetamask, fetchEthfinexData } from '../../actions/accountActions';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
  }
  componentWillMount() {
    if (typeof web3 !== 'undefined') {
      this.props.loginMetamask(true);
    } else {
      window._web3 = new Web3(config.providerUrl);
    }
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
          <nav className={`${this.state.open ? 'open':''}`}>
            <div className="logo-wrapper">
              <img src="/images/logo.svg" alt="" />
              <span>Nectar.community</span>
            </div>

            <div className="menu-opener-wrapper">
              <a onClick={() => this.setState({open: !this.state.open})}>|||</a>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/all">All Proposals</Link>
              <Link to="/submit">Submit a Proposal</Link>
            </div>
          </nav>
          <Routes />
          <Login />
          <footer>
            <div className="container">
              <div className="logo-wrapper">
                <img src="/images/logo.svg" alt="" />
                <span>Nectar.community</span>
              </div>
              <p className="copyright">
                Copyright Ethfinex Inc
              </p>
            </div>
          </footer>
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {
  showNotif: PropTypes.bool.isRequired,
  notifMessage: PropTypes.string.isRequired,
  notifType: PropTypes.string.isRequired,
  loginMetamask: PropTypes.func.isRequired,
  fetchEthfinexData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showNotif: state.notification.displayed,
  notifMessage: state.notification.message,
  notifType: state.notification.type,
});

export default connect(mapStateToProps, {
  loginMetamask,
  fetchEthfinexData,
})(App);
