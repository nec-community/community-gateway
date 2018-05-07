import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokenVotes } from '../../actions/tokenActions';
import './TokenListings.scss';

class TokenListings extends Component {
  componentDidMount() {
    this.props.getTokenVotes();
  }

  render() {
    return (
      <div className="all-proposals">
        <div className="container">
          <h1>Token Listing Leaderboard</h1>
        </div>
          <div>
            <div className="active-section">
              <div className="header-desc-container">
                <p className="info-tip">
                  <strong>This page is a work in progress.</strong><br/><br/>
                  The tokens displayed below are for demonstration purposes only, and the process of listing
                  tokens via community votes are not yet live for Ethfinex. More information about the criteria to list
                  tokens is available at <Link to={'https://support.ethfinex.com/hc/en-us/articles/115002526172-Listing-a-Token-on-Ethfinex'}>
                  Ethfinex Support </Link>. Any token meeting the requirements following
                  review will become available for community vote to determine it's priority to be
                  made available for trading.
                </p>
              </div>
              <div className="container">
              {
                this.props.votes.sort((a, b) => a.totalYes < b.totalYes).map((token, index) => (
                  <div key={token.id} className="proposal-wrapper">

                    <div className="logo-wrapper">
                      <a target="_blank" href={token.website}>
                        <img src={token.logo} alt="" />
                      </a>
                    </div>

                    <div className="details-wrapper">
                      <Link
                        className="title"
                        to={token.website}
                      >
                        <h2>{index + 1}. {token.token}</h2>
                      </Link>
                      <p className="description">{token.description}</p>
                    </div>

                    <div className="results-wrapper">
                      <div className="yes">
                        <span className="word">yes</span>
                        <div className="bar">
                          <div
                            className="bar-yes"
                            style={{ width: `${token.yesPercentage}%` }}
                          />
                        </div>
                        <div className="number">{`${Math.floor(token.yesPercentage)}`}</div>
                        <div className="votes-number">{token.totalYes} NEC</div>
                        <Link className="vote-wrapper" to={`/token/${token.id}`}>VOTE</Link>
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

TokenListings.propTypes = {
  getTokenVotes: PropTypes.func.isRequired,
  votes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  votes: state.token.tokens,
});

export default connect(mapStateToProps, {
  getTokenVotes,
})(TokenListings);
