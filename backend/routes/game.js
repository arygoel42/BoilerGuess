const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const authLog = require("../middlewear/authLog");
const { calculatePoints, toNumber } = require("../game logic/temp");

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

    const scoreObject = calculatePoints(distance, streak, req.body.time);
    console.log(scoreObject.correct);
    console.log(scoreObject);

    if (scoreObject.correct == true) {
      return res.status(200).send({
        message: "Correct!",
        Points: scoreObject.points,
        streak: "+1",
        accuracy: scoreObject.accuracy,
      });
    }

    return res.status(200).send({
      message: "Incorrect!",
      Points: scoreObject.points,
      streak: "-1",
      accuracy: scoreObject.accuracy,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error with databse and server operation" });
  }
});

router.post("/End", authLog, async (req, res) => {
  //update liftime points

  const currentUser = await User.findOne({ _id: req.user._id });
  if (!currentUser) {
    return res.status(500).send("user not found in databse");
  }

  const points = req.body.points;
  const streak = req.body.streak;
  console.log(
    streak + "streak" + currentUser.lifeTimeStreak + "lifetimestreak"
  );
  const hardMode = req.body.hardMode;

  currentUser.streak = streak;

  if (currentUser.lifeTimeStreak < streak) {
    currentUser.lifeTimeStreak = streak;
  }

  currentUser.streak = streak;
  currentUser.Accuracy = (currentUser.Accuracy + req.body.Accuracy) / 2;

  currentUser.points = currentUser.points + points;
  currentUser.gamesPlayed = currentUser.gamesPlayed + 1;
  for (let i = 0; i < currentUser.achievements.length; i++) {
    if (currentUser.achievements[i].name == "Campus Explorer") {
      if (
        currentUser.achievements[i].progress != "10/10" &&
        currentUser.achievements[i].progress != "Completed!"
      ) {
        const numerator = toNumber(currentUser.achievements[i].progress);
        numerator++;
        currentUser.achievements[i].progress = `${numerator}/10`;
      }
    }
  }

  //   points: totalPoints,
  //   streak: updatedStreak,
  //   Accuracy: Accuracy,
  //   ardMode: hardMode,

  if (hardMode == true) {
    for (let i = 0; i < currentUser.achievements.length; i++) {
      if (currentUser.achievements[i].name == "HardMode warrior") {
        if (
          currentUser.achievements[i].progress != "5/5" &&
          currentUser.achievements[i].progress != "Completed!"
        ) {
          const numerator = toNumber(currentUser.achievements[i].progress);
          numerator++;
          currentUser.achievements[i].progress = `${numerator}/5`;
        }

        if (currentUser.achievements[i].progress == "5/5") {
          currentUser.achievements[i].progress = "Completed!";
        }
      }

      if (currentUser.achievements[i].name == "Persistant champion") {
        if (
          currentUser.achievements[i].progress != "15/15" &&
          currentUser.achievements[i].progress != "Completed!"
        ) {
          const numerator = toNumber(currentUser.achievements[i].progress);
          numerator++;
          currentUser.achievements[i].progress = `${numerator}/15`;
        }
        if (currentUser.achievements[i].progress == "15/15") {
          currentUser.achievements[i].progress = "Completed!";
        }
      }
    }
  }

  if (currentUser.gamesPlayed == 10) {
    for (let i = 0; i < currentUser.achievements.length; i++) {
      if (currentUser.achievements[i].name == "Campus Explorer") {
        currentUser.achievements[i].progress = "Completed!";
      }
    }
  }

  if (hardMode == false) {
    for (let i = 0; i < currentUser.achievements.length; i++) {
      if (currentUser.achievements[i].name == "LandMark Warrior") {
        if (
          currentUser.achievements[i].progress != "5/5" &&
          currentUser.achievements[i].progress != "Completed!"
        ) {
          const numerator = toNumber(currentUser.achievements[i].progress);
          numerator++;
          currentUser.achievements[i].progress = `${numerator}/5`;
        }
        if (currentUser.achievements[i].progress == "5/5") {
          currentUser.achievements[i].progress = "Completed!";
        }
      }
    }
  }

  if (currentUser.Accuracy > 90 && currentUser.gamesPlayed > 5) {
    for (let i = 0; i < currentUser.achievements.length; i++) {
      if (currentUser.achievements[i].name == "Accuracy King") {
        currentUser.achievements[i].progress = "Completed!";
      }
    }
  }

  if (time < 60 + points > 17000) {
  }

  if (points > 1000000) {
  }

  if (points > 100000) {
  }

  //acheivment logic

  //   {
  //         icon: "Trophy",
  //         name: "HardMode warrior",
  //         description: "Complete 5 games in hard mode",
  //         progress: "0/5",
  //       },
  //       {
  //         icon: "Medal",
  //         name: "Campus Explorer",
  //         description: "Complete 10 games!",
  //         progress: "0/10",
  //       },
  //       {
  //         icon: "Flame",
  //         name: "LandMark Warrior",
  //         description: "Complete 5 games on Normal Mode!",
  //         progress: "0/5",
  //       },
  //       {
  //         icon: "Star",
  //         name: "Persistant champion",
  //         description: "Complete 15 games in hard mode!",
  //         progress: "0/15",
  //       },
  //       {
  //         icon: "Star",
  //         name: "Accuracy King",
  //         description: "achieve a 90% overall accuracy! ",
  //         progress: "0/1",
  //       },
  //       {
  //         icon: "Star",
  //         name: "Speed Demon",
  //         description:
  //           "Complete a game in under 1 minute and win 17000 points or more",
  //         progress: "0/5",
  //       },
  //       {
  //         icon: "Star",
  //         name: "King!",
  //         description: "1,000,000 points or more!",
  //         progress: "0/5",
  //       },
  //       {
  //         icon: "Star",
  //         name: "Heir to the throne!",
  //         description: "100,000 points or more!",
  //         progress: "0/5",
  //       },

  await currentUser.save();

  res.status(200).send("game completed succesfully");

  //take current streak and compare to liftime streak and update
});

module.exports = router;
