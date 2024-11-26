const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const resource = req.body.resource;

  if (resource) {
    res.status(200).send(resource);
  } else if (!resource) {
    res.status(400).send("bad request");
  }
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

module.exports = router;
