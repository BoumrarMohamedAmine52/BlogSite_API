const express = require("express");
const authControllers = require("../Middlewares/authMiddlewares");
const userControllers = require("../Controllers/userControllers");

const Router = express.Router();

Router.post("/signIn", authControllers.signUp);
Router.post("/logIn", authControllers.logIn);

Router.post("/forgotPassword", userControllers.forgotPassword);

Router.patch("/resetPassword/:resetToken", userControllers.resetPassword);

Router.use(authControllers.protect);

Router.get(
  "/myProfile",
  userControllers.setUserId,
  userControllers.getMyProfile,
);

Router.route("/profile/:id")
  .get(userControllers.getProfile)
  .patch(userControllers.setUpdateUserOptions, userControllers.updateUser);
Router.patch(
  "profile/deactive/:id",
  userControllers.setDeleteOptions,
  userControllers.deleteUser,
);

Router.patch("/profile/updatePassword", userControllers.updatePassword);

module.exports = Router;
