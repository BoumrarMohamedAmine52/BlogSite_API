const express = require("express");
const postControllers = require("../Controllers/postControllers");
const authControllers = require("../Middlewares/authMiddlewares");

const Router = express.Router();

Router.get("/", postControllers.allPosts);
Router.post("/", authControllers.protect, postControllers.addPost);

Router.route("/post/:id")
  .get(postControllers.getPost)
  .patch(authControllers.protect, postControllers.updatePost)
  .delete(authControllers.protect, postControllers.deletePost);

module.exports = Router;
