import React from 'react';
import './Ecosystem.scss';

export default function Ecosystem() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        Nectar exists as a token on the Ethereum blockchain, allowing it to interact with the wider
        Decentralised Finance ecosystem, and is listed on multiple exchanges to promote discovery
        and liquidity.
      </p>
      <div className="exchanges__links-wrapper">
        <a href="https://www.bitfinex.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/bitfinex.svg" alt="" />
          <span className="visually-hidden">Bitfinex</span>
        </a>
        <a href="https://www.deversifi.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/landingIcons/DeversiFi.png" alt="" height="50" />
          <span className="visually-hidden">DeversiFi</span>
        </a>
      </div>
    </section>
  );
}
