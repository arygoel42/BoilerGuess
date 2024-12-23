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
//add mongoose compass connection logic
//or add other database connection logic

mongoose
  .connect(
    "mongodb+srv://aryangoel574:Hisupyo%407058@cluster0.xwshw.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch((err) => console.error("Could not connect to MongoDB Atlas..."));

app.use(
  cors({
    origin: "https://boiler-guess.vercel.app",
    credentials: true, // Allow cookies and other credentials
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Ensure this is set up

app.use(express.json());
// Serve static files (like images) from the 'uploads' directory

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTENDURL);

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(
  session({
    path: "https://boiler-guess.vercel.app",

    secret: "abc kate",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://aryangoel574:Hisupyo%407058@cluster0.xwshw.mongodb.net/test?retryWrites=true&w=majority",
    }),
    secure: true,
    cookie: {
      domain: "boiler-guess.vercel.app", // Correct domain (no protocol)
      httpOnly: false, // Securely accessible only by the server
      secure: true, // Ensures it's sent over HTTPS
      same_site: "None", // Cross-site cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.set("trust proxy", true);

app.use(passport.initialize());
app.use(passport.session());

//add mongoose compass connection logic

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", users);
app.use("/api/maps", maps);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/game", game);
app.use("/api/fileUpload", fileUpload);

const port = process.env.PORT || 3011;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
