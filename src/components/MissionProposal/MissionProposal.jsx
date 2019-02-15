import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import eth from '../../services/ethereumService';
import { voteForMission } from '../../actions/proposalActions';
import { timeUntilDate } from '../../services/utils';
import ProposalCountdown from '../ProposalCountdown/ProposalCountdown';

import './MissionProposal.scss';

class MissionProposal extends Component {

  async componentWillMount() {
    const { match: { params: { proposalId } } } = this.props;
  }

  render() {
    return (
      <div className="container single-proposal">
        {
          <div className="proposal-wrapper">
            <p className="title">Choose The Ethfinex Mission Statement</p>
            <div className="proposal-inner-wrapper">
              <ProposalCountdown endTime={Date.parse('2019-02-15') + (7 * 24 * 60 * 60 * 1000)} />
              <div className="details-wrapper">
                <p className="started">Started: Friday February 15th</p>
                <p className="submitter">Submitted by: Official Ethfinex Team</p>
                <p className="description">
                To truly embody our vision as a decentralised entity with distributed governance,
                we believe the Ethfinex Mission Statement should be chosen by those who have
                a stake in its future - you.
                </p>
                <p className="description-followup">
                Please vote for the option you think best reflects the Ethfinex spirit and journey.
                This statement will unite us with a shared set of values as we grow,
                and give us a yardstick to ensure each action we take brings us closer to our mission.
                </p>
                <p className="description-followup">
                If you need help with your decision, you can head to our blog post
                which explains how we got to these two options. [blog post link here]
                </p>
                <p className="description-followup">
                Choose your Mission Statement from the following:
                </p>
                <p className="option">
                  <ol className="align">
                    <li type="A"> &nbsp;Empowering you to lead the financial &nbsp;&nbsp;evolution.</li>
                    <li type="A"> &nbsp;We're here to accelerate the future of finance, &nbsp;&nbsp;putting you in control.</li>
                  </ol>
                </p>

                <div className="results-wrapper">
                  <div className="yes stretch">
                    <div className="bar-wrapper">
                      <span className="word">A</span>
                      <div className="bar">
                        <div className="bar-yes" style={{ width: `${50}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="no">
                    <span className="word">B</span>
                  </div>
                </div>

                <div className="results-wrapper">
                  <div className="yes">
                    <div className="number">?</div>
                  </div>
                  <div className="no">
                    <div className="number">?</div>
                  </div>
                </div>

                {
                  <p className="vote-wrapper">
                    <a onClick={() => this.props.voteForMission(true)}>Vote A</a>
                    <a onClick={() => this.props.voteForMission(false)}>Vote B</a>
                  </p>
                }

                {
                  <p className="vote-wrapper error">
                    Results will be revealed only after 22.02.2019 at 12:00 pm UTC.
                    You may change your decision at any time until then.
                  </p>
                }

                {
                  true &&
                  <div className="help">
                    <h3>How do I vote?</h3>
                    <p>
                      You can vote by selecting either statement A or B above.
                      In order to participate you must have an Ethereum wallet (either Metamask,
                      Keystore, or Ledger). In order to keep the vote fair and maximise
                      the voice of those who have been part of Ethfinex&apos;s journey,
                      only votes cast by addresses who have held Nectar tokens over the
                      last year or have interacted with the Ethfinex Trustless smart contracts
                      will be counted.
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account.account,
});

MissionProposal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
    }).isRequired,
  }).isRequired,
  voteForMission: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  voteForMission,
})(MissionProposal);
