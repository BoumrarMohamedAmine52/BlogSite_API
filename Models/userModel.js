const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Follow = require("./followModel");
const Post = require("./postModel");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "a user must have a username."],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "a user must havean email."],
      validate: [validator.isEmail, "please provide a valid email."],
    },
    password: {
      type: String,
      min: [8, "the password must be at least 8 caracters"],
      required: [true, "please provide a password."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm ur password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
      select: false,
    },
    passwordChangedDate: {
      type: Date,
    },
    birthDate: {
      type: Date,
      required: [true, "please provide ur bith date."],
    },
    BirthPlace: {
      type: String,
      required: [true, "please provide ur birth place."],
    },
    bio: String,
    gender: {
      type: String,
      required: [true, "please provide ur gender."],
    },
    ProfilePic: String,
    isVerified: {
      type: Boolean,
      default: "false",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  CandidatePassword,
  userPassword,
) {
  return bcrypt.compare(CandidatePassword, userPassword);
};

userSchema.methods.passwordChanged = function (jwtTimeStmp) {
  if (this.passwordChangedDate === undefined) return false;

  const passwordChangedDateSTMP = parseInt(
    this.passwordChangedDate.getTime() / 1000,
    10,
  );

  return passwordChangedDateSTMP > jwtTimeStmp;
};

userSchema.virtual("followersCount").get(async function () {
  const follows = await Follow.find({ followTarget: this.id });
  return follows.length;
});

userSchema.virtual("followingCount").get(async function () {
  const followings = await Follow.find({ follower: this.id });
  return followings.length;
});

userSchema.virtual("postsCount").get(async function () {
  const posts = await Post.find({ user: this.id });
  return posts.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
