const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  posterPath: {
    type: String,
    required: false,
  },
  yearOfRelease: {
    type: Number,
    required: true,
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producer",
    required: "false",
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: false,
    },
  ],
  rating: {
    type: Number,
    default: 10,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
