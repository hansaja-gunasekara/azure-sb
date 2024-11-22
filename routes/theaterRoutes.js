const express = require("express");
const {
  createTheaterEvent,
  getAllTheatersEvent,
  getTheaterByIdEvent,
  updateTheaterByIdEvent,
  deleteTheaterByIdEvent,
} = require("../controllers/theaterController");

const router = express.Router();
const cloudinary = require("cloudinary").v2;


// Configure Cloudinary
cloudinary.config({
  cloud_name: "dh8aemmkc",
  api_key: 175951413584161,
  api_secret: "H_NzmnwTakj9zjYOhY_672-KmRo",
});

router.post("/", createTheaterEvent);

router.get("/", getAllTheatersEvent);

router.get("/:id", getTheaterByIdEvent);

router.put("/:id", updateTheaterByIdEvent);

router.delete("/:id", deleteTheaterByIdEvent);

module.exports = router;
