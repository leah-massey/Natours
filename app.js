const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//* MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // only run this middleware if in development mode.
}

app.use(express.json()); // express.json is middleware.
app.use(express.static(`${__dirname}/public`));

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
