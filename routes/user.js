const router = require("express").Router();
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

module.exports = () => {
  router.get("/", allUsers);
  router.get("/:userId", requireSignin, getUser);
  router.put("/:userId", requireSignin, updateUser);
  router.delete("/:userId", requireSignin, deleteUser);
  router.get("/photo/:userId", userPhoto);
  router.put("/follow", requireSignin, addFollowing, addFollower);
  router.put("/unfollow", requireSignin, removeFollowing, removeFollower);
  router.param("userId", userById);

  return router;
};
