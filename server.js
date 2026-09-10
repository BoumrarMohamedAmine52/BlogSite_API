const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});
//////
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("the DB is connected Successfully.."))
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The server is running on port : ${port}`);
});
