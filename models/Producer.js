const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: false,
  },
});

const Producer = mongoose.model("Producer", producerSchema);
module.exports = Producer;
