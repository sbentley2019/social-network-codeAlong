import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditUser from "./user/EditUser";
import PrivateRoute from "./auth/PrivateRoute";

export default function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/user/edit/:userId" component={EditUser} />
        <PrivateRoute exact path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
}
