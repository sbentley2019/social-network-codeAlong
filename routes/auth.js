const router = require("express").Router();
const { signup, login, logout } = require("../controllers/auth");
const { userSignupValidator } = require("../validators");

module.exports = () => {
  router.post("/signup", userSignupValidator, signup);
  router.post("/login", login);
  router.get("/logout", logout);
  return router;
};
