const router = require("express").Router();
const {
  userById,
  allUsers,
  getUser,
  updateUser,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

module.exports = () => {
  router.get("/users", allUsers);
  router.get("/user/:userId", requireSignin, getUser);
  router.put("/user/:userId", requireSignin, updateUser);
  router.param("userId", userById);

  return router;
};
