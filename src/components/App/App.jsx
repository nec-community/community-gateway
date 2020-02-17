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

  clickLinkHandler = () => {
    this.setState({ open: false });
  };

  render() {
    const { location } = this.props;
    const isLanding = location.pathname === '/';

    return (
      <div>
        <div className={`notification-wrapper ${this.props.showNotif ? 'active' : ''}`}>
          <div className={`notification-inner-wrapper ${this.props.notifType}`}>
            {this.props.notifMessage}
          </div>
        </div>
        <nav className={`${this.state.open ? 'open' : ''}`}>
          <a
            target="_blank"
            href="https://www.deversifi.com"
            rel="noopener noreferrer"
            className="logo"
          >
            <img src="/images/new-logo-wh.svg" alt="" height="40" />
          </a>

          <div className="menu-opener-wrapper">
            <a onClick={() => this.setState({ open: !this.state.open })}>|||</a>
          </div>
          <div className="nav-links">
            <Link to="/" onClick={this.clickLinkHandler}>
              Home
            </Link>
            <Link to="/traderboard" onClick={this.clickLinkHandler}>
              Traderboard
            </Link>
            <Link to="/whitepaper">Whitepaper</Link>
            <Link to="/burn">Weekly Auction</Link>
            <div className="dropdown-wrapper">
              <a>DAO</a>
              <div>
                <Link onClick={this.clickLinkHandler} to="/dao">
                  About
                </Link>
                <a href="https://stake.nectar.community/#/" target="_blank">
                  Reputation Claim
                </a>
                <a onClick={this.clickLinkHandler} href="https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7" target="_blank">
                  Go to DAO
                </a>
                <a onClick={this.clickLinkHandler} href="https://support.deversifi.com/en/knowledgebase/8-necdao" target="_blank">
                  Knowledge Base
                </a>
              </div>
            </div>
            <div className="dropdown-wrapper">
              <a>Token Listings</a>
              <div>
                <Link onClick={this.clickLinkHandler} to="/tokens">
                  About
                </Link>
                <Link onClick={this.clickLinkHandler} to="/token-leaderboard">
                  Leaderboard
                </Link>
                <Link onClick={this.clickLinkHandler} to="/token-pool">
                  The Pool
                </Link>
              </div>
            </div>
            <Link onClick={this.clickLinkHandler} to="/faq">
              FAQ
            </Link>
          </div>
        </nav>

        <Routes />

        {isLanding ? null : (
          <>
            <Login />
            <footer>
              <div className="container">
                <div className="logo-wrapper">
                  <img src="/images/new-logo-wh.svg" alt="" />
                  <span>Nectar.community</span>
                </div>
                <p className="copyright">Copyright DeversiFi</p>
              </div>
            </footer>
          </>
        )}
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

export default connect(
  mapStateToProps,
  {
    loginMetamask,
    fetchEthfinexData,
  }
)(withRouter(App));
