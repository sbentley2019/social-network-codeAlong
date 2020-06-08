import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list } from "./apiUser";
import user_avatar from "../images/user_avatar.png";

export default function Users() {
  const [state, setState] = useState({ users: [], images: {} });

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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
