import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Current from './components/Current/Current';
import Proposal from './components/Proposal/Proposal';
import Past from './components/Past/Past';
import Submit from './components/Submit/Submit';
import Tokens from './components/Tokens/Tokens';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Current} />
    <Route exact path="/proposal/:proposalId" component={Proposal} />
    <Route exact path="/past" component={Past} />
    <Route exact path="/submit" component={Submit} />
    <Route exact path="/tokens" component={Tokens} />
  </Switch>
);

export default Routes;
