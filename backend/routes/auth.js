const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passport = require("passport");

router.post("/login", async (req, res) => {
  try {
    const { error } = authBody(req.body);
    if (error) {
      const errMessage = error.details
        .map((detail) => detail.message)
        .join(",");
      return res.status(400).send({ success: false, message: errMessage });
    }
    const authUser = await User.findOne({ email: req.body.email });

    if (!authUser) {
      return res
        .status(400)
        .send({ success: false, message: "Account with email does not exist" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      authUser.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .send({ success: false, message: "invalid email or password" });
    }

    //understand jwt and then implement it tmmr
    //add JOI validation logic for auth route
    console.log(authUser);
    const token = authUser.generateAuthToken();

    res.status(200).send({ token: token });
    console.log("token", token);
  } catch (err) {
    return res.status(400).send({ success: false, message: "error with DB" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTENDURL}/profile`);
  },
  (err, req, res, next) => {
    console.error("OAuth2 Error:", err); // Log the full error
    res
      .status(500)
      .send({ message: "OAuth authentication failed", error: err });
  }
);

function authBody(user) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),

    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password is required",
    }),
  });

  return schema.validate(user);
}

module.exports = router;
