import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Redirect } from "react-router-dom";

export default function Profile(props) {
  const [state, setState] = useState({
    user: {},
    redirectToLogin: false,
    loading: false,
  });

  useEffect(() => {
    const userId = props.match.params.userId;
    setState({ ...state, loading: true });
    getUser(userId)
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
      <h2 className="mt-5 mb-5">Profile</h2>
      <p>Hello {isAuthenticated().user.name}</p>
      <p>Email: {isAuthenticated().user.email}</p>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <p>{`Joined ${new Date(state.user.created).toDateString()}`}</p>
      )}
    </div>
  );
}
