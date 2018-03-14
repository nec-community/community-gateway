import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitProposal } from '../../actions/proposalActions';

import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      durationInDays: 30,
      email: '',
      submitError: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
  }

  componentDidMount() {}

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  submitProposal() {
    this.setState({ submitError: '' });

    const { title, description, durationInDays, email } = this.state;

    if (!title) {
      return this.setState({ submitError: 'Title required.' });
    }
    if (!description) {
      return this.setState({ submitError: 'Description required.' });
    }
    if (durationInDays < 7 || durationInDays > 45) {
      return this.setState({ submitError: 'Proposal must last between 7 and 45 days.' });
    }

    this.props.submitProposal(durationInDays, `${title}\n${description}`, email);
  }

  render() {
    return (
      <div className="submit-proposal">
        <div className="container">
          <h1>Submit a proposal</h1>
        </div>
        <div className="form-wrapper">
          <div className="form-container">

            {
              this.props.tokenBalance === '0' &&
              <p className="error">NEC balance required on your account to submit a proposal</p>
            }

            <input
              name="title"
              type="text"
              value={this.state.title}
              placeholder="Proposal title"
              onChange={this.handleInputChange}
            />
            <textarea
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
              placeholder="Proposal description"
            />
            <p className="info-tip">
              Please ensure your description is as detailed as possible and includes all the
              necessary information and numbers which would be required to make the proposal
              actionable following a successful vote.
            </p>
            <div className="duration">
              <label>
                Duration (days):
                <input
                  name="durationInDays"
                  type="number"
                  min="7"
                  max="45"
                  value={this.state.durationInDays}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>

            <div className="email">
              <label>
                Email:
                <input
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </label>
              <p className="info-tip">
                Email field is optional - Ethfinex may contact you if more detail needs to be added
                to your proposal before a vote can begin
              </p>
            </div>

            <div className="submit-wrapper">
              <button onClick={this.submitProposal} disabled={this.props.tokenBalance === '0'}>
                Submit proposal
              </button>
              {
                this.state.submitError &&
                <p className="error">{this.state.submitError}</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tokenBalance: state.account.tokenBalance,
});

Submit.propTypes = {
  submitProposal: PropTypes.func.isRequired,
  tokenBalance: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  submitProposal,
})(Submit);
