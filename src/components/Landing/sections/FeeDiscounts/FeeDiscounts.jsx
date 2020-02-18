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
    if (!value) {
      return '';
    }

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
        let matchedValue = value.match(/[0-9]|\./gi);

        if (matchedValue) {
          matchedValue = matchedValue.join('');
        }

        filteredValue = matchedValue === '.' ? '' : matchedValue;
      }
    }
    return filteredValue || '';
  };

  abbreviateNumber = (num, fixed) => {
    if (!num) {
      return 0;
    }

    let precision = fixed;

    if (!fixed || fixed < 0) {
      precision = 0;
    }

    const b = num.toPrecision(2).split('e');
    const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3);
    const c = k < 1 ? num.toFixed(0 + precision) : (num / 10 ** (k * 3)).toFixed(1 + precision);
    const d = c < 0 ? c : Math.abs(c);
    const e = d + ['', 'K', 'M', 'B', 'T'][k];
    return e;
  };

  render() {
    const { necValue } = this.state;
    const finalValue = +necValue * 100;

    return (
      <section className="landing__section">
        <p className="landing__section-content fee-discounts__content">
          Holders of Nectar enjoy benefits across the DeFi ecosystem, starting with DeversiFi, the most comprehensive decentralised trading experience.
          <br className="landing__linebreak" />
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
                <p className="fee-discount__receive-text">{this.abbreviateNumber(finalValue, 2)}</p>
              </div>
              <p className="fee-discounts__receive-label-bottom">30-day Trading volume</p>
            </div>
          </div>
          <a
            href="https://app.deversifi.com"
            rel="noopener noreferrer"
            target="_blank"
            className="landing__link"
          >
            View fee calculation table
          </a>
        </div>

        <p className="landing__section-content fee-discount__section-margin">
        On top of the trading fee discounts earned for higher 30d trading volume, Nectar holders will be entitled to additional discounts of up to 20% depending on the amount of Nectar tokens that they hold
        </p>
        <a
          href="https://app.deversifi.com"
          rel="noopener noreferrer"
          target="_blank"
          className="new-listings__link trading"
        >
          Start Trading
        </a>
      </section>
    );
  }
}
