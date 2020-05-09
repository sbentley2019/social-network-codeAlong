const router = require("express").Router();
const { signup } = require("../controllers/auth");
const { userSignupValidator } = require("../validators");

module.exports = () => {
  router.post("/signup", userSignupValidator, signup);

  return router;
};
