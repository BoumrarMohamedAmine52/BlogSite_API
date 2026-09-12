const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
  {
    blocker: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a block must be by a blocker."],
    },
    blockTarget: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a block must be for a user."],
    },
  },
  {
    timestamps: true,
  },
);

const Block = mongoose.model("Block", blockSchema);

exports.module = Block;
