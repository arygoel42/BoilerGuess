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

  achievementsCompleted: [
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
  ProfilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
});

// Initialize default achievements
userSchema.pre("save", function (next) {
  if (
    !this.achievements ||
    this.achievements.length === 4 ||
    this.achievements.length === 0
  ) {
    this.achievements = [
      {
        icon: "Trophy",
        name: "HardMode warrior",
        description: "Complete 5 games in hard mode",
        progress: "0/5",
      },
      {
        icon: "Medal",
        name: "Campus Explorer",
        description: "Complete 10 games!",
        progress: "0/10",
      },
      {
        icon: "Flame",
        name: "LandMark Warrior",
        description: "Complete 5 games on Normal Mode!",
        progress: "0/5",
      },
      {
        icon: "Star",
        name: "Persistant champion",
        description: "Complete 15 games in hard mode!",
        progress: "0/15",
      },
      {
        icon: "Star",
        name: "Accuracy King",
        description: "achieve a 90% overall accuracy across 5 games! ",
        progress: "0/1",
      },
      {
        icon: "Star",
        name: "Speed Demon",
        description:
          "Complete a game in under 1 minute and win 17000 points or more",
        progress: "0/1",
      },
      {
        icon: "Star",
        name: "King!",
        description: "1,000,000 points or more!",
        progress: "0/1",
      },
      {
        icon: "Star",
        name: "Heir to the throne!",
        description: "100,000 points or more!",
        progress: "0/1",
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
