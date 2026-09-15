const express = require("express");
const blockControllers = require("../Controllers/blockControllers");
const authControllers = require("../Middlewares/authMiddlewares");

const Router = express.Router();

Router.get("/", blockControllers.allBlocks);

Router.route("/block/:id")
  .post(
    authControllers.protect,
    blockControllers.setBlockFields,
    blockControllers.addBlock,
  )
  .delete(authControllers.protect, blockControllers.deleteBlock);

module.exports = Router;
