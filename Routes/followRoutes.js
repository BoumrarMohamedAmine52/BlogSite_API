const express = require("express");
const followControllers = require("../Controllers/followControllers");

const Router = express.Router();

Router.get("/", followControllers.allFollows);

Router.route("/follow/:id")
  .post(followControllers.setFollowFields, followControllers.addFollow)
  .delete(followControllers.deleteFollow);
