import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Help from '../../components/Help/Help';
import TokenListingVoteModal from '../TokenListingVoteModal/TokenListingVoteModal'
import { getTokenVotes, voteForToken } from '../../actions/tokenActions';
import { getVotingTokenBalance } from '../../actions/accountActions';
import './TokenListings.scss';
import { scrollToSection } from '../../services/scrollAnimation';

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
      showModal: false,
      tokenData: {},
      detailsShown: null,
    };
    this.refreshTime = this.refreshTime.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.vote = this.vote.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  componentDidMount() {
    this.props.getTokenVotes();
    this.refreshTime();
    setInterval(this.refreshTime, 1000);
    if (document.location.hash)
      scrollToSection(document.location.hash);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.endingTime !== this.props.endingTime ) this.refreshTime();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  vote(tokenData) {
    this.setState({ tokenData });
    this.toggleModal();
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

  toggleDetails(id) {
    if (this.state.detailsShown === id)
      return this.setState({
        detailsShown: null,
      });
    this.setState({
      detailsShown: id,
    });
  }

  render() {
    const { endingTime } = this.props;
    const {
      timeRemaining,
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining,
    } = this.state;
    return (
      <div className="listings">
        <Help />
        <div className="container">
          <h1>Leaderboard</h1>
          {
            timeRemaining < 0 &&
            <h5>Voting for this round has now completed</h5>
          }
          {
            timeRemaining > 0 &&
            timeRemaining < 7 * 24 * 60 * 60 &&
            <h5>Voting is live! The top 3 tokens will become tradable on Ethfinex</h5>
          }
          {
            timeRemaining > 0 &&
            timeRemaining > 7 * 24 * 60 * 60 &&
            <h5>Voting will start when the countdown finishes and last seven days</h5>
          }
          {
            timeRemaining > 0 &&
            <div className="countdown">
              <span data-tooltip="Days">{ padToTwo(daysRemaining % 7) }</span>:
              <span data-tooltip="Hours">{ padToTwo(hoursRemaining) }</span>:
              <span data-tooltip="Mins">{ padToTwo(minutesRemaining) }</span>:
              <span data-tooltip="Secs">{ padToTwo(secondsRemaining) }</span>
            </div>
          }
          <div className="header-desc-container">
            <div className="left-header">
              <p>
                Ethfinex <a
                href='https://etherscan.io/token/0x36108dc5f46c2630db44a1d645876ea04aa61f9e'
                target='_blank'>Voting Tokens</a> are issued to traders in proportion to their NEC
                holdings, allowing loyal users more of a say without spending Nectar tokens. To find
                out more about the voting process and how projects are selected to be voted on, see
                the <Link to="/faq">FAQ</Link>
              </p>
              <p>
                Submit your vote using MetaMask, Ledger or Keystore to show support for high-quality
                projects pushing the boundaries of the blockchain ecosystem.
              </p>
              <p>
                View the results of the <Link to="/previous-token-votes">previous community vote</Link>.
              </p>
            </div>
            <div className="right-header">
              {this.props.account &&
              <div className="side-badge">
                <div className="row-1">
                  {((this.props.votingTokenBalance) > 0.1) &&
                  <span> You currently have {nFormatter(this.props.votingTokenBalance)} voting tokens!</span>
                  }
                  {(this.props.votingTokenBalance <= 0.1) &&
                  <span> You do not have any voting tokens.<br /><br />
                        Visit <a href="https://www.ethfinex.com" target="_blank">Ethfinex</a> to buy some.
                  </span>
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
              <div className="side-badge">
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
                !this.props.isProposalActive &&
                <div className="no-active-vote">
                  <h5>Voting is currently not active. You can view the results of <Link to='/previous-token-votes'>previous votes</Link>. </h5>
                </div>
              }
              {
                this.props.votes.sort((a, b) => {
                  if (a.totalYes - b.totalYes > 0) return -1;
                  if (b.totalYes - a.totalYes > 0) return 1;
                  return 1;
                }).map((token, index) => (
                  <div
                    key={token.address}
                    className={`listing-wrapper ${this.state.detailsShown === token.address ? '-active' : ''}`}
                    onClick={() => this.toggleDetails(token.address)}
                  >
                    <div className="details-wrapper">
                      <div className="index">{index + 1}</div>

                      <div className="logo-wrapper">
                        <a target="_blank" href={token.website}>
                          <img src={token.logo} alt="" />
                        </a>
                      </div>

                      <div className="title-result-wrapper">
                        <div
                          target="_blank"
                          href={token.discussions}
                          className="title"
                        >
                          {token.shortName || token.token}
                          <span>{token.symbol}</span>
                        </div>

                        {
                          typeof token.totalYes !== 'undefined' &&
                          <div className="results-wrapper" key={0}>
                            <div className="yes">
                              <div className="bar">
                                <div
                                  className="bar-yes"
                                  style={{ width: `${99 * token.totalYes / token.total}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                      {
                        typeof token.totalYes !== 'undefined' &&
                        <div className="voting-wrapper" key={1}>
                          <div className="votes-number">{nFormatter(token.totalYes)}</div>
                          <a className="vote-wrapper" onClick={(e) => {e.stopPropagation(); this.vote(token)}}>VOTE</a>
                        </div>
                      }
                    </div>
                    <p className="description">
                      {token.description || 'No description available'}
                      <br />
                      {
                        token.website &&
                        <a
                          href={token.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                        >Visit Website</a>
                      }
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {
          this.state.showModal &&
          <TokenListingVoteModal closeModal={this.toggleModal} tokenData={this.state.tokenData} />
        }
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
  isProposalActive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  votes: state.token.tokens,
  isProposalActive: state.token.isActive,
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
