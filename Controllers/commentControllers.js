const Comment = require("../Models/commentModel");
const handlersFactory = require("./handlerFactory");

exports.setCommentsFields = (req, res, next) => {
  if (req.method === "POST") {
    req.body.user = req.body.user || req.user.id;
    req.body.parentType = req.body.parentType || req.params.type;
    req.body.parentId = req.body.parentId || req.params.parentId;
  } else if (req.method === "PATCH") {
    req.body = {
      content: req.body.content,
    };
  }
  next();
};

exports.allComments = handlersFactory.getAll(Comment);

exports.getComment = handlersFactory.getOne(Comment);

exports.addComment = handlersFactory.addOne(Comment);

exports.updateComment = handlersFactory.updateOne(Comment);

exports.deleteComment = handlersFactory.deleteOne(Comment);
