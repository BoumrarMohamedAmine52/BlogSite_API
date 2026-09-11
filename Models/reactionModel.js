const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    isLike: {
      type: Boolean,
      required: [true, "a reaction must be either liking or disliking."],
    },
    from: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, "a reaction must be by a user."],
    },
    targetType: {
      type: String,
      enum: {
        values: ["post", "comment"],
        message: "a target Type must be either a post or a comment.",
      },
      required: [true, "a reaction to target must have a type."],
    },
    targetId: {
      // type : mongoose.Schema.ObjectId,
      // ref : Post || Comment,
      type: String,
      required: [true, "a reaction must belong to either post or comment."],
    },
  },
  {
    timestamps: true,
  },
);

reactionSchema.index({ from: 1, targetId: 1 }, { unique: true });

const Reaction = mongoose.Model("Reaction", reactionSchema);

module.exports = Reaction;
