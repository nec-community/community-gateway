import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenBalance, burnNec, openLogin } from '../../actions/accountActions';
import eth from '../../services/ethereumService';

import './Tokens.scss';

class Tokens extends Component {
  constructor() {
    super();

    this.state = {
      input: 0,
      calculated: 0,
    };

    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    this.props.getTokenBalance();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.account !== this.props.account)
      this.props.getTokenBalance();
  }

  async calculate(e) {
    const val = e.target.value;
    if (val.length > 12) return;
    let input = parseFloat(val);
    if (!isNaN(input)) {
      const calculated = await eth.estimatePayout(eth.ethToWei(input));
      this.setState({
        input: val,
        calculated: eth.weiToEth(calculated),
      });
    } else {
      this.setState({
        input: val,
        // calculated: 'error',
      });
    }
  }

  render() {
    return (
      <div className="tokens-wrapper">
        <div className="top-text">
          <h2>Redeem your tokens</h2>
          <div className="account-balance">
            <div className="row-1"><span className="number">{ this.props.tokenBalance }</span><span className="nec">NEC</span></div>
            <div className="row-2">Account balance</div>
          </div>
        </div>

        <p>
          You can earn new NEC tokens in proportion to your maker volume (matched limit orders).
          Tokens become harder to earn each month. Calculate how many you would earn
          based on your trading volume.
        </p>

        <div className="redeem-wrapper">
          <div className={`step ${this.state.input ? '' : 'empty'}`}>
            <label htmlFor="input">
              NEC:
              <input style={{
                      width: `${
                        this.state.input.length > 8
                          ? this.state.input.toString().length * 14 + 10
                          : this.state.input.toString().length * 24 + 10
                      }px`
                     }}
                     className={`${this.state.input.length > 8 ? 'smaller' : ''}`}
                     id="input"
                     type="text" value={this.state.input} onChange={this.calculate}
              />
            </label>
            <p>Enter your NEC balance</p>
          </div>
          <div className={`step ${this.state.input ? '' : 'hidden'}`}>
            <label htmlFor="input">ETH:</label>
            <span className={`${this.state.calculated.length > 8 ? 'smaller' : ''}`}>
              {this.state.calculated}
            </span>
            <p>Your reward</p>
          </div>
          {
            this.props.burningEnabled &&
            <button
              className={`step ${this.state.input ? '' : 'hidden'}`}
              onClick={ this.props.accountType
                ? () => this.props.burnNec(eth.ethToWei(this.state.input))
                : () => this.props.openLogin()
              }
            >
              { this.props.accountType ? 'Redeem' : 'Connect your Wallet' }
            </button>
          }
          {
            !this.props.burningEnabled &&
            <button
              className={`step ${this.state.input ? '' : 'hidden'}`}
              disabled
            >
              Burning NEC currently disabled
            </button>
          }
        </div>
      </div>
    );
  }
}

Tokens.propTypes = {
  getTokenBalance: PropTypes.func.isRequired,
  burnNec: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  tokenBalance: PropTypes.string.isRequired,
  tokenPayout: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tokenBalance: state.account.tokenBalance,
  tokenPayout: state.account.tokenPayout,
  burningEnabled: state.account.ethfinexData.burningEnabled,
  accountType: state.account.accountType,
  account: state.account.account,
});

export default connect(mapStateToProps, {
  getTokenBalance,
  burnNec,
  openLogin,
})(Tokens);
