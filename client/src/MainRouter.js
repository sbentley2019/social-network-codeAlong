import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";

export default function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/users" component={Users}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/user/:userId" component={Profile}></Route>
      </Switch>
    </div>
  );
}
