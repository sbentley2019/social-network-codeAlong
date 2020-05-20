const router = require("express").Router();
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { userUpdateValidator } = require("../validators");

module.exports = () => {
  router.get("/", allUsers);
  router.get("/:userId", requireSignin, getUser);
  router.put("/:userId", requireSignin, userUpdateValidator, updateUser);
  router.delete("/:userId", requireSignin, deleteUser);
  router.param("userId", userById);

  return router;
};
