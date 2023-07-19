const fs = require("fs");
const express = require("express");

const app = express();

// .get is the http method here.
// a callback function is the secodn argument
// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this end point.");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res
    .status(200)
    .json({ status: "Sucess", results: tours.length, data: { tours } });
});

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
