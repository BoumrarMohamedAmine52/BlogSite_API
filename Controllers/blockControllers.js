const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Block = require("../Models/blockModel");
const handlersFactory = require("./handlerFactory");

exports.setBlockFields = (req, res, next) => {
  req.body.blocker = req.body.blocker || req.user.id;
  req.body.blockTarget = req.body.blockTarget || req.params.id;
  next();
};

exports.allBlocks = handlersFactory.getAll(Block);

exports.addBlock = handlersFactory.addOne(Block);

exports.deleteBlock = handlersFactory.deleteOne(Block);
