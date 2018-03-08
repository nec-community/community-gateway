import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginLedger, loginMetamask } from '../../actions/accountActions';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shown: 'metamask',
    };

    this.openLogin = this.openLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.switch = this.switch.bind(this);
  }

  componentDidMount() {}

  openLogin() {
    this.setState({
      open: true,
    });
  }

  closeLogin() {
    this.setState({
      open: false,
    });
  }

  switch(slug) {
    this.setState({
      shown: slug,
    });
  }

  render() {
    return (
      <div>
        <div className="login-fab" onClick={this.openLogin}>
          {
            this.props.accountType || 'Connect wallet'
          }
        </div>
        {
          this.state.open &&
          <div className="login-wrapper">
            <div className="login-inner-wrapper">
              <button className="close-button" onClick={this.closeLogin}>close</button>

              <div className="nav">
                <a
                  className={`${this.state.shown === 'metamask' ? 'active' : ''}`}
                  onClick={() => this.switch('metamask')}
                >
                  Metamask
                </a>
                <a
                  className={`${this.state.shown === 'ledger' ? 'active' : ''}`}
                  onClick={() => this.switch('ledger')}
                >
                  Ledger wallet
                </a>
                <a
                  className={`${this.state.shown === 'keystore' ? 'active' : ''}`}
                  onClick={() => this.switch('keystore')}
                >
                  Keystore
                </a>
              </div>
              <div className="login-input-wrapper">
                {
                  this.state.shown === 'ledger' &&
                  <div className="ledger-login-wrapper">
                    <label>Path:
                      <input type="text" ref={(input) => { this.ledgerPath = input; }} defaultValue="44'/60'/0'/0" />
                    </label>
                    <button onClick={() => this.props.loginLedger(this.ledgerPath.value)}>Connect Ledger</button>
                  </div>
                }
                {
                  this.state.shown === 'metamask' &&
                  <div className="metamask-login-wrapper">
                    <button onClick={() => this.props.loginMetamask(false)}>Connect Metamask</button>
                  </div>
                }
                {
                  this.state.shown === 'keystore' &&
                  <div className="metamask-login-wrapper">
                    <textarea name="" id=""></textarea>
                    <button onClick={() => this.props.loginMetamask(false)}>Connect via Keystore
                    </button>
                  </div>
                }
              </div>

            </div>
          </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  loginLedger: PropTypes.func.isRequired,
  loginMetamask: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  account: state.account.account,
  accountType: state.account.accountType,
});

export default connect(mapStateToProps, {
  loginLedger,
  loginMetamask,
})(Login);
