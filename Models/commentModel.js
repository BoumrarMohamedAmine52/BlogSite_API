const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, "a comment must belong to a user."],
    },
    content: {
      type: String,
      required: [true, "a comment must contain a content."],
    },
    parentType: {
      type: String,
      required: [true, "a comment have a type."],
      enum: ["post", "comment"],
      default: "post",
    },
    parentId: {
      type: String,
      required: [true, "a comment must belong to parent."],
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.Model("Comment", commentSchema);

module.exports = Comment;
