import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Help from '../../components/Help/Help';
import { getTokenVotes, voteForToken } from '../../actions/tokenActions';
import { getVotingTokenBalance } from '../../actions/accountActions';
import './TokenListings.scss';

function nFormatter (num) {
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

const padToTwo = num => (num > 9) ? num : `0${num}`;

class TokenListings extends Component {
  constructor() {
    super();
    this.state = {
      daysRemaining: 0,
      hoursRemaining: 0,
      minutesRemaining: 0,
      secondsRemaining: 0,
    };
    this.refreshTime = this.refreshTime.bind(this);
  }
  componentDidMount() {
    this.props.getTokenVotes();
    this.refreshTime();
    setInterval(this.refreshTime, 1000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.endingTime !== this.props.endingTime ) this.refreshTime();
  }

  refreshTime() {
    const timeRemaining = this.props.endingTime - (new Date());
    const daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
    const hoursRemaining = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / 60 / 60 / 1000);
    const minutesRemaining = Math.floor((timeRemaining % (60 * 60 * 1000)) / 60 / 1000);
    const secondsRemaining = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    this.setState({
      timeRemaining,
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining,
    });
  }

  render() {
    const { endingTime } = this.props;
    const {
      timeRemaining,
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining
    } = this.state;
    return (
      <div className="listings">
      <Help />
        <div className="container">
          <h1>Ethfinex Listing Leaderboard</h1>
          {
            timeRemaining < 0 &&
            <h5>Voting for this round has now completed</h5>
          }
          {
            timeRemaining > 0 &&
            <h5>The top 3 tokens will become tradable on Ethfinex</h5>
          }
          {
            timeRemaining > 0 &&
            <div className="countdown">
              <span data-tooltip="Days">{ padToTwo(daysRemaining) }</span>:
              <span data-tooltip="Hours">{ padToTwo(hoursRemaining) }</span>:
              <span data-tooltip="Mins">{ padToTwo(minutesRemaining) }</span>:
              <span data-tooltip="Secs">{ padToTwo(secondsRemaining) }</span>
            </div>
          }

          <div className="header-desc-container">
            <div className="left-header">
              Ethfinex <a href='https://etherscan.io/token/0xf5490dd02ef9a20682fa7cd12fd2be428b5a2431' target='_blank'>Voting Tokens</a> are
              issued to traders in proportion to their NEC holdings,
              allowing loyal users more of a say without spending Nectar tokens.
              To find out more about the voting process and how projects are selected to be voted on,
              see the <Link to='/faq'>FAQ</Link><br /><br />
              Submit your vote using MetaMask, Ledger or Keystore to show support for high-quality
              projects pushing the boundaries of the blockchain ecosystem.<br /><br />
              View the results of the <Link to='/previousTokenVote'>previous community vote</Link>.
            </div>
            <div className="right-header info-tip">
              {this.props.account &&
              <div className="account-balance">
                <div className="row-1">
                  {(this.props.votingTokenBalance > 0.1) &&
                  <span> You currently have {nFormatter(this.props.votingTokenBalance)} voting tokens!</span>
                  }
                  {(this.props.votingTokenBalance <= 0.1) &&
                  <span> You do not have any voting tokens.<br /><br />
                        Visit <a href='https://www.ethfinex.com' target='_blank'>Ethfinex</a> to buy some.</span>
                  }
                </div>
                {(this.props.votingTokenBalance > 0.1) &&
                <span>
                  <br />
                  <div className="row-2">Vote for the token you wish to support below!</div>
                </span>
                }
              </div>
              }
              {!this.props.account &&
              <div className="account-balance">
                <div className="row-1">Connect a wallet to view your voting token balance.</div>
              </div>
              }
            </div>
          </div>
        </div>
        <div>
          <div className="active-section">

            <div className="container">
              {
                this.props.votes.sort(function(a, b) {
                    if (a.totalYes - b.totalYes > 0) return -1;
                  	if (b.totalYes - a.totalYes > 0) return 1;

                    if (a.token.toLowerCase() > b.token.toLowerCase()) return 1;
                  	if (a.token.toLowerCase() < b.token.toLowerCase()) return -1;
                  }).map((token, index) => (
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
                        <a className="vote-wrapper" onClick={() => this.props.voteForToken(token.id)}>VOTE</a>
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
  accountType: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  getVotingTokenBalance: PropTypes.func.isRequired,
  endingTime: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  votes: state.token.tokens,
  endingTime: state.token.endingTime,
  votingTokenBalance: state.account.votingTokenBalance,
  accountType: state.account.accountType,
  account: state.account.account,
});

export default connect(mapStateToProps, {
  getVotingTokenBalance,
  getTokenVotes,
  voteForToken,
})(TokenListings);
