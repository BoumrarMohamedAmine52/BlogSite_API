const Post = require("../Models/postModel");
const factoryHandlers = require("./handlerFactory");

exports.setUserId = (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  next();
};

exports.allPosts = factoryHandlers.getAll(Post);

exports.getPost = factoryHandlers.getOne(Post);

exports.addPost = factoryHandlers.addOne(Post);

exports.updatePost = factoryHandlers.updateOne(Post);

exports.deletePost = factoryHandlers.deleteOne(Post);
