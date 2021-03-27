import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import DAO from './components/DAO/DAO';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />

    <Route exact path="/dao" component={DAO} />
  </Switch>
);

export default Routes;
