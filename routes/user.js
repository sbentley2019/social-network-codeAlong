const router = require("express").Router();
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

module.exports = () => {
  router.get("/", allUsers);
  router.get("/:userId", requireSignin, getUser);
  router.put("/:userId", requireSignin, updateUser);
  router.delete("/:userId", requireSignin, deleteUser);
  router.get("/photo/:userId", userPhoto);
  router.param("userId", userById);

  return router;
};
