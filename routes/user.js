const router = require("express").Router();
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

module.exports = () => {
  router.get("/users", allUsers);
  router.get("/user/:userId", requireSignin, getUser);
  router.put("/user/:userId", requireSignin, updateUser);
  router.delete("/user/:userId", requireSignin, deleteUser);
  router.param("userId", userById);

  return router;
};
