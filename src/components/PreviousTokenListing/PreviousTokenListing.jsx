import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../TokenListings/TokenListings.scss';
import './PreviousTokenListing.scss';
import previousTokenData from './previousTokenData';

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
  constructor() {
    super();

    this.state = {
      periodIndex: 0,
    };
  }

  render() {
    const periods = Object.keys(previousTokenData);
    const tokens = previousTokenData[periods[this.state.periodIndex]];
    return (
      <div className="listings previouslistings">
        <div className="container">
          <h1>Previous Community Vote Results</h1>
          <h5>4 tokens were selected by the Ethfinex community
            between {Object.keys(previousTokenData)[this.state.periodIndex]}</h5>

          <div className="header-desc-container">
            <div className="left-header">
              Showing data for:{' '}
              <select
                value={this.state.periodIndex}
                onChange={e => this.setState({ periodIndex: e.target.value })}
              >
                {
                  Object.keys(previousTokenData).map((period, i) => (
                    <option value={i} key={period}>{period}</option>
                  ))
                }
              </select>
              <br /><br />
              Ethfinex Voting Tokens are issued to traders in proportion to their NEC holdings,
              allowing loyal users more of a say without requiring you to burn your tokens.
              To find out more about the voting process and how tokens are selected to be voted on,
              see the <Link to='/faq'>FAQ</Link>.<br /><br />
              The blockchain based record of this past vote can be viewed on{' '}
              <a href={tokens.link} target='blank'>etherscan</a>.
            </div>
          </div>
        </div>
        <div>
          <div className="active-section">

            <div className="container">
              {
                tokens.data.sort((a, b) => (b.totalYes - a.totalYes)).map((token, index) => (
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
                          {(index < tokens.winThreshold) &&
                          <span>Winner of the vote - listed on Ethfinex on {tokens.listedOn}</span>
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(PreviousTokenListing);
