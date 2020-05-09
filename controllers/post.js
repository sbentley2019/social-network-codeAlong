const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .select("_id title body")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => console.log(err));
};
