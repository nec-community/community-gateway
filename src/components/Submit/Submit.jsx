import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitProposal } from '../../actions/proposalActions';

import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      durationInDays: 30,
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

    const { description, durationInDays } = this.state;

    if (!description) {
      this.setState({ submitError: 'Description required.' });
    }
    if (durationInDays < 7) {
      this.setState({ submitError: 'Proposal must last 7 days or longer.' });
    }

    this.props.submitProposal(durationInDays, description);
  }

  render() {
    return (
      <div className="submit-proposal">
        <h1>Submit a proposal</h1>
        <div className="form-wrapper">
          <label>
            Proposal description:
            <textarea
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
            />
          </label>

          <label>
            Duration (days):
            <input
              name="durationInDays"
              type="number"
              min="7"
              value={this.state.durationInDays}
              onChange={this.handleInputChange}
            />
          </label>

          <div className="info-tip">
            The proposal will need to be approved by BitFinex before being visible.
          </div>

          <button onClick={this.submitProposal}>Submit proposal</button>
          {
            this.state.submitError &&
            <p className="submit-error">{this.state.submitError}</p>
          }
        </div>
      </div>
    );
  }
}

Submit.propTypes = {
  submitProposal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  submitProposal,
})(Submit);
