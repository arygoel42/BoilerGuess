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

const ProfileDetail = () => {
  const playerStats = {
    username: "BoilerExplorer",
    points: 15420,
    streak: 5,
    lifeTimeStreak: 15,
    avgAccuracy: 85.5,
    achievements: [
      {
        id: 1,
        name: "Campus Master",
        description: "Located 50 spots correctly",
        progress: "50/50 locations found",
        icon: Trophy,
      },
      {
        id: 2,
        name: "Speed Demon",
        description: "Complete a round in under 1 minute",
        progress: "Completed!",
        icon: Target,
      },
      {
        id: 3,
        name: "Accuracy King",
        description: "Achieved 95% accuracy",
        progress: "95% accuracy reached",
        icon: Target,
      },
      {
        id: 4,
        name: "Streak Master",
        description: "Maintained a 10 day streak",
        progress: "10/10 days completed",
        icon: Flame,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-yellow-500">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-yellow-500" />
            <div>
              <span className="text-2xl font-bold">Purdue GeoGuesser</span>
              <div className="text-yellow-500 text-sm">
                Boiler Up! Hammer Down!
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600 transition-all px-4 py-2 rounded-md shadow-md flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Leaderboard
          </Button>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Player Profile</CardTitle>
              <CardDescription>GeoGuesser Stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <img
                  src="/api/placeholder/150/150"
                  alt="Profile"
                  className="rounded-full mx-auto mb-4 border-4 border-yellow-500"
                />
                <h2 className="text-2xl font-bold">{playerStats.username}</h2>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Star className="mr-2 text-yellow-500" /> Lifetime Points
                  </span>
                  <span className="font-bold">{playerStats.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Flame className="mr-2 text-red-500" /> Current Streak
                  </span>
                  <span className="font-bold">{playerStats.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Target className="mr-2 text-green-500" /> Longest Streak
                  </span>
                  <span className="font-bold">
                    {playerStats.lifeTimeStreak} days
                  </span>
                </div>
              </div>

              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Challenge Player
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Purdue GeoGuesser Milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {playerStats.achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className="border-2 border-gray-200 hover:border-yellow-500 transition-all"
                  >
                    <CardContent className="flex items-center space-x-4 p-4">
                      <achievement.icon className="h-8 w-8 text-yellow-500" />
                      <div>
                        <h3 className="font-bold">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500">
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
    </div>
  );
};

export default ProfileDetail;
