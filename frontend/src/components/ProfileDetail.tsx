import React from "react";
import { Trophy, Star, Target, Flame, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AccuracyGauge from "./AccuracyGauge";
import SearchBar from "./SeachBar";
import { useNavigate } from "react-router-dom";

//ahceivments just like lprifle page

const ProfileDetail = () => {
  const [player, setPlayer] = useState();

  const { username } = useParams();
  const navigate = useNavigate();
  //   const playerStats = {
  //     username: "BoilerExplorer",
  //     points: 15420,
  //     streak: 5,
  //     lifeTimeStreak: 15,
  //     avgAccuracy: 85.5,
  //     achievements: [
  //       {
  //         id: 1,
  //         name: "Campus Master",
  //         description: "Located 50 spots correctly",
  //         progress: "50/50 locations found",
  //         icon: Trophy,
  //       },
  //       {
  //         id: 2,
  //         name: "Speed Demon",
  //         description: "Complete a round in under 1 minute",
  //         progress: "Completed!",
  //         icon: Target,
  //       },
  //       {
  //         id: 3,
  //         name: "Accuracy King",
  //         description: "Achieved 95% accuracy",
  //         progress: "95% accuracy reached",
  //         icon: Target,
  //       },
  //       {
  //         id: 4,
  //         name: "Streak Master",
  //         description: "Maintained a 10 day streak",
  //         progress: "10/10 days completed",
  //         icon: Flame,
  //       },
  //     ],
  //   };

  useEffect(() => {
    async function getUser() {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        let response = await fetch(
          "http://localhost:3011/api/users/playerDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              token: token,
              username: username,
            }),
          }
        );

        let playerObject = await response.json();
        setPlayer(playerObject);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  if (!player) return <div>loading</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-yellow-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-yellow-500" />
            <div>
              <span className="text-2xl font-bold">Purdue GeoGuesser</span>
              <div className="text-yellow-500 text-sm">
                Boiler Up! Hammer Down!
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 w-1/2">
            <div className="flex-1">
              <SearchBar />
            </div>
            <Button
              className="bg-yellow-500 text-black hover:bg-yellow-600 transition-all px-4 py-2 rounded-md shadow-md"
              onClick={() => navigate("/leaderboard")}
            >
              Return to Leaderboard
            </Button>
          </div>
        </div>
      </header>
      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              {/* <CardDescription>Your GeoGuesser Journey</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <img
                  src="/api/placeholder/150/150"
                  alt="Profile"
                  className="rounded-full mx-auto mb-4 border-4 border-yellow-500"
                />
                <h2 className="text-2xl font-bold">{player.username}</h2>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Star className="mr-2 text-yellow-500" /> Lifetime Points
                  </span>
                  <span className="font-bold">{player.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Flame className="mr-2 text-red-500" /> Current Streak
                  </span>
                  <span className="font-bold">{player.streak}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Target className="mr-2 text-green-500" /> Longest Streak
                  </span>
                  <span className="font-bold">{player.lifeTimeStreak}</span>
                </div>
                <div className="flex justify-center py-2">
                  <AccuracyGauge accuracy={player.Accuracy} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                {player.username} Purdue GeoGuesser Milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {player.achievements
                  .sort((a, b) => (a.progress === "Completed!" ? -1 : 1)) // Place completed achievements at the top
                  .map((achievement, index) => (
                    <Card
                      key={index}
                      className={`border-2 ${
                        achievement.progress === "Completed!"
                          ? "bg-green-100 border-green-500"
                          : "border-gray-200 hover:border-yellow-500"
                      } transition-all`}
                    >
                      <CardContent className="flex items-center space-x-4 p-4">
                        <Trophy
                          name={"Trophy"}
                          className={`h-8 w-8 ${
                            achievement.progress === "Completed!"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        />
                        <div>
                          <h3
                            className={`font-bold ${
                              achievement.progress === "Completed!"
                                ? "text-green-600"
                                : ""
                            }`}
                          >
                            {achievement.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                          <p
                            className={`text-xs ${
                              achievement.progress === "Completed!"
                                ? "text-green-500 font-semibold"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.progress}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      {/* Modal Overlay */}
    </div>
  );
};

export default ProfileDetail;
