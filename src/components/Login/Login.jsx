import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginLedger, loginMetamask, loginKeystore, openLogin, closeLogin } from '../../actions/accountActions';
import keystoreService from '../../services/keystoreService';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shown: 'metamask',
      passReq: false,
      fileName: '',
      fileError: '',
    };

    this.switch = this.switch.bind(this);
    this.readKeystore = this.readKeystore.bind(this);
  }

  componentDidMount() {}

  switch(slug) {
    this.setState({
      shown: slug,
    });
  }

  readKeystore(e) {
    const fileReader = new FileReader();
    const inputFile = this.filePicker.files[0];
    this.setState({
      fileName: inputFile.name,
      fileError: '',
    });
    fileReader.onload = () => {
      const keystoreJson = fileReader.result;
      try {
        const passReq = keystoreService.isKeystorePassRequired(keystoreJson);
        console.log('passReq', passReq);
        this.setState({
          passReq,
        });
        if (!passReq)
          this.props.loginKeystore(keystoreJson);
        else if (this.pass.value)
          this.props.loginKeystore(keystoreJson, this.pass.value);
      } catch (err) {
        this.setState({
          fileName: inputFile.name,
          fileError: err.message,
        });
      }
    };
    fileReader.readAsText(inputFile, 'utf-8');
  };

  render() {
    return (
      <div>
        <div className="login-fab" onClick={this.props.openLogin}>
          {
            this.props.accountType || 'Connect wallet'
          }
        </div>
        {
          this.props.loginOpen &&
          <div className="login-wrapper">
            <div className="login-inner-wrapper">
              <button className="close-button" onClick={this.props.closeLogin} />

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
                    <h2>This is a recommended way to access your wallet</h2>
                    <p>
                      Connect your Ledger, unlock it and open the Ethereum app.
                    </p>
                    <label>Path:
                      <input type="text" ref={(input) => { this.ledgerPath = input; }}
                             defaultValue="44'/60'/0'/0" />
                    </label>
                    <button onClick={() => this.props.loginLedger(this.ledgerPath.value)}>Connect
                      Ledger
                    </button>
                  </div>
                }
                {
                  this.state.shown === 'metamask' &&
                  <div className="metamask-login-wrapper">
                    <h2>This is a recommended way to access your wallet</h2>
                    <p>
                      MetaMask is a browser extension that allows you to access your wallet
                      quickly, safely & easily. It is more secure because you never enter your
                      private key on a website. It protects you from phishing & malicious websites.
                    </p>
                    <button onClick={() => this.props.loginMetamask(false)}>Connect Metamask
                    </button>
                  </div>
                }
                {
                  this.state.shown === 'keystore' &&
                  <div className="keystore-login-wrapper">
                    <h2>This is not a recommended way to access your wallet</h2>
                    <p>Uploading your private key to a website might be dangerous.</p>
                    <input
                      className={'hidden'}
                      type="file"
                      id="fileinput"
                      ref={(input) => { this.filePicker = input; }}
                      onChange={this.readKeystore}
                    />
                    <label htmlFor="fileinput">{ this.state.fileName || 'Pick Keystore file'}</label>
                    {
                      this.state.passReq &&
                      <div>
                        <input type="password" ref={(input) => { this.pass = input; }} placeholder="password" />
                      </div>
                    }
                    {
                      this.state.passReq &&
                      <button onClick={this.readKeystore}>Connect via Keystore</button>
                    }
                    {
                      this.state.fileError &&
                      <p className="error">{ this.state.fileError }</p>
                    }
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
  loginKeystore: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  loginOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  account: state.account.account,
  accountType: state.account.accountType,
  loginOpen: state.account.loginOpen,
});

export default connect(mapStateToProps, {
  loginLedger,
  loginMetamask,
  loginKeystore,
  openLogin,
  closeLogin,
})(Login);
