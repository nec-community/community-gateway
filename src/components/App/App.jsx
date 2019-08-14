import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Web3 from 'web3';
import ReactGA from 'react-ga';
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
    };
  }

  componentWillMount() {
    // Set default provider & silently attempt to login with Metamask (don't display errors)
    window._web3 = new Web3(config.providerUrl);
    this.props.loginMetamask(true);
    this.props.fetchEthfinexData();
    ReactGA.pageview(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ReactGA.pageview(this.props.location.pathname);
    }
  }

  render() {
    return (
      <div>
        <div className={`notification-wrapper ${this.props.showNotif ? 'active' : ''}`}>
          <div className={`notification-inner-wrapper ${this.props.notifType}`}>
            {this.props.notifMessage}
          </div>
        </div>
        <nav className={`${this.state.open ? 'open' : ''}`}>
          <div className="logo-wrapper">
            <a target="_blank" href="https://www.ethfinex.com" rel="noopener noreferrer">
              <img src="/images/logo.svg" alt="" />
            </a>
            <span>Nectar.community</span>
          </div>

          <div className="menu-opener-wrapper">
            <a onClick={() => this.setState({ open: !this.state.open })}>|||</a>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/traderboard">Traderboard</Link>
            <div className="dropdown-wrapper">
              <a>Token Listings</a>
              <div>
                <Link onClick={() => this.setState({open: false})} to="/tokens">About</Link>
                <Link onClick={() => this.setState({open: false})} to="/token-leaderboard">Leaderboard</Link>
                <Link onClick={() => this.setState({open: false})} to="/token-pool">The Pool</Link>
              </div>
            </div>
            <div className="dropdown-wrapper">
              <a>Proposals</a>
              <div>
                <Link onClick={() => this.setState({open: false})} to="/delegate-votes">Delegate Votes</Link>
                <Link onClick={() => this.setState({open: false})} to="/proposals">All Proposals</Link>
                <Link onClick={() => this.setState({open: false})} to="/pending">Pending Proposals</Link>
                <Link onClick={() => this.setState({open: false})} to="/submit">Submit a Proposal</Link>
              </div>
            </div>
            <Link onClick={() => this.setState({open: false})} to="/faq">FAQ</Link>
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
    );
  }
}

App.propTypes = {
  showNotif: PropTypes.bool.isRequired,
  notifMessage: PropTypes.string.isRequired,
  notifType: PropTypes.string.isRequired,
  loginMetamask: PropTypes.func.isRequired,
  fetchEthfinexData: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  showNotif: state.notification.displayed,
  notifMessage: state.notification.message,
  notifType: state.notification.type,
  account: state.account.account,
  isAdmin: state.account.isAdmin,
});

export default connect(mapStateToProps, {
  loginMetamask,
  fetchEthfinexData,
})(withRouter(App));
