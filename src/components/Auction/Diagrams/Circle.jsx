import React from 'react';

export default function Circle({ children, title, percentage, soldEthVal }) {
  const sold = `${percentage}, 100`;
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
          {children}
        </svg>
      </div>
    </div>
  );
}
