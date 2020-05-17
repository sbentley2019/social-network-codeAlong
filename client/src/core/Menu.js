import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../auth";

const Menu = ({ history }) => {
  const selected = function (history, path) {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={selected(history, "/")} to="/">
            Home
          </Link>
        </li>

        {!isAuthenticated() ? (
          <>
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
          </>
        ) : (
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ cursor: "pointer", color: "#fff" }}
                onClick={() => logout(() => history.push("/"))}
              >
                Logout
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">{isAuthenticated().user.name}</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
