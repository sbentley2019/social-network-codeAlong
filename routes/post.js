const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/post");
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
  router.param("userId", userById);

  return router;
};
