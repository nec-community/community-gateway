import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../services/scrollAnimation';

import './DAO.scss';

import poolGif from './Eth_pool.gif';
import voteGif from './Eth_vote.gif';
import drawGif from './Eth_draw.gif';
import candGif from './Eth_cand.gif';
import winnersGif from './Eth_winners.gif';
import ideas from './free-thinking-icon.png';

class DAO extends Component {
  render() {
    return (
      <div className="about-tokens">
        <div className="container">
          <h1>The Nectar DAO</h1>
          <h2>Join the decentralised organisation governing Nectar</h2>
          <div className="header-desc-container">
            <div className="left-header">
            <p>
              The Nectar DAO will govern etc etc. Learn more reading the whitepaper.
            </p>
            <p>
              Copy to be written etc etc. Copy to be written etc etc. Copy to be written etc etc.
              Copy to be written etc etc. Copy to be written etc etc. Copy to be written etc etc.
              Copy to be written etc etc.
            </p>
            <p>
              There are 3 ways to earn Reputation in the new organisation, which can be used to
              vote on proposals. Proposals can be on a variety of topics, including on how the funds
              previously pledged to Nectar token holders as part of the Ethfinex loyalty scheme can be spent.
            </p>
            <p>Read more about earning reputation and the launch of the DAO:</p>
            </div>
              <div className="right-header">
              <a
                className="side-badge"
                href="/whitepaper"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the Nectar 2.0 Whitepaper
              </a>
              <br/>
              <br/>
              <a
                className="side-badge"
                href="/whitepaper"
                target="_blank"
                rel="noopener noreferrer"
              >
                Participate Now
              </a>
            </div>
          </div>
          <div className="toc-wrapper">
            <h3 onClick={() => scrollToSection('dao')} data-decoration="1">
              <a href="#launch">What is a DAO?</a>
            </h3>
            <h3 onClick={() => scrollToSection('launch')} data-decoration="2">
              <a href="#draw">Launch Process</a>
            </h3>
            <h3 onClick={() => scrollToSection('reputation')} data-decoration="3">
              <a href="#candidates">Reputation</a>
            </h3>
            <h3 onClick={() => scrollToSection('staking')} data-decoration="4">
              <a href="#vote">Staking Nectar</a>
            </h3>
            <h3 onClick={() => scrollToSection('daostack')} data-decoration="5">
              <a href="#vote">DAOstack</a>
            </h3>
            <h3 onClick={() => scrollToSection('proposals')} data-decoration="6">
              <a href="#vote">Proposals</a>
            </h3>
          </div>
        </div>

        <section className="white" id="dao">
          <div className="container">
            <div className="decorated">
              <div>
                <h2 data-decoration="1">What is a DAO?</h2>

                <h4>'Decentralised Autonomous Organisation'</h4>
                <p>
                    Imagine a company who's governance rules are programmed
                    into the blockchain. Members democratically determine the
                    decisions that are taken, crowdsourcing ideas and work.
                </p>

                <p>
                    Read more at PROVIDE_SOME_LINK.
                </p>

                <h4>How can you participate?</h4>
                <p>
                  One option is to make proposals, which can be submitted by anyone,
                  and allows those with ideas to suggest them to be voted on by the
                  organisation.
                </p>
                <p>
                  The second way to participate is open to members of the DAO, who hold
                  'Reputation'. These members can vote on proposals to decide whether
                  they are accepted and ultimately determine the future of the organisation.
                </p>
                <p>
                  There are several ways to earn Reputation which you can learn about
                  in later sections.
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
            <div className="decorated">
              <div>
                <h2 data-decoration="2">Launch Process</h2>

                <h4>How is a decentralised organisation born?</h4>
                <p>
                  Write some copy here which describes the launch process.
                </p>

                <h4>Important dates</h4>
                <div className="important-dates-wrapper">
                  <div className="">
                    <span>Reputation bootstrap phase begins</span>
                    <span>14th Dec 2019 </span>
                  </div>
                  <div className="">
                    <span>Reputation bootstrap phase ends</span>
                    <span>14th Jan 2019</span>
                  </div>
                  <div className="">
                    <span>Governance phase begins</span>
                    <span>28th Jan 2019</span>
                  </div>
                </div>

              </div>
              <div>
                <img src={drawGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="white" id="reputation">
          <div className="container">

            <div className="decorated">
              <div>
                <h2 data-decoration="3">Reputation</h2>

                <h4>What is Reputation in the DAO?</h4>
                <p>
                  To do describe what it can do. I.e. lets you vote on proposals and
                  specifically decide how funds are spent.
                </p>

                <h4>How can Reputation be earned?</h4>
                <p>
                  There are many ways to earn reputation:
                  <ol>
                    <li> Submitting a proposal which gets approved by the organisation.</li>
                    <li> Staking Nectar tokens into the DAO (Perpetual)</li>
                    <li> Receiving an initial airdrop (All Nectar Token Holders)</li>
                    <li> Buying it using GEN during the initial bootstrap phase</li>
                  </ol>
                </p>
                <p>
                  Give more information on each method.
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
            <div className="decorated">
              <div>
                <h2 data-decoration="4">Staking Nectar</h2>

                <h4>What is staking?</h4>
                <p>
                  You will stake by using the app here etc etc
                </p>
                <p>
                  The process will take x motnhs in total. You get more points for
                  staking for a longer time etc. You can extend but not shorten.
                  Takes NEC off the market.
                </p>

                <h4>Benfits of staking NEC</h4>
                <p>
                  Staking NEC gets you teslas
                </p>

              </div>
              <div>
                <img src={voteGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="white" id="daostack">
          <div className="container">
            <div className="decorated">
              <div>
                <h2 data-decoration="5">DAOstack</h2>

                <h4>What is DAOstack?</h4>
                <p>
                  Copy to be provided etc
                </p>

                <h4>What is holographic consensus?</h4>
                <p>A method for distributed governance etc etc </p>

                <h4>What is Alchemy?</h4>
                <p>A tool used for voting etc etc </p>

              </div>
              <div>
                <img src={winnersGif} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section id="proposals">
        <div className="container">
          <div className="decorated">
            <div>
              <h2 data-decoration="6">Proposals</h2>

              <h4>What sort of proposals can be submitted?</h4>
              <p>
                Copy to be provided etc
              </p>

              <h4>What is the process for a proposal to be passed?</h4>
              <p>Copy to be provided etc.</p>

            </div>
            <div>
              <img src={ideas} alt="" />
            </div>
          </div>
        </div>
        </section>
      </div>
    );
  }
}

export default DAO;
