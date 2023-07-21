const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//* MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json()); // express.json is middleware.

//make own middleware:
app.use((req, res, next) => {
  console.log("hello from the middleware 👋🏻");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter); //tourRouter is middleware
app.use("/api/v1/users", userRouter);

module.exports = app;
