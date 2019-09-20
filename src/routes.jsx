import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Proposal from './components/Proposal/Proposal';
import AllProposals from './components/AllProposals/AllProposals';
import Submit from './components/Submit/Submit';
import Landing from './components/Landing/Landing';
import Admin from './components/Admin/Admin';
import FAQ from './components/FAQ/FAQ';
import TokenListings from './components/TokenListings/TokenListings';
import PreviousTokenListing from './components/PreviousTokenListing/PreviousTokenListing';
import DelegateVotes from './components/DelegateVotes/DelegateVotes';
import TokenPool from './components/TokenPool/TokenPool';
import TokenAbout from './components/TokenAbout/TokenAbout';
import Traderboard from './components/Traderboard/Traderboard';
import WhitePaper from './components/WhitePaper/WhitePaper';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />

    <Route exact path="/proposals" component={AllProposals} />
    <Route exact path="/proposal/:proposalId" component={Proposal} />
    <Route exact path="/submit" component={Submit} />
    <Route exact path="/pending" component={Admin} />
    <Route exact path="/delegate-votes" component={DelegateVotes} />

    <Route exact path="/tokens" component={TokenAbout} />
    <Route exact path="/token-pool" component={TokenPool} />
    <Route exact path="/previous-token-votes" component={PreviousTokenListing} />
    <Route exact path="/token-leaderboard" component={TokenListings} />

    <Route exact path="/faq" component={FAQ} />
    <Route exact path="/whitepaper" component={WhitePaper} />

    <Route exact path="/traderboard" component={Traderboard} />
  </Switch>
);

export default Routes;
