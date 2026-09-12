const express = require("express");
const repostControllers = require("../Controllers/repostControllers");

const Router = express.Router();

Router.get("/", repostControllers.allREposts);

Router.post(
  "/repost/:originalPost",
  repostControllers.setRepostFields,
  repostControllers.addRepost,
);

Router.route("repost/:id")
  .get(repostControllers.getRepost)
  .patch(repostControllers.updateRepost)
  .delete(repostControllers.deleteRepost);
