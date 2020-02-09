import React from 'react';

export default function Circle({ title, sold_eth_value, soldEthVal, nextPrice }) {
  const sold = `${sold_eth_value}, 100`;
  return (
    <div className="graphics-item__container">
      <p className="graphic__label">{title}</p>
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
          <text x="18" y="20" className="chart-title">
            {nextPrice}
          </text>
        </svg>
      </div>
    </div>
  );
}
