const axios = require("axios");
const dotenv = require("dotenv");

function removeLeadingSpaces(str) {
  return str.replace(/^\s+/, "");
}

dotenv.config({ path: "./.env" });

async function getMovieInfo(apiKey, searchTerm, type = "movie") {
  const baseUrl = "http://www.omdbapi.com/";

  try {
    const response = await axios.get(baseUrl, {
      params: {
        apikey: apiKey,
        t: searchTerm,
        type: type,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching movie information:", error.message);
    return null;
  }
}

const top10IMDBMovies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "The Godfather Part II",
  "12 Angry Men",
  "Schindler's List",
  "The Lord of the Rings: The Return of the King",
  "Pulp Fiction",
  "The Good, the Bad and the Ugly",
  "The Lord of the Rings: The Fellowship of the Ring",
];

const postMovies = (movieTitle) => {
  getMovieInfo(process.env.OMDB_API, movieTitle).then((movie) => {
    const payload = {
      name: movie.Title,
      yearOfRelease: movie.Year,
      producerName: movie.Production,
      actorNames: movie.Actors.split(",").map((item) =>
        removeLeadingSpaces(item)
      ),
      posterPath: movie.Poster,
      rating: parseFloat(movie.imdbRating),
    };

    axios
      .post("http://localhost:5000/api/movie", payload)
      .then((res) => console.log("movie added"))
      .catch((err) => console.log(err));
  });
};

top10IMDBMovies.map((movieTitle) => postMovies(movieTitle));
