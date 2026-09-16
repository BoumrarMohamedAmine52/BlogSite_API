const express = require("express");
const repostControllers = require("../Controllers/repostControllers");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const Repost = require("../Models/repostModel");

const Router = express.Router();

Router.get("/", repostControllers.allReposts);

Router.get("/repost/:id", repostControllers.getRepost);

Router.use(authMiddlewares.protect);

Router.route("repost/:id")
  .post(repostControllers.setRepostFields, repostControllers.addRepost)
  .patch(
    authMiddlewares.restrictToOwnerOnly(Repost),
    repostControllers.updateRepost,
  )
  .delete(
    authMiddlewares.restrictToOwnerOnly(Repost),
    repostControllers.deleteRepost,
  );

module.exports = Router;
