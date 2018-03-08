import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Proposal from './components/Proposal/Proposal';
import AllProposals from './components/AllProposals/AllProposals';
import Submit from './components/Submit/Submit';
import Landing from './components/Landing/Landing';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/proposal/:proposalId" component={Proposal} />
    <Route exact path="/all" component={AllProposals} />
    <Route exact path="/submit" component={Submit} />
  </Switch>
);

export default Routes;
