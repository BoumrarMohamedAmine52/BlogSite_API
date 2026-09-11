const mongoose = require("mongoose");
const User = require("./userModel");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a post must belong to a user."],
    },
    title: {
      type: String,
      required: [true, "a post must have a title."],
    },
    content: {
      type: String,
      required: [true, "a post must have a content."],
    },
    coverImage: String,
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.Model("Post", postSchema);

module.exports = Post;
