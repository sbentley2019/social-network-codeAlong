import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { list } from "./apiUser";

export default function Users() {
  const [state, setState] = useState({ users: [] });

  useEffect(() => {
    const token = isAuthenticated().token;
    list(token)
      .then((res) => {
        setState({ ...state, users: res.data.users });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>
      {state.users.length > 0 &&
        state.users.map((user, index) => {
          return <p key={index}>{user.name}</p>;
        })}
    </div>
  );
}
