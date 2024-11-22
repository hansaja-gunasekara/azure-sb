const express = require("express");
const passport = require("passport");
const router = express.Router();

// Route to start Facebook authentication
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Callback route for Facebook to redirect to after authentication
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Generate token or session for the user and send the response as needed
    res.redirect("/dashboard"); // Redirect to the desired page after login
  }
);

module.exports = router;
