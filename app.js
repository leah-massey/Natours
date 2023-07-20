const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());
// express.json is middleware

// .get is the http method here.
// a callback function is the second argument
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

//. get all tours
app.get("/api/v1/tours", (req, res) => {
  res
    .status(200)
    .json({ status: "Success", results: tours.length, data: { tours } });
});

//. get one tour
app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" }); // return is here as we want the program to terminate.
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({ status: "Success", data: { tour } });
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // Object.assign merges the two objects.

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        // 201 means 'created'
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
