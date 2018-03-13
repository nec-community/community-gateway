import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNonApprovedProposals } from '../../actions/proposalActions';
import './Admin.scss';
import eth from '../../services/ethereumService'

class Admin extends Component {
  componentDidMount() {
    this.props.getNonApprovedProposals();
  }

  render() {
    return (
      <div className="admin">
        <div className="container">
          <h1>Submitted Proposals</h1>
          <div className="active-section">
            {
              this.props.proposals.map(proposal => (
                <div key={proposal.id} className="proposal-wrapper">
                  <div className="details-wrapper">
                    <Link
                      className="title"
                      to={`/proposal/${proposal.id}`}
                    >
                      {proposal.title}
                    </Link>
                    <p className="duration">Duration: {proposal.duration} days</p>
                    <p className="proposer">Submitted by: {proposal._proposer}</p>
                    <p className="description">{proposal.description}</p>
                    <a className="vote-wrapper" onClick={() =>
                        eth.approveProposal(proposal.id, this.props.accountType
                      )}>
                      Approve
                    </a>
                    {' '}
                    <a className="vote-wrapper" onClick={() =>
                        eth.denyProposal(proposal.id, this.props.accountType
                      )}>
                      Deny
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  getNonApprovedProposals: PropTypes.func.isRequired,
  proposals: PropTypes.array.isRequired,
  account: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  proposals: state.proposal.nonApprovedProposals,
  account: state.account.account,
  accountType: state.account.accountType,
});

export default connect(mapStateToProps, {
  getNonApprovedProposals,
})(Admin);
