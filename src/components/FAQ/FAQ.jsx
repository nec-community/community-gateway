import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './FAQ.scss';

class FAQ extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="faq">
        <div className="container">
          <h1>Learn More - FAQ</h1>
        </div>
        <div className="faq-wrapper">
          <div className="faq-container">
            <h2>What is DeversiFi?</h2>
            <p className="info-tip">
              <a href="https://deversifi.com" target="_blank">
                DeversiFi{' '}
              </a>{' '}
             is a high-speed, comprehensive decentralised trading platform for digital assets and is the only existing exchange where traders can execute large orders at low cost directly from their privately owned wallets. With no sign-up or registration needed, DeversiFi supports all of the most popular wallet choices such as Metamask, Squarelink, Portis, Ledger and Trezor. Incubated over a 2 year period by Ethfinex under the trustless.ethfinex banner, DeversiFi is now a fully independent exchange that meets the needs of professional traders, without compromising on speed, security or choice and will be the first-to-market exchange to be powered by StarkWare technology, bringing instant settlement, deep liquidity, enhanced security and competitive fees to non-custodial trading.
            </p>
          </div>
          <div className="faq-container">
          <h2>What is Nectar.Community?</h2>
            <p className="info-tip">
              Nectar.Community is the decentralized governance portal for DeversiFi and is fully{' '}
              <a href="https://github.com/ethfinex/community-gateway" target="_blank">
                open source.{' '}
              </a>{' '}
               As well as functionality for submitting proposals and voting, the site also provides statistics, learning resources, and tools such as the trader leaderboard and the NEC burn event, which places Nectar token holders at the heart of the necDAO ecosystem.
          </p>
          </div>
          <div className="faq-container">
            <h2>What is the Nectar token (NEC)?</h2>
            <p className="info-tip">
              The Nectar token is a deflationary governance and utility token created originally by Ethfinex as part of its journey towards decentralisation, and now underpinning DeversiFi’s continuation of that journey. The function of the token is to help grow the world’s largest decentralised exchange member base. Today the token incentivises holders with fee discounts on DeversiFi, and empowers them, as necDAO members, to participate in the collective decision making and direction of Nectar and DeversiFi. Furthermore, every week, up to 50% of the revenues from DeversiFi trading fees will be used in an auction type NEC “buy and burn” event, thus reducing the supply over time. To find out more information about the Nectar token please read the {' '} 
              <a href="https://nectar.community/whitepaper" target="_blank">
                Whitepaper </a>{' '} and visit our {' '}
              <a href="https://support.deversifi.com/en/knowledgebase/5-the-nectar-token" target="_blank">
                support pages.</a>{' '}              
            </p>
          </div>
          <div className="faq-container">
            <h2>Where can I get Nectar tokens?</h2>
            <p className="info-tip">
              <a href="https://app.deversifi.com" target="_blank">
                DeversiFi{' '}
              </a>{' '}
              lists the {' '}
              <a href="https://www.coingecko.com/en/coins/nectar-token" target="_blank">
                Nectar token
              </a>{' '}
               for trading against USDt and ETH, and {' '}
              <a href="https://www.bitfinex.com/" target="_blank">
                Bitfinex </a>{' '}
              against USD, ETH and BTC. This list will continue to grow as the implementation and usage of Nectar increases, and follows the removal of a KYC whitelist, which now opens the token up to the wider DeFi ecosystem.
            </p>
          </div>
        </div>
        <div className="faq-wrapper-dark">
          <div className="faq-container">
            <h2>What is the necDAO?</h2>
            <p className="info-tip">
              The necDAO is a <b>decentralised autonomous organisation</b> with the goal of growing and governing the world’s largest decentralised exchange network, as well as promoting the utility of the Nectar token and the developmental growth of DeversiFi. It will launch as one of the most highly funded DAOs, owning up to 17,500 ETH, with its initial remit being to govern aspects of DeversiFi and Nectar. NEC holders will serve as de facto members and voters within the DAO and be able to make proposals, deploy capital and grow the DAO as they see fit. Developers, researchers and other individuals in the wider world will be free to submit proposals to the DAO which will subsequently be deliberated over by NEC holding members.
            </p>
          </div>
          <div className="faq-container">
            <h2>Will the necDAO be dependant on DeversiFi?</h2>
            <p className="info-tip">
              The necDAO will exist independently of DeversiFi, but given the utility that DeversiFi gives NEC, there will be a close and synergistic relationship. For instance, NEC holders may wish to propose and fund new features for DeversiFi, agree marketing & events budgets, or propose additional incentives for traders who contribute to DeversiFi. The necDAO places the NEC community in direct control of a substantial amount of ETH and also puts them at the heart of DeversiFi.
            </p>
          </div>
          <div className="faq-container">
            <h2>Will proposals be made through the necDAO?</h2>
            <p className="info-tip">
              Yes, when the necDAO launches nectar holders will be able to submit proposals, including ones to do with platform changes, enhancements and token listings. We originally implemented our own proposal and voting system into nectar.community as a way of empowering nectar holders to be active in the platform’s directional planning and having a say on which tokens get listed. Submitted proposals then went to DeversiFi admins for screening, and then into a voting phase for a predefined amount of time, allowing community members to cast their votes. Similarly, for token listings, interested projects submitted their application to the admins, who vetted and then placed suitable projects into a random draw mechanism. The results of which were given to the community to vote for listing spots. We then integrated the Kleros blockchain dispute resolution layer into the token listing process. This decentralisation of the vetting process empowered the community with the responsibility for curating projects interested in listing and paved the way for a more efficient governance mechanism. 
