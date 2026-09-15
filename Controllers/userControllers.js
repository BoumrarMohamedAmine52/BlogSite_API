const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const User = require("../Models/userModel");
const handlersFactory = require("./handlerFactory");

exports.setUserId = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.setDeleteOptions = (req, res, next) => {
  req.body = {
    isActive: false,
  };
};

exports.setUpdateUserOptions = (req, res, next) => {
  const { password, passwordConfirm, ...updateOptions } = req.body;
  req.body = { ...updateOptions };
  next();
};

exports.getAllUsers = handlersFactory.getAll(User);

exports.getMyProfile = handlersFactory.getOne(User);

exports.getProfile = handlersFactory.getOne(User);

exports.updateUser = handlersFactory.updateOne(User);

exports.deleteUser = handlersFactory.updateOne(User);

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || newPassword || newPasswordConfirm) {
    return next(
      new AppError("please provide ur current and new passwords.", 400),
    );
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(currentPassword, req.user.password))) {
    return next(new AppError("wrong password", 401));
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  res.status(201).json({
    status: "Success",
    data: {
      user,
    },
  });
});
