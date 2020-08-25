import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ledgerListAddresses,
  loginLedger,
  loginMetamask,
  loginKeystore,
  openLogin,
  closeLogin,
} from '../../actions/accountActions';
import keystoreService from '../../services/keystoreService';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: 'metamask',
      passReq: false,
      fileName: '',
      fileError: '',
      ledgerAccounts: [],
      ledgerPage: 0,
      decrypting: false,
    };

    this.switch = this.switch.bind(this);
    this.ledgerList = this.ledgerList.bind(this);
    this.paginateLedger = this.paginateLedger.bind(this);
    this.readKeystore = this.readKeystore.bind(this);
  }

  componentDidMount() {}

  switch(slug) {
    this.setState(
      {
        shown: slug,
      },
      () => {
        if (slug === 'ledger') this.ledgerList();
      },
    );
  }

  readKeystore() {
    const fileReader = new FileReader();
    const inputFile = this.filePicker.files[0];
    this.setState({
      fileName: inputFile.name,
      fileError: '',
      decrypting: true,
    });
    fileReader.onload = () => {
      const keystoreJson = fileReader.result;
      try {
        const passReq = keystoreService.isKeystorePassRequired(keystoreJson);
        this.setState({
          passReq,
          decrypting: false,
        });
        if (!passReq) this.props.loginKeystore(keystoreJson);
        else if (this.pass.value) this.props.loginKeystore(keystoreJson, this.pass.value);
      } catch (err) {
        this.setState({
          fileName: inputFile.name,
          fileError: err.message,
          decrypting: false,
        });
      }
    };
    fileReader.readAsText(inputFile, 'utf-8');
  }

  async ledgerList() {
    const path = this.ledgerPath.value;
    const ledgerAccounts = await this.props.ledgerListAddresses(path, this.state.ledgerPage);
    this.setState({ ledgerAccounts });
  }

  paginateLedger(increment) {
    if (this.state.ledgerPage + increment < 0) return;
    this.setState({ ledgerPage: this.state.ledgerPage + increment }, () => this.ledgerList());
  }

  render() {
    const { decrypting } = this.state;
    return (
      <div>
        <div className="login-fab" onClick={this.props.openLogin}>
          {this.props.accountType || 'Connect wallet'}
        </div>
        {this.props.loginOpen && (
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
                {this.state.shown === 'ledger' && (
                  <div className="ledger-login-wrapper">
                    <h2 className="title__subtitle">This is a recommended way to access your
                      wallet</h2>
                    <p className="text__small">Connect your Ledger, unlock it and open the Ethereum
                      app.</p>
                    <label>
                      Path:
                      <input
                        type="text"
                        ref={input => {
                          this.ledgerPath = input;
                        }}
                        defaultValue="44'/60'/0'"
                      />
                    </label>
                    <button className="button__primary" onClick={() => this.ledgerList()}>Connect
                      Ledger
                    </button>
                    <table cellSpacing={0}>
                      <tbody>
                      <tr className="meta-row">
                        <th>Address</th>
                        <th>ETH Balance</th>
                        <th>NEC Balance</th>
                      </tr>
                      {this.state.ledgerAccounts.map(acc => (
                        <tr key={acc.address} onClick={() => this.props.loginLedger(acc.path)}>
                          <td>{acc.address}</td>
                          <td>{acc.balance}</td>
                          <td>{acc.NECbalance}</td>
                        </tr>
                      ))}
                      <tr className="meta-row">
                        <td colSpan={3}>
                          <div className="pagination">
                            <a onClick={() => this.paginateLedger(1)}>More accounts</a>
                            {this.state.ledgerPage > 0 && (
                              <a onClick={() => this.paginateLedger(-1)}>Previous accounts</a>
                            )}
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {this.state.shown === 'metamask' && (
                  <div className="metamask-login-wrapper">
                    <h2 className="title__subtitle">This is a recommended way to access your
                      wallet</h2>
                    <p className="text__small">
                      MetaMask is a browser extension that allows you to access your wallet quickly,
                      safely & easily. It is more secure because you never enter your private key on
                      a website. It protects you from phishing & malicious websites.
                    </p>
                    <button className="button__primary"
                            onClick={() => this.props.loginMetamask(false)}>
                      Connect Metamask
                    </button>
                  </div>
                )}
                {this.state.shown === 'keystore' && (
                  <div className="keystore-login-wrapper">
                    <h2 className="title__subtitle">This is not a recommended way to access your wallet</h2>
                    <p className="text__small">Uploading your private key to a website might be dangerous.</p>
                    <input
                      className="hidden"
                      type="file"
                      id="fileinput"
                      ref={input => {
                        this.filePicker = input;
                      }}
                      onChange={this.readKeystore}
                    />
                    <label className="button__primary"
                           htmlFor="fileinput">{this.state.fileName || 'Pick Keystore file'}</label>
                    {this.state.passReq && (
                      <div>
                        <input
                          type="password"
                          ref={input => {
                            this.pass = input;
                          }}
                          placeholder="password"
                        />
                      </div>
                    )}
                    {this.state.passReq && (
                      <button disabled={decrypting} className="button__primary" onClick={this.readKeystore}>
                        {decrypting ? 'Decrypting' : 'Connect via Keystore'}
                      </button>
                    )}
                    {this.state.fileError && <p className="error">{this.state.fileError}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  loginLedger: PropTypes.func.isRequired,
  loginMetamask: PropTypes.func.isRequired,
  loginKeystore: PropTypes.func.isRequired,
  ledgerListAddresses: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  loginOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  accountType: state.account.accountType,
  loginOpen: state.account.loginOpen,
});

export default connect(
  mapStateToProps,
  {
    loginLedger,
    loginMetamask,
    loginKeystore,
    ledgerListAddresses,
    openLogin,
    closeLogin,
  },
)(Login);
