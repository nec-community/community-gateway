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
    console.log('Tokens mounted');
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
      <div className="tokens-wrapper">
        <h1>Nectar Tokens</h1>
        <div>
          <h2>Personal</h2>
          <h3>Current balance: {this.props.tokenBalance} NEC</h3>
          <h3>Possible payout: {this.props.tokenPayout} ETH</h3>
        </div>
        <div>
          <h2>Calculator</h2>
          <label htmlFor="input">
            Reward for redeeming
            <input id="input" type="number" value={this.state.input} onChange={this.calculate} />
            NEC is { this.state.calculated } ETH
          </label>
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
