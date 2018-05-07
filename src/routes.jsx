import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Proposal from './components/Proposal/Proposal';
import AllProposals from './components/AllProposals/AllProposals';
import Submit from './components/Submit/Submit';
import Landing from './components/Landing/Landing';
import Admin from './components/Admin/Admin';
import FAQ from './components/FAQ/FAQ';
import TokenListings from './components/TokenListings/TokenListings';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/proposal/:proposalId" component={Proposal} />
    <Route exact path="/all" component={AllProposals} />
    <Route exact path="/submit" component={Submit} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/faq" component={FAQ} />
    <Route exact path="/listings" component={TokenListings} />
  </Switch>
);

export default Routes;
