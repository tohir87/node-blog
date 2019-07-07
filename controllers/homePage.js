const express = require("express");
const router = express.Router();
const Post = require("../database/models/Post");

router.get('/', async (req, res) => {
  const posts = await Post.find({});

  console.log(posts);

  res.render("index", {
    posts
  });
})

module.exports = router;
