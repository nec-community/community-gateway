import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteForToken } from '../../actions/tokenActions';

import './TokenListingVoteModal.scss';

class TokenListingVoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.votingTokenBalance,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.vote = this.vote.bind(this);
  }

  handleInputChange(event) {
    const { value } = event.target;
    this.setState({
      amount: value,
    });
  }

  vote() {
    const { id } = this.props.tokenData;
    this.props.voteForToken(id, this.state.amount);
    this.props.closeHelp();
  }

  render() {
    const { token } = this.props.tokenData;
    return (
      <div className="modal-wrapper">
        <div className="modal-inner-wrapper">
          <h2>Vote for {token}</h2>
          <button className="close-button" onClick={this.props.closeHelp} />
          <p>
            You can distribute your EVT to multiple tokens.
            Choose how many EVT you’d like to assing to {token}.
          </p>
          <p className="amount-picker">
            <input
              type="range"
              value={this.state.amount}
              onChange={this.handleInputChange}
              min={0}
              max={this.props.votingTokenBalance}
            />
            <input type="text" value={this.state.amount} onChange={this.handleInputChange} /><label>EVT</label>
          </p>
          <div>
            <button onClick={this.vote}>Vote</button>
          </div>
        </div>
      </div>
    );
  }
}

TokenListingVoteModal.propTypes = {
  votingTokenBalance: PropTypes.string.isRequired,
  closeHelp: PropTypes.func.isRequired,
  tokenData: PropTypes.object.isRequired,
  voteForToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  votingTokenBalance: state.account.votingTokenBalance,
});

export default connect(mapStateToProps, {
  voteForToken,
})(TokenListingVoteModal);
