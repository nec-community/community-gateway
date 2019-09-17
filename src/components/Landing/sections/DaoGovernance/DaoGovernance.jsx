import React from 'react';
import { Link } from 'react-router-dom';

import './DaoGovernance.scss';

export default function DaoGovernance() {
  return (
    <section className="landing__section">
      <p className="landing__section-content">
        Would you like to determine the future of Nectar? The future of Nectar will be completely in the hands of its holders.
        <br />
        <br />
        Enabled by the launch of the necDAO, Nectar holders will have control over Nectar and the funds accumulated in it so far. The necDAO will launch in December 2019 with accumulated funds of 17,000 ETH. Participation will be available to all Nectar holders. 
      <br/>
      DeversiFi is committed to providing specified fee discounts to Nectar token holders and to buying and burning tokens as specified above. DeversiFi will continue to build, develop and improve the DeversiFi portal, including introducing new features. However, all future decisions and new utilities proposed for Nectar must be decided and implemented by its DAO.
      </p>
      <Link to="/" className="landing__link dao-governance__link">
        Find out more
      </Link>
      <p className="dao-governance__label">Coming soon</p>
    </section>
  );
}
