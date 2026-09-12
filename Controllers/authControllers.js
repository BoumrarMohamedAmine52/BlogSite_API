const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED,
  });
};

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = signToken(user.id);

  res.status(201).json({
    status: "Success",
    token: token,
    data: {
      user,
    },
  });
});

exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("please provide ur email and password to login.", 400),
    );
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("wrong email or password", 401));
  }

  const token = signToken(user.id);

  res.status(201).json({
    status: "Success",
    token: token,
    data: {
      user,
    },
  });
});

exports.protect = asyncHandler(async (req, res, next) => {});
