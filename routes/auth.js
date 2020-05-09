const router = require("express").Router();
const { signup, login } = require("../controllers/auth");
const { userSignupValidator } = require("../validators");

module.exports = () => {
  router.post("/signup", userSignupValidator, signup);
  router.post("/login", login);
  return router;
};
