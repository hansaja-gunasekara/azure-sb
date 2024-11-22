const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const seatRoutes = require("./routes/seatRoutes");
const showtimeRoutes = require("./routes/showTimeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const user = require("./routes/user");
const auth = require("./routes/auth");
require("./config/passport");
const passport = require("./config/passport");
const facebookPassport = require("./config/passport-facebook");
require("dotenv").config();
const session = require("express-session");
const calenderRoutes = require("./routes/calenderRoutes");
const path = require("path");
const swaggerDocs = require("./swagger");
const mailRoutes = require("./routes/mailRoutes");

const mongo_url = process.env.MONGO_URL;

mongoose
  .connect(mongo_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  session({
    secret: "Awandya2000#",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(facebookPassport.initialize());
app.use(facebookPassport.session());

// Initialize Swagger docs
swaggerDocs(app);

app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api", calenderRoutes);
app.use("/api/mail", mailRoutes);

// Serve static files from the React frontend
app.use(express.static("./frontend/build")); // or "../frontend/dist" if "dist" is your build output

// Catch-all route to serve index.html for any non-API requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
