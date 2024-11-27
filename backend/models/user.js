//add model logic
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // define schema for database
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  points: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWTKEY);
};

const User = mongoose.model("User", userSchema);

//add JOI validation logic

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "any.required": "Username is required",
      "string.empty": "Username is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password is required",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),
  });

  return schema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;
