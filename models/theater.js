// models/Theater.js
const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Theater = mongoose.model("Theater", theaterSchema);

exports.Theater = Theater;
