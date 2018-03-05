import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProposals } from '../../actions/proposalActions';
import './Past.scss';

class Past extends Component {
  componentDidMount() {
    this.props.getProposals();
  }

  render() {
    return (
      <div className="all-proposals">
        <h1>All Proposals</h1>
        <div>
          {
            this.props.proposals.map(proposal => (
              <div key={proposal._token} className="proposal-wrapper">
                <p className="started">Started: {proposal.startTime.toISOString()}</p>
                <p className="duration">Duration: {proposal.duration} days</p>
                <p className="finished">Finished: {proposal._finalized ? 'Yes' : 'No'}</p>
                <p className="description">{proposal.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Past.propTypes = {
  getProposals: PropTypes.func.isRequired,
  proposals: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  proposals: state.proposal.proposals,
});

export default connect(mapStateToProps, {
  getProposals,
})(Past);
