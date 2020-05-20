import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated().token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
