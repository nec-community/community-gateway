import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokenVotes, voteForToken } from '../../actions/tokenActions';
import { getVotingTokenBalance } from '../../actions/accountActions';
import './TokenListings.scss';

function nFormatter(num) {
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'mil '
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k '
     }
     if (num > 0) {
       return (num / 1).toFixed(1).replace(/\.0$/, '')
     }
     return num
}

class TokenListings extends Component {
  componentDidMount() {
    this.props.getTokenVotes();
    this.props.getVotingTokenBalance();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.account !== this.props.account) this.props.getVotingTokenBalance();
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
              <div className="left-header info-tip">
                  Ethfinex Voting Tokens are issued to traders in proportion to their NEC holdings, allowing loyal users more of a say without requiring you to burn your tokens.
                  To find out more about the voting process and how tokens are selected to be voted on, see the &nbsp;
                  <Link to='/faq'>FAQ</Link><br/><br/>
                  Submit your vote using MetaMask, Ledger or Keystore to show support for high-quality projects pushing the boundaries of the blockchain ecosystem.<br/><br/>
              </div>
              <div className="right-header info-tip">
                { this.props.account &&
                  <div className="account-balance">
                    <div className="row-1">
                      {(this.props.votingTokenBalance > 0.1) &&
                        <span> You currently have {nFormatter(this.props.votingTokenBalance)} voting tokens!</span>
                      }
                      {(this.props.votingTokenBalance <= 0.1) &&
                        <span> You do not have any voting tokens.<br/><br/>
                        Visit <a href='https://www.ethfinex.com' target='_blank'>Ethfinex</a> to buy some.</span>
                      }
                    </div><br/><br/>
                    {(this.props.votingTokenBalance > 0.1) &&
                      <span><div className="row-2">Vote for the token you wish to support below!</div></span>
                    }
                  </div>
                }
                { !this.props.account &&
                  <div className = "account-balance">
                    <div className="row-1">Connect a wallet to view your voting token balance.</div>
                  </div>
                }
              </div>

            </div>
            <div className="container">
              {
              this.props.votes.sort((a, b) => (b.totalYes - a.totalYes)).map((token, index) => (
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
                          style={{ width: `${99 * token.totalYes / token.total}%` }}
                        />
                      </div>
                      <div className="number">{nFormatter(token.totalYes)}</div>
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
  votingTokenBalance: PropTypes.string.isRequired,
  accountType: state.account.accountType,
  account: PropTypes.string.isRequired,
  getVotingTokenBalance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  votes: state.token.tokens,
  votingTokenBalance: state.account.votingTokenBalance,
  accountType: state.account.accountType,
  account: state.account.account,
});

export default connect(mapStateToProps, {
  getVotingTokenBalance,
  getTokenVotes,
  voteForToken,
})(TokenListings);
