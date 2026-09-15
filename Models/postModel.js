const mongoose = require("mongoose");
const Reaction = require("./reactionModel");
const Comment = require("./commentModel");
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
    toJSON: { virtuals: true }, // Ensures virtuals show up when converted to JSON
    toObject: { virtuals: true },
  },
);

postSchema.virtual("commentsCount", {
  ref: "Comment",
  foreignField: "parentId",
  localField: "_id",
  count: true,
});

postSchema.virtual("likesCount", {
  ref: "Reaction",
  foreignField: "reactionTarget",
  localField: "_id",
  count: true,
  match: { isLike: true },
});

postSchema.virtual("disLikesCount", {
  ref: "Reaction",
  foreignField: "reactionTarget",
  localField: "_id",
  count: true,
  match: { isLike: false },
});

postSchema.virtual("repostCount", {
  ref: "Repost",
  foreignField: "originalPost",
  localField: "_id",
  count: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
