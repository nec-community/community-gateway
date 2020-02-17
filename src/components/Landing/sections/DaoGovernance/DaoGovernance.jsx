import React from 'react';
import { Link } from 'react-router-dom';

import './DaoGovernance.scss';

export default function DaoGovernance() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        The future of Nectar is completely in the hands of its holders.
        <br />
        <br />
        Enabled by the launch of the Nectar DAO (Decentralised Autonomous Organisation), Nectar holders have control over the future of the Nectar token and 17,000 ETH, in what is one of the largest DAOs in existence.
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
