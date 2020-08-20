import React from 'react';
import { Link } from 'react-router-dom';

import './DaoGovernance.scss';

export default function DaoGovernance() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        The direction of Nectar is firmly in the hands of Nectar holders.
        <br />
        <br />
        Through the necDAO, NEC holders can govern the utility of the Nectar token itself, but they’re also able to control how necDAO’s 17,000 ETH are allocated in order to drive DeversiFi volume, adoption and other DeversiFi or Nectar relevant proposals.
        <br />
        DeversiFi is committed to providing specified fee discounts to Nectar token holders and to buying and burning tokens as specified in the Buy and Burn program.  DeversiFi will continue to build, develop and improve the DeversiFi portal. However, all future decisions concerning Nectar must be decided and implemented by the necDAO.
      </p>
      <Link to="/whitepaper#page=19" className="landing__link dao-governance__link">
        Find out more
      </Link>

      <Link to="/dao" className="dao-governance__label">
        Visit DAO page
      </Link>

    </section>
  );
}
