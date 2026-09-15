const express = require("express");
const followControllers = require("../Controllers/followControllers");
const authControllers = require("../Middlewares/authMiddlewares");

const Router = express.Router();

Router.get("/", followControllers.allFollows);

Router.use(authControllers.protect);

Router.route("/follow/:id")
  .post(followControllers.setFollowFields, followControllers.addFollow)
  .delete(followControllers.deleteFollow);

module.exports = Router;
