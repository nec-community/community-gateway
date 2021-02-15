import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Help from '../../components/Help/Help';
import TokenListingVoteModal from '../TokenListingVoteModal/TokenListingVoteModal';
import { getPoolTokens } from '../../actions/tokenActions';
import { scrollToSection, scrollToTop } from '../../services/scrollAnimation';
import './TokenPool.scss';

class TokenPool extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getPoolTokens();
    if (document.location.hash) scrollToSection(document.location.hash);
    else scrollToTop();
  }

  render() {
    const {} = this.state;
    return (
      <div className="pool" id="top">
        <Help />
        <div className="container">
          <h1>The Pool</h1>
          <div className="header-desc-container">
            <div className="left-header">
              <p>
                In order for a token to be eligible for listing on Ethfinex it needs to meet certain
                listing criteria (full list{' '}
                <a href="#criteria" onClick={() => scrollToSection('criteria')}>
                  here
                </a>
                ).
              </p>
              <p>
                In line with our ethos of decentralised governance we hand over control of the
                screening process to the community via the Kleros conflict resolution layer.
              </p>
              <p>
                Anyone can propose a token for listing via the Kleros platform, including NEC
                holders, Token Issuers, and Ethfinex itself. When suggesting a token the proposer
                explains how it meets the listing criteria and, if there are aspects that do not
                meet the criteria, the proposer explains why this is the case.
              </p>
              <p>
                Under the Kleros system, every claim is automatically challenged and a collection of
                jurors is assembled to decide whether the listing criteria are met.
              </p>
              <p>
                Jurors are randomly chosen, anonymous and economically incentivised to vote in
                accordance with their best analysis of the project. The court is open for 5 days
                throughout which time new evidence can be presented in regard to whether the
                criteria are met
              </p>
              <p>
                If the jurors decide in favour of the token meeting the criteria, it is awarded the
                ‘Community Approved’ badge and added to the Pool. The ‘Community Approved’ badge can
                be challenged at any time post th token being added to the pool and a new court will
                be opened to assess the new evidence. If the new court votes in favour of the
                challenge, the Token loses the Community Approved badge.
              </p>
              <p>
                Ethfinex reserves the right not to list a token in the event they fail to meet any
                of the listing criteria.
              </p>
              <p>
                For more information on Kleros click{' '}
                <a
                  href="https://blog.kleros.io/kleros-ethfinex-tcr-an-explainer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
                <br />
                Find our our listing criteria{' '}
                <a href="#criteria" onClick={() => scrollToSection('criteria')}>
                  here
                </a>
                <br />
              </p>
            </div>
            <div className="right-header">
              <a
                className="side-badge"
                href="https://tokens.kleros.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit a token through Kleros
                <br />
                (requires Metamask)
              </a>
              <br />
              <br />
              <a
                className="side-badge"
                href="https://blog.kleros.io/the-ethfinex-listing-guide/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quick guide on token submissions
              </a>
            </div>
          </div>
        </div>
        <div className="active-section">
          <div className="container">
            <h5>Eligible tokens</h5>
          </div>
          <div className="container pool-grid" id="tokens">
            {this.props.pool.length === 0 && (
              <div className="container">
                <p>No tokens are currently in the pool.</p>
              </div>
            )}
            {this.props.pool.map((token, index) => (
              <div key={token.address} className="token-wrapper">
                <div className="details-wrapper">
                  <div className="title">
                    {token.shortName || token.token}
                    {token.listed && <span className="listed" title="Listed" />}
                    <div>{token.symbol}</div>
                  </div>

                  <div className="token-logo-wrapper">
                    <img
                      src={token.logo || `https://ipfs.kleros.io${token.symbolMultihash}`}
                      alt={token.shortName}
                    />
                  </div>

                  <div className="meta">
                    <p className="description">
                      {token.description ? token.description : 'No description available.'}
                    </p>
                    <a target="_blank" rel="noopener noreferrer" href={token.website}>
                      {token.website ? 'Visit website' : 'No website available.'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container conditions-wrapper" id="criteria">
          <h2>Listing Criteria</h2>
          <p>
            The following outlines the minimum set of criteria each project and its associated token
            must meet before it can participate in the Ethfinex Community Vote and become traded on
            the Ethfinex platform. Anyone can challenge a project’s ability to meet these
            requirements. An independent jury will decide whether or not this challenge is valid and
            therefore if the project is eligible for listing.
          </p>
          <h3>1. Compliance and Legal</h3>
          <ul>
            <li>
              The token is not an investment product under Swiss law or the jurisdiction of
              issuance.
            </li>
            <li>
              The token issuer is not on the FATF High Risk Jurisdiction list as per the below link:
              http://www.fatf-gafi.org/countries/#high-risk
            </li>
            <li>
              The token issuer has not been subject to previous successful enforcement action by a
              financial services regulator in any jurisdiction
            </li>
          </ul>

          <h3>2. Team and Governance</h3>
          <ul>
            <li>
              The token issuer’s directors are fit and proper persons (for example they have no
              previous record of fraud or similar dishonesty offences)
            </li>
            <li>
              The project leadership, whether as volunteer community members or founders/issuers,
              are deemed to have the specialised knowledge and experience to deliver the technology
              roadmap. This could be evaluated for example with:
            </li>
            <ul>
              <li>prior track records of protocol or product development</li>
              <li>a clearly articulated vision and roadmap</li>
              <li>
                backing and support from advisors or investors who are familiar with the subject
                matter and relevant industries
              </li>
            </ul>
            <li>
              There is a plan and governance structure in place for allocation of funding towards
              key aspects of the team’s roadmap, and or for future fund-raising
            </li>
          </ul>

          <h3>3. Technology and Product</h3>
          <ul>
            <li>
              There must be evidence of novel technology in development. This may be evaluated for
              example by demonstrating:
            </li>
            <ul>
              <li>a working beta product,</li>
              <li>open-source code in development,</li>
              <li>architecture diagrams or novel applications of cryptography and mathematics</li>
            </ul>
            <li>
              There is a demand for the token driven by an existing or future utility. This utility
              is obtained from obtaining, holding, participating, or spending the token. The team
              has identified a reason for the token to exist which is not just fundraising.
            </li>
          </ul>

          <h3>4. Tradability</h3>
          <ul>
            <li>
              The token has passed a third-party review or security audit that deems it as safe, or
              be using a well-known audited framework (such as OpenZeppelin) without changes.
            </li>
            <li>The token source code must be available open-source.</li>
            <li>
              If the token can be frozen or minted, it must be evident that reasonable protection
              and security has been implemented around the private keys which control these
              functions (this may be part of the third-party audit).
            </li>
            <li>
              The token has either a minimum market cap of $1m USD at the time of according to
              CoinMarketCap at the time of the token listing application OR if this is not
              applicable a minimum fundraise of $1m.
            </li>
          </ul>

          <h3>5. Decentralisation</h3>
          <ul>
            <li>
              The total minted supply of tokens is not controlled by a single entity or group of
              entities under common control, or will be controlled by a single entity or group of
              entities after the token is released.
            </li>
            <li>
              At least 10% of the total supply is freely circulating in the market or will be freely
              circulating after the token is released.
            </li>
            <li>
              The team which issued the token should have made efforts to be transparent about
              details of the token supply, circulating supply, and any inflation, as well as their
              own ownership of issued tokens.
            </li>
          </ul>
        </div>
        {this.state.showModal && (
          <TokenListingVoteModal closeModal={this.toggleModal} tokenData={this.state.tokenData} />
        )}
      </div>
    );
  }
}

TokenPool.propTypes = {
  getPoolTokens: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pool: state.token.pool,
  votes: state.token.tokens,
  accountType: state.account.accountType,
  account: state.account.account,
});

export default connect(
  mapStateToProps,
  {
    getPoolTokens,
  }
)(TokenPool);
