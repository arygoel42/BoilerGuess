import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Medal, Star, Trophy, Flame, MapPin, Target } from "lucide-react";
import authHook from "../hooks/authHook";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router for navigation
import SearchBar from "../components/SeachBar";

const ProfilePage = () => {
  const { loggedIn, user, logout } = authHook();
  const navigate = useNavigate(); // React Router navigation hook

  if (!loggedIn) {
    console.log(user);
    return (
      <div>
        <h1>Log in to view your profile</h1>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
  }

  const achievements = [
    {
      icon: Medal,
      name: "Campus Explorer",
      description: "Discover campus locations",
      progress: "3/10 locations",
    },
    {
      icon: Trophy,
      name: "Streak Master",
      description: "Maintain consecutive daily play",
      progress: "12 day streak",
    },
    {
      icon: Star,
      name: "Landmark Legend",
      description: "Identify unique Purdue landmarks",
      progress: "5/15 landmarks",
    },
  ];

  // Start game handler
  const startGame = () => {
    navigate("/game"); // Change "/game" to your game's start route
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

          {/* Center Section - SearchBar and View Leaderboard */}
          <div className="flex items-center space-x-4 w-1/2">
            <div className="flex-1">
              <SearchBar />
            </div>
            <Button
              className="bg-yellow-500 text-black hover:bg-yellow-600 transition-all px-4 py-2 rounded-md shadow-md"
              onClick={() => navigate("/leaderboard")}
            >
              View Leaderboard!
            </Button>
          </div>

          {/* Right Section - Placeholder (optional) */}
          <div>
            {/* Add other components here (e.g., buttons, icons, etc.) */}
          </div>
        </div>
      </header>

      {/* SearchBar Centered Below Header */}

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your GeoGuesser Journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <img
                  src="/api/placeholder/150/150"
                  alt="Profile"
                  className="rounded-full mx-auto mb-4 border-4 border-yellow-500"
                />
                <h2 className="text-2xl font-bold">{user.username}</h2>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Star className="mr-2 text-yellow-500" /> Lifetime Points
                  </span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Flame className="mr-2 text-red-500" /> Current Streak
                  </span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Target className="mr-2 text-green-500" /> Longest Streak
                  </span>
                  <span className="font-bold">0</span>
                </div>
              </div>

              {/* Start Game Button */}
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={startGame}
              >
                Start Game
              </Button>

              <Button
                className="w-full bg-black hover:bg-gray-800 mt-4"
                onClick={logout}
              >
                Log Out
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your Purdue GeoGuesser Milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className="border-2 border-gray-200 hover:border-yellow-500 transition-all"
                  >
                    <CardContent className="flex items-center space-x-4 p-4">
                      <achievement.icon className="h-12 w-12 text-yellow-500" />
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

export default ProfilePage;
