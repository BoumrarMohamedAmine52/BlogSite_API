const mongoose = require("mongoose");
const Reaction = require("./reactionModel");

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
    toJSON: { virtuals: true }, // Ensures virtuals show up when converted to JSON
    toObject: { virtuals: true },
  },
);

commentSchema.virtual("likesCount", {
  ref: "Reaction",
  foreignField: "reactionTarget",
  localField: "_id",
  count: true,
  match: { isLike: true },
});

commentSchema.virtual("disLikesCount", {
  ref: "Reaction",
  foreignField: "reactionTarget",
  localField: "_id",
  count: true,
  match: { isLike: false },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
