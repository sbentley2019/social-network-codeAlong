const router = require("express").Router();
const { userById, allUsers } = require("../controllers/user");

module.exports = () => {
  router.get("/users", allUsers);
  router.param("userId", userById);

  return router;
};
