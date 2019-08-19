import React from 'react';
import './Exchanges.scss';

export default function Exchanges() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        Nectar will be listed on multiple exchanges to promote discovery and liquidity.
      </p>
      <div className="exchanges__links-wrapper">
        <a href="https://www.bitfinex.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/bitfinex.svg" alt="" />
          <span className="visually-hidden">Bitfinex</span>
        </a>
        <a href="https://www.ethfinex.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/ethfinex.svg" alt="" />
          <span className="visually-hidden">Ethfinex</span>
        </a>
      </div>
    </section>
  );
}
