const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validators");

module.exports = () => {
  router.get("/", requireSignin, getPosts);
  router.post("/post", createPostValidator, createPost);

  return router;
};
