import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveProposals } from '../../actions/proposalActions';
import eth from '../../services/ethereumService';
import './Current.scss';

class Current extends Component {
  componentDidMount() {
    this.props.getActiveProposals();
  }

  vote(id, vote) {
    eth.vote(id, vote);
  }

  render() {
    return (
      <div className="current-proposals">
        <h1>Currently Active Proposals</h1>
        <div>
          {
            this.props.proposals.map(proposal => (
              <div key={proposal._token} className="proposal-wrapper">
                <p className="started">Started: {proposal.startTime.toISOString()}</p>
                <p className="duration">Duration: {proposal.duration} days</p>
                <p className="description">{proposal.description}</p>
                <p className="vote-wrapper">
                  Vote
                  <a onClick={() => this.vote(proposal.id, true)}>Yes</a>
                  <a onClick={() => this.vote(proposal.id, false)}>No</a>
                </p>
                <p>
                  Results: <br />
                  Yes: { proposal._totalYes } <br />
                  No: { proposal._totalNo }
                </p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  getActiveProposals: PropTypes.func.isRequired,
  proposals: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  proposals: state.proposal.activeProposals,
});

export default connect(mapStateToProps, {
  getActiveProposals,
})(Current);
