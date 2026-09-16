const express = require("express");
const blockControllers = require("../Controllers/blockControllers");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const Block = require("../Models/blockModel");

const Router = express.Router();

Router.get("/", blockControllers.allBlocks);

Router.route("/block/:id")
  .post(
    authMiddlewares.protect,
    blockControllers.setBlockFields,
    blockControllers.addBlock,
  )
  .delete(
    authMiddlewares.protect,
    authMiddlewares.restrictToOwnerOnly(Block),
    blockControllers.deleteBlock,
  );

module.exports = Router;
