import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";
import { useHistory } from "react-router-dom";

export default function EditUser(props) {
  const token = isAuthenticated().token;
  const history = useHistory();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "",
  });

  useEffect(() => {
    const userId = props.match.params.userId;
    setUser({ ...user, loading: true });
    getUser(userId, token)
      .then((res) => {
        console.log("res:", res);
        setUser({
          ...user,
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          loading: false,
        });
      })
      .catch((err) => history.push(`/user/${user.id}`));
  }, [props.match.params.userId]);

  const handleUser = function (e) {
    setUser({ ...user, [e.target.name]: e.target.value, error: "" });
  };

  const submitForm = function (e) {
    e.preventDefault();
    setUser({ ...user, loading: true });
    const { name, email, password } = user;

    updateUser(user.id, token, { name, email, password: password || undefined })
      .then((res) => {
        history.push(`/user/${user.id}`);
      })
      .catch((err) => {
        setUser({ ...user, error: err.response.data.error, loading: false });
      });
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile </h2>
      {user.error && <div className="alert alert-danger">{user.error}</div>}
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
          Update
        </button>
      </form>
    </div>
  );
}
