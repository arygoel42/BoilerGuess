const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");

// Your routes
const users = require("./routes/users");
const maps = require("./routes/maps");
const game = require("./routes/game");
const fileUpload = require("./routes/fileUpload");
const auth = require("./routes/auth");

// Passport config
require("./middlewear/passport");

// Constants
const DB_URL =
  process.env.DB_URL ||
  "mongodb+srv://aryangoel574:Hisupyo%407058@cluster0.xwshw.mongodb.net/test?retryWrites=true&w=majority";
const SECRET = process.env.SECRET || "abc kate";

// Connect to MongoDB
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch((err) => console.error("Could not connect to MongoDB Atlas...", err));

/********************
 *  Express App
 ********************/
const app = express();

// Enable CORS with credentials
app.use(
  cors({
    origin: "https://boiler-guess.vercel.app", // Your front-end URL
    credentials: true, // Allow cookies
  })
);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/********************
 *  Session Setup
 ********************/
const store = MongoStore.create({
  mongoUrl: DB_URL,
  touchAfter: 24 * 60 * 60, // 24 hours
  crypto: { secret: SECRET },
});

app.use(
  session({
    store,
    name: "session", // your friend named it 'session'
    secret: SECRET,
    resave: false,
    saveUninitialized: true, // same as your friend's code
    proxy: true,
    cookie: {
      // domain: "boiler-guess.vercel.app",   // Removed
      httpOnly: true, // Your friend sets this for security
      secure: process.env.NODE_ENV === "production", // use HTTPS in production
      sameSite: "None", // cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// If you're behind a proxy like Heroku/Vercel, trust it
app.set("trust proxy", 1);

/********************
 *  Passport
 ********************/
app.use(passport.initialize());
app.use(passport.session());

/********************
 *  Routes
 ********************/
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", users);
app.use("/api/maps", maps);
app.use("/api/auth", auth);
app.use("/api/game", game);
app.use("/api/fileUpload", fileUpload);

/********************
 *  Start Server
 ********************/
const port = process.env.PORT || 3011;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
