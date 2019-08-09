import React from 'react';
import { Link } from 'react-router-dom';

import './NewListings.scss';

export default function NewListings() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        The Ethfinex Token Vote is the process by which tokens are listed on the platform through a
        community vote.
        <br />
        <br />
        We believe it is important that those who regularly trade on Ethfinex decide which tokens
        are available so that our offering reflects what the community wants.
        <br />
        <br />
        To reward the research and choosing of quality tokens, traders who voted for a successfully
        listed token will receive a percentage of trading fees for that token for the following
        twelve months.
        <br />
        <br />
        This process is now paused, but you can find the description here.
      </p>
      <Link to="/tokens" className="new-listings__link">
        Visit token listing page
      </Link>
    </section>
  );
}
