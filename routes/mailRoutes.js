const express = require("express");
const {
  sendMailEvent,
} = require("../controllers/mailController");

const router = express.Router();

router.post("/", sendMailEvent);

module.exports = router;