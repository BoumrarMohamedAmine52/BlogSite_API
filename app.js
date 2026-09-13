const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

const userRouter = require("./Routes/userRoutes");

app.use(morgan("dev"));

app.use("/api/v1/blog/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Could't find URL : ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
  });
});
module.exports = app;
