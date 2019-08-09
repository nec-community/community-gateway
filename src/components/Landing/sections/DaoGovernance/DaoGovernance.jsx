import React from 'react';
import { Link } from 'react-router-dom';

import './DaoGovernance.scss';

export default function DaoGovernance() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        The future of Nectar will be completely in the hands of its holders. This will be enabled by
        the launch of the necDAO. Participation in the necDAO will be available to all Nectar
        holders and will have control over Nectar and the funds accumulated so far for NEC holders.
        <br />
        <br />
        Ethfinex is committed to give the fee discounts stated to Nectar token holders, and to buy
        and burn back tokens with revenues above the specified limits. Ethfinex will continue to
        build, develop, and improve Ethfinex Trustless, and add new features to it. However, all
        future decisions and any new utilities proposed for Nectar must be decided and added by its
        DAO.
      </p>
      <Link to="#" className="dao-governance__link">
        Find out more
      </Link>
      <p className="dao-governance__label">Coming soon</p>
    </section>
  );
}
