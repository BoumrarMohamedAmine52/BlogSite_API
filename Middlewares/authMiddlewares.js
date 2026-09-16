const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const sendEmail = require("../Utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED,
  });
};

exports.signUp = asyncHandler(async (req, res) => {
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

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

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

  const URL = `${req.protocol}://${req.hostname}:${process.env.JWT_PORT}/api/v1/users/resetPassword/${resetToken}`;

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
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
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

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetToken: hashedResetToken,
    resetTokenExp: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }

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

exports.restrictToOwnerOnly = (Model) => {
  const ownerFields = {
    User: "_id",
    Post: "user",
    Comment: "user",
    Repost: "repostedBy",
    Reaction: "from",
    Follow: "follower",
    Block: "blocker",
  };

  return asyncHandler(async (req, res, next) => {
    const ownerField = ownerFields[Model.modelName];

    if (!ownerField) {
      return next(
        new AppError(`Owner field not configured for ${Model.modelName}`, 500),
      );
    }

    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(new AppError("Document not found.", 404));
    }

    const ownerId = document[ownerField].toString();

    if (ownerId !== req.user.id.toString()) {
      return next(
        new AppError("You do not have permission to perform this action.", 403),
      );
    }

    next();
  });
};
