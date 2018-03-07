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
        {
          this.props.proposals.map(proposal => (
            <div key={proposal._token} className="proposal-wrapper">
              <p className="started">{proposal.startTime.toLocaleString()}</p>
              <p className="title">{proposal.title}</p>
              <p className="description">{proposal.description}</p>
              <p className="duration">Duration: {proposal.duration} days</p>
              <div className="results-wrapper">
                <div className="yes">
                  <span className="word">yes</span>
                  <div className="bar">
                    <div className="bar-yes" style={{ width: `${proposal.yesPercentage}%` }} />
                  </div>
                  <div className="number">{ `${proposal.yesPercentage}` }</div>
                  <div className="votes-number">435 votes</div>
                </div>
                <div className="no">
                  <span className="word">no</span>
                  <div className="number">{ `${proposal.noPercentage}` }</div>
                  <div className="votes-number">435 votes</div>
                </div>
              </div>
              <p className="vote-wrapper">
                {'Vote '}
                <a onClick={() => this.vote(proposal.id, true)}>Yes</a>
                {' '}
                <a onClick={() => this.vote(proposal.id, false)}>No</a>
              </p>
            </div>
          ))
        }
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
