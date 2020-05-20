import React, { useState } from "react";
import { login, authenticate } from "../auth";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const submitForm = function (e) {
    e.preventDefault();
    setUser({ ...user, loading: true });
    const { email, password } = user;

    login({ email, password })
      .then((res) => {
        console.log(res.data);
        authenticate(res.data, () => {
          setUser({ ...user, loading: false });
          history.push("/");
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
      <h2 className="mt-5 mb-5">Login</h2>
      {user.error && <div className="alert alert-danger">{user.error}</div>}
      {user.loading && (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      )}
      <form onSubmit={submitForm}>
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
