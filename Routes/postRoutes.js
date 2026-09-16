const express = require("express");
const postControllers = require("../Controllers/postControllers");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const Post = require("../Models/postModel");

const Router = express.Router();

Router.get("/", postControllers.allPosts);
Router.post(
  "/",
  authMiddlewares.protect,
  postControllers.setUserId,
  postControllers.addPost,
);

Router.route("/post/:id")
  .get(postControllers.getPost)
  .patch(
    authMiddlewares.protect,
    authMiddlewares.restrictToOwnerOnly(Post),
    postControllers.updatePost,
  )
  .delete(
    authMiddlewares.protect,
    authMiddlewares.restrictToOwnerOnly(Post),
    postControllers.deletePost,
  );

module.exports = Router;
