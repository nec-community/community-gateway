import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenBalance } from '../../actions/accountActions';
import eth from '../../services/ethereumService';

import './TradingReward.scss';

class TradingReward extends Component {
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
    const input = parseInt(e.target.value, 10);
    const calculated = await eth.estimatePayout(eth.ethToWei(input));
    console.log(calculated);
    this.setState({
      input,
      calculated: eth.weiToEth(calculated),
    });
  }

  render() {
    return (
      <div className="trading-reward-wrapper">
        <h2>Earn by trading on Ethfinex</h2>
        <p>You can earn new NEC tokens in proportion to your maker volume (matched limit orders).
          Tokens become harder to earn each month. Calculate how many you would earn
          based on your trading volume.</p>
        <h3>
          <label htmlFor="input">
            If your maker trading
            <div className="right-align">volume is:
              <input id="input" type="number" value={this.state.input} onChange={this.calculate} />
              you earn <b>{this.state.calculated}</b><br />tokens
            </div>
          </label>
        </h3>
      </div>
    );
  }
}

TradingReward.propTypes = {
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
})(TradingReward);
