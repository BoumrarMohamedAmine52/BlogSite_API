const asyncHandler = require("express-async-handler");
const Repost = require("../Models/repostModel");
const AppError = require("../Utils/appError");
const handlersFactory = require("./handlerFactory");

exports.setRepostFields = (req, res, next) => {
  req.body.repostedBy = req.body.repostedBy || req.user.id;
  req.body.originalPost = req.body.originalPost || req.params.originalPost;

  next();
};

exports.allReposts = handlersFactory.getAll(Repost);

exports.getRepost = handlersFactory.getOne(Repost);

exports.addRepost = handlersFactory.addOne(Repost);

exports.updateRepost = handlersFactory.updateOne(Repost);

exports.deleteRepost = handlersFactory.deleteOne(Repost);
