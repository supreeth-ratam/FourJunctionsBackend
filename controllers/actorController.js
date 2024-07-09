const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

exports.getAllActors = async (req, res) => {
  try {
    const data = await Actor.find({});
    res.status(200).json({
      message: "success",
      results: data.length,
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Not found",
    });
  }
};

exports.addActor = async (req, res) => {
  const newActor = await Actor.create(req.body);
  if (!newActor) {
    res.status(400).json({
      status: "failed",
    });
  } else {
    res.status(201).json({
      status: "sucess",
      data: newActor,
    });
  }
};

exports.findMovieByActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actorDoc = await Actor.findById(id);
    const doc = await Movie.find({ actors: id });
    if (!doc) {
      return res.status(200).json({
        message: "No movies found",
        data: [],
      });
    }
    return res.status(200).json({
      message: "success",
      actor: actorDoc.name,
      data: doc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error finding movies",
    });
  }
};
