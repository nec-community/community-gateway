import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './FAQ.scss';

class FAQ extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="faq">
        <div className="container">
          <h1>Learn More - FAQ</h1>
        </div>
        <div className="faq-wrapper">
          <div className="faq-container">

            <h2>What is Nectar.Community?</h2>
            <p className="info-tip">
              Nectar.Community is the decentralized governance portal for Ethfinex.
              Nectar tokens are earned by traders on Ethfinex and can be used to submit and vote on coin listings.
              50% of all trading fees on the Ethfinex exchange also go into a smart contract pool,
              and the Nectar tokens can be redeemed for the proportional amount of Ethereum locked in the
              Nectar smart contract through the tools on Nectar.Community.
            </p>
          </div>
          <div className="faq-container">

            <h2>What is Ethfinex?</h2>
            <p className="info-tip">
              Nectar.Community is the decentralized governance portal for Ethfinex.
              Nectar tokens are earned by traders on Ethfinex and can be used to submit and vote on coin listings.
              50% of all trading fees on the Ethfinex exchange also go into a smart contract pool,
              and the Nectar tokens can be redeemed for the proportional amount of Ethereum locked in the
              Nectar smart contract through the tools on Nectar.Community.
            </p>
          </div>
          <div className="faq-container">
            <h2>What is a proposal?</h2>
            <p className="info-tip">
              Nectar.Community is the decentralized governance portal for Ethfinex.
              Nectar tokens are earned by traders on Ethfinex and can be used to submit and vote on coin listings.
              50% of all trading fees on the Ethfinex exchange also go into a smart contract pool,
              and the Nectar tokens can be redeemed for the proportional amount of Ethereum locked in the
              Nectar smart contract through the tools on Nectar.Community.
            </p>
          </div>
          <div className="faq-container">
            <h2>What happens after a proposal is submitted?</h2>
            <p className="info-tip">
              Nectar.Community is the decentralized governance portal for Ethfinex.
              Nectar tokens are earned by traders on Ethfinex and can be used to submit and vote on coin listings.
              50% of all trading fees on the Ethfinex exchange also go into a smart contract pool,
              and the Nectar tokens can be redeemed for the proportional amount of Ethereum locked in the
              Nectar smart contract through the tools on Nectar.Community.
            </p>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(FAQ);
