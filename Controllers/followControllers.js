const Follow = require("../Models/followModel");
const handlersFactory = require("./handlerFactory");

exports.setFollowFields = (req, res, next) => {
  req.body.follower = req.body.follower || req.user.id;
  req.body.followTarget = req.body.followTarget || req.params.id;
  next();
};

exports.allFollows = handlersFactory.getAll(Follow);

exports.addFollow = handlersFactory.addOne(Follow);

exports.deleteFollow = handlersFactory.deleteOne(Follow);
