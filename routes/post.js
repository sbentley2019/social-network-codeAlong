const router = require("express").Router();
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validators");

module.exports = () => {
  router.get("/", getPosts);
  router.post("/new/:userId", requireSignin, createPost, createPostValidator);
  router.get("/by/:userId", requireSignin, postByUser);
  router.put("/:postId", requireSignin, isPoster, updatePost);
  router.delete("/:postId", requireSignin, isPoster, deletePost);

  router.param("userId", userById);
  router.param("postId", postById);

  return router;
};
