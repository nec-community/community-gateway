import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../services/scrollAnimation';

import './TokenAbout.scss';

import poolGif from './Eth_pool.gif';
import voteGif from './Eth_vote.gif';
import drawGif from './Eth_draw.gif';
import candGif from './Eth_cand.gif';
import winnersGif from './Eth_winners.gif';

class TokenAbout extends Component {
  render() {
    return (
      <div className="about-tokens">
        <div className="container">
          <h1>About</h1>
          <h2>What is Ethfinex Token Vote?</h2>
          <div className="header-desc-container">
            <p>
              The Ethfinex Token Vote is the process by which tokens are listed on the platform
              through a community vote.
            </p>
            <p>
              We believe it is important that those who regularly trade on Ethfinex decide which
              tokens are available so that our offering reflects what the community wants, rather
              than the tokens with the deepest pockets or best connections.
            </p>
            <p>
              To reward the research and choosing of quality tokens, traders who voted for a
              successfully listed token will receive a percentage of trading fees for that token
              for the following twelve months.
            </p>
            <p>Read more below:</p>
          </div>
          <div className="toc-wrapper">
            <h3 onClick={() => scrollToSection('pool')} data-decoration="1">
              <a href="#pool">The Token Pool</a>
            </h3>
            <h3 onClick={() => scrollToSection('draw')} data-decoration="2">
              <a href="#draw">The Draw</a>
            </h3>
            <h3 onClick={() => scrollToSection('candidates')} data-decoration="3">
              <a href="#candidates">Introducing the Candidates</a>
            </h3>
            <h3 onClick={() => scrollToSection('vote')} data-decoration="4">
              <a href="#vote">The Vote</a>
            </h3>
            <h3 onClick={() => scrollToSection('winners')} data-decoration="5">
              <a href="#winners">The Winners</a>
            </h3>
          </div>

          <div className="important-dates-wrapper">
            <h3>Important dates</h3>
            <div className="">
              <span>Next draw. EVT distribution and market open</span>
              <span>26 March</span>
            </div>
            <div className="">
              <span>Next vote opens</span>
              <span>2 April</span>
            </div>
            <div className="">
              <span>Winner announced</span>
              <span>9 April</span>
            </div>
          </div>
        </div>


        <section className="video">
          <div className="container">
            <h3>Here's a video that explains the ethos behind our approach to listing tokens</h3>
            <video src="/videos/Ethfinex_voEDIT.mp4" poster="/images/Ethfinex_voEDIT.png"
                   controls={true} />
          </div>
        </section>

        <section>
          <div className="container">
            <h4>Can I vote?</h4>
            <p>
              If you are a Nectar Holder, yes. Once a month we distribute Ethfinex Voting Tokens
              (EVT) to traders in direct proportion to their NEC holdings (1 NEC = 1 EVT). This
              means Nectar holders can vote with EVT without sacrificing their Nectar tokens. The
              EVT expire as soon as the voting is closed and are distributed again in the same ratio
              the following month.
            </p>

            <h4>Can I vote if I’m not a Nectar Holder?</h4>
            <p>
              Yes, you can. There is an EVT:USD market on Ethfinex where traders can buy EVT from
              NEC holders that wish to sell. This is not a permanent market. It opens when EVT are
              distributed to NEC holders each month, and closes at the end of the corresponding
              voting period.
            </p>
          </div>
        </section>

        <section className="white" id="pool">
          <div className="container">
            <h3>How does it work?</h3>
            <h5>
              There are a number of stages to ensure the entire process is transparent, fair and
              equips EVT holders with the knowledge to make an informed vote.
            </h5>

            <div className="decorated">
              <div>
                <h2 data-decoration="1">The Token Pool</h2>

                <h4>What is the Token Pool?</h4>
                <p>
                  The token pool is the collection of tokens proposed for community voting. The
                  number of tokens within this pool will naturally fluctuate month on month.
                </p>

                <h4>How does a token get in the Pool?</h4>
                <p>
                  Anyone can propose a token for the Pool, including NEC holders, Token Issuers, and
                  Ethfinex themselves. More information on submitting a token <Link
                    to="/token-pool"
                  >here</Link>.
                </p>
                <p>
                  Through the Kleros token curated registry ‘badge’ process, the token proposer adds
                  an ‘Community Approved’ badge (CA), signalling to the community that the badge
                  meets the Listing Criteria (published <Link to="token-pool#criteria">here</Link>).
                </p>
                <p>
                  Just as anyone can propose a token to the Pool, anyone can dispute the token and
                  CA badge with reasonable evidence showing a failure to meet the Listing Criteria.
                  This results in the removal of the token from the Pool.
                </p>
                <p>
                  We appreciate this isn’t the easiest process to summarise in a short paragraph, so
                  if you’d like to learn more about how the Kleros process works, head <a
                  href="https://tokens.kleros.io" target="_blank" rel="noopener noreferrer"
                  >here</a> for more details or ask us in the <a
                  href="https://t.me/ethfinextelegram" target="_blank" rel="noopener noreferrer"
                  >Ethfinex Telegram Group</a>.
                </p>

                <h4>Are all tokens in the Pool eligible for voting?</h4>
                <p>
                  The Pool is a live and dynamic process. Once a token is given the ‘Community
                  Approved’ badge it is added to the Pool. However, this badge can be challenged at
                  any time, by anyone, through the Kleros platform. If the token is proven to not
                  meet Listing criteria, its badge will be removed and the token will be eliminated
                  from the pool.
                </p>
                <p>
                  Also tokens that have unsuccessfully participated in the previous round of voting
                  will not be eligible for the next month’s draw.
                </p>
              </div>
              <div>
                <img src={poolGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="draw">
          <div className="container">
            <div className="decorated">
              <div>
                <h2 data-decoration="2">The Draw</h2>

                <h4>Why is there a draw?</h4>
                <p>
                  The pool can contain a large number of tokens and we want people to make an
                  informed decision when they vote for a token to be listed on Ethfinex.
                </p>
                <p>So we decided to break this down to a more manageable number to research: 12.</p>
                <p>
                  To ensure fairness and transparency, the tokens in each voting round will be
                  selected at random by a public draw once a month.
                </p>

                <h4>How does the draw work?</h4>
                <p>
                  All eligible tokens in the pool (see ‘Are all tokens in the Pool eligible for
                  voting?’) will be entered into the Token Draw held on the second Friday of the
                  month.
                </p>
                <p>
                  The draw is live streamed for complete transparency using a process that ensures
                  complete randomness.
                </p>
                <p>The 12 tokens drawn will then be announced and listed on our voting page.</p>

                <h4>Is there any other way of a token being included in a voting round?</h4>
                <p>
                  Yes. In exceptional circumstances Ethfinex may choose up to three tokens to enter
                  a certain round of voting to make sure that our community does not miss a timely
                  opportunity.
                </p>

                <h4>
                  Can a token be listed on Ethfinex without going through this voting process?
                </h4>
                <p>
                  Yes. By an extraordinary vote of Nectar holders, tokens can bypass the voting
                  process altogether. This will be extremely rare.
                </p>
              </div>
              <div>
                <img src={drawGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="white" id="candidates">
          <div className="container">
            <div className="decorated">
              <div>
                <h2 data-decoration="3">Introducing the Candidates</h2>

                <h4>How do I choose which token to vote for?</h4>
                <p>
                  In the week following the draw, we invite the 12 tokens drawn to educate the
                  Nectar community about their token and why they deserve your vote.
                </p>

                <p>
                  We will host a selection of AMAs (Ask Me Anything) over Telegram with Token
                  representatives, and an elevator pitch webinar with the tokens together in one
                  place.
                </p>

                <h4>Why can’t I vote immediately after the draw?</h4>
                <p>
                  To ensure the best tokens make it onto the platform, we think it’s important to
                  encourage our community to make an informed decision when they vote. We will make
                  this as easy as possible, hosting information on the tokens in each round in the
                  week leading up to the vote opening.
                </p>
              </div>
              <div>
                <img src={candGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="vote">
          <div className="container">

            <div className="decorated">
              <div>
                <h2 data-decoration="4">The Vote</h2>

                <h4>When can I vote?</h4>
                <p>
                  You will received your EVT on the day of drawing the tokens for the voting round.
                  Voting will be open a week later.
                </p>
                <p>
                  The process will take 2 weeks in total. EVT’s will be distributed on the last
                  Tuesday of the month, commencing the education period which will last for 7 days.
                  After this time (on the next Tuesday), we will open voting for the next 7 days.
                </p>

                <h4>How do I vote?</h4>
                <p>
                  Before the voting period EVT will get distributed to wherever you hold your Nectar
                  tokens either on the exchange or private wallet (off exchange). You then need to
                  transfer your EVT to a private wallet and connect to it at nectar.community to be
                  able to vote. You can split vote your between different tokens and vote for as
                  many as you like.
                </p>

                <h4>Does it matter when I vote?</h4>
                <p>
                  Actually, yes. To incentivise earlier voting and avoid a rush to the post, EVTs
                  are worth double at the start of the vote, with power diminishing linearly to one
                  towards the end of the vote.
                </p>
                <ul>
                  <li>Day 1 2x</li>
                  <li>Day 2 1.833x</li>
                  <li>Day 3 1.667x</li>
                  <li>Day 4 1.500x</li>
                  <li>Day 5 1.33xx</li>
                  <li>Day 6 1.167x</li>
                  <li>Day 7 1x</li>
                </ul>
                <p>
                  NOTE: During the first voting round (02.04.19 to 09.04.19) to keep things simple
                  EVTs will be weighted equally at 2x throughout the period.
                </p>

                <h4>Can I keep track of which tokens are in the lead?</h4>
                <p>
                  Yes. We will keep a live tracker of votes on our leaderboard page <Link
                  to="token-leaderboard">here</Link>
                </p>
                <p>For full transparency, all votes cast can be viewed on the blockchain.</p>
              </div>
              <div>
                <img src={voteGif} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="white" id="winners">
          <div className="container">

            <div className="decorated">
              <div>
                <h2 data-decoration="5">The Winners</h2>

                <h4>When are the winners announced?</h4>
                <p>
                  The winners will be announced immediately after the voting closes on our
                  leaderboard page <Link to="token-leaderboard">here</Link> and on <a
                  href="https://twitter.com/ethfinex" target="_blank"
                  rel="noopener noreferrer">Twitter</a>.
                </p>

                <h4>When are the winning tokens listed?</h4>
                <p>Usually a few days after winning the vote.</p>

                <h4>Will winning tokens also be listed on Bitfinex?</h4>
                <p>
                  We cannot guarantee that winning tokens will also be added to Bitfinex, but
                  historically all of the tokens that won community votes were added to Bitfinex at
                  the same time as Ethfinex.
                </p>

                <h4>How many tokens make it onto Ethfinex per voting round?</h4>
                <p>
                  There are three winners per round. The winners are determined by having the
                  highest volume and second highest volume of total votes.
                </p>

                <h4>What happens to the rest of the tokens?</h4>
                <p>
                  The two runner up tokens will automatically go into the next voting round if they
                  are within 10% of the winner.
                </p>
                <p>
                  The rest of the tokens will return to the pool. They will not be eligible for the
                  next draw, but can be drawn in any of the rounds thereafter.
                </p>

                <h4>I voted for a winning token, what do I get?</h4>
                <p>
                  Congratulations! If you voted for a winning token, you will receive 10% of the
                  Ethfinex trading fees for that token for 12 months after the vote ended.
                </p>
                <p>
                  The fees are distributed pro-rata based on the proportion of votes. This means
                  that the more votes you cast for the winning token, the more fees you’ll get.
                </p>

              </div>
              <div>
                <img src={winnersGif} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <h2>That was fun, can I do it again?</h2>
            <h5>Yes! The voting cycle repeats every month.</h5>
          </div>
        </section>
      </div>
    );
  }
}

export default TokenAbout;
