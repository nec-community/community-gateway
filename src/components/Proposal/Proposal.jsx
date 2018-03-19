import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import eth from '../../services/ethereumService';
import { voteForProposal } from '../../actions/proposalActions';

import './Proposal.scss';

class Proposal extends Component {
  constructor() {
    super();

    this.state = {
      proposal: {},
      voted: true,
    };
  }

  async componentWillMount() {
    const { match: { params: { proposalId } } } = this.props;
    const proposal = await eth.getProposalDetails(proposalId);
    const voted = this.props.account && await eth.hasUserVoted(proposal.id, this.props.account);
    this.setState({
      proposal,
      voted,
    });
  }

  async componentWillUpdate(nextProps) {
    const proposalId = nextProps.match.params.proposalId;
    const oldProposalId = this.props.match.params.proposalId;
    if (oldProposalId !== proposalId || nextProps.account !== this.props.account) {
      const proposal = await eth.getProposalDetails(proposalId);
      const voted = await eth.hasUserVoted(proposal.id, this.props.account);
      this.setState({
        proposal,
        voted,
      });
    }
  }

  render() {
    const proposal = this.state.proposal;
    return (
      <div className="container single-proposal">
        {
          proposal.id &&
          <div key={proposal._token} className="proposal-wrapper">
            <p className="title">{proposal.title}</p>
            <div className="proposal-inner-wrapper">
              <div className="remaining">
                <div className="number">{proposal.remainingDays}</div>
                <div>
                  <div className="days">day{proposal.remainingDays === 1 ? '' : 's'}</div>
                  <div className="more">remaining</div>
                </div>
              </div>
              <div className="details-wrapper">
                <p className="started">Started {proposal.startTime.toLocaleDateString()}</p>
                <p className="submitter">Submitted by {proposal._proposer}</p>
                <p className="description">{proposal.description}</p>

                <div className="results-wrapper">
                  <div className="yes stretch">
                    <div className="bar-wrapper">
                      <span className="word">yes</span>
                      <div className="bar">
                        <div className="bar-yes" style={{ width: `${proposal.yesPercentage}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="no">
                    <span className="word">no</span>
                  </div>
                </div>

                <div className="results-wrapper">
                  <div className="yes">
                    <div className="number">{`${proposal.yesPercentage}`}</div>
                    <div className="votes-number">{proposal.totalYes} NEC</div>
                  </div>
                  <div className="no">
                    <div className="number">{`${proposal.noPercentage}`}</div>
                    <div className="votes-number">{proposal.totalNo} NEC</div>
                  </div>
                </div>


                {
                  this.props.tokenBalance === '0' &&
                  <p className="vote-wrapper error">NEC balance required on your account to submit a proposal</p>
                }

                {
                  this.props.tokenBalance !== '0' &&
                  !this.state.voted &&
                  <p className="vote-wrapper">
                    <a onClick={() => this.props.voteForProposal(proposal.id, true)}>Vote Yes</a>
                    <a onClick={() => this.props.voteForProposal(proposal.id, false)}>Vote No</a>
                  </p>
                }

                {
                  this.state.voted &&
                  <p className="voted">You voted { this.state.voted }.</p>
                }

                <div className="help">
                  <h3>How to vote?</h3>
                  <p>
                    Each proposal has its own token which is created at the start of the vote. If you had
                    250 NEC when the vote began you will also have 250 voting tokens, which are spent to
                    cast your vote as either 'Yes' or 'No', and then destroyed. This ensures that it is only
                    possible to vote for each proposal once. The voting tokens can be transferred like any
                    other ERC20 compatible token, so if you wish to delegate them to someone you trust to vote
                    on your behalf you may do so.
                  </p>
                </div>
              </div>
              <div className="remaining" />
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tokenBalance: state.account.tokenBalance,
  account: state.account.account,
});

Proposal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      proposalId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  voteForProposal: PropTypes.func.isRequired,
  tokenBalance: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  voteForProposal,
})(Proposal);
