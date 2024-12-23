const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const users = require("./routes/users");
const maps = require("./routes/maps");
const session = require("express-session");
require("./middlewear/Passport");
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
    origin: `${process.env.FRONTENDURL}`,
    credentials: true, // Allow cookies and other credentials
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Ensure this is set up

app.use(express.json());
// Serve static files (like images) from the 'uploads' directory

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "abc kate",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://aryangoel574:Hisupyo%407058@cluster0.xwshw.mongodb.net/test?retryWrites=true&w=majority",
    }),
  })
);

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
