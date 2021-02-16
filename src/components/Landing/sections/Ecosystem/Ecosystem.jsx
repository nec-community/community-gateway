import React from 'react';
import './Ecosystem.scss';

export default function Ecosystem() {
  return (
    <section className="landing__section">
      <div className="section__title">
        <span>Trade NEC</span>
      </div>
      <p className="landing__section-content">
        Nectar exists as a token on the Ethereum blockchain, allowing it to interact with the wider
        Decentralised Finance ecosystem, and is listed on multiple exchanges to promote discovery
        and liquidity.
      </p>
      <div className="exchanges__links-wrapper">
        <a href="https://app.deversifi.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/deversifi-logo-dark.png" alt="" height="50" />
          <span className="visually-hidden">DeversiFi</span>
        </a>
        <a href="https://www.bitfinex.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/bitfinex.svg" alt="" height="50" />
          <span className="visually-hidden">Bitfinex</span>
        </a>
        <a href="https://app.uniswap.org/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/uniswap.svg" alt="" height="50" />
          <span className="visually-hidden">Uniswap</span>
        </a>
        <a href="https://balancer.finance/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/balancer.png" alt="" height="50" />
          <span className="visually-hidden">Balancer</span>
        </a>
      </div>
    </section>
  );
}
