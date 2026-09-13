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
  },
);

// commentSchema.virtual("commentsCount").get(async function () {
//   const comments = await Comment.find({ parentId: this.id });
//   return comments.length;
// });

commentSchema.virtual("likesCount").get(async function () {
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
