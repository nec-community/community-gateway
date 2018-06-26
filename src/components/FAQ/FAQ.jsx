import React, { Component } from 'react';
import { connect } from 'react-redux';

import './FAQ.scss';

class FAQ extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="faq">
        <div className="container">
          <h1>Learn More - FAQ</h1>
        </div>
        <div className="faq-wrapper">
          <div className="faq-container">

            <h2>What is Ethfinex?</h2>
            <p className="info-tip">
              <a href="https://ethfinex.com" target="_blank">Ethfinex </a> is building a hybrid trading and discussion platform for Ethereum tokens.
              We use the term hybrid because users will have the option of trading on a centralized or decentralized version of the platform.
              Market makers are incentivized to use the platform through Nectar tokens.
              The goal of the platform is to democratize the decision-making process required to operate a cryptocurrency exchange to our users.
            </p>
          </div>
          <div className="faq-container">
            <h2>What is the Nectar token (NEC)?</h2>
            <p className="info-tip">
              The Nectar token is a crypto token created by Ethfinex. The function of
              the token is to incentivize market makers to provide liquidity on the platform,
              and give users a way to participate in democratic decision making for the future of Ethfinex.
              Every 30-day period, 50% of all of the fees collected from trading activity are put into a smart contract pool.
              Those who make markets on Ethfinex receive a proportional amount of NEC based on their activity for the given period,
              and can redeem these tokens for the fees in the pool.
            </p>
          </div>
          <div className="faq-container">
            <h2>Where can I get Nectar tokens?</h2>
            <p className="info-tip">
              <a href='https://ethfinex.com' target='_blank'>Ethfinex </a> lists the Nectar token for <a href="https://www.coingecko.com/en/coins/nectar-token" target="_blank">trading</a> against USD, ETH, and BTC.
              Market makers (customers who place limit orders onto the order book which are later executed) receive Nectar tokens
              at the end of every 30-day period as a reward for providing liquidity to the exchange.
              By adding liquidity and therefore creating well populated order books, aiding price discovery,
              these market makers improve the experience of trading on Ethfinex for all users,
              since spreads are reduced which in turn leads to a lower effective cost of trading.
              The amount of tokens received is proportional to the user’s 30-day trading volume.
            </p>
          </div>
          <div className="faq-container">
            <h2>What is Nectar.Community?</h2>
            <p className="info-tip">
              Nectar.Community is the decentralized governance portal for Ethfinex. It is fully <a href="https://github.com/ethfinex/community-gateway" target="blank">open source</a>.
              Nectar tokens are earned by traders on Ethfinex and can be used to submit and vote on coin listings.
              As well as functionality for submitting proposals and voting, the site also provides statistics, learning resources,
              and tools to allow the Nectar token holders to safely redeem their tokens for the proportional amount
              of Ethereum locked in the Nectar smart contract.
            </p>
          </div>
        </div>
        <div className="faq-wrapper-dark">
          <div className="faq-container">
            <h2>What is the Ethfinex Voting Token (EVT)?</h2>
            <p className="info-tip">
            The Ethfinex Voting Token is a bi-monthly distributed token used for the voting of ERC20 tokens to be listed on Ethfinex. You can view the currently ongoing vote <a href="#/listings" target="_blank"> here </a>. These tokens are distributed to Nectar Token (NEC) holders every time a vote starts in a 1:1 ratio, eg. a user holding 5,000 NEC on the date and time that the voting begins, would receive 5,000 EVT.
            </p>
          </div>
          <div className="faq-container">
            <h2>Are EVTs used only for voting?</h2>
            <p className="info-tip">
            Whilst the main purpose for the Ethfinex Voting Token is for the community to vote which tokens will be listed, users are able to trade EVT on the platform, with the EVT/USD pair.
            </p>
          </div>
          <div className="faq-container">
            <h2>Is EVT a long term investment token?</h2>
            <p className="info-tip">
            EVT is a terrible long term investment. The tokens expire and disappear every two weeks, at the end of a voting period. New EVT tokens are then distributed to NEC holders. The EVT market is stopped 3 hours before voting ends, to ensure plenty of time is left for remaining EVT tokens to be withdrawn for voting purposes.
            </p>
          </div>
          <div className="faq-container">
            <h2>What happens to my EVT if I do not vote?</h2>
            <p className="info-tip">
            EVT are spent when voting for one of the tokens on the list, or trading on the Ethfinex platform. All remaining EVT not used in voting expire at the end of the two week period and the EVT markets on Ethfinex are then cleared. Users will be required to vote or sell the EVT before expiration to avoid any loss.
            </p>
          </div>
          <div className="faq-container">
            <h2>If I withdraw my EVT to an external wallet, will they still expire?</h2>
            <p className="info-tip">
            Tokens withdrawn to external wallets will also expire and balances will disappear at the end of the voting period. This is automatic and will expire across all Wallets. EVT are then reissued based on users updated NEC balances, to be used in the next token listing vote and when the EVT market begins again.
            </p>
          </div>
          <div className="faq-container">
            <h2>When exactly do new EVTs get distributed?</h2>
            <p className="info-tip">
            New EVTs are distributed approximately 1-2 hours after the previous voting period ends.
            </p>
          </div>
          <div className="faq-container">
            <h2>If I withdraw my EVT to an external wallet, will they still expire?</h2>
            <p className="info-tip">
            Tokens withdrawn to external wallets will also expire and balances will disappear at the end of the voting period. This is automatic and will expire across all Wallets. EVT are then reissued based on users updated NEC balances, to be used in the next token listing vote and when the EVT market begins again.
            </p>
          </div>
          <div className="faq-container">
            <h2>If the token we are voting on does not go through, do we get the EVT back?</h2>
            <p className="info-tip">
            No, as the EVT tokens expire every 2 weeks when the voting period ends, the EVT market is cleared 3 hours before voting ends. Once voting ends the EVT tokens expire and new tokens with a new contract address are issued to NEC holders at the ratio of 1:1.
            </p>
          </div>
        </div>
        <div className="faq-wrapper">
          <div className="faq-container">
            <h2>What is a proposal?</h2>
            <p className="info-tip">
              A proposal is a submission for a change to Ethfinex and how it operates. After submission, proposals are then voted on by the community.
            </p>
          </div>
          <div className="faq-container">
            <h2>How can I submit a proposal? Can anyone submit a proposal?</h2>
            <p className="info-tip">
              Anyone that holds Nectar tokens may submit a proposal to the platform, and can do so using their Ethereum wallet via Metamask,
              Ledger Nano S, or an Ethereum Keystore wallet file.
            </p>
          </div>
          <div className="faq-container">
            <h2>What happens after a proposal is submitted?</h2>
            <p className="info-tip">
              The proposal goes to Ethfinex administrators for review, and when accepted enters the voting phase for a predefined amount of time,
              allowing community members to cast their votes.
            </p>
          </div>
          <div className="faq-container">
            <h2>Are proposals binding?</h2>
            <p className="info-tip">
              Not yet, only when the governance layer goes on-chain.
              The on-chain governance layer is irreversible and we’re taking our time to get it right.
              For the moment proposals are considered advisory, to allow any users of Ethfinex and holders
              of Nectar tokens to transparently give their opinion.
            </p>
          </div>
          <div className="faq-container">
            <h2>What types of event am I able to vote on?</h2>
            <p className="info-tip">
              Currently there are two major categories of events where you can vote:<br/><br/>
              1. Token listing selection.<br/><br/>
              2. Any Ethfinex improval suggestion made by the community.
              These can include new fee structures, governance methods, referral schemes, or Nectar token functionality.
              Further into the future we envision users voting on all operational decisions affecting the platform.
            </p>
          </div>
          <div className="faq-container">
            <h2>How do tokens get selected to be included in a community listing vote?</h2>
            <p className="info-tip">
              The best starting point is to submit information via the Ethfinex <a href="https://support.ethfinex.com/hc/en-us/articles/115002526172-Listing-a-Token-on-Ethfinex" target="_blank">token listing form</a>.
              Along with our own review processes, community interest on the Ethfinex discussion
              forums or other social channels is also important. We feel Ethfinex should aim to be
              part of an industry wide effort to self-regulate, and so all tokens included in a
              community listing vote have already met the minimum standards required according to
              our own due diligence. Amongst other criteria, we look for original,
              open-source projects which use blockchain technology to solve a real business or societal need.
            </p>
          </div>
          <div className="faq-container">
            <h2>How are token votes decided?</h2>
            <p className="info-tip">
              Every few weeks 12 tokens are to be placed up for community vote.
              All holders of the Nectar token will receive an equal number of temporary voting tokens.
              These are spent to vote for any of the tokens on the list,
              and can also be transferred to others who you wish to vote on your behalf.
              The 3 tokens on the list which receive the highest number of votes will
              then be listed at the end of the period. A new period will then begin,
              with redistribution of temporary voting tokens.
              You can see an example of the voting page <a href="#/listings" target="_blank"> here </a>.
            </p>
          </div>
          <div className="faq-container">
            <h2>What is the purpose of the Ethfinex Discussion forums?</h2>
            <p className="info-tip">
              The goal of the discussion forums is to foster learning around new tokens,
              and to allow interest in new tokens to be evaluated from crowdsourced ratings and comments.
              Users receive a reputational rating based on the quality of information they provide.
              A higher reputational score carries more weight with respect to token ratings.
            </p>
          </div>
          <div className="faq-container">
            <h2>When will Ethfinex launch on-chain governance?</h2>
            <p className="info-tip">
              This is difficult to say and is likely still a long way off,
              as blockchain based governance is still unchartered territory.
              We’re working as part of the <a href="https://blog.aragon.one/announcing-aragon-labs-a679693429ae" target="_blank">Aragon Working Group</a> to share knowledge
              and expedite on-chain governance.
            </p>
          </div>
          <div className="faq-container">
            <h2>After being submitted, how long will a proposal remain open for voting?</h2>
            <p className="info-tip">
              The user submitting a proposal selects the time period,
              however this may need to be adjusted to ensure all users have sufficient
              time to cast a vote if they wish to. We anticipate that voting will
              always remain open for at least seven days, with longer time periods
              for more critical decisions.
            </p>
          </div>
          <div className="faq-container">
            <h2>How can I learn more about Ethfinex and the Nectar token?</h2>
            <p className="info-tip">
              Join our active <a href="https://t.me/joinchat/GgM7eBFC-BdMYaC_3hN4Kg" target="_blank">Telegram</a> channel and ask us anything,
              or find us on <a href="https://twitter.com/ethfinex" target="_blank">Twitter</a> and tweet at us.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(FAQ);
