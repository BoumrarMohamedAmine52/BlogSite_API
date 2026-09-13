const mongoose = require("mongoose");
const User = require("./userModel");
const Comment = require("./commentModel");
const Reaction = require("./reactionModel");
const Repost = require("./repostModel");

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

postSchema.virtual("commentsCount").get(async function () {
  const comments = await Comment.find({ parentId: this.id });
  return posts.length;
});

postSchema.virtual("likesCount").get(async function () {
  const likes = await Reaction.find({ reactionTarget: this.id, isLike: true });
  return likes.length;
});

postSchema.virtual("disLikesCount").get(async function () {
  const dislikes = await Reaction.find({
    reactionTarget: this.id,
    isLike: false,
  });
  return dislikes.length;
});

postSchema.virtual("repostCount").get(async function () {
  const reposts = await Repost.find({ originalPost: this.id });
  return reposts.length;
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
