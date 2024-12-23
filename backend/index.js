const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const users = require("./routes/users");
const maps = require("./routes/maps");
const session = require("express-session");
require("./middlewear/passport");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const game = require("./routes/game");
const fileUpload = require("./routes/fileUpload");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://aryangoel574:Hisupyo%407058@cluster0.xwshw.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch((err) => console.error("Could not connect to MongoDB Atlas...", err));

// Enable CORS with credentials
app.use(
  cors({
    origin: "https://boiler-guess.vercel.app",
    credentials: true, // Allow cookies and other credentials
  })
);

// Serve static files (images, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ================================
// Remove manual Access-Control-Allow-* overrides
// (rely on cors() above instead)
// ================================

// Session configuration
app.use(
  session({
    secret: "abc kate",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://aryangoel574:Hisupyo%407058@cluster0.xwshw.mongodb.net/test?retryWrites=true&w=majority",
    }),
    // "cookie" object controls how the cookie is set
    cookie: {
      // domain: "boiler-guess.vercel.app", // Omit this to avoid domain mismatch
      httpOnly: true, // Keep the cookie inaccessible to JS (more secure)
      secure: true, // Only send over HTTPS
      sameSite: "None", // Cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// If behind a proxy (e.g. Vercel, Heroku), trust the first proxy
app.set("trust proxy", 1);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Simple test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Your routes
app.use("/api/users", users);
app.use("/api/maps", maps);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/game", game);
app.use("/api/fileUpload", fileUpload);

// Start server
const port = process.env.PORT || 3011;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
