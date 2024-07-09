const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const actorRouter = require("./routes/actorRouter");
const movieRouter = require("./routes/movieRouter");
const producerRouter = require("./routes/producerRouter");
const userRouter = require("../Backend/routes/userRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

const port = process.env.PORT;

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);
app.use("/api/producer", producerRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "url not found",
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
