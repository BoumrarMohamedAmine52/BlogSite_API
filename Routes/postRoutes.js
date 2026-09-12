const express = require("express");
const postControllers = require("../Controllers/postControllers");

const Router = express.Router();

Router.get("/", postControllers.allPosts);

Router.route("/post/:id")
  .get(postControllers.getPost)
  .post(postControllers.addPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);
