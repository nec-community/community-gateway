import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './PreviousTokenListing.scss';

function nFormatter(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'mil ';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k ';
  }
  if (num > 0) {
    return (num / 1).toFixed(1).replace(/\.0$/, '');
  }
  return num;
}

class PreviousTokenListing extends Component {

  render() {
    const tokens = [
        {
          id: 0,
          token: 'Wings',
          totalYes: 2300000,
          total: 45471000,
          logo: 'https://www.cryptocompare.com/media/1382758/1wings.png',
          discussions: 'https://www.ethfinex.com/token_listings/10/social_category/59/WINGS',
          website: 'https://www.wings.ai/',
        }, {
          id: 1,
          token: 'Auctus',
          totalYes: 1100000,
          total: 45471000,
          logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2653.png',
          discussions: 'https://www.ethfinex.com/token_listings/45/social_category/269/AUC',
          website: 'https://auctus.org/',
        }, {
          id: 2,
          token: 'Polymath',
          totalYes: 5100000,
          total: 45471000,
          logo: 'https://global-uploads.webflow.com/5a46fad33472ef00014b540a/5a46fad33472ef00014b5453_Polymath-Logos_Color_r5.svg',
          discussions: 'https://www.polymath.network/',
          website: 'https://www.polymath.network/',
        }, {
          id: 3,
          token: 'BlockV',
          totalYes: 6300000,
          total: 45471000,
          logo: 'https://getcrypto.info/blockv/images/logo.png',
          discussions: 'https://www.ethfinex.com/token_listings/33/social_category/197/VEE',
          website: 'https://blockv.io/',
        }, {
          id: 4,
          token: 'DragonChain',
          totalYes: 5500000,
          total: 45471000,
          logo: 'https://dragonchain.com/assets/images/dragon.png',
          discussions: 'https://www.ethfinex.com/token_listings/13/social_category/76/DRGN',
          website: 'https://dragonchain.com/',
        }, {
          id: 5,
          token: 'Kin',
          totalYes: 5000000,
          total: 45471000,
          logo: 'https://www.kik.com/images/kin/kin-logo-onblue.svg',
          discussions: 'https://www.ethfinex.com/token_listings/25/social_category/146/KIN',
          website: 'https://www.kik.com/kin/',
        }, {
          id: 6,
          token: 'Internet Node Token',
          totalYes: 535000,
          total: 45471000,
          logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2399.png',
          discussions: 'https://www.ethfinex.com/token_listings/30/social_category/179/INT',
          website: 'https://intchain.io/',
        }, {
          id: 7,
          token: 'Dadi',
          totalYes: 5800000,
          total: 45471000,
          logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2535.png',
          discussions: 'https://dadi.cloud/',
          website: 'https://dadi.cloud/',
        }, {
          id: 8,
          token: 'Utrust',
          totalYes: 6500000,
          total: 45471000,
          logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2320.png',
          discussions: 'https://www.ethfinex.com/token_listings/35/social_category/209/UTRUST',
          website: 'https://utrust.io/',
        }, {
          id: 9,
          token: 'Lympo',
          totalYes: 7400000,
          total: 45471000,
          logo: 'https://cryptocoincharts.info/img/coins/lym.svg',
          discussions: 'https://lympo.io/',
          website: 'https://lympo.io/',
        },
      ];

    return (
      <div className="previouslistings">
        <div className="container">
          <h1>Previous Community Vote Results</h1>
          <h5>4 tokens were selected by the Ethfinex community between 15-29th May
          </h5>

          <div className="header-desc-container">
            <div className="left-header">
              Ethfinex Voting Tokens are issued to traders in proportion to their NEC holdings,
              allowing loyal users more of a say without requiring you to burn your tokens.
              To find out more about the voting process and how tokens are selected to be voted on,
              see the <Link to='/faq'>FAQ</Link><br /><br />
              The blockchain based record of this past vote can be viewed on &nbsp;
              <a href='https://etherscan.io/address/0x64575dc58f1927dbf5633b3168d55a0012da340c#tokentxns' target='blank'>etherscan</a>.
            </div>
          </div>
        </div>
        <div>
          <div className="active-section">

            <div className="container">
              {

                tokens.sort((a, b) => (b.totalYes - a.totalYes)).map((token, index) => (
                  <div key={token.id} className="listing-wrapper">

                    <div className="logo-wrapper">
                      <a target="_blank" href={token.website}>
                        <img src={token.logo} alt="" />
                      </a>
                    </div>

                    <div className="details-wrapper">
                      <a
                        target="_blank"
                        href={token.discussions}
                        className="title"
                      >
                        {index + 1}. {token.token}
                        <p className="description">
                        {(index < 4) &&
                          <span>Winner of the vote - listed on Ethfinex on Thursday 31st May</span>
                        }
                        </p>
                      </a>
                    </div>

                    <div className="results-wrapper">
                      <div className="yes">
                        <span className="word">votes</span>
                        <div className="bar">
                          <div
                            className="bar-yes"
                            style={{ width: `${99 * token.totalYes / token.total}%` }}
                          />
                        </div>
                        <div className="number">{nFormatter(token.totalYes)}</div>
                      </div>
                    </div>

                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="waves reverse" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(PreviousTokenListing);
