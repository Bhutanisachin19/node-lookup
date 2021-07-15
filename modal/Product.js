const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  userid: {
    type: Number,
  },

  color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
