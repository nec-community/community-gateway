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
      The NEC supply will be reduced over time by applying a buy-and-burn model. Once a week, NEC tokens will be purchased, using up to 50% of the revenues from DerversiFi trading fees, via an open and transparent auction mechanism. The purchased NEC tokens will then be burnt. 
        </p>
      
      <br />
      <br />
      
        <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
        The precise revenue percentage used for this purchase will be dependent on the daily trading volume (see below). 
      
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
        Stay tuned for the announcement of the first auction.
      </p>
      <br />
       <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
        The next auction will be in November.
      </p>
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
