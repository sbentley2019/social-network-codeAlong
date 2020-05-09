const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/post");
const { createPostValidator } = require("../validators");

module.exports = () => {
  router.get("/", getPosts);
  router.post("/post", createPostValidator, createPost);

  return router;
};
