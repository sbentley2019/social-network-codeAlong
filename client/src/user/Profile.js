import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { getUser } from "./apiUser";
import { Redirect, Link } from "react-router-dom";

export default function Profile(props) {
  const [state, setState] = useState({
    user: {},
    redirectToLogin: false,
    loading: false,
  });

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;
    setState({ ...state, loading: true });
    getUser(userId, token)
      .then((res) => {
        console.log("res:", res);
        setState({ ...state, user: res.data, loading: false });
      })
      .catch((err) => setState({ ...state, redirectToLogin: true }));
  }, []);

  if (state.redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mt-5 mb-5">Profile</h2>
          <p>Hello {isAuthenticated().user.name}</p>
          <p>Email: {isAuthenticated().user.email}</p>
          {state.loading ? (
            <p>Loading...</p>
          ) : (
            <p>{`Joined ${new Date(state.user.created).toDateString()}`}</p>
          )}
        </div>
        <div className="col-md-6">
          {isAuthenticated().user &&
            isAuthenticated().user._id === state.user._id && (
              <div classname="d-inline-block">
                <Link
                  className="btn btn-raised btn-success mr-5 mt-5"
                  to={`/user/edit/`}
                >
                  Edit Profile
                </Link>
                <Link
                  className="btn btn-raised btn-danger mt-5"
                  to={`/user/delete/`}
                >
                  delete Profile
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
