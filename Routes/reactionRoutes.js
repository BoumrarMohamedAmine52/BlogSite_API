const express = require("express");
const reactionControllers = require("../Controllers/reactionControllers");
const authControllers = require("../Middlewares/authMiddlewares");

const Router = express.Router();

Router.get("/", reactionControllers.getAllReaction);

Router.use(authControllers.protect);

Router.use(reactionControllers.setReactionFields);

Router.post(
  "/reaction/:targetId-:type-:isLike",
  reactionControllers.addReaction,
);

Router.route("/reaction/:id/isLike/:isLike")
  .patch(reactionControllers.updateReaction)
  .delete(reactionControllers.deleteReaction);

module.exports = Router;
