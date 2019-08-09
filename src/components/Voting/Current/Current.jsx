import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getActiveProposals } from '../../../actions/proposalActions';
import './Current.scss';

class Current extends Component {
  componentDidMount() {
    this.props.getActiveProposals();
  }

  render() {
    return (
      <div className="current-proposals">
        {this.props.proposals.map(proposal => (
          <div key={proposal._token} className="proposal-wrapper">
            <p className="started">{proposal.startTime.toLocaleString()}</p>
            <p className="title">
              <Link className="vote-wrapper" to={`/proposal/${proposal.id}`}>
                {proposal.title}
              </Link>
            </p>
            <p className="description">{proposal.description}</p>
            <Link className="vote-wrapper" to={`/proposal/${proposal.id}`}>
              VOTE
            </Link>
          </div>
        ))}
        {this.props.proposals.length === 0 && <p>No active proposals</p>}
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

export default connect(
  mapStateToProps,
  {
    getActiveProposals,
  }
)(Current);