It became clear however, that these voting processes were in need of a major overhaul, and thus the future voting process will be conducted via the necDAO. 
</p>
          </div>
          <div className="faq-container">
            <h2>Will proposals through the necDAO be binding?</h2>
            <p className="info-tip">
              As the future proposals will be on-chain, they therefore can be binding, unlike our previous proposal system. The necDAO will have decentralised governance at its core, and be underpinned by DAOstack’s holographic consensus methodologies.
            </p>
          </div>
          <div className="faq-container">
            <h2>What types of events will I be able to vote on via necDAO?</h2>
            <p className="info-tip">
              As members of the necDAO, it will be possible to vote on events such as submitted proposals, potential token listings, platform improvements and governance methods. 
            </p>
          </div>
        </div>
        <div className="faq-wrapper">
          <div className="faq-container">
            <h2>What is the DeversiFi Voting Token (DVT)?</h2>
            <p className="info-tip">
              The DeversiFi Voting Token (previously the Ethfinex Voting Token EVT) is a distributed token used for the voting of ERC20 tokens to be listed on DeversiFi. Currently the voting process is on pause as we have been focusing on the Ethfinex to DeversiFi rebrand process. These tokens were distributed to Nectar Token (NEC) holders every time a vote started in a 1:1 ratio, eg. a user holding 5,000 NEC on the date and time that the voting began, received 5,000 DVT. These voting tokens were also tradeable on a USDt paired market on Ethfinex. As DVT tokens expire and disappear at the end of every voting period, they are not meant for long term hodling, as such practice will result in getting rekt.
            </p>
          </div>
          <div className="faq-container">
            <h2>How can I learn more about DeversiFi and the Nectar token?</h2>
            <p className="info-tip">
              Grab a cuppa and read the {' '}
              <a href="https://nectar.community/whitepaper" target="_blank">
                Nectar 2.0 Whitepaper,
              </a>{' '}
              join our active {' '}
              <a href="https://t.me/DeversiFi" target="_blank">
                Telegram
              </a>{' '}
              channel and ask us anything, or find us on {' '}
              <a href="https://twitter.com/deversifi/" target="_blank">
                Twitter
                </a>{' '}
              and send us a tweet. You may also navigate to {' '}
              <a href="https://deversifi.com" target="_blank">
                DeversiFi
                </a>{' '}
              or jump straight into decentralised trading at {' '}
              <a href="https://app.deversifi.com" target="_blank">
                app.deversifi.com.
                </a>{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(FAQ);
