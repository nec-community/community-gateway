import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenBalance } from '../../actions/accountActions';
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
        <h2>Redeem your<br />tokens</h2>

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
          <button
            className={`step ${this.state.input ? '' : 'hidden'}`}
            onClick={() => eth.burnNec(eth.ethToWei(this.state.input))}
          >
            Transfer
          </button>
        </div>
      </div>
    );
  }
}

Tokens.propTypes = {
  getTokenBalance: PropTypes.func.isRequired,
  tokenBalance: PropTypes.string.isRequired,
  tokenPayout: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tokenBalance: state.account.tokenBalance,
  tokenPayout: state.account.tokenPayout,
});

export default connect(mapStateToProps, {
  getTokenBalance,
})(Tokens);
