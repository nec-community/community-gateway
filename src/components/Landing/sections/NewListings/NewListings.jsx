import React from 'react';
import { Link } from 'react-router-dom';

import './NewListings.scss';

export default function NewListings() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        The DeversiFi Token Vote is the process by which tokens are listed on the platform through a community vote.
        <br />
        <br />
        We believe it is crucial that those who regularly trade on DeversiFi decide which tokens are available, so that our offering reflects what the community wants. Following a successful token proposal, potential new tokens are put up for voting and all NEC holders are issued with voting tokens proportional to their holdings. Accordingly, NEC holders directly influence which tokens are listed on the platform.
        <br />
        <br />
        This process is now paused, but we hope to restart it again soon
      </p>
      <Link to="/tokens" className="new-listings__link">
        Visit token listing page
      </Link>
    </section>
  );
}
