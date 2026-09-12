const express = require("express");
const commentControllers = require("../Controllers/commentControllers");

const Router = express.Router();

Router.get("/", commentControllers.allComments);

Router.get("/comment/:id", commentControllers.getComment);

Router.use(commentControllers.setCommentsFields);

Router.post("/comment/:type-:parentId", commentControllers.addComment);

Router.route("/comment/:id/parent/:type-:parentId")
  .patch(commentControllers.updateComment)
  .delete(commentControllers.deleteComment);
