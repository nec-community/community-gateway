import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        {
          !this.props.isAdmin &&
          <Redirect to="/"/>
        }
        <div className="container">
          <h1>Submitted Proposals</h1>
          <div className="active-section">
            {
              this.props.proposals.map(proposal => (
                <div key={proposal.id} className="proposal-wrapper">
                  <div className="details-wrapper">
                    <p className="title">
                      {proposal.title}
                    </p>
                    <p className="duration">Duration: {proposal.duration} days</p>
                    <p className="proposer">Submitted by: {proposal._proposer}</p>
                    <p className="description">{proposal.description}</p>
                    <a onClick={() => eth.approveProposal(proposal.id, this.props.accountType)}>
                      Approve
                    </a>
                    <br />
                    <a onClick={() => eth.denyProposal(proposal.id, this.props.accountType)}>
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
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  proposals: state.proposal.nonApprovedProposals,
  account: state.account.account,
  accountType: state.account.accountType,
  isAdmin: state.account.isAdmin,
});

export default connect(mapStateToProps, {
  getNonApprovedProposals,
})(Admin);
