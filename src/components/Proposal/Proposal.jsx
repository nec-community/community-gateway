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
    };
  }

  async componentWillMount() {
    const { match: { params: { proposalId } } } = this.props;
    const proposal = await eth.getProposalDetails(proposalId);
    this.setState({ proposal });
  }

  async componentWillUpdate(nextProps) {
    const proposalId = nextProps.match.params.proposalId;
    const oldProposalId = this.props.match.params.proposalId;
    if (oldProposalId !== proposalId) {
      const proposal = await eth.getProposalDetails(proposalId);
      this.setState({ proposal });
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
                  <div className="days">day{proposal.remainingDays % 10 === 1 ? '' : 's'}</div>
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

                <p className="vote-wrapper">
                  {'Vote '}
                  <a onClick={() => this.props.voteForProposal(proposal.id, true)}>Yes</a>
                  {' '}
                  <a onClick={() => this.props.voteForProposal(proposal.id, false)}>No</a>
                </p>

                <div className="help">
                  <h3>How to vote?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="remaining"></div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Proposal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      proposalId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  voteForProposal: PropTypes.func.isRequired,
};

export default connect(null, {
  voteForProposal,
})(Proposal);
