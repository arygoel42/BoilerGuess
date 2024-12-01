const express = require("express");
const router = express.Router();
const {User}= require("../models/user")
const authLog = require("../middlewear/authLog");

router.get("/play", authLog ,(req, res) => {
    //gmae logic goes here

    //payload to this route will include distance and streak? 
    //calcualte points based on streak and distance and send back -1 or 1 for win/loss

    //update round and streak on client side 
    const currentUser = User.findOne({_id : req.user._id})
    if (!currentUser) {
        return res.status(500).send({message : "user not found in database"})
    }

    const distance = req.body.distance; 
    const streak = req.body.streak; 
  

    //alex function to calculate points based on distance and streak 
    const points; //returned from alex function 


    

    res.status(200).send({
        message : "Correct!", 
        Points : points,
        streak : -1, //example
    })
    

});

router.post("/End",authLog , async(req, res) => {
    //update liftime points 

    const currentUser = User.findOne({_id: req.user._id})
    if(!currentUser) {
        return res.status(500).send("user not found in databse")
    }
    const points = req.body.points; 
    const streak = req.body.streaks; 

    currentUser.streak = streak; 

    if (currentUser.lifeTimeStreak < streak) {
        currentUser.lifeTimeSteak  == streak; 
    }

    currentUser.points = currentUser.points + points; 

    await currentUser.save(); 

    res.status(200).send("game completed succesfully"); 

    

    //take current streak and compare to liftime streak and update

    

})

module.exports = router;
