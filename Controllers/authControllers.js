const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

exports.signIn = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      user,
    },
  });
});

// exports.logIn = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new Error("please provide ur email and password to login."));
//   }
// });
