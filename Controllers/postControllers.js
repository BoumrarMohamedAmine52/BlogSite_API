const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Post = require("../Models/postModel");
const factoryHandlers = require("./handlerFactory");

exports.allPosts = factoryHandlers.all(Post);

exports.getPost = factoryHandlers.getOne(Post);

exports.addPost = factoryHandlers.addOne(Post);

exports.updatePost = factoryHandlers.updateOne(Post);

exports.deletePost = factoryHandlers.deeteOne(Post);
