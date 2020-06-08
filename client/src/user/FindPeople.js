import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findPeople, follow } from "./apiUser";
import user_avatar from "../images/user_avatar.png";
import { isAuthenticated } from "../auth";

export default function FindPeople() {
  const [state, setState] = useState({
    users: [],
    images: {},
    error: "",
    open: false,
    message: "",
  });
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  useEffect(() => {
    findPeople(userId, token)
      .then((res) => {
        setState({ ...state, users: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const clickFollow = function (user, i) {
    follow(userId, token, user._id)
      .then((res) => {
        let toFollow = state.users;
        toFollow.splice(i, 1);
        setState({
          ...state,
          users: toFollow,
          open: true,
          message: `Following ${user.name}`,
        });
      })
      .catch((err) => setState({ ...state, error: err.response.data.error }));
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Find People</h2>
      {state.open && (
        <div className="alert alert-success">
          <p>{state.message}</p>
        </div>
      )}
      <div className="row">
        {state.users.map((user, index) => {
          return (
            <div className="card col-md-4" key={index}>
              <img
                style={{ height: "200px", width: "auto" }}
                className="img-thumbnail"
                src={`http://localhost:3001/user/photo/${user._id}`}
                onError={(e) => (e.target.src = user_avatar)}
                alt={user.name}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link
                  className="btn btn-raised btn-primary btn-sm"
                  to={`/user/${user._id}`}
                >
                  View Profile
                </Link>
                <button
                  onClick={() => clickFollow(user, index)}
                  className="btn btn-raised btn-info float-right btn-sm"
                >
                  Follow
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
