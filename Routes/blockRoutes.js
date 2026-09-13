const express = require("express");
const blockControllers = require("../Controllers/blockControllers");

const Router = express.Router();

Router.get("/", blockControllers.allBlocks);

Router.route("/block/:id")
  .post(blockControllers.setBlockFields, blockControllers.addBlock)
  .delete(blockControllers.deleteBlock);
