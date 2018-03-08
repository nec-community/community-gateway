import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProposals } from '../../actions/proposalActions';
import './AllProposals.scss';

class AllProposals extends Component {
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
                <p className="started">{proposal.startTime.toLocaleString()}</p>
                <p className="title">
                  <Link className="vote-wrapper" to={`/proposal/${proposal.id}`}>{proposal.title}</Link>
                </p>
                <p className="description">{proposal.description}</p>
                <Link className="vote-wrapper" to={`/proposal/${proposal.id}`}>Details</Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

AllProposals.propTypes = {
  getProposals: PropTypes.func.isRequired,
  proposals: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  proposals: state.proposal.proposals,
});

export default connect(mapStateToProps, {
  getProposals,
})(AllProposals);
