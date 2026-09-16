const express = require("express");
const authMiddlewares = require("../Middlewares/authMiddlewares");
const userControllers = require("../Controllers/userControllers");
const User = require("../Models/userModel");

const Router = express.Router();

Router.post("/signIn", authMiddlewares.signUp);
Router.post("/logIn", authMiddlewares.logIn);

Router.post("/forgotPassword", authMiddlewares.forgotPassword);

Router.patch("/resetPassword/:resetToken", authMiddlewares.resetPassword);

Router.use(authMiddlewares.protect);

Router.get(
  "/myProfile",
  userControllers.setUserId,
  userControllers.getMyProfile,
);

Router.route("/profile/:id")
  .get(userControllers.getProfile)
  .patch(
    userControllers.setUpdateUserOptions,
    authMiddlewares.restrictToOwnerOnly(User),
    userControllers.updateUser,
  );

Router.patch(
  "profile/deactive/:id",
  userControllers.setDeleteOptions,
  authMiddlewares.restrictToOwnerOnly(User),
  userControllers.deleteUser,
);

Router.patch("/profile/updatePassword", userControllers.updatePassword);

module.exports = Router;
