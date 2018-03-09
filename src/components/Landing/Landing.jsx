import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import Web3 from 'web3';
import Calculator from '../Calculator/Calculator';
import Stats from '../Stats/Stats';
import Voting from '../Voting/Voting';
import './Landing.scss';

class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className="landing-wrapper">
        <section className="hero">
          <h1>welcome to
            <b>Nectar.community</b>
          </h1>
          <div className="hero-footer">
            <div>
              <span className="vertical">scroll down</span>
            </div>
            <div>
              <h2>
                The Ethfinex Nectar token (NEC) is used for governance and entitles the holders to
                claim a share of the fees collected on Ethfinex.
              </h2>
            </div>
            <div />
          </div>
        </section>

        <section className="statistics">
          <div className="container">
            <Stats />
          </div>
        </section>

        <section className="calculator">
          <div className="container">
            <Calculator />
          </div>
        </section>

        <div className="waves" />

        <section className="voting">
          <div className="container">
            <Voting />
          </div>
        </section>

        <div className="waves reverse" />

        <section className="learn-more">
          <div className="container">
            <div className="learn-more-wrapper">
              <div className="bg-text learn-more-bg-text">learn more</div>

              <div className="learn-more-content-wrapper">
                <h1>Learn more</h1>
                <h2>nectar.community</h2>
                <p>Placeholder</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  showNotif: PropTypes.bool.isRequired,
  notifMessage: PropTypes.string.isRequired,
  notifType: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  accountError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  account: state.account.account,
  accountError: state.account.accountError,
  showNotif: state.notification.displayed,
  notifMessage: state.notification.message,
  notifType: state.notification.type,
});

export default connect(mapStateToProps, {})(App);
