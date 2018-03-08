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
        <div className="container">
          <h1>Submit a proposal</h1>
        </div>
        <div className="form-wrapper">
          <div className="form-container">
            <textarea
              name="description"
              id="description"
              type="text"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
              placeholder="Proposal description"
            />
            <label for="description">
              Proposal description:
            </label>

            <div className="duration">
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
            </div>

            {/*<div className="info-tip">*/}
              {/*The proposal will need to be approved by BitFinex before being visible.*/}
            {/*</div>*/}

            <div className="submit-wrapper">
              <button onClick={this.submitProposal}>Submit proposal</button>
              {
                this.state.submitError &&
                <p className="submit-error">{this.state.submitError}</p>
              }
            </div>
          </div>
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
