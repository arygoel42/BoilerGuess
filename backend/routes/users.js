const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcryptjs");
const authLog = require("../middlewear/authLog");

router.post("/", (req, res) => {
  const resource = req.body.resource;

  if (resource) {
    res.status(200).send(resource);
  } else if (!resource) {
    res.status(400).send("bad request");
  }
});

router.post("/playerDetails", authLog, async (req, res) => {
  const username = req.body.username;

  try {
    const player = await User.findOne({ username: username });
    return res.status(200).send(player);
  } catch (error) {
    return res.status(500).send({ message: "error with databse retrieval" });
  }

  const player = await User.findOne({ username: username });
});

router.post("/signUp", async (req, res) => {
  // Validate the incoming request
  const { error } = validateUser(req.body);
  if (error) {
    const validationErrors = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(400).send({ success: false, message: validationErrors });
  }

  // Check if the user already exists
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(201).send("User already exists");
  }

  // Create a new user
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();

    // Hash the password
    const hashedPassword = await bcrypt.hash(savedUser.password, 10);
    savedUser.password = hashedPassword;
    await savedUser.save();
    const token = savedUser.generateAuthToken(); // gnerate and save the token

    return res.status(200).send({ token: token });
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, message: "Error saving user: " + err.message });
  }
});

router.post("/profile", authLog, async (req, res) => {
  try {
    const userID = req.user._id;

    const authUser = await User.findOne({ _id: userID });

    console.log(authUser + "authUser");

    if (!authUser) {
      return res.status(404).send({ message: "user not found" });
    }

    res.status(200).send(authUser);
  } catch (error) {
    res.status(500).send({ message: "database error" });
    console.log("database error", error);
  }
});

// added route 
router.put("/setProfile", authLog, async (req, res) => {
  const { username, profileUpdates } = req.body;

  // Ensure the username and profile updates are provided
  if (!username || !profileUpdates) {
    return res
      .status(400)
      .send({ success: false, message: "Username and updates are required" });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    // Update the fields in the user's profile
    Object.keys(profileUpdates).forEach((key) => {
      user[key] = profileUpdates[key];
    });

    // Save the updated user
    await user.save();

    res.status(200).send({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .send({ success: false, message: "Error updating profile: " + error.message });
  }
});

router.post("/logout", authLog, async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.status(500).send("Error signing out");
    }

    // Destroy the session (if using session management)
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error destroying session");
      }

      // Clear the session cookie (replace 'cookieName' with your session cookie name)
      res.clearCookie("connect.sid"); // or the name of the cookie you're using

      // Send a success response after session is cleared
      res.status(200).send("Successfully logged out");
    });
  });
});

module.exports = router;
