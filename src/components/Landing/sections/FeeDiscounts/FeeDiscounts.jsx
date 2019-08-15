import React, { Component } from 'react';

import './FeeDiscounts.scss';

export default class FeeDiscounts extends Component {
  state = {
    necValue: '',
  };

  onNecValueChange = e => {
    const { value } = e.target;

    this.setState({
      necValue: this.validateValue(value),
    });
  };

  validateValue = value => {
    const regex = /^\d+(\.\d+)?$/;
    const lastChar = value.charAt(value.length - 1);
    const valueArray = value.split('.');
    const isTooMuchDotes = valueArray.length > 2;
    let filteredValue = value;

    if (value && (!regex.test(value) || isTooMuchDotes || lastChar !== '.')) {
      if (isTooMuchDotes) {
        valueArray.length = 2;
        filteredValue =
          valueArray
            .join('.')
            .match(/[0-9]|\./gi)
            .join('') || '';
      } else {
        const matchedValue = value.match(/[0-9]|\./gi).join('');
        filteredValue = matchedValue === '.' ? '' : matchedValue;
      }
    }
    return filteredValue || '';
  };

  render() {
    const { necValue } = this.state;

    return (
      <section className="landing__section">
        <p className="landing__section-content fee-discounts__content">
          Ethfinex Trustless is the most liquid and advanced decentralized exchange.
          <br />
          <br />
          The value of Nectar will now be tied to the success of its decentralized exchange
          products, of which Ethfinex Trustless is the first and largest.
          <br />
          <br />
          As a consequence holding Nectar will entitle traders to fee discounts based
        </p>
        <div className="fee-discounts__calculator-content">
          <div className="fee-discounts__calculator">
            <div className="fee-discounts__input-content">
              <label htmlFor="own" className="fee-discounts__label">
                Own
              </label>
              <div className="fee-discounts__input-nec right">
                <input
                  type="text"
                  inputMode="numeric"
                  id="own"
                  className="fee-discounts__input"
                  value={necValue}
                  onChange={this.onNecValueChange}
                />
              </div>
            </div>
            <div className="fee-discounts__arrows">
              <img src="/images/landingIcons/icon-arrows.svg" alt="" />
            </div>
            <div className="fee-discounts__input-content">
              <label htmlFor="discount" className="fee-discounts__label">
                Receive 20% Fee discount ON
              </label>
              <div
                className="fee-discounts__input-percent fee-discounts__receive-usd right"
                id="discount"
              >
                <p className="fee-discount__receive-text">{+necValue * 100}</p>
              </div>
              <p className="fee-discounts__receive-label-bottom">30-day Trading volume</p>
            </div>
          </div>
          <a href="/" className="fee-discounts__link">
            View fee calculation table
          </a>
        </div>
        <br />
        <p className="landing__section-content fee-discount__section-margin">
          Start trading on Ethfinex Trustless
        </p>
        <a href="/" className="new-listings__link trading">
          Start Trading
        </a>
      </section>
    );
  }
}
