import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './BuyAndBurn.scss';

function BuyAndBurn({ tradingVolume }) {

  return (
    <section className="landing__section">
      <div className="section__title">
        <span>Buy & Burn</span>
      </div>
      <p className="landing__section-content secondary">
        Buy & Burn has been discontinued: <a href="https://blog.deversifi.com/discontinuation-of-weekly-auctions/" target="_blank" rel="noopener noreferrer"> read more</a>
      </p>
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
