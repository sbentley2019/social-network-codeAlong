import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { getUser } from "./apiUser";
import { Redirect, Link, useParams } from "react-router-dom";
import user_avatar from "../images/user_avatar.png";
import DeleteUser from "./DeleteUser";

export default function Profile(props) {
  const [state, setState] = useState({
    user: {},
    redirectToLogin: false,
    loading: false,
  });
  let params = useParams();

  useEffect(() => {
    const userId = params.userId;
    const token = isAuthenticated().token;
    setState({ ...state, loading: true });
    getUser(userId, token)
      .then((res) => {
        console.log("res:", res);
        setState({ ...state, user: res.data, loading: false });
      })
      .catch((err) => setState({ ...state, redirectToLogin: true }));
  }, [params.userId]);

  if (state.redirectToLogin) {
    return <Redirect to="/login" />;
  }

  const photoUrl = state.user._id
    ? `http://localhost:3001/user/photo/${
        state.user._id
      }?${new Date().getTime()}`
    : user_avatar;

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Profile</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={photoUrl}
            onError={(e) => (e.target.src = user_avatar)}
            alt={state.user.name}
          />
        </div>
        <div className="col-md-6">
          {state.loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="lead">
                <p>Hello {state.user.name}</p>
                <p>Email: {state.user.email}</p>
                <p>{`Joined ${new Date(state.user.created).toDateString()}`}</p>
              </div>
            </>
          )}
          {isAuthenticated().user &&
            isAuthenticated().user._id === state.user._id && (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${state.user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={state.user._id} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
