import React from "react";
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from "./components/AppliedRoute";
import Home from './containers/Home';
import Login from "./containers/Login";
import Signup from "./containers/Signup"
import NewImage from "./containers/NewImage";
import NotFound from './containers/NotFound';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/images/new" exact component={NewImage} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}