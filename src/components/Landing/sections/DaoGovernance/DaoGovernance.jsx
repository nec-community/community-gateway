import React from 'react';
import { Link } from 'react-router-dom';

export default function DaoGovernance() {
  return (
    <section className="landing__section">
      <div className="section__title">
        <span>DAO Governance</span>
      </div>
      <p className="landing__section-content hidden__small">
        The direction of Nectar is firmly in the hands of Nectar holders.
      </p>
      <div className="landing__section-content">
        Through the necDAO, NEC holders can govern the utility of the Nectar token itself, but
        they’re also able to control how necDAO’s 17,000 ETH are allocated in order to drive
        DeversiFi volume, adoption and other DeversiFi or Nectar relevant proposals.
      </div>
      <p className="landing__section-content hidden__small">
        DeversiFi is committed to providing specified fee discounts to Nectar token holders and to
        buying and burning tokens as specified in the Buy and Burn program. DeversiFi will continue
        to build, develop and improve the DeversiFi portal. However, all future decisions concerning
        Nectar must be decided and implemented by the necDAO.
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
