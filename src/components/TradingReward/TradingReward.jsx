import React, { Component } from 'react';
import eth from '../../services/ethereumService';

import './TradingReward.scss';

class TradingReward extends Component {
  constructor() {
    super();

    this.state = {
      input: 1000,
      calculated: 0,
    };

    this.calculate = this.calculate.bind(this);
  }

  async componentWillMount() {
    const calculated = await eth.calculateNecReward(1000);
    const rounded = Math.floor(calculated * 1000) / 1000;
    this.setState({
      calculated: rounded,
    });
  }

  async calculate(e) {
    if (e.target.value.length > 12) return;
    let input = parseInt(e.target.value, 10);
    if (isNaN(input)) input = 0;
    const calculated = await eth.calculateNecReward(input);
    const rounded = Math.floor(calculated * 1000) / 1000;
    this.setState({
      input,
      calculated: rounded,
    });
  }

  render() {
    return (
      <div className="trading-reward-wrapper">
        <h2>Earn by trading on Ethfinex</h2>
        <div className="calculator-desc">
          <div className="line-indent" />
          <p>
            You can earn new NEC tokens in proportion to your maker volume (matched limit orders).
            Tokens become harder to earn each month. Estimate how many you would earn
            based on your trading volume.
          </p>
        </div>
        <h3>
          <label htmlFor="input">
            If your maker trading
            <div className="right-align">volume is: $
              <input
                style={{ width: `${(this.state.input.toString().length * 19) + 30}px` }}
                id="input"
                type="number"
                value={this.state.input}
                onChange={this.calculate}
                min="0"
              />
              you earn<br /><b>{this.state.calculated}</b> tokens
            </div>
          </label>
        </h3>
      </div>
    );
  }
}

export default TradingReward;
