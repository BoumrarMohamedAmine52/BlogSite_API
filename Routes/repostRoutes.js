const express = require("express");
const repostControllers = require("../Controllers/repostControllers");
const authControllers = require("../Middlewares/authMiddlewares");

const Router = express.Router();

Router.get("/", repostControllers.allReposts);

Router.get("/repost/:id", repostControllers.getRepost);

Router.use(authControllers.protect);

Router.route("repost/:id")
  .post(repostControllers.setRepostFields, repostControllers.addRepost)
  .patch(repostControllers.updateRepost)
  .delete(repostControllers.deleteRepost);

module.exports = Router;
