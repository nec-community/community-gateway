import React, { Component } from 'react';
import { scrollToSection } from '../../services/scrollAnimation';
import TermsModal from './TermsModal/TermsModal';

import './DAO.scss';

import poolGif from './Eth_pool.gif';
import voteGif from './Eth_vote.gif';
import drawGif from './Eth_draw.gif';
import candGif from './Eth_cand.gif';
import winnersGif from './Eth_winners.gif';

class DAO extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isTermsModalOpen: false,
    };

    this.toggleTermsModal = this.toggleTermsModal.bind(this);
  }

  toggleTermsModal() {
    const {
      isTermsModalOpen,
    } = this.state;

    this.setState({
      isTermsModalOpen: !isTermsModalOpen,
    });
  }

  render() {
    return (
      <div className="dao">
        <div className="container">
          <div className="section__title">
            <span>The Nectar DAO</span>
          </div>
          <div className="split-section">
            <div>
              <h2 className="title__subtitle">Join the decentralised organisation governing
                Nectar</h2>
              <p className="text__secondary auto">
                The Nectar DAO (necDAO) is the decentralized nerve-centre of Nectar.
                It empowers the community to democratically drive development of the
                Nectar ecosystem whilst giving people the world-over a new way to pitch
                and be rewarded for their talents.
              </p>
              <h2 className="title__subtitle">
                But why what and how necDAO?
              </h2>
              <p className="text__secondary auto">
                For some background, it was Ethfinex who first developed Nectar - a
                utility token designed to serve the Nectar ecosystem. They built visionary
                governance tools and collected a whopping 50% of trading fees which
                were pledged to market makers of the exchange. In August 2019, Ethfinex
                closed their doors for good, coinciding with the launch of a brand
                new entity - DeversiFi.
              </p>
              <p className="text__secondary auto">
                It is the guiding raison d'etre of DeversiFi to build infrastructure
                facilitating the emergent transition to a new, open and decentralized world.
                In that light, it was only right that DeversiFi carried on the Nectar
                torch for Ethfinex, keeping it alight and assigning the remaining 17,000 ETH
                to Nectar holders. It is this legacy, and these funds that launch one of the
                largest DAOs to date - necDAO.
              </p>
            </div>
            <div className="side-links">
              <a
                className="side-link"
                href="/whitepaper"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the Nectar 2.0 Whitepaper
              </a>
              <a
                className="side-link"
                href="https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to DAO
              </a>
              <a
                className="side-link"
                href="#"
                onClick={this.toggleTermsModal}
              >
                Claim Reputation Now’
              </a>
              <TermsModal
                isOpen={this.state.isTermsModalOpen}
                handleClose={this.toggleTermsModal}
              />
              <a
                className="side-link"
                href="https://support.deversifi.com/en/category/necdao-z56dk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit The necDAO Knowledge Base
              </a>
            </div>
          </div>
        </div>

        <section className="white" id="dao">
          <div className="container">
            <div className="split-section">
              <div>
                <div className="section__title dark">
                  <span>What is a DAO?</span>
                </div>
                <h4 className="title__subtitle dark">'Decentralised Autonomous Organisation'</h4>
                <p className="text__small dark">
                  Stop and picture a company who’s governance rules are programmed into
                  the blockchain. Members democratically determine the decisions taken,
                  the allocation of resources and participate in the crowdsourcing
                  of ideas and work.
                </p>

                <p className="text__small dark">
                  DAOs make this possible. Small or large groups can collaborate remotely,
                  ensuring <strong>true</strong> stakeholders have <strong>real</strong>&nbsp;
                  input whilst attracting the global talent pool, who can engage and
                  capitalize on their skills in ways not possible before.
                </p>
                <p className="text__small dark">
                  We encourage you to continue learning, to get ahead of the curve and
                  to waste no time in becoming the first-movers in necDAO.
                </p>

                <h4 className="title__subtitle dark">How can you participate?</h4>
                <p className="text__small dark">
                  There’s no sugar-coating it, the concept of a DAO can be tricky to grasp.
                  But getting involved is can be as easy as Pi.
                  There are two ways you can <b>dive in, and engage with the necDAO</b>:
                </p>
                <p className="text__small dark"><b>1. Become a member</b></p>
                <p className="text__small dark">
                  Anyone can become a voting member of necDAO and enjoy the right to determine
                  proposals.
                  There are several ways to do this which we cover in the Reputation section later
                  on.
                </p>
                <p className="text__small dark"><b>2. Become a proposer</b></p>
                <p className="text__small dark">
                  Anyone, anywhere (at any time!) can submit a proposal to necDAO
                  provided it serves the Nectar ecosystem. Unlike proposals related to Nectar
                  itself or the DAO, proposals directly relating to the functioning of
                  the DeversiFi exchange will be subject to approval from the DeversiFi team.
                </p>
              </div>
              <div>
                <img src={candGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="launch">
          <div className="container">
            <div className="split-section">
              <div>
                <div className="section__title">
                  <span>Launch Process</span>
                </div>

                <h4 className="title__subtitle">How is a decentralised organisation born?</h4>
                <p className="text__small">
                  The Nectar 2.0 whitepaper does a good job at narrating Nectar’s
                  journey into full decentralization. For some background, we recommend you give it
                  a read.
                </p>
                <p className="text__small">
                  But the short answer is that the roll out of necDAO will occur in 2 stages:
                </p>
                <p className="text__small">
                  <strong>1. The Reputation Bootstrap Phase </strong> is the first opportunity
                  you will have to become a member and earn your Reputation in necDAO.
                </p>
                <p className="text__small">
                  <strong>2. The Governance Phase </strong> This is the first time necDAO will
                  open its contracts for submitting proposals, voting, and the active
                  governance process.
                </p>

                <h4 className="title__subtitle">Important dates</h4>
                <div className="important-dates-wrapper">
                  <div className="">
                    <span>Reputation bootstrap phase begins</span>
                    <span>18th Dec 2019 </span>
                  </div>
                  <div className="">
                    <span>Reputation bootstrap phase ends</span>
                    <span>17th Jan 2020</span>
                  </div>
                  <div className="">
                    <span>Governance phase begins</span>
                    <span>24th Jan 2020</span>
                  </div>
                </div>
              </div>
              <div>
                {/*<img src={drawGif} alt="" />*/}
              </div>
            </div>
          </div>
        </section>

        <section className="white" id="reputation">
          <div className="container">
              <div className="split-section">
                <div>
                  <div className="section__title dark">
                    <span>Reputation</span>
                  </div>
                  <h4 className="title__subtitle dark">What is Reputation in the DAO?</h4>
                  <p className="text__small dark">
                    Reputation refers to your membership and assigned voting power within necDAO.
                    It is not a token and cannot be transferred or used outside the system.
                  </p>

                  <h4 className="title__subtitle dark">How to get Reputation in necDAO</h4>
                  <p className="text__small dark">
                    There are many ways you can claim your Reputation:
                  </p>
                  <ul className="text__list dark">
                    <li> Submit a successful proposal. You earn Reputation when submitting successful
                      proposals.
                    </li>
                    <li> Stake Nectar tokens. Staking Nectar will result in the most Reputation and is
                      the recommended method.
                    </li>
                    <li> Claim an initial airdrop. This one-off event will airdrop Reputation to
                      on-chain Nectar holders.
                    </li>
                    <li> Buy it in a GEN auction. You can bid for Reputation using GEN tokens during
                      the initial bootstrap phase.
                    </li>
                  </ul>
                  <p className="text__small dark">
                    More comprehensive information about these various options as well
                    as the bootstrap phase can be found on our master FAQ page.
                  </p>
                </div>
                <div>
                  <img src={poolGif} alt="" />
                </div>
              </div>
          </div>
        </section>

        <section id="staking">
          <div className="container">
            <div className="split-section">
              <div>
                <div className="section__title">
                  <span>Staking Nectar</span>
                </div>

                <h4 className="title__subtitle">What is staking?</h4>
                <p className="text__small">
                  Staking involves locking up Nectar tokens for a certain amount of time.
                  You are taking a risk in that you cannot transfer your tokens until
                  the lock expires, however you get some benefits in return!
                </p>

                <h4 className="title__subtitle">Benefits:</h4>
                <ul className="text__list">
                  <li>Staking will award a notably higher share (85%) of available Reputation (more
                    voting power!)
                  </li>
                  <li>Staking takes Nectar off the open market, reducing circulating supply</li>
                  <li>Increases proportion of tokens held on-chain, improving Nectar transparency
                  </li>
                </ul>
                <p className="text__small">
                  What if I don’t own Nectar yet but want to stake? Nectar is
                  tradable against USDt and ETH on both&nbsp;
                  <a
                    href="https://deversifi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >DeversiFi
                  </a>.
                  and Bitfinex.
                </p>
              </div>
              <div>
                {/*<img src={voteGif} alt="" />*/}
              </div>
            </div>
          </div>
        </section>

        <section className="white" id="proposals">
          <div className="container">
            <div className="split-section">
              <div>
                <div className="section__title dark">
                  <span>Proposals</span>
                </div>

                <p className="text__small dark">
                  It is paramount that best practices are followed to ensure healthy functioning.
                  For the sharpest edge, proposers should follow <strong>this</strong> detailed
                  blueprint,
                  covering each section and why it’s important.
                </p>

                <h4 className="title__subtitle dark">What kinds of proposals can be submitted? </h4>
                <p className="text__small dark">
                  Think outside the box! There is no limit, but to be a good fit
                  for necDAO proposals need to be deliverable and convincing whilst
                  producing a real benefit to the ecosystem. Examples?
                </p>
                <ul className="text__list dark">
                  <li>
                    Development of a gamified trader leaderboard for the DeversiFi exchange.
                    This one actually happened, and was funded through a test DAO!
                    You can&nbsp;
                    <a
                      href="/traderboard"
                    >see and use it today
                    </a>.
                    This could theoretically be further improved on with another proposal.
                  </li>
                  <li>
                    Organization of a Nectar community summit in Zanzibar?
                    Okay, maybe not Zanzibar but if you’re a marketer, event organizer
                    or community builder, you can put your skills to use to promote
                    the Nectar ecosystem. Word of advice, be prepared to justify your ideas!
                  </li>
                </ul>

                <h4 className="title__subtitle dark">What is the process for a proposal to pass?</h4>
                <p className="text__small dark">
                  In short, a proposal is only successful once it has won either
                  absolute or relative-majority approval, which depends on whether
                  it’s boosted or not. For a deeper dive on the difference between
                  the two, navigate to the master FAQ page here. To put it into
                  three stages:
                </p>
                <ul className="text__list dark">
                  <li> The proposal is convincing, meets best-practices, and benefits the
                    ecosystem.
                  </li>
                  <li> Stakeholders share their thoughts, fine-tune the proposal and align
                    expectations.
                  </li>
                  <li> If all is well, stakeholders cast their vote and collectively determine its
                    success. Geronimo!
                  </li>
                </ul>
              </div>
              <div>
                <img src={winnersGif} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section id="daostack">
          <div className="container">
            <div className="split-section">
              <div>
                <div className="section__title">
                  <span>DAOStack</span>
                </div>
                <h4 className="title__subtitle">What is DAOstack?</h4>
                <p className="text__small">
                  You can think of DAOstack as Wordpress, but for DAOs. They supply
                  the bricks (and blocks) needed to build reliable yet effective
                  structures for decentralized governance. Underpinned by blockchain,
                  smart-contracts and holographic consensus, they empower collectives
                  (just like the Nectar community) to meaningfully harmonize around a
                  common purpose.&nbsp;
                  <a
                    href="https://medium.com/daostack/an-explanation-of-daostack-in-fairly-simple-terms-1956e26b374"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Read more.
                  </a>
                </p>

                <h4 className="title__subtitle">What is Holographic Consensus?</h4>
                <p className="text__small">
                  This is a bit more technical. Holographic Consensus refers to the
                  sophisticated mechanism underpinning DAOstack’s approach to scalable,
                  decentralized decision making. They call it Holographic Consensus
                  on account of its metaphoric comparison to a hologram whereby every
                  little piece of the picture actually contains the information of the entire image.
                </p>
                <p className="text__small">
                  <b>So what is it then?</b>
                </p>
                <p className="text__small">
                  HC bridges the gap between scalability and resilience.
                  Requiring too much of a DAO’s collective attention (absolute-majority voting)
                  for every proposal makes scalability impossible. Using prediction markets,
                  HC can securely enable relative-majority voting, resulting in less
                  required attention. But that’s a gross simplification. If you prefer
                  the finer maths of life, read it in all its puzzling glory&nbsp;
                  <a
                    href="https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c"
                    target="_blank"
                    rel="noopener noreferrer"
                  >here
                  </a>.
                </p>

                <h4 className="title__subtitle">What is Alchemy?</h4>
                <p className="text__small">
                  Alchemy refers to the user-facing portal within which proposals are
                  submitted, voted on and where discussions can be held.
                </p>
                <p className="text__small">
                  It is from here you can see how much resource a DAO owns,
                  how many members it has, which proposals are on-going and
                  which have passed/failed, as well as finer details about
                  the history, make-up and functioning of the DAO.
                </p>
                <p className="text__small">
                  necDAO will be live soon! But for a primer, check out the &nbsp;
                  <a
                    href="https://alchemy.daostack.io/dao/0x294f999356ed03347c7a23bcbcf8d33fa41dc830"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Genesis Alpha DAO
                  </a>.
                </p>

              </div>
              <div>
                {/*<img src={drawGif} alt="" />*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DAO;
