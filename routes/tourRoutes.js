const express = require("express");
const tourController = require("../controllers/tourController"); // tourController will be the equivalent to exports in the tourController file.

const router = express.Router();

router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour); //middleware checkBody is only running on createTour

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
