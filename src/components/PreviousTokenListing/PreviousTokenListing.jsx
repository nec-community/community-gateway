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
        totalYes: 396.7,
        total: 59384496,
        logo: 'https://www.cryptocompare.com/media/1382758/1wings.png',
        discussions: 'https://www.ethfinex.com/token_listings/10/social_category/59/WINGS',
        website: 'https://www.wings.ai/',
      }, {
        id: 1,
        token: 'Auctus',
        totalYes: 15500000,
        total: 59384496,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2653.png',
        discussions: 'https://www.ethfinex.com/token_listings/45/social_category/269/AUC',
        website: 'https://auctus.org/',
      }, {
        id: 2,
        token: 'Cindicator',
        totalYes: 146500,
        total: 59384496,
        logo: 'https://coinlookup.co/wp-content/uploads/2018/03/cindicator.png',
        discussions: 'https://cindicator.com/',
        website: 'https://cindicator.com/',
      }, {
        id: 3,
        token: 'Internet Node Token',
        totalYes: 0,
        total: 59384496,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2399.png',
        discussions: 'https://www.ethfinex.com/token_listings/30/social_category/179/INT',
        website: 'https://intchain.io/',
      }, {
        id: 4,
        token: 'Icon',
        totalYes: 1000,
        total: 59384496,
        logo: 'https://coinmarketdaddy.com/upload/coin/11523185991.png',
        discussions: 'https://icon.foundation/',
        website: 'https://icon.foundation/',
      }, {
        id: 5,
        token: 'BlockEx',
        totalYes: 436500,
        total: 59384496,
        logo: 'https://image.ibb.co/dGCsSd/logo_png_rj.png',
        discussions: 'https://daxt.io/',
        website: 'https://daxt.io/',
      }, {
        id: 6,
        token: 'Polymath',
        totalYes: 13800000,
        total: 59384496,
        logo: 'https://global-uploads.webflow.com/5a46fad33472ef00014b540a/5a46fad33472ef00014b5453_Polymath-Logos_Color_r5.svg',
        discussions: 'https://www.polymath.network/',
        website: 'https://www.polymath.network/',
      }, {
        id: 7,
        token: 'Fusion',
        totalYes: 10800000,
        total: 59384496,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2530.png',
        discussions: 'https://www.fusion.org/',
        website: 'https://www.fusion.org/',
      }, {
        id: 8,
        token: 'DragonChain',
        totalYes: 4500000,
        total: 59384496,
        logo: 'https://dragonchain.com/assets/images/dragon.png',
        discussions: 'https://www.ethfinex.com/token_listings/13/social_category/76/DRGN',
        website: 'https://dragonchain.com/',
      }, {
        id: 9,
        token: 'CommerceBlock',
        totalYes: 7800000,
        total: 59384496,
        logo: 'https://www.commerceblock.com/wp-content/themes/commerceblock/public/img/int/logo-small.png',
        discussions: 'https://www.commerceblock.com/',
        website: 'https://www.commerceblock.com/',
      }, {
        id: 10,
        token: 'Hubii',
        totalYes: 6400000,
        total: 59384496,
        logo: 'https://cdn-images-1.medium.com/max/1600/0*NVI3KkOEvbz0_Ff0.',
        discussions: 'https://www.ethfinex.com/token_listings/36/social_category/212/HBT',
        website: 'https://www.hubii.com/',
      }, {
        id: 11,
        token: 'Aeternity',
        totalYes: 100,
        total: 59384496,
        logo: 'https://logos-download.com/wp-content/uploads/2018/05/Aeternity_logo_coin.png',
        discussions: 'https://www.ethfinex.com/token_listings/49/social_category/292/AE',
        website: 'https://aeternity.com/',
      },
      ];

    return (
      <div className="previouslistings">
        <div className="container">
          <h1>Previous Community Vote Results</h1>
          <h5>4 tokens were selected by the Ethfinex community between 29/05 - 12/06
          </h5>

          <div className="header-desc-container">
            <div className="left-header">
              Ethfinex Voting Tokens are issued to traders in proportion to their NEC holdings,
              allowing loyal users more of a say without requiring you to burn your tokens.
              To find out more about the voting process and how tokens are selected to be voted on,
              see the <Link to='/faq'>FAQ</Link><br /><br />
              The blockchain based record of this past vote can be viewed on &nbsp;
              <a href='https://etherscan.io/token/0xd7e7a876058d8e67efb26ad7b10a4007d90396bc?a=0x2b2d7d874bbfb73f85b2f8a9ee0d9f3e93722622' target='blank'>etherscan</a>.
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
                          <span>Winner of the vote - listed on Ethfinex on Thursday 14th June</span>
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
