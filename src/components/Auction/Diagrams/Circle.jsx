import React from 'react';

export default function Circle() {
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
            strokeDasharray="80, 100"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="18" className="text">
            Next Price Change <br /> 59 mins
          </text>
        </svg>
      </div>
    </div>
  );
}
