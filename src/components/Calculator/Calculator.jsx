import React, { Component } from 'react';
import Tokens from '../Tokens/Tokens';
import TradingReward from '../TradingReward/TradingReward';

import './Calculator.scss';

class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      shown: 'trading',
    };

    this.switch = this.switch.bind(this);
  }

  switch(slug) {
    this.setState({
      shown: slug,
    });
  }

  render() {
    return (
      <div className="calculator-wrapper">
        <div className="bg-text calculator-bg-text">calculator</div>

        <div className="calculator-nav">
          <a
            className={`${this.state.shown === 'trading' ? 'active' : ''}`}
            onClick={() => this.switch('trading')}
          >
            Trading Reward<br />Calculator
          </a>
          <a
            className={`${this.state.shown === 'tokens' ? 'active' : ''}`}
            onClick={() => this.switch('tokens')}
          >
            Redeem Value<br />Calculator
          </a>
        </div>
        {
          this.state.shown === 'tokens' &&
          <Tokens />
        }
        {
          this.state.shown === 'trading' &&
          <TradingReward />
        }
      </div>
    );
  }
}

export default Calculator;
