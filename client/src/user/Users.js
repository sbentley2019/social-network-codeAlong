import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { list } from "./apiUser";
import user_avatar from "../images/user_avatar.png";

export default function Users() {
  const [state, setState] = useState({ users: [] });

  useEffect(() => {
    list()
      .then((res) => {
        setState({ ...state, users: res.data.users });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>
      <div className="row">
        {state.users.map((user, index) => {
          return (
            <div className="card col-md-4" key={index}>
              <img
                className="card-img-top"
                src={user_avatar}
                alt={user.name}
                style={{ width: "100%", height: "15vw", objectFit: "contain" }}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
