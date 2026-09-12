const mongoose = require("mongoose");
//const User = require("./userModel");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "a follow must have a follower."],
    },
    followTarget: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a follow must be for target or the followed user."],
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, targetId: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
