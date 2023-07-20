const fs = require("fs");
const express = require("express");

const app = express();
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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" }); // return is here as we want the program to terminate.
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({ status: "Success", data: { tour } });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (req.params.length * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" }); // return is here as we want the program to terminate.
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<this is updated tour>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.length * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid id" }); // return is here as we want the program to terminate.
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
