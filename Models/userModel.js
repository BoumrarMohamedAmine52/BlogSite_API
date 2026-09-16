const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
    resetToken: {
      type: String,
    },
    resetTokenExp: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Ensures virtuals show up when converted to JSON
    toObject: { virtuals: true },
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

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExp = Date.now() + 10 * 60 * 1000 - 1;

  return resetToken;
};

userSchema.pre("save", function () {
  if (!this.isModified("password") || this.isNew) return;

  this.passwordChangedDate = Date.now() - 1;
});

userSchema.virtual("followersCount", {
  ref: "Follow",
  foreignField: "followTarget",
  localField: "_id",
  count: true,
});

userSchema.virtual("followingCount", {
  ref: "Follow",
  foreignField: "follower",
  localField: "_id",
  count: true,
});

userSchema.virtual("postsCount", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
  count: true,
});

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre(/^find/, function () {
  this.populate({
    path: "posts",
    select: "-__v -updatedAt",
  });
});
const User = mongoose.model("User", userSchema);

module.exports = User;
