const express = require("express");
const producerController = require("../controllers/producerController");

const router = express.Router();

router.route("/").get(producerController.getAllProducers);
router.route("/:id").get(producerController.findMovieByProducer);
module.exports = router;
