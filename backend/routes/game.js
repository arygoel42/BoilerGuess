const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const authLog = require("../middlewear/authLog");
const { calculatePoints } = require("../game logic/temp");

router.post("/search/:search", async (req, res) => {
  const Users = await User.find({
    username: { $regex: req.params.search, $options: "i" },
  }).limit(10);

  return res.send(Users);
});

router.post("/getPlayers", authLog, async (re, res) => {
  const users = await User.find();
  return res.send(users);
});

router.post("/play", authLog, async (req, res) => {
  try {
    //gmae logic goes here

    //payload to this route will include distance and streak?
    //calcualte points based on streak and distance and send back -1 or 1 for win/loss

    //update round and streak on client side
    const currentUser = await User.findOne({ _id: req.user._id });
    if (!currentUser) {
      return res.status(500).send({ message: "user not found in database" });
    }

    const distance = req.body.distance;
    const streak = req.body.streak;

    const scoreObject = calculatePoints(distance);
    console.log(scoreObject.correct);

    if (scoreObject.correct == true) {
      return res.status(200).send({
        message: "Correct!",
        Points: scoreObject.points,
        streak: "+1",
      });
    }

    return res.status(200).send({
      message: "Incorrect!",
      Points: scoreObject.points,
      streak: "-1",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error with databse and server operation" });
  }
});

router.post("/End", authLog, async (req, res) => {
  //update liftime points

  const currentUser = User.findOne({ _id: req.user._id });
  if (!currentUser) {
    return res.status(500).send("user not found in databse");
  }
  const points = req.body.point;
  const streak = req.body.streak;

  currentUser.streak = streak;

  if (currentUser.lifeTimeStreak < streak) {
    currentUser.lifeTimeSteak == streak;
  }

  currentUser.points = currentUser.points + points;
  currentUser.gamesPlayed = currentUser.gamesPlayed + 1;

  await currentUser.save();

  res.status(200).send("game completed succesfully");

  //take current streak and compare to liftime streak and update
});

module.exports = router;
