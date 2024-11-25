const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const authUser = await User.findOne({ email: req.body.email });

    if (!authUser) {
      return res.status(400).send("Account with email does not exist");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      authUser.password
    );
    if (!validPassword) {
      return res.status(400).send("invalid email or password");
    }

    //understand jwt and then implement it tmmr
    //add JOI validation logic for auth route

    res.status(200).send({ user: authUser });
  } catch (err) {
    return res.status(400).send("error with DB");
  }
});

module.exports = router;
