const axios = require("axios");
const dotenv = require("dotenv");

const Movie = require("../models/Movie");
const Producer = require("../models/Producer");
const Actor = require("../models/Actor");

const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API}`;

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(url);
    const movies = response.data.results;
    return movies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movie = await Movie.find()
      .populate("producer")
      .populate("actors")
      .sort({ _id: -1 });
    res.status(200).json({
      message: "Success",
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed fetching the movies",
    });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const {
      name,
      yearOfRelease,
      producerName,
      actorNames,
      posterPath,
      rating,
    } = req.body;
    const existingMovie = await Movie.findOne({ name, yearOfRelease });
    if (existingMovie) {
      return res.status(200).json({
        message: "Movie already exists",
      });
    }
    let producer = await Producer.findOne({ name: producerName });
    if (!producer) {
      producer = new Producer({ name: producerName });
      await producer.save();
    }
    const actorIds = [];
    for (const actorName of actorNames) {
      let actor = await Actor.findOne({ name: actorName });
      if (!actor) {
        actor = new Actor({ name: actorName });
        await actor.save();
      }
      actorIds.push(actor._id);
    }
    const movie = new Movie({
      name,
      yearOfRelease,
      posterPath,
      rating,
      producer: producer._id,
      actors: actorIds,
    });
    await movie.save();
    res.status(201).json({
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed adding Movie to the database",
    });
  }
};

exports.editMovie = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    const { name, yearOfRelease, producerName, actorNames } = req.body;
    let newProducer = await Producer.findOne({ name: producerName });
    if (!newProducer) {
      newProducer = new Producer({ name: producerName });
      await newProducer.save();
    }
    const actorIds = [];
    for (const actorName of actorNames) {
      let actor = await Actor.findOne({ name: actorName });
      if (!actor) {
        actor = new Actor({ name: actorName });
        await actor.save();
      }
      actorIds.push(actor._id);
    }

    movie.name = name;
    movie.yearOfRelease = yearOfRelease;
    movie.producer = newProducer._id;
    movie.actors = actorIds;
    await movie.save();

    res.status(202).json({
      message: "Updated Successfully",
      data: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to update the movie",
    });
  }
};

exports.getMovieByID = async (req, res) => {
  try {
    const { id } = req.params;
    const moviedoc = await Movie.findById(id)
      .populate("producer")
      .populate("actors");
    if (!moviedoc) {
      res.status(400).json({
        message: "Id not valid",
      });
    }
    res.status(200).json({
      message: "success",
      data: moviedoc,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed fetching movie",
    });
  }
};
