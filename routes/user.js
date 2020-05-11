const router = require("express").Router();
const { userById, allUsers, getUser } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

module.exports = () => {
  router.get("/users", allUsers);
  router.get("/user/:userId", requireSignin, getUser);
  router.param("userId", userById);

  return router;
};
