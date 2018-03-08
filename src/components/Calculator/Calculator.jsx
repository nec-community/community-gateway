import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

Calculator.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Calculator);
