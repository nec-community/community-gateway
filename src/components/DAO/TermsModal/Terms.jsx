import React, { Component } from 'react'

import './Terms.scss'

export default class Terms extends React.Component {
  render () {
  return (
    <div class="terms-content">
      <p>
        Read this Participation Agreement (<strong>"Agreement"</strong>) carefully
        before confirming your intent to be bound by it and participating in the necDAO.
        This Agreement includes the terms of participation in the necDAO. You understand,
        agree and confirm that:
      </p>
      <ul>
      <li>
        the necDAO is an experiment in the field of decentralised governance structures,
        in which participation is entirely at your own risk;
      </li>
      <li>
        this Agreement has legal consequences and releases, waives or limits our
        liability to you and your ability to bring future legal actions over your participation in the necDAO;
      </li>
      <li>
        if a dispute cannot be resolved amicably within the necDAO, all your claims
        arising or in connection with this Agreement shall be settled in binding
        arbitration in accordance with the arbitration clause contained in this Agreement;
      </li>
      <li>
        entering into this Agreement const it utes a waiver of your right, if any,
        to a trial by jury and participation in a class action lawsuit;
      </li>
      <li>
        this Agreement is cryptographically hashed by every transaction you submit
        on the Ethereum Blockchain whether via this interface or by direct interaction
        with the respective smart contracts in the Reputation Bootstrap Period
        (as defined in the Agreement) and any such hash shall constitute conclusive
        evidence of your intent to be bound by this Agreement and you waive any
        right to claim otherwise or to argue against its admissibility or authenticity
        in any legal proceedings;
      </li>
      <li>
        you have read,fully understood, and accept this disclaimer and all the
        terms contained in the Participation Agreement.
      </li>
      </ul>
      <br/>
      <p align="center">
        <strong>necDAO Participation Agreement</strong>
      </p>
      <p align="center">
        (the "<strong>Agreement</strong>")
      </p>
      <p align="center">
        December 2019
      </p>

      <p>
        <strong>BACKGROUND</strong>
      </p>
      <ol>
        <li>
          The necDAO is a next - generation decentralised autonomous organisation
          for community governance of software protocols.
        </li>
        <li>
          The necDAO is built on the Smart Contract framework for decentralised
          autonomous organisations developed by DAOstack. DAOstack's Smart Contract
          framework is based on its ARC version v0.0.l -rc34 <strong> DAOstack's
          Framework </strong> ​and is to enable highly scalable organisations through efficient and
          resilient decision making in large groups. The design of the necDAO
          is an attempt to balance sufficient decentralisation of participation
          and the provision of meaningful control with regard to decision making and
          execution. The necDAO is an experiment to establish a decentralised governance
          structure without intermediaries.
        </li>
        <li>
          The purpose of the necDAO is to govern the use of the funds locked in
          the underlying Nectar Smart Contract. The intent is for these funds to
          be used to stimulate the growth decentralised products in the NEC ecosystem,
          creating value and increasing the utility of NEC.
        </li>
        <li>
          Although the technical development of the necDAO is a project of the Company,
          based on DAOstack's Framework, the contribution of the Company is limited
          to providing the technical basis for the necDAO, including its one month
          initialisation phase, the ​<strong>Reputation Bootstrap Period​</strong>, which runs from
          the moment the necDAO is deployed for the next 30 days.
        </li>
        <li>
          Reputation may be acquired by three methods, all of which target persons
          with sufficient technical and legal expertise to contribute their industry
          knowledge to the further development of the trading protocol, and who do not act as Consumers.
        </li>
        <li>
          With the end of the Reputation Bootstrap Period 30 days after the deployment
          of the necDAO Smart Contract., the Company relinquishes all control over the necDAO.
          Following the ​<strong>Freeze Period</strong>, ​the <strong>Governance Period</strong> ​
          begins 7 days after the end of the Reputation Bootstrap Period through the activation of all
          governance powers of the necDAO, including making proposals, voting,
          predicting, and upgrading the necDAO. Following activation, the necDAO
          has full autonomy over itself and any assets it controls and is then
          governed by the initial necDAO Reputation Holders.
        </li>
        <li>
          The Parties have agreed to enter into this Agreement for the purpose of
          clarifying the exercise of their rights and obligations in relation to
          the Reputation Bootstrap Period and/or the Governance Period (as defined in clause 2).
        </li>
      </ol>

      <p>
        <strong>AGREED TERMS</strong>
      </p>

        <strong>THE PARTIES</strong>
      <p>
        Parties to this Agreement are:
      </p>

              <ol>
                <li>Liquidity Labs Holdings Limited a company incorporated under the
                law of the British Virgin Islands with BVI Company Number 2021531
                whose registered office is at the offices of Nerine Trust Company (BVI)
                Limited of Nerine Chambers, PO Box 905, Road Town, Tortola,
                British Virgin Islands (“​<strong>Company</strong>​”)
                </li>
                <li>Each owner of the Ethereum addresses with which this Participation
                    Agreement was Digitally Signed (as defined in clause 2) (the
                      "<strong>necDAO Participants</strong>");</li>
              </ol>
              Each referred to as "Party", altogether referred to as "<strong>Parties</strong>"

      <ol>
        <br/>
        <li><strong>DEFINITIONS AND RULES OF INTERPRETATION</strong>
          <p>
            The following definitions and rules of interpretation apply in this Agreement:
          </p>
          <ol>
            <li>Rules of interpretation:
              <p>Terms written in title case and/or in bold font are defined terms and have the meanings given to them in clause 2.</p>
              <p>Clause headings shall not affect the interpretation of this Agreement.</p>
              <p>A person includes a natural person, corporate or unincorporated body (whether or not having separate legal personality), Smart Contract, a decentralised autonomous organisation or similar, unless specified otherwise.</p>
              <p>Reference to writing or written includes email and any Digital Signature (as defined in clause 2.2).</p>
            </li>
            <li>Definitions:
              <p>
                ​“<strong>Agreement</strong>” ​refers to this Participation Agreement entered into by the Parties.
              </p>
              <p>
                ​“<strong>Agreement Termination Event</strong>”: prior to the Governance Period, decision by the Company to terminate this Agreement; and during the Governance Period, a successful proposal submitted to the necDAO that the Agreement shall terminate at a specified time.
              </p>
              <p>
                ​“<strong>Alchemy Earth Interface</strong>”: A generic graphical user interface for DAOs built on DAOstack's Framework to facilitate, among other things, the submission, review, voting on and boosting of DAO proposals, which may be used to interact with the necDAO.
              </p>
              <p>
                ​“<strong>Boosted Proposal</strong>”: A Pending Proposal (1) whose Confidence Level meets the Boosting Threshold without dropping below it during the Pending Proposal Period and (2) that is activated by an External Call.
              </p>
              <p>
                ​“<strong>Boosted Proposal Voting Period</strong>”: The period a Boosted Proposal stays open for voting, which is for Boosted Proposals affecting:
                <ul>
                  <li>Scheme registrar - (admin scheme) - 14 days</li>
                  <li>Generic scheme - ENS Registrar - 14 days</li>
                  <li>Generic scheme - ENS public resolver - 14 days</li>
                  <li>Contribution reward (funding) - 7 days</li>
                  <li>Generic scheme - Whitelist - 2 days</li>
                </ul>
              </p>
              <p>
                ​“<strong>Boosted Threshold</strong>”: Boosting Threshold Constant to the power of the number of outstanding Boosted Proposals.
              </p>
              <p>
                ​“<strong>Boosting Threshold Constant </strong>”: a factor of:
                <ul>
                  <li>Scheme registrar - (admin scheme) - 1.3</li>
                  <li>Generic scheme - ENS Registrar - 1.3</li>
                  <li>Generic scheme - ENS public resolver - 1.3</li>
                  <li>Contribution reward (funding) - 1.2</li>
                  <li>Generic scheme - Whitelist - 1.15</li>
                </ul>
              </p>
              <p>
                ​“<strong>Company Termination Event</strong>”: as defined in clause 6.
              </p>
              <p>
                ​“<strong>Confidence Level</strong>”: total Upstake divided by the total Downstake of a Proposal.
              </p>
              <p>
                ​“<strong>Consumer</strong>”: ​a natural person who is acting outside the scope of an economic activity
              </p>
              <p>
                ​“<strong>Contribution Award Scheme</strong>”: a Smart Contract that allows by way of Proposal changing rewards for token contribution, including sending tokens or ETH​ ​to or assign Reputation to a Wallet address.
              </p>
              <p>
                ​“<strong>DAO</strong>”: ​decentralised Autonomous organisation
              </p>
              <p>
                ​“<strong>DAOstack's Framework</strong>”: Smart Contract framework for decentralised autonomous organisations developed by DAOstack based on its ARC version v0.0.1-rc34.
              </p>
              <p>
                ​“<strong>Digital Signature</strong>”: a transaction on the Ethereum Blockchain, which confirms that a person controls a respective Wallet address and which includes the hash to this Agreement.
              </p>
              <p>
                ​“<strong>Digitally Signed</strong>”: means executing a transaction on the Ethereum Blockchain that includes a hash to this Agreement.
              </p>
              <p>
                ​“<strong>Distributed Heterarchical Network</strong>”: A network where the elements of the organisation are distributed and unranked, such as, for purposes of illustration, Bitcoin or Ethereum.
              </p>
              <p>
                ​“<strong>DLT</strong>”:  distributed ledger technology.
              </p>
              <p>
                ​“<strong>Dispute</strong>”: ​any dispute arising out of or in connection with this Agreement, including any question regarding its existence, validity or termination as well as any tort or other non-contractual claim.
              </p>
              <p>
                ​“<strong>Downstake</strong>”: GEN staked against the acceptance of a Proposal.
              </p>
              <p>
                ​“<strong>necDAO</strong>”: a Distributed Heterarchical Network, regularly referred to as a decentralised autonomous organisation (a "DAO"), created by the deployment of the Foundational Code, which allows the necDAO Reputation Holders to interact and manage resources transparently, and to which this Agreement refers.
              </p>
              <p>
                ​“<strong>necDAO Participant</strong>”: ​a person who Digitally Signed this Agreement, including any necDAO Reputation Holder.
              </p>
              <p>
                ​“<strong>necDAO Reputation Holder</strong>”: the owner(s) of an Ethereum address with an amount of Reputation.
              </p>
              <p>
                ​“<strong>necDAO Schemes</strong>”: ​the Reputation Allocation Schemes, the ENS Register Scheme, and the Reward Contribution Scheme.
              </p>
              <p>
                ​“<strong>necDAO Smart Contracts</strong>”: set of Smart Contracts based on DAOstack's Framework, including the necDAO Schemes and the governance parameters, and the Vote Staking Smart Contracts.
              </p>
              <p>
                ​“<strong>necDAO Stakeholder</strong>”: ​a person who participates in the governance processes of the necDAO, including a necDAO Reputation Holder, a necDAO Participant, a Predictor and Proposer.
              </p>
              <p>
                ​“<strong>Ethereum Blockchain</strong>”: the open source, public, blockchain-based distributed computing platform and operating system featuring Smart Contract (scripting) functionality.
              </p>
              <p>
                ​“<strong>Expire</strong>”: ​a Regular Proposal expires at the end of the Regular Proposal Voting Period, if it neither met the Non-Boosted Acceptance Threshold nor its complement, the Non-Boosted Rejection Threshold, during the Regular Proposal Voting Period.
              </p>
              <p>
                ​“<strong>External Call</strong>”: A function call to the necDAO Smart Contracts executed by any Wallet address to effect a change in the Proposal’s state in accordance with the consensus rules.
              </p>
              <p>
                ​“<strong>External Call Reward</strong>”: GEN amount paid to a person placing an External Call to execute a Boosted Proposal,whichis(t/15O)%butatmost10%ofthetotalUpstakeoftherespectiveBoostedProposal,where​ti​s the number of seconds passed since the conclusion of Proposal voting.
              </p>
              <p>
                ​“<strong>Force Majeure Event</strong>”: ​any event beyond our reasonable control, including, but not limited to, flood, extraordinary weather conditions, earthquake, or other act of God, fire, war, insurrection, riot, labor dispute, accident, action of government, communications, power failure, or equipment or software malfunction or bugs including network splits or Forks or unexpected changes in a network upon which the provision of the Vote Staking Interface and the coordination of the Reputation Bootstrap Period rely, as well as hacks, phishing attacks, distributed denials of service or any other security attacks on the Foundational Code.
              </p>
              <p>
                ​“<strong>Fork</strong>”: a change to the underlying protocol of a blockchain that results in more than one version of that blockchain.
              </p>
              <p>
                ​“<strong>Foundational Code</strong>”: ​the time period between the end of the Reputation Bootstrap Period and the Governance Period.
              </p>
              <p>
                ​“<strong>Freeze Period</strong>”: ​the time period between the end of the Reputation Bootstrap Period and the Governance Period.
              </p>
              <p>
                ​“<strong>GEN</strong>”: DAOstack's native ERC20 token.
              </p>
              <p>
                ​“<strong>Governance Period</strong>”: The open-ended time period starting at the end of the Freeze Period with the simultaneous activation of all dxDAO schemes.
              </p>
              <p>
                ​“<strong>NEC</strong>”: Nectar Token
              </p>
              <p>
                ​“<strong>Nectar Smart Contract</strong>”: the Nectar Token contract with Ethereum address - 0xcc80c051057b774cd75067dc48f8987c4eb97a5e
              </p>
              <p>
                ​“<strong>Non-Boosted Acceptance Threshold</strong>”: ​the percentage of Reputation votes required for a Regular Proposal to be accepted, which is for all necDAO Schemes more than 50% of the outstanding Reputation of the necDAO (i.e. the absolute majority).
              </p>
              <p>
                ​“<strong>Non- Boosted Rejection Threshold</strong>”: ​the percentage of Reputation votes required for a Regular Proposal to be rejected by vote (as distinguished from rejection by expiration), which is for all necDAO Schemes 50% or more of the outstanding Reputation of the necDAO.
              </p>
              <p>
                ​“<strong>Party Termination Event</strong>”: ​has the meaning given in clause 6.
              </p>
              <p>
                ​“<strong>Pending Proposal</strong>”: a Proposal whose Confidence Level passed the Boosting Threshold within the Pending Proposal Period, whereby it will revert to being a Regular Proposal if its Confidence Level drops below its earlier Boosting Threshold at any point during the Pending Proposal Period.
              </p>
              <p>
                ​“<strong>Pending Proposal Period</strong>”: he period a Pending Proposal stays pending after having passed its Boosting Threshold and is for Proposals affecting:
                <ul>
                  <li>Scheme registrar - (admin scheme) - 2 days</li>
                  <li>Generic scheme - ENS Registrar - 2 days</li>
                  <li>Generic scheme - ENS public resolver - 2 days</li>
                  <li>Contribution reward (funding) - 1 days</li>
                  <li>Generic scheme - Whitelist - 4 hours</li>
                </ul>
              </p>
              <p>
                ​“<strong>Pre-boost Voting Reputation Stake</strong>”: ​in each necDAO Scheme, 4% of a necDAO Reputation Holder's Reputation deducted for voting on a Regular Proposal or a Proposal prior to it being boosted, and returned to the necDAO Reputation Holder, if the necDAO Reputation Holder's vote aligns with the voting outcome, and retained, where this is not the case.
              </p>
              <p>
                ​“<strong>Predictor</strong>”: ​a person participating in the Prediction Challenge.
              </p>
              <p>
                ​“<strong>Prediction Challenge</strong>”: ​a mechanism built into the dxDAO Proposal process that involves:
                <ul>
                  <li>the necDAO automatically staking the DAO stake against a Proposal’s acceptance;</li>
                  <li>allowing anyone to stake GEN in favour of or against a Proposal;</li>
                  <li>in the case of an accepted or rejected Boosted Proposal, paying the total Upstake (minus the External Call Reward) and the total Downstake to the Predictors, whose predictions where aligned with the correct outcome, distributed in proportion to their share of the GEN staked on the correct outcome;</li>
                  <li>in the case of a Regular Proposal decided by vote, paying the total GEN staked on the correct outcome and incorrect outcome to the Predictors, whose predictions where aligned with the correct outcome, distributed in proportion to their share of the GEN staked on the correct outcome;</li>
                  <li>in the case of an expired Regular Proposal, returning the total Upstake and Downstake to its respective Predictor’s.</li>
                </ul>
              </p>
              <p>
                ​“<strong>Proposal</strong>”: ​a suggestion for actions to be taken by the necDAO functionally categorised into any of the three necDAO Schemes, which may be submitted by anyone to be voted on by the necDAO Reputation Holders in accordance with the governance parameters and the DAOstack's Framework.
              </p>
              <p>
                ​“<strong>Proposer</strong>”: ​a person submitting a Proposal to the necDAO.
              </p>
              <p>
                ​“<strong>Related Parties</strong>”: ​​the Company’s parents, subsidiaries, affiliates, assigns, transferees as well as any of its representatives, principals, agents, directors, officers, employees, consultants, members, shareholders or guarantors.
              </p>
              <p>
                ​“<strong>Reputation</strong>”: ​​a measure of voting power in the necDAO that attaches to a specific Wallet address and is non-transferable, whereby the greater the amount of Reputation a person holds, the greater the person's voting power.
              </p>
              <p>
                ​“<strong>Reputation Bootstrap Period</strong>”: ​the time period beginning once the necDAO contract is deployed and lasing 30 days, with the distribution of the Reputation occurring during the Freeze Period.
              </p>
              <p>
                ​“<strong>Smart Contract</strong>”: ​autonomous software code that is deployed on the Ethereum Blockchain.
              </p>
              <p>
                ​“<strong>Upstake</strong>”: ​GEN staked in favour of the acceptance of a Proposal.
              </p>
              <p>
                ​“<strong>Vote Staking Interface</strong>”: ​a graphical user interface developed by dOrg to facilitate participation in the Reputation Bootstrap Period.
              </p>
              <p>
                ​“<strong>Vote Staking Period</strong>”: ​​the time period beginning with the deployment of the necDAO Smart Contract and ending 30 days later, with the distribution of the Reputation occurring during the Freeze Period.
              </p>
              <p>
                ​“<strong>Wallet</strong>”: ​an ERC20 compatible wallet through which necDAO Stakeholders have access to and control of their private keys.
              </p>
              <p>
                ​“<strong>We, Our, Us</strong>”: ​at all times refers to the Company, and with the start of the Governance Period also to the necDAO.
              </p>
              <p>
                ​“<strong>You, Your, Yourself</strong>”: ​​refers, at all times, to each necDAO Participant.
              </p>
            </li>
          </ol>
        </li>
        <br/>
        <li><strong>SCOPE OF COMPANY’S INVOLVEMENT</strong>
          <ol>
            <li>
              The technical development of the necDAO is a project of the Company based
              on DAOstack’s Framework. The contribution of the Company is limited
              to providing the open-sourced "<strong>Foundational Code</strong>"
              ​of the necDAO, as well as the mechanism design of the initial Reputation
              distribution and the initial governance parameters.
            </li>
            <li>
              Beyond this, the Company’s involvement is limited to the provision
              of the Vote Staking Interface until the end of the Reputation Bootstrap
              Period only. The Company’s involvement is limited to the coordination
              of the Reputation Bootstrap Period until the end of the Reputation
              Bootstrap Period only.
            </li>
            <li>
              Subject to the occurrence of a Force Majeure Event, the Company will
              cease any remaining controls over any necDAO Smart Contract processes
              with the distribution of Reputation to the necDAO Reputation Holders.
            </li>
          </ol>
        </li>
        <li><strong>FUNCTIONING OF THE GOVERNANCE PERIOD</strong>
          <ol>
            <li>
              Subject the occurrence of a Force Majeure Event, in the Freeze Period
              the Company will cease any and all controls over the necDAO Smart Contracts,
              which become fully controlled by the necDAO with the start of the Governance Period.
            </li>
            <li>
              In the Governance Period, all necDAO decisions shall be taken by way of Proposal by the necDAO Reputation Holders in accordance with the governance parameters and the necDAO Schemes.
            </li>
            <li>
              Changes to the governance parameters may be made by way of Proposal within the Scheme Registrar (Admin Scheme).
            </li>
            <li>
              Proposals may be submitted by any Wallet address.
            </li>
            <li>
              Each Proposal is subject to a Prediction Challenge until it becomes a Boosted Proposal. As part of the Prediction Challenge, the necDAO automatically stakes the DAOStake against the acceptance of the Proposal. Any Holder of GEN may also stake with GEN either in favour or against a Proposal. Where a Proposal's Confidence Level exceeds the Boosting Threshold, the Proposal becomes a Pending Proposal. If at any time during the Pending Proposal Period, a Pending Proposal's Confidence Level falls below the earlier Boosting Threshold, a Pending Proposal reverts back to a Regular Proposal.
            </li>
            <li>
              A ​Pending Proposal becomes a Boosted Proposal if (1) the Pending Proposal Period has ended, (2) its Confidence Level is above the then current Boosting Threshold and (3) an External Call is made to boost it.
            </li>
            <li>
              Predictions on Boosted Proposals are not possible.
            </li>
            <li>
              A ​Boosted Proposal passes if the Boosted Proposal receives more Reputation votes in its favour than against it. A Boosted Proposal fails if the Boosted Proposal receive more Reputation votes against it than in its favour. Boosted Proposals are open for vote by necDAO Reputation Holders for the length of the Boosted Proposal Voting Period subject to the Quiet Ending Period, if any.
            </li>
            <li>
              A Regular Proposal is accepted if and when the number of Reputation votes in favour of the Proposal meets the Non-Boosted Acceptance Threshold. A Regular Proposal is rejected if and when the number of Reputation votes against the Regular Proposal meets the Non-Boosted Rejection Threshold. Regular Proposals Expire with the end of the Regular Proposal Voting Period, if they have neither been accepted nor rejected by vote​.
            </li>
            <li>
              Where within the length of the Quiet Ending Period prior to the expected end of the Boosted Proposal Voting Period, a Reputation vote changes the expected voting outcome, the Boosted Proposal Voting Period is extended such that voting on the Proposal remains open for the length of another Quiet Ending Period. This process is repeated until no decision change occurs within the respective Quiet Ending Period.
            </li>
            <li>
              To accept and reject a Boosted Proposal after the end of the voting period, a person may place an External Call for which the person is paid the External Call Reward. This External Call Reward is subtracted from the Upstake on the Boosted Proposal.
            </li>
            <li>
              Where a Boosted Proposal is accepted, the total Upstake (minus the External Call Reward) together with the total Downstake will be paid to the aligned Predictors, distributed in proportion to their share of the total Upstake. Where a Boosted Proposal is rejected, the total Downstake together with the total Upstake (minus the External Call Reward) is paid to the aligned Predictors, distributed in proportion to their share of the total Downstake.
            </li>
            <li>
              Where a Regular Proposal is either accepted or rejected by vote, the total GEN amount staked on the correct outcome together with the total GEN amount staked on the incorrect outcome is paid to the aligned Predictors, distributed in proportion to each Predictor's share in the total GEN staked on the correct outcome.
            </li>
            <li>
              Where a Regular Proposal expires, the total Up and Downstake are returned to the respective Predictors.
            </li>
            <li>
              Where a Proposal is accepted, the Proposer is allocated the Proposer Reward.
            </li>
            <li>
              Where a necDAO Reputation Holder votes on a Regular Proposal or a Pending Proposal, the Pre-boost Voting Reputation Stake is subtracted at the time of voting from the necDAO Reputation Holder's Reputation. Where the necDAO Reputation Holder's vote aligned with the final voting outcome, the Pre-boost Voting Reputation Stake is returned together with a share of the Pre-boost Reputation Stakes of necDAO Reputation Holders, whose vote did not align with the final outcome, allocated pro rata to the aligned necDAO Reputation Holder's Reputation share.
            </li>
          </ol>
        </li>
        <li><strong>REPUTATION IS NON-TRANSFERABLE</strong>
          <ol>
            <li>
              The Reputation distributed under this Agreement to a Wallet address is person-specific and may not be transferred by law or technology to another Party or a non-Party. A transfer in this sense means the change of Reputation between two persons with legal personality. All forms of transfer are prohibited, including those that occur by technically bypassing the restrictions on-chain and those that occur by transferring or assigning the Wallet off-chain.
            </li>
            <li>
              The prohibition of clause 4.1 does not include a reallocation of Reputation by decision of the necDAO. By way of proposal, the necDAO may strip the Reputation of a necDAO Reputation Holder and may reallocate the stripped Reputation to other or new necDAO Participants.
            </li>
            <li>
              Where it becomes apparent that Reputation has been transferred to another person in violation of clause 4.1, the necDAO may by way of Proposal decide to strip the corresponding Wallet address of any or all of its Reputation.
            </li>
          </ol>
        </li>
        <li><strong>EXECUTION, COMMENCEMENT, AND DURATION</strong>
          <ol>
            <li>
              This Agreement is executed by counterparts through Digital Signature and may be Digitally Signed in any number of counterparts, each of which when executed shall constitute a duplicate original, but all the counterparts shall together constitute the one Agreement.
            </li>
            <li>
              This Agreement comes into effect when a minimum of two necDAO Participants have Digitally Signed it in accordance with clause 5.1.
            </li>
            <li>
              This Agreement shall be in force until the occurrence of an Agreement Termination Event.
            </li>
            <li>
              Any provision of this Agreement that expressly or by implication is intended to come into or continue to be in force on or after an Agreement Termination Event (including this clause 5 and clauses 6, 8 - 14, 18 - 20, 22 - 24) shall remain in full force and effect.
            </li>
          </ol>
        </li>
        <li><strong>TERMINATION OF necDAO PARTICIPATION</strong>
          <ol>
            <li>
              Prior to the Governance Period, this Agreement may not be terminated in the Reputation Bootstrap Period, except at the Company’s sole discretion.
            </li>
            <li>
              During the Governance Period:
              <ol>
                <li>A necDAO Reputation Holder ceases to be a Party to this Agreement and the necDAO, if a Proposal for expulsion (in accordance with clause 7) or resignation is submitted to the necDAO and passed successfully. Any such proposal may be submitted by the necDAO Reputation Holder to be stripped of Reputation themselves, any other Party or a non-Party.
                </li>
                <li>A ​necDAO Reputation Holder also ceases to be a Party to this Agreement and the necDAO by providing by way of Proposal proof of having irreversibly relinquished control of their Wallet address with Reputation to an ownerless address, whereby it is not required that such Proposal is accepted.</li>
              </ol>
            </li>
            <li>
              A termination pursuant to clause 6.1 ​("<strong>Company Termination Event</strong> ") ​and clause 6.2 ("<strong>Party Termination Event</strong>") ​shall neither affect the continuance of the necDAO, nor the Agreement between the remaining Parties, nor - subject to clause 13 - any rights, remedies, obligations or liabilities of the Parties that have accrued up to the date of such event, including the right, if any, to claim damages in respect of any breach of the Agreement which existed at or before the date of such event.
            </li>
            <li>
              Any provision of this Agreement that expressly or by implication is intended to come into or continue to be in force on or after a Company Termination Event or Party Termination Event (including this clause 6, and clauses 8 - 14, 18 - 20, 22 - 24) in relation to the respective necDAO Reputation Holder shall remain in full force and effect.
            </li>
          </ol>
        </li>
        <li><strong>REASONS FOR TERMINATION OF PARTICIPATION</strong>
          <ol>
            <li>
              The necDAO Reputation Holders may in their sole discretion strip the Reputation from a Wallet address for cause. A cause is given, where the necDAO finds that the necDAO Reputation Holder:
              <ol>
                <li>committed any serious breach or persistent breaches of this Agreement or applicable laws; or
                </li>
                <li>is guilty of conduct which, in the opinion of the other necDAO Reputation Holders is likely to have a serious adverse effect on the necDAO.</li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>REPRESENTATIONS AND WARRANTIES BY necDAO PARTICIPANTS</strong>
          <p>You hereby represent and warrant to each of the other Parties:</p>
          <ol>
            <li>
              This Agreement constitutes legally valid obligations binding on You and enforceable against You in accordance with the Agreement's terms.
            </li>
            <li>
              Your entry into and performance of this Agreement and the transactions contemplated thereby do not and will ​not contravene or conflict with ​any law, regulation or judicial or official order applicable to You.
            </li>
            <li>
              In entering into this Agreement, You do not rely on, and shall have no remedy in respect of, any statement, representation, assurance or warranty (whether made innocently or negligently) that is not set out in this Agreement.
            </li>
            <li>
              You have obtained all required or desirable authorisations to enable You to enter into, exercise Your rights and comply with Your obligations under this Agreement. All such authorisations are in full force and effect.
            </li>
            <li>
              You are acting on Your own behalf and not for the benefit of any other person.
            </li>
            <li>
              The choice of English law as the governing law of this Agreement will be recognised and enforced in Your jurisdiction of domicile or incorporation or registration, as the case may be.
            </li>
            <li>
              You are the owner(s) of the Wallet used to sign this Agreement and have the capacity to control such Wallet.
            </li>
            <li>
              The necDAO does not have custody of Your Wallet.
            </li>
            <li>
              You are responsible to implement all appropriate measures for securing Your Wallet, including any private keys, seed words or other credentials necessary to access such storage mechanism.
            </li>
            <li>
              You have reached Your legal age of majority in Your jurisdiction.
            </li>
            <li>
              You have sufficient understanding of the functionality, usage, storage, transmission mechanisms and intricacies associated with cryptographic tokens, token storage facilities (including Wallets), blockchain technology and blockchain-based software systems.
            </li>
            <li>
              You do not act as a Consumer.
            </li>
            <li>
              You have obtained sufficient information about the necDAO to make an informed decision to become a Party to this Agreement.
            </li>
            <li>
              Participating in the necDAO under this Agreement is not unlawful or prohibited under the laws of Your jurisdiction or under the laws of any other jurisdiction to which You may be subject and shall be in full compliance with applicable laws (including, but not limited to, in compliance with any tax or disclosure obligations to which You may be subject in any applicable jurisdiction).
            </li>
            <li>
              You understand and accept that the necDAO is an experiment and that You participate at Your own risk in the necDAO and that these risks (some of which are set out in clause 9) are substantial.
            </li>
            <li>
              You acknowledge that these risks may be the result of negligent acts, omissions, and/or carelessness of the Company, the Related Parties or other necDAO Participants.
            </li>
            <li>
              You understand that all transactions executed in accordance with clauses 3 and 4 are on-chain on the Ethereum Blockchain and accordingly immutable and irreversible.
            </li>
            <li>
              You understand that such transactions may not be erased and that Your Wallet address and transaction is displayed permanently and publicly and that You relinquish any right of rectification or erasure of personal data.
            </li>
            <li>
              You are not in or under the control of, or a national or resident of any country subject to United States embargo, United Nations or EU sanctions or the HM ​Treasury's financial sanctions regime, or on the U.S. Treasury Department's Specially Designated Nationals List, the U.S. Commerce Department 's Denied Persons List, Unverified List, Entity List, the EU's consolidated list or the HM Treasury's financial sanctions regime.
            </li>
          </ol>
        </li>
        <li><strong>GENERAL RISKS</strong>
          <p>You are fully aware of, understand and agree to assume all the risks (including direct, indirect or ancillary risks) associated with participating in the necDAO including:</p>
          <ol>
            <li>
              The necessity for You to take Your own security measures for the Wallet used to participate to avoid a loss of access: The necDAO does not provide any central entity that can store or restore the access data of necDAO Participants. You need to keep Your private keys, seed phrases or other credentials necessary to access Your Wallet in safe custody.
            </li>
            <li>
              The immutability and irreversibility of Ethereum transactions: Errors, false inputs or other errors are solely the responsibility of each individual necDAO Participant. Neither the Company nor the other necDAO Participants shall have an obligation whatsoever to reverse or assist to reverse any false transaction.
            </li>
            <li>
              The creation of more than one version of the Ethereum Blockchain due to Forks: In the event of a Fork, Your transactions may not be completed, completed partially, incorrectly completed, or substantially delayed. No Party is responsible for any loss incurred by You caused in whole or in part, directly or indirectly, by a Fork of the Ethereum Blockchain.
            </li>
            <li>
              Remaining Smart Contract risks: Despite several security audits, there may be vulnerabilities in the deployed Smart Contracts: You may experience damage or loss (including financial loss) caused by the existence, identification and/or exploitation of these vulnerabilities through hacks, mining attacks (including double-spend attacks, majority mining power attacks and "selfish-mining" attacks), sophisticated cyber-attacks, distributed denials of service or other security breaches, attacks or deficiencies.
            </li>
            <li>
              The potential existence of phishing websites which pretend to be the necDAO user interface due to minimal variations in spelling: It is Your obligation to carefully check that You are accessing the correct domain.
            </li>
            <li>
              The experimental status of the DAOStack’s Framework: Usage of DAOstack 's Framework has not been tested in large groups and is of experimental nature. All decisions are based on the relative or absolute majority, depending on whether a Proposal has been boosted. No distinction is made according to the subject matter of the decision and no protection is provided for minority interests.
            </li>
            <li>
              Dependencies on external data centers: Some computations may involve external data centers. You agree that We shall not be responsible for any errors or omissions by the data centers operated by third parties.
            </li>
            <li>
              Constant and dynamic regulatory developments with regard to crypto assets: Applicable laws may be uncertain and/or subject to clarification, implementation or change.
            </li>
          </ol>
        </li>
        <li><strong>COVENANTS</strong>
          <ol>
            <li>
              You covenant with the other Parties as set out in clause10.2 and10.3, respectively, and undertake to comply with those covenants.
            </li>
            <li>
              Each necDAO Reputation Holder shall:
              <ol>
                <li>
                  actively participate in the decision-making process;
                </li>
                <li>
                  support the purpose of the necDAO as described in the Background to this Agreement and refrain from any action that may conflict with or harm that purpose;
                </li>
                <li>
                  not sell or transfer or otherwise dispose of in any manner (or purport to do so) all or any part of, or any interest in, the necDAO Reputation Holder's Reputation unless it is to give up control of the corresponding Wallet address by irreversible measures to an ownerless address;
                </li>
                <li>
                  to the extent that the necDAO Reputation Holder has the capacity to do so, exercise their Reputation to procure that the provisions of this Agreement are properly and promptly observed and given full force and effect according to the spirit and intention of the Agreement;
                </li>
              </ol>
            </li>
            <li>
              Each necDAO Participant (including each necDAO Reputation Holder) shall:
              <ol>
                <li>
                  comply in all respects with all relevant laws to which You may be subject, if failure to do so would materially impair Your ability to perform Your obligations under this Agreement;
                </li>
                <li>
                  not attempt to gain unauthorised access to the Vote Staking Interface or the Alchemy Earth Interface and/or to interact with the Smart Contracts in any matter not contemplated by this Agreement;
                </li>
                <li>
                  not to sue the Company, the Related Parties or necDAO Participants for any of the Released Claims that you have waived, released, or discharged in clause 11 or for any other claims;
                </li>
                <li>
                  inform Yourself continuously about the regulatory status of DLT and crypto assets to ensure compliance with the legal framework applicable to You when taking part in the decision-making process of the necDAO;
                </li>
                <li>
                  comply with all legislation, regulations, professional standards and other provisions as may govern the conduct of the necDAO;
                </li>
                <li>
                  comply with any applicable tax obligations in their jurisdiction arising from their interaction with the necDAO;
                </li>
                <li>
                  not misuse the Vote Staking Interface, the Alchemy Earth Interface and/or the Smart Contract by knowingly introducing viruses, bugs, worms or other material that is malicious or technologically harmful;
                </li>
                <li>
                  not use the necDAO to finance, engage in, or otherwise support any unlawful activities.
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>WAIVER AND RELEASE OF RECOURSE TO LEGAL ACTION</strong>
          <ol>
            <li>
              You hereby irrevocably release and forever discharge all and/or any actions, suits, proceedings, claims, rights, demands, however arising, whether for damages, loss or injury sustained, loss of profits, accounting, set-offs, costs or expenses or for any other remedy, whether in England & Wales or any other jurisdiction, whether or not presently known to the Parties or to the law, and whether in law or equity, that You ever had, may have or hereafter can, shall or may have against the Company, any of its Related Parties or any other necDAO Participant arising out of or connected with this Agreement, the necDAO, or any other matter arising out of or connected with the relationship between the Parties (collectively, the ​“<strong>Released Claims
              </strong>”​).
            </li>
            <li>
              Each necDAO Participant agrees not to sue, commence, voluntarily aid in any way, prosecute or cause to be commenced or prosecuted against the Company, its Related Parties or any other necDAO Participant any action, suit, arbitral proceedings or other proceedings concerning the Released Claims in England & Wales or any other jurisdiction.
            </li>
          </ol>
        </li>
        <li><strong>INDEMNITY</strong>
          <ol>
            <li>
              You shall indemnify the Company and the Related Parties against all liabilities, costs, expenses, damages and losses (including any direct, indirect or consequential losses, loss of profits, loss of reputation and all interest, penalties and legal costs (calculated on a full indemnity basis) and all other reasonable professional costs and expenses) suffered or incurred arising out of or in connection with Your breach of this Agreement, and any of Your acts or omissions that infringe the rights of any Party under this Agreement, including:
              <ol>
                <li>
                  Your breach of any of the warranties, representations, waivers, releases and covenants contained in clauses 8 to 11;
                </li>
                <li>
                  Your breach or negligent performance or non-performance of this Agreement;
                </li>
                <li>
                  any claim made against the Company or any of its Related Parties for actual or alleged infringement of a third party's intellectual property rights arising out of or in connection with Your participation in the Reputation Bootstrap Period or Governance Period;
                </li>
                <li>
                  any claim made against the Company or any of its Related Parties by a third party arising out of or in connection with Your breach of the warranties, representations, waivers, releases or covenants as contained in clauses 8 to 11;
                </li>
                <li>
                  any claim made against the Company or any of its Related Parties by a third party for loss or damage to property arising out of or in connection with Your participation in the Governance Period of the necDAO;
                </li>
                <li>
                  any claims made by You or other persons, for liabilities assessed against the Company, or any of the Related Parties, including but not limited to legal costs, attorneys' fees and dispute resolution expenses, arising out of or resulting from, directly or indirectly, in whole or in part, Your breach or failure to abide by any part of this Agreement.
                </li>
              </ol>
            </li>
            <li>
              The provisions of this clause shall be for the benefit of the Company and its Related Parties and shall be enforceable the Company and also each of its Related Parties.
            </li>
            <li>
              If a payment due from You under this clause is subject to tax (whether by way of direct assessment or withholding at its source), the Company and/ or the Related Parties shall be entitled to receive from You such amounts as shall ensure that the net receipt, after tax, to the Companies and the Related Parties in respect of the payment is the same as it would have been were the payment not subject to tax.
            </li>
          </ol>
        </li>
        <li><strong>DISCLAIMER OF WARRANTIES</strong>
          <ol>
            <li>
              The necDAO is an experiment in the field of decentralized governance structures. Accordingly, the Foundational code, the Vote Staking Interface, the Alchemy Earth Interface and the coordination of the Vote Staking Period are provided on an “as is” and “as available” basis without any representation or warranty, whether express, implied or statutory, to the maximum extent permitted by applicable law. We specifically disclaim any implied warranties of title, legality validity, adequacy or enforceability, merchantability, fitness for a particular purpose and/or non-infringement. We do not make any representations or warranties that access to or use of the Foundational Code, the provision of the Vote Staking Interface and the Alchemy Earth Interface and coordination of the Reputation Bootstrap Period will be continuous, uninterrupted, timely, or error-free.
            </li>
          </ol>
        </li>
        <li><strong>LIMITATION OF LIABILITY</strong>
          <ol>
            <li>
              Participation in or interaction with the necDAO is at a person’s own risk and the person assumes full responsibility for such participation or interaction. We exclude all implied conditions, warranties, representations or other terms that may apply to the Foundational Code, the Vote Staking Interface, the Alchemy Earth Interface and the coordination of the Reputation Bootstrap Period. We will not be liable for any loss or damage whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with the use of, or inability to use the Foundation Code, the Vote Staking Interface, the Alchemy Earth Interface or the coordination of the Reputation Bootstrap Period. We will not be liable for the loss of profits, sales, business, or revenue, business interruption, anticipated savings, business opportunity, goodwill or reputation or any indirect or consequential loss or damage.
            </li>
            <li>
              Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, disclaimers, exclusions, and limitations of liability under this Agreement will not apply to the extent prohibited by applicable law. insofar as the aforementioned elements of the Agreement can be applied in a legally compliant manner, they remain binding to the maximum extent permitted by applicable law.
            </li>
            <li>
              Unless expressly provided otherwise in this Agreement, any remaining liability of the Parties for obligations under this Agreement shall be several only and extend only to any loss or damage arising out of their own breaches.
            </li>
          </ol>
        </li>
        <li><strong>VARIATION</strong>
          <ol>
            <li>
              In the Governance Period, no variation of this Agreement shall be effective unless it is voted on by way of Proposal, which is accepted.
            </li>
          </ol>
        </li>
        <li><strong>SEVERABILITY</strong>
          <ol>
            <li>
              If any provision of this Agreement is or becomes invalid, illegal or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable.
            </li>
            <li>
              If such modification is not possible, the relevant provision shall be deemed deleted and replaced by the application of the law that complies with the remaining Agreement to the maximum extent. Any modification to or deletion of a provision under this clause shall not affect the validity and enforceability of the rest of this Agreement.
            </li>
          </ol>
        </li>
        <li><strong>ENTIRE AGREEMENT</strong>
          <ol>
            <li>
              This Agreement constitutes the entire and exclusive agreement between the Parties regarding its subject matter and supersedes and replaces any previous or contemporaneous written or oral contract, promises, assurances, warranty, representation or understanding regarding its subject matter and/or the necDAO, whether written, coded or oral, including any version of the necDAO Whitepaper (​https://nectar.community/whitepaper​).
            </li>
            <li>
              Each Party acknowledges that in entering into this Agreement they do not rely on, and shall have no remedy in respect of, any statement, representation, assurance or warranty (whether made innocently or negligently) that is not set out in this Agreement.
            </li>
            <li>
              No party shall have a claim for innocent or negligent misrepresentation or misstatement based on any statement in this Agreement.
            </li>
          </ol>
        </li>
        <li><strong>NO WAIVER</strong>
          <ol>
            <li>
              A failure or delay by any Party to exercise any right or remedy provided under this Agreement or by law shall not constitute a waiver of that or any other right or remedy, nor shall it prevent or restrict any further exercise of that or any other right or remedy.
            </li>
          </ol>
        </li>
        <li><strong>NO THIRD-PARTY RIGHTS</strong>
          <ol>
            <li>
              Unless expressly stated otherwise, this Agreement does not give rise to any rights under the Contracts (Rights of Third Parties) Act 1999 to enforce any term of this Agreement.
            </li>
            <li>
              The rights of the Parties to terminate, rescind or agree any variation, waiver or settlement under this Agreement are not subject to the consent of any third party.
            </li>
          </ol>
        </li>
        <li><strong>RELATIONSHIP OF THE PARTIES</strong>
          <ol>
            <li>
              Nothing in this Agreement is intended to, nor shall create any partnership, joint venture, agency or trusteeship.
            </li>
            <li>
              The Parties agree on the coordination form of a Distributed Heterarchical Network.
            </li>
            <li>
              Each Party confirms:
              <ul>
                <li>
                  it is acting on its own behalf and not for the benefit of any other person;
                </li>
                <li>
                  it is liable for its own taxes;
                </li>
                <li>
                  the Parties have no fiduciary duties or equivalent obligations towards each other.
                </li>
              </ul>
            </li>
          </ol>
        </li>
        <li><strong>FORCE MAJEURE</strong>
          <ol>
            <li>
              If the Foundational Code, the coordination of the Vote Staking Period and/or provision of the Vote Staking Interface are affected, hindered or made impossible in whole or in part by a Force Majeure Event, this shall under no circumstances be deemed a breach of this Agreement and no loss or damage shall be claimed by reason thereof.
            </li>
          </ol>
        </li>
        <li><strong>NO ASSIGNMENT</strong>
          <ol>
            <li>
              necDAO Participants may not assign or transfer any of their rights or duties arising out of or in connection with this Agreement to a third party. Any such assignment or transfer shall be void and shall not impose any obligation or liability on the Parties to the assignee or transferee.
            </li>
            <li>
              The Company may assign its rights or duties arising out of or in connection with this Agreement to any of their affiliates or in connection with a merger or other disposition of all or substantially all of their assets.
            </li>
          </ol>
        </li>
        <li><strong>DISPUTE RESOLUTION</strong>
          <ol>
            <li>
              You agree and understand that by entering into this agreement, you expressly waive any right, if any, to a trial by jury and right to participate in a class action lawsuit.
            </li>
            <li>
              In the event a Dispute cannot be resolved amicably in accordance with clause 23, you must first refer the Dispute to proceedings under the International Chamber of Commerce ("ICC") Mediation Rules, which Rules are deemed to be incorporated by reference into this clause 23. The place of mediation shall be London, United Kingdom. The language of the mediation proceedings shall be English.
            </li>
            <li>
              If the Dispute has not been settled pursuant to the ICC Mediation Rules within 40 days following the filing of a Request for Mediation in accordance with the ICC Mediation Rules or within such other period as the parties to the Dispute may agree in writing, such Dispute shall thereafter be finally settled under the Rules of Arbitration of the International Chamber of Commerce by three arbitrators appointed in accordance with the said Rules. The seat of Arbitration shall be London, United Kingdom. The governing law of this arbitration clause shall be the laws of England and Wales. The language of the arbitration shall be English. The Emergency Arbitrator Provisions shall not apply.
            </li>
          </ol>
        </li>
        <li><strong>GOVERNING LAW</strong>
          <ol>
            <li>
              This Agreement shall be governed by and construed in accordance with the substantive laws of England & Wales without regard to conflict of laws principles but with the Hague Principles on the Choice of Law in International Commercial Contracts hereby incorporated by reference.
            </li>
          </ol>
        </li>
      </ol>

    </div>
  )
}
}
