const express = require("express");
const authControllers = require("../Controllers/authControllers");
const userControllers = require("../Controllers/userControllers");

const Router = express.Router();

Router.post("/signIn", authControllers.signUp);
Router.post("/logIn", authControllers.logIn);

Router.get(
  "/myProfile",
  authControllers.protect,
  userControllers.setUserId,
  userControllers.getMyProfile,
);

Router.route("/profile/:id")
  .get(authControllers.protect, userControllers.getProfile)
  .patch(
    authControllers.protect,
    userControllers.setUpdateUserOptions,
    userControllers.updateUser,
  );
Router.patch(
  "profile/deactive/:id",
  authControllers.protect,
  userControllers.setDeleteOptions,
  userControllers.deleteUser,
);

Router.patch(
  "/profile/updatePassword",
  authControllers.protect,
  userControllers.updatePassword,
);

Router.post("/forgotPassword");
module.exports = Router;
