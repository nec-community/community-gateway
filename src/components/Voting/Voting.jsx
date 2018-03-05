import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Current from '../Current/Current';

import './Voting.scss';

class Voting extends Component {
  constructor() {
    super();

    this.state = {
      shown: 'current',
    };

    this.switch = this.switch.bind(this);
  }

  switch(slug) {
    this.setState({
      shown: slug,
    });
  }

  render() {
    return (
      <div className="voting-wrapper">
        <div className="left">
          <h2>Voting</h2>
          <div className="nav">
            <a
              className={`${this.state.shown === 'current' ? 'active' : ''}`}
              onClick={() => this.switch('current')}
            >
              Current Votes
            </a>
            <a
              className={`${this.state.shown === 'past' ? 'active' : ''}`}
              onClick={() => this.switch('past')}
            >
              Past Votes
            </a>
            <a
              className={`${this.state.shown === 'submit' ? 'active' : ''}`}
              onClick={() => this.switch('submit')}
            >
              Submit Proposal
            </a>
          </div>
        </div>
        <div className="right">
          {
            this.state.shown === 'current' &&
            <Current />
          }
          {
            this.state.shown === 'submit' &&
            <div className="submit-wrapper">
              <h3>
                Placeholder text title
              </h3>
              <p>
                Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                literature from 45 BC, making it over 2000 years old. Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old.
              </p>
              <Link to="/submit">Go to<br />submit page</Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

Voting.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Voting);
