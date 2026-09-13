const express = require("express");
const repostControllers = require("../Controllers/repostControllers");
const authControllers = require("../Controllers/authControllers");

const Router = express.Router();

Router.get("/", repostControllers.allREposts);

Router.get("/repost/:id", repostControllers.getRepost);

Router.use(authControllers.protect);

Router.route("repost/:id")
  .post(repostControllers.setRepostFields, repostControllers.addRepost)
  .patch(repostControllers.updateRepost)
  .delete(repostControllers.deleteRepost);
