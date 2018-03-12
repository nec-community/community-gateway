import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Current from './Current/Current';
import Past from './Past/Past';

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
        <div className="bg-text voting-bg-text">voting</div>

        <div className="voting-content-wrapper">
          <h2>Voting</h2>

          <div className="meta">
            <div className="voting-desc">
              {/*<h3>Redeem your tokens</h3>*/}

              <div className="desc-sections">
                <div className="desc-section">
                  As a holder of Nectar tokens you can submit new ideas as proposals, as well as
                  vote on those submitted by others, to help determine the future of Ethfinex
                </div>
                <div className="desc-section">
                </div>
              </div>
            </div>

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
          <div className="content">
            {
              this.state.shown === 'current' &&
              <Current />
            }
            {
              this.state.shown === 'past' &&
              <Past />
            }
            {
              this.state.shown === 'submit' &&
              <div className="submit-wrapper">
                {/*<h3>*/}
                  {/*Placeholder text title*/}
                {/*</h3>*/}
                <p>
                  Every individual who holds NEC is able to contribute their ideas for Ethfinex to
                  be voted on by the rest of the token holders. If the proposal you create is
                  accepted it will initialise a vote, giving everyone a new voting token to match
                  their NEC balances.
                </p>
                <Link to="/submit">Go to submit page</Link>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Voting.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Voting);
