//import mongoose
const mongoose = require("mongoose");

//Users, Posts, Products collection

const PostSchema = new mongoose.Schema({
  title: String,

  subtitle: String,

  content: String,

  username: String,

  image: String,

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

//model-communicate with database
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
