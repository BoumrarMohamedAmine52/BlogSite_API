const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/postRoutes");
const commentRouter = require("./Routes/commentRoutes");
const repostRouter = require("./Routes/repostRoutes");
const reactionRouter = require("./Routes/reactionRoutes");
const followRouter = require("./Routes/followRoutes");
const blockRouter = require("./Routes/blockRoutes");

app.use(morgan("dev"));

app.use("/api/v1/blog/users", userRouter);
app.use("/api/v1/blog/posts", postRouter);
app.use("/api/v1/blog/comments", commentRouter);
app.use("/api/v1/blog/reposts", repostRouter);
app.use("/api/v1/blog/reactions", reactionRouter);
app.use("/api/v1/blog/follows", followRouter);
app.use("/api/v1/blog/blocks", blockRouter);

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
