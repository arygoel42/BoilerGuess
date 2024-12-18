//add model logic
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  googleId: {
    type: String,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lifeTimeStreak: {
    type: Number,
    default: 0,
  },
  achievements: [
    {
      icon: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      progress: { type: String, required: true },
    },
  ],
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  Accuracy: {
    type: Number,
    default: 100,
  },
});

// Initialize default achievements
userSchema.pre("save", function (next) {
  if (!this.achievements || this.achievements.length === 0) {
    this.achievements = [
      {
        icon: "Trophy",
        name: "HardMode warrior",
        description:
          "Complete 5 games in hard mode and win 3000 points or more",
        progress: "0/5",
      },
      {
        icon: "Medal",
        name: "Campus Explorer",
        description:
          "Complete 5 games in hard mode and win 3000 points or more",
        progress: "0/5",
      },
      {
        icon: "Flame",
        name: "LandMark Warrior",
        description:
          "Complete 5 games in hard mode and win 3000 points or more",
        progress: "0/5",
      },
      {
        icon: "Star",
        name: "Persistant champion",
        description:
          "Complete 5 games in hard mode and win 3000 points or more",
        progress: "0/5",
      },
    ];
  }
  next();
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
