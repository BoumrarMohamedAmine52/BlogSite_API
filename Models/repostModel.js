const mongoose = require("mongoose");
//const User = require("./userModel");

const repostSchema = new mongoose.Schema(
  {
    repostedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a reposted post must be by a user."],
    },
    content: {
      type: String,
    },
    originalPost: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "please provide ur orginal post of the reposting."],
    },
  },
  {
    timestamps: true,
  },
);

const Repost = mongoose.model("Repost", repostSchema);

module.exports = Repost;
