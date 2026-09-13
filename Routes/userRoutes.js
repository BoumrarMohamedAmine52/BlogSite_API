const express = require("express");
const authControllers = require("../Controllers/authControllers");
const userControllers = require("../Controllers/userControllers");

const Router = express.Router();

Router.post("/signIn", authControllers.signUp);
Router.post("/logIn", authControllers.logIn);

Router.get("/myProfile", authControllers.protect, userControllers.getMyProfile);

Router.get("/profile/:id", authControllers.protect, userControllers.getProfile);
module.exports = Router;
