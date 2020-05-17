import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Menu = ({ history }) => {
  const selected = function (history, path) {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
  };

  const logout = function (next) {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    return axios
      .get("/auth/logout")
      .then((res) => {
        console.log("logout returned", res);
        next();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={selected(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={selected(history, "/signup")}
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={selected(history, "/login")}
            to="/login"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            style={{ cursor: "pointer", color: "#fff" }}
            onClick={() => logout(() => history.push("/"))}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
