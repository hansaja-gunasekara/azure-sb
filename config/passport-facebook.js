const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../models/user");
require("dotenv").config();

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL:
        "https://azure-reservation-app.azurewebsites.net/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"], // Make sure "emails" is listed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user already exists
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          // Create a new user if one doesn't exist
          user = await User.create({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value, // Facebook might not return email
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          await user.save();
        } else {
          user.accessToken = accessToken;
          user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;