import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";

export default function MainRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}
