const Reaction = require("../Models/reactionModel");
const handlersFactory = require("./handlerFactory");

exports.setReactionFields = (req, res, next) => {
  req.body = {
    isLike: req.body.isLike || req.params.isLike === "like" ? true : false,
  };

  if (req.method === "POST") {
    req.body.from = req.body.from || req.user.id;
    req.body.targetType = req.body.targetType || req.params.type;
    req.body.reactionTarget = req.body.reactionTarget || req.params.targetId;
  }
  next();
};

exports.getAllReaction = handlersFactory.getAll(Reaction);

exports.addReaction = handlersFactory.addOne(Reaction);

exports.updateReaction = handlersFactory.updateOne(Reaction);

exports.deleteReaction = handlersFactory.deleteOne(Reaction);
