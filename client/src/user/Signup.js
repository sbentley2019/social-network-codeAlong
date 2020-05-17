import React, { useState } from "react";
import { signup } from "../auth";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    open: false,
    loading: false,
  });

  const submitForm = function (e) {
    e.preventDefault();
    setUser({ ...user, loading: true });
    const { name, email, password } = user;

    signup({ name, email, password })
      .then((res) => {
        console.log(res);
        setUser({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
          loading: false,
        });
      })
      .catch((err) => {
        setUser({ ...user, error: err.response.data.error, loading: false });
      });
  };

  const handleUser = function (e) {
    setUser({ ...user, [e.target.name]: e.target.value, error: "" });
  };
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Signup</h2>
      {user.error && <div className="alert alert-danger">{user.error}</div>}
      {user.open && (
        <div className="alert alert-info">
          New account is successfully created. Please Sign In.
        </div>
      )}
      {user.loading && (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      )}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={(e) => handleUser(e)}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={(e) => handleUser(e)}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={(e) => handleUser(e)}
          />
        </div>
        <button type="submit" className="btn btn-raised btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
