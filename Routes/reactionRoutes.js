const express = require("express");
const reactionControllers = require("../Controllers/reactionControllers");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const Reaction = require("../Models/reactionModel");

const Router = express.Router();

Router.get("/", reactionControllers.getAllReaction);

Router.use(authMiddlewares.protect);

Router.use(reactionControllers.setReactionFields);

Router.post(
  "/reaction/:targetId-:type-:isLike",
  reactionControllers.addReaction,
);

Router.use(authMiddlewares.restrictToOwnerOnly(Reaction));

Router.route("/reaction/:id/isLike/:isLike")
  .patch(reactionControllers.updateReaction)
  .delete(reactionControllers.deleteReaction);

module.exports = Router;
