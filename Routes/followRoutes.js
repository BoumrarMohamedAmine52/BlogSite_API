const express = require("express");
const followControllers = require("../Controllers/followControllers");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const Follow = require("../Models/followModel");

const Router = express.Router();

Router.get("/", followControllers.allFollows);

Router.use(authMiddlewares.protect);

Router.route("/follow/:id")
  .post(followControllers.setFollowFields, followControllers.addFollow)
  .delete(
    authMiddlewares.restrictToOwnerOnly(Follow),
    followControllers.deleteFollow,
  );

module.exports = Router;
