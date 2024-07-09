const movieController = require("../controllers/movieController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .post(movieController.addMovie)
  .get(movieController.getAllMovies);

router
  .route("/:id")
  .get(movieController.getMovieByID)
  .put(movieController.editMovie);

module.exports = router;
