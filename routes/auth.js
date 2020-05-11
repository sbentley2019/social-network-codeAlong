const router = require("express").Router();
const { signup, login, logout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validators");

module.exports = () => {
  router.post("/signup", userSignupValidator, signup);
  router.post("/login", login);
  router.get("/logout", logout);
  router.param("userId", userById);

  return router;
};
