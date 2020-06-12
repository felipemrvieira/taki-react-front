import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import BusinessIndexPage from './pages/Business/BusinessIndexPage';
import BusinessNewPage from './pages/Business/BusinessNewPage';
import BusinessShowPage from './pages/Business/BusinessShowPage';
import BusinessEditPage from './pages/Business/BusinessEditPage';


import ItemsIndexPage from './pages/Items/ItemsIndexPage';
import ItemsNewPage from './pages/Items/ItemsNewPage';
import ItemsShowPage from './pages/Items/ItemsShowPage';
import ItemsEditPage from './pages/Items/ItemsEditPage';

import UsersIndexPage from './pages/Users/UsersIndexPage';
import UsersNewPage from './pages/Users/UsersNewPage';
import UsersShowPage from './pages/Users/UsersShowPage';
import UsersEditPage from './pages/Users/UsersEditPage';

import LoginPage from './pages/Login/LoginPage';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          // <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          <Component {...props} />

        )
    }
  />
);

const Routes = () => (

  <HashRouter>
    <Switch>

      <PrivateRoute path="/" exact={true} component={BusinessIndexPage} />

      {/* Business */}
      <PrivateRoute path="/businesses" exact={true} component={BusinessIndexPage} />
      <PrivateRoute path="/businesses/new" exact={true} component={BusinessNewPage} />
      <PrivateRoute path="/businesses/:id" exact={true} component={BusinessShowPage} />
      <PrivateRoute path="/businesses/edit/:id" exact={true} component={BusinessEditPage} />
      {/* Business */}

      {/* Items */}
      {/* <PrivateRoute path="/items" exact={true} component={ItemsIndexPage} /> */}
      <PrivateRoute path="/items/new/:id" exact={true} component={ItemsNewPage} />
      <PrivateRoute path="/items/:id" exact={true} component={ItemsShowPage} />
      <PrivateRoute path="/items/edit/:id" exact={true} component={ItemsEditPage} />
      {/* Items */}

      {/* Users */}
      <PrivateRoute path="/users" exact={true} component={UsersIndexPage} />
      <PrivateRoute path="/users/new" exact={true} component={UsersNewPage} />
      <PrivateRoute path="/users/:id" exact={true} component={UsersShowPage} />
      <PrivateRoute path="/users/edit/:id" exact={true} component={UsersEditPage} />
      {/* Users */}
      {/* Login */}
      <Route path="/login" exact={true} component={LoginPage} />
      {/* Login */}



    </Switch>
  </HashRouter>
);

export default Routes;
