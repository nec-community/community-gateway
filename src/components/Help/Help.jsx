import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openHelp, closeHelp } from '../../actions/accountActions';

import './Help.scss';

class Help extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="help-fab" onClick={this.props.openHelp}>
          {'?'}
        </div>
        {this.props.helpOpen && (
          <div className="help-wrapper">
            <div className="help-inner-wrapper">
              <button className="close-button" onClick={this.props.closeHelp} />
              <h3>Voting using Ethfinex Voting Tokens (EVT)</h3>
              <p>
                EVT are automatically distributed to any wallet that holds Nectar tokens (NEC) at
                the time when a new vote begins. These EVT are spent when voting, and any unused
                tokens expire at the end of the vote. Anyone who receives EVT can also sell them on{' '}
                <a href="https://www.ethfinex.com" target="_blank">
                  Ethfinex.
                </a>
              </p>

              <div className="left-bullet-wrapper">
                <ol>
                  <p>
                    <strong>Need EVT?</strong>
                  </p>

                  <li>
                    Create an account on{' '}
                    <a href="https://www.ethfinex.com" target="_blank">
                      Ethfinex.
                    </a>
                    ;
                  </li>
                  <li>
                    <a
                      href="https://support.ethfinex.com/hc/en-us/articles/115002246032-Making-a-Deposit"
                      target="_blank"
                    >
                      Deposit
                    </a>{' '}
                    ETH or any other ERC20 token;
                  </li>
                  <li>
                    <a
                      href="https://support.ethfinex.com/hc/en-us/articles/115002378891-Making-a-Trade"
                      target="_blank"
                    >
                      Convert
                    </a>{' '}
                    your ETH to USD;
                  </li>
                  <li>
                    <a
                      href="https://support.ethfinex.com/hc/en-us/articles/115002378891-Making-a-Trade"
                      target="_blank"
                    >
                      Buy
                    </a>{' '}
                    EVT;
                  </li>

                  <p>
                    <strong>Already have EVT?</strong>
                  </p>

                  <li>
                    <a
                      href="https://support.ethfinex.com/hc/en-us/articles/115002246152-Making-a-Withdrawal"
                      target="_blank"
                    >
                      Withdraw
                    </a>{' '}
                    or transfer your EVT to the external Ethereum wallet (Ledger, MetaMask or
                    Keystore).
                  </li>
                  <li>Visit Nectar.community and find Token Listings in the menu (this page);</li>
                  <li>
                    Connect your wallet. We advise all users to access the site via MetaMask or
                    Ledger;
                  </li>
                  <li>Ensure your wallet contains ETH, alongside EVT, for transaction gas fees;</li>
                  <li>
                    Vote for your preferred token. Please note that your entire EVT balance will be
                    cast when voting. To vote for multiple tokens repeat the process, depositing
                    precise amounts of EVT each time.
                  </li>
                </ol>
              </div>
              <div className="video-wrapper">
                <iframe
                  width="100%"
                  height="300"
                  src="https://www.youtube.com/embed/IBbbnPrPt-g"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
              <p>
                To learn more, please visit the <a href="/faq">Nectar.community FAQ</a> or get in
                touch with us on{' '}
                <a href="https://t.me/ethfinextelegram" target="_blank">
                  Telegram
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Help.propTypes = {
  openHelp: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  helpOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  helpOpen: state.account.helpOpen,
});

export default connect(
  mapStateToProps,
  {
    openHelp,
    closeHelp,
  }
)(Help);
