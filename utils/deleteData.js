const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// dotenv.config({ path: "./config.env" });

const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const Producer = require("../models/Producer");
const User = require("../models/User");

const Models = {
  Actor,
  Producer,
  Movie,
  User,
};

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

const deleteMany = async () => {
  try {
    await Models[process.argv[2]].deleteMany();
    console.log("files deleted successfully");
    process.exit();
  } catch (error) {
    console.log("Error deleting files", error);
  }
};

// console.log(process.env.DATABASE_URI);
deleteMany();
