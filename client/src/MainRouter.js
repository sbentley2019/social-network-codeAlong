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
import FindPeople from "./user/FindPeople";

export default function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/user/edit/:userId">
          <EditUser />
        </PrivateRoute>
        <PrivateRoute exact path="/findPeople">
          <FindPeople />
        </PrivateRoute>
        <PrivateRoute exact path="/user/:userId">
          <Profile />
        </PrivateRoute>
      </Switch>
    </div>
  );
}
