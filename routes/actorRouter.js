const actorController = require("../controllers/actorController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .post(actorController.addActor)
  .get(actorController.getAllActors);
router.route("/:id").get(actorController.findMovieByActor);
module.exports = router;
