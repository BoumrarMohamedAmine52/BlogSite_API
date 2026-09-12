const express = require("express");
const authControllers = require("../Controllers/authControllers");

const Router = express.Router();

Router.post("/signIn", authControllers.signIn);
Router.post("/logIn", authControllers.logIn);
