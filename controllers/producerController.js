const Movie = require("../models/Movie");
const Producer = require("../models/Producer");

exports.getAllProducers = async (req, res) => {
  try {
    const doc = await Producer.find();
    res.status(200).json({
      message: "success",
      data: doc,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get All producers",
    });
  }
};

exports.findMovieByProducer = async (req, res) => {
  try {
    const { id } = req.params;

    const producerDoc = await Producer.findById(id);
    if (!producerDoc) {
      return res.status(400).json({
        message: "Producer not Found",
      });
    }

    const movieDoc = await Movie.find({ producer: id });
    if (!movieDoc) {
      return res.status(200).json({
        message: "No movies found",
        data: [],
      });
    }

    res.status(200).json({
      message: "success",
      producer: producerDoc.name,
      data: movieDoc,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get Movies by producer",
    });
  }
};
