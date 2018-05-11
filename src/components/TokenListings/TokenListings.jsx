import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokenVotes, voteForToken } from '../../actions/tokenActions';
import './TokenListings.scss';

class TokenListings extends Component {
  componentDidMount() {
    this.props.getTokenVotes();
  }

  render() {
    return (
      <div className="all-proposals">
        <div className="container">
          <h1>Ethfinex Listing Leaderboard</h1>
          <h5>The top 4 tokens on Tuesday 29th May will become tradable on Ethfinex</h5>
        </div>
        <div>
          <div className="active-section">
            <div className="header-desc-container">
              <p className="info-tip">
                <strong>Info:</strong> If you hold Nectar tokens you can vote from Tuesday 15th May on one of the 10 tokens below.<br/><br/>
                Ethfinex Voting Tokens are issued to traders in proportion to their NEC holdings, allowing loyal users more of a say without requiring you to burn your tokens.
                To find out more about the voting process and how tokens are selected to be voted on, see the &nbsp;
                <Link to='/faq'>FAQ</Link><br/><br/>
                Submit your vote using MetaMask, Ledger or Keystore to show support for high-quality projects pushing the boundaries of the blockchain ecosystem.<br/><br/>
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
                    <a
                      target="_blank"
                      href={token.discussions}
                      className="title"
                    >
                      <h2>{index + 1}. {token.token}</h2>
                    </a>
                    <p className="description">{token.description}</p>
                  </div>

                  <div className="results-wrapper">
                    <div className="yes">
                      <span className="word">votes</span>
                      <div className="bar">
                        <div
                          className="bar-yes"
                          style={{ width: `${token.totalYes / 100000000}%` }}
                        />
                      </div>
                      <div className="number">{token.totalYes}</div>
                      <p className="vote-wrapper">
                        <a onClick={() => this.props.voteForToken(token.id)}>VOTE</a>
                      </p>
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
  voteForToken: PropTypes.func.isRequired,
  votes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  votes: state.token.tokens,
});

export default connect(mapStateToProps, {
  getTokenVotes,
  voteForToken,
})(TokenListings);
