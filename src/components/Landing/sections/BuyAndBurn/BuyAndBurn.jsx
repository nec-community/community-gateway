import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import './BuyAndBurn.scss';

function BuyAndBurn({ tradingVolume }) {
  const formatNumber = useCallback(
    number => {
      return number
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    [tradingVolume]
  );

  const widthProgressBar = (tradingVolume * 100) / 3000000;

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
            <span className="buy-and-burn__amount-left">{formatNumber(tradingVolume)} USD</span>
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
        This will be operated using a smart-contract auction similar to that developed and deployed
        by the Melon Protocol.
      </p>
      <br />
      <br />
      <a href="#" className="landing__link">
        Find out more
      </a>
    </section>
  );
}

BuyAndBurn.propTypes = {
  tradingVolume: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

BuyAndBurn.defaultProps = {
  tradingVolume: 0,
};

export default memo(BuyAndBurn);
