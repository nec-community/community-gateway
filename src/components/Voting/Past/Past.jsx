import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProposals } from '../../../actions/proposalActions';
import './Past.scss';

class Past extends Component {
  componentDidMount() {
    this.props.getProposals();
  }

  render() {
    return (
      <div className="past-proposals">
        {
          this.props.proposals.filter(p => !p._active).map(proposal => (
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
        {
          this.props.proposals.filter(p => !p._active).length === 0 &&
          <p>No past proposals</p>
        }
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
