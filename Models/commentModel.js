const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a comment must belong to a user."],
    },
    content: {
      type: String,
      required: [true, "a comment must contain a content."],
    },
    parentType: {
      type: String,
      required: [true, "a comment have a type."],
      enum: {
        values: ["Post", "Comment"],
        message: "the commen't parent Type must be either a post or a comment.",
      },
      default: "post",
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "a comment must belong to parent."],
      refPath: "parentType",
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
