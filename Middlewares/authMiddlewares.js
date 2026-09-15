const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const { Promisify } = require("util");
const crypto = require("crypto");
const sendEmail = require("../Utils/email");

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

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("u are not loged in, please logIn to get access.", 401),
    );
  }

  const decode = await Promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id).select("+password");

  if (!currentUser) {
    return next(
      new AppError("the user belongs to that token no more exists.", 401),
    );
  }

  if (currentUser.passwordChanged(decode.iat)) {
    return next(
      new AppError("the token has been expired, please log in again.", 401),
    );
  }

  req.user = currentUser;
  req.user.id = decode.id;
  next();
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide ur email.", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError("The user that belong to that email no more exists.", 401),
    );
  }

  const resetToken = user.createResetToken();

  const urlResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const URL = `${req.protocol}://${req.hostname}:${process.env.JWT_PORT}/api/v1/users/resetPassword/${urlResetToken}`;

  const message = `U forgot ur password ? 
  if yes , please make a patch request to this url ${URL},
   with the new password and new passwordConfirm. 
   this url is only available for 10 min from now.`;

  const mailOptions = {
    email: user.email,
    subj: "Reset Password",
    text: message,
  };

  try {
    await sendEmail(mailOptions);

    res.status(201).json({
      status: "Success",
      message: "email sent successfully",
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Error sending the email.", 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm) {
    return next(new AppError("please provide ur password", 400));
  }

  const user = await User.findOne({ resetToken: req.params.resetToken });

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.resetToken = undefined;
  user.resetTokenExp = undefined;

  await user.save();

  res.status(204).json({
    status: "Success",
    data: {
      user,
    },
  });
});
