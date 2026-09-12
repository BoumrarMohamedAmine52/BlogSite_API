const express = require("express");
const morgan = require("morgan");

const app = express();

const userRouter = require("./Routes/userRoutes");
app.use(morgan("dev"));

app.route("/api/v1/blog/users", userRouter);

app.all("*", (req, res) => {
  res.json(400);
});
module.exports = app;
