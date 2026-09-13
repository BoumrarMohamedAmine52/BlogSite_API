const express = require("express");
const postControllers = require("../Controllers/postControllers");
const authControllers = require("../Controllers/authControllers");

const Router = express.Router();

Router.get("/", postControllers.allPosts);
Router.post("/", authControllers.protect, postControllers.addPost);

Router.route("/post/:id")
  .get(postControllers.getPost)
  .patch(authControllers.protect, postControllers.updatePost)
  .delete(authControllers.protect, postControllers.deletePost);
