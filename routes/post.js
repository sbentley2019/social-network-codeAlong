const router = require("express").Router();
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validators");

module.exports = () => {
  router.get("/", getPosts);
  router.post(
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator
  );
  router.get("/posts/by/:userId", requireSignin, postByUser);
  router.delete("/post/:postId", requireSignin, isPoster, deletePost);

  router.param("userId", userById);
  router.param("postId", postById);

  return router;
};
