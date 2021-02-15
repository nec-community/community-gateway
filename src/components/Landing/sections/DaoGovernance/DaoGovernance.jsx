import React from 'react';
import { Link } from 'react-router-dom';

export default function DaoGovernance() {
  return (
    <section className="landing__section">
      <div className="section__title">
        <span>DAO Governance</span>
      </div>
      <p className="landing__section-content">
        Through the necDAO, NEC holders can govern the utility of the Nectar token itself, but
        they’re also able to control how necDAO’s 17,000 ETH are allocated.
      </p>

      <div className="button__wrapper">
        <Link to="/whitepaper#page=19" className="button__primary responsive">
          Find out more
        </Link>

        <Link to="/dao" className="landing__link_button regular">
          Visit DAO page
        </Link>
      </div>

    </section>
  );
}
