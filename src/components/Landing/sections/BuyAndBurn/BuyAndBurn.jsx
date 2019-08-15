import React, { Component } from 'react';

import './BuyAndBurn.scss';

export default class BuyAndBurn extends Component {
  state = {
    tradingVolume: 0,
  };

  componentDidMount() {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://efx-trustless-data.herokuapp.com/api/v1/last24HoursVolume',
      {
        method: 'GET',
        mode: 'cors',
      }
    )
      .then(res => res.json())
      .then(data => {
        if (!isNaN(data?.TotalUSDValue))
          this.setState({
            tradingVolume: data?.TotalUSDValue,
          });
      })
      .catch(e => console.log('Error ', e));
  }

  formatNumber = number => {
    return number
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  render() {
    const { tradingVolume } = this.state;
    const widthProgressBar = tradingVolume ? (tradingVolume * 100) / 3000000 : 0;

    return (
      <section className="landing__section">
        <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
          <span className="buy-and-burn__bold-text">10%</span> of all revenues earned on trading
          volumes above <span className="buy-and-burn__bold-text">10</span> million dollars during a
          24 hour period will be used to buy NEC.
          <br />
        </p>
        <br />
        <div className="buy-and-burn__progress-bar-content">
          <div className="buy-and-burn__progress-bar-title">
            <div className="buy-and-burn__progress-bar-title-up">
              <span className="buy-and-burn__title">Current 24h trading volume</span>
              <span className="buy-and-burn__amount-left">
                {this.formatNumber(tradingVolume || 0)} USD
              </span>
            </div>
            <div className="buy-and-burn__progress-bar-title-up buy-and-burn__progress-bar-title-up--right">
              <span className="buy-and-burn__title">Until Buy & Burn</span>
              <span className="buy-and-burn__amount-right">3 000 000 USD</span>
            </div>
          </div>
          <div className="buy-and-burn__progress-bar">
            <div
              className="buy-and-burn__current-progress"
              style={{ width: `${widthProgressBar}%` }}
            />
          </div>
        </div>
        <br />
        <br />
        <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
          This will be operated using a smart-contract auction similar to that developed and
          deployed by the Melon Protocol.
        </p>
        <br />
        <br />
        <a href="#" className="fee-discounts__link">
          Find out more
        </a>
      </section>
    );
  }
}
