import React from 'react';

export default function Circle({ sold_eth_value, soldEthVal, nextPrice }) {
  const sold = `${sold_eth_value}, 100`;
  return (
    <div className="graphics-item__container">
      <p className="graphic__label">Sold ETH</p>
      <div className="single-chart">
        <svg viewBox="0 0 36 36" className="circular-chart color">
          <path
            className="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={sold}
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="18" className="text">
            Next Price Change <br />
          </text>
          <text x="18" y="22" className="text">
            {nextPrice}
          </text>
        </svg>
      </div>
    </div>
  );
}
