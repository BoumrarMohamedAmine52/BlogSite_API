const express = require("express");
const commentControllers = require("../Controllers/commentControllers");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const Comment = require("../Models/commentModel");

const Router = express.Router();

Router.get("/", commentControllers.allComments);

Router.get(
  "/comment/:id",
  authMiddlewares.protect,
  commentControllers.getComment,
);

Router.use(authMiddlewares.protect);

Router.use(commentControllers.setCommentsFields);

Router.post("/comment/:type-:parentId", commentControllers.addComment);

Router.use(authMiddlewares.restrictToOwnerOnly(Comment));

Router.route("/comment/:id/parent/:type-:parentId")
  .patch(commentControllers.updateComment)
  .delete(commentControllers.deleteComment);

module.exports = Router;
