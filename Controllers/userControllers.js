const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const User = require("../Models/userModel");
const factoryHandlers = require("./handlerFactory");

exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id).populate({
    path: "posts",
    select: "-__v -updatedAt",
  });

  res.status(200).json({
    status: "Success",
    data: {
      currentUser,
    },
  });
});

exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: "posts",
    select: "-__v -updatedAt",
  });

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});
