const mongoose = require("mongoose");
const User = require("./userModel");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      require: [true, "a follow must have a follower."],
    },
    targetId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, "a follow must be for target or the followed user."],
    },
  },
  {
    timestamps: true,
  },
);

const Follow = mongoose.Model("Follow", followSchema);

module.exports = Follow;
