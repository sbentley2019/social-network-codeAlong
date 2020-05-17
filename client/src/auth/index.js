import axios from "axios";

export const signup = function (userData) {
  return axios.post("http://localhost:3001/auth/signup", userData);
};

export const login = function (userData) {
  return axios.post("http://localhost:3001/auth/login", userData);
};

export const authenticate = function (data, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const logout = function (next) {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return axios
    .get("/auth/logout")
    .then((res) => {
      console.log("logout returned", res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = function () {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};