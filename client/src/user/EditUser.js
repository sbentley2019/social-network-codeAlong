import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";
import { useHistory, useParams } from "react-router-dom";

export default function EditUser(props) {
  const token = isAuthenticated().token;
  let history = useHistory();
  let params = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "",
    photo: null,
    fileSize: 0,
  });

  useEffect(() => {
    const userId = params.userId;
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
  }, [params.userId]);

  const isValid = function () {
    const { name, email, password, fileSize } = user;
    if (fileSize > 100000) {
      setUser({ ...user, error: "File size should be less than 100kb" });
      return false;
    }
    if (name.length === 0) {
      setUser({ ...user, error: "Name is required" });
      return false;
    }
    if (!/^\w+([/.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setUser({ ...user, error: "A valid Email is required" });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      setUser({
        ...user,
        error: "Password must be at least 6 characters long",
      });
      return false;
    }
    return true;
  };

  const submitForm = function (e) {
    e.preventDefault();
    setUser({ ...user, loading: true });
    if (!isValid()) {
      return;
    }

    let formData = new FormData();
    for (let i in user) {
      formData.append(i, user[i]);
    }

    updateUser(user.id, token, formData)
      .then((res) => {
        history.push(`/user/${user.id}`);
      })
      .catch((err) => {
        setUser({ ...user, error: err.response.data.error, loading: false });
      });
  };

  const handleUser = function (e) {
    const name = e.target.name;
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      const fileSize = value.size || 0;
      setUser({ ...user, [name]: value, fileSize, error: "" });
    } else {
      setUser({
        ...user,
        [name]: value,
        error: "",
      });
    }
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
          <label className="text-muted">Profile Photo</label>
          <input
            type="file"
            className="form-control"
            name="photo"
            accept="image/*"
            onChange={(e) => handleUser(e)}
          />
        </div>
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
