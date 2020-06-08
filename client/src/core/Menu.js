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
        <li className="nav-item">
          <Link
            className="nav-link"
            style={selected(history, "/users")}
            to="/users"
          >
            Users
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
              <Link
                className="nav-link"
                style={selected(history, "/findPeople")}
                to={"/findPeople"}
              >
                Find People
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={selected(history, `/user/${isAuthenticated().user._id}`)}
                to={`/user/${isAuthenticated().user._id}`}
              >
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#fff" }}
                onClick={() => logout(() => history.push("/login"))}
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
