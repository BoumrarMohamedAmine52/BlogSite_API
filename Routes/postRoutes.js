const express = require("express");
const postControllers = require("../Controllers/postControllers");

const Router = express.Router();

Router.get("/", postControllers.allPosts);
Router.post("/", postControllers.addPost);

Router.route("/post/:id")
  .get(postControllers.getPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);
