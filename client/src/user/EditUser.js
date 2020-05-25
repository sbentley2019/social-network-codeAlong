import React, { useState, useEffect } from "react";
import { getUser, update, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";
import { useHistory, useParams } from "react-router-dom";
import user_avatar from "../images/user_avatar.png";

export default function EditUser(props) {
  const token = isAuthenticated().token;
  let history = useHistory();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "",
    photo: "",
    fileSize: 0,
    about: "",
  });
  let params = useParams();
  const userId = params.userId;

  useEffect(() => {
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
          about: res.data.about,
        });
        return res.data._id;
      })
      .catch((err) => history.push(`/user/${user.id}`));
  }, [params.userId]);

  const isValid = function () {
    const { name, email, password, fileSize } = user;
    if (fileSize > 100000) {
      setUser({
        ...user,
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (name.length === 0) {
      setUser({ ...user, error: "Name is required", loading: false });
      return false;
    }
    if (!/^\w+([/.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setUser({ ...user, error: "A valid Email is required", loading: false });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      setUser({
        ...user,
        error: "Password must be at least 6 characters long",
        loading: false,
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
      if (
        (i === "password" || i === "photo" || i === "about") &&
        user[i].length === 0
      ) {
        continue;
      }
      formData.append(i, user[i]);
    }

    update(user.id, token, formData)
      .then((res) => {
        updateUser(res.data, () => history.push(`/user/${user.id}`));
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
      {user.loading ? (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`http://localhost:3001/user/photo/${userId}`}
            onError={(e) => (e.target.src = user_avatar)}
            alt={user.name}
          />
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
              <label className="text-muted">About</label>
              <textarea
                type="text"
                className="form-control"
                name="about"
                value={user.about}
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
            <button
              className="btn btn-raised btn-danger ml-5"
              onClick={() => history.push(`/user/${userId}`)}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}
