import React from "react";
import { isAuthenticated } from "../auth";
import { remove } from "./apiUser.js";
import { useHistory } from "react-router-dom";
import { logout } from "../auth";

export default function DeleteUser(props) {
  const history = useHistory();

  const deleteAccount = function () {
    const token = isAuthenticated().token;
    remove(props.userId, token)
      .then((res) => {
        logout(() => history.push("/login"));
      })
      .catch((err) => console.log(err));
  };

  const deleteConfirmed = function () {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      deleteAccount();
    }
  };

  return (
    <button className="btn btn-raised btn-danger" onClick={deleteConfirmed}>
      delete Profile
    </button>
  );
}
