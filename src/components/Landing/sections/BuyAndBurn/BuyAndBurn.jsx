import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './BuyAndBurn.scss';
import { calculateVolumeDiscount } from '../../volumeHelpers';

const volumeLabels = [
  { value: '$100k', percentage: '10%' },
  { value: '$1m', percentage: '20%' },
  { value: '$10m', percentage: '30%' },
  { value: '$100m', percentage: '40%' },
  { value: '$1bn', percentage: '50%' },
];

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
  const { volumePercentage, volumeDiscount } = calculateVolumeDiscount(tradingVolume);

  return (
    <section className="landing__section">
      <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
        The NEC supply will be reduced over time by applying a buy-and-burn model. Once a week, NEC tokens are purchased, using up to 50% of the revenues from DerversiFi trading fees, via an open and transparent auction mechanism.
      </p>

      <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
        The purchased NEC tokens will then be burnt.
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
            <span className="buy-and-burn__title">Revenues to Buy and Burn</span>
            <span className="buy-and-burn__amount-right">{volumeDiscount}%</span>
          </div>
        </div>
        <div className="buy-and-burn__labels">
          {volumeLabels.map(item => (
            <div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="buy-and-burn__progress-bar">
          <div
            className="buy-and-burn__current-progress"
            style={{ width: `${volumePercentage}%` }}
          />
          <div className="buy-and-burn__progress-sections">
            <div className="buy-and-burn__progress-section-bar"></div>
            <div className="buy-and-burn__progress-section-bar"></div>
            <div className="buy-and-burn__progress-section-bar"></div>
            <div className="buy-and-burn__progress-section-bar"></div>
          </div>
        </div>
        <div className="buy-and-burn__labels">
          {volumeLabels.map(item => (
            <div>
              <span>{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>
      <br />
      <p className="landing__section-content buy-and-burn__content buy-and-burn__section-margin">
        Weekly auctions run on a continuous basis. Participate <Link to='/burn'>here</Link>
      </p>
      <br />
      <Link to="/whitepaper#page=17" className="landing__link">
        Find out more
      </Link>
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
