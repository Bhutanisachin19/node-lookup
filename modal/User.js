const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  id: {
    type: Number,
    unique: true,
  },

  country: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
