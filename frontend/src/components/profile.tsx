import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star, Target, Flame, MapPin, Trophy } from "lucide-react";
import authHook from "../hooks/authHook";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SeachBar";
import AccuracyGauge from "./AccuracyGauge";
import axios from "axios";

const ProfilePage = () => {
  const { loggedIn, user, logout } = authHook();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [file, setFile] = useState(null); // File state
  const fileInputRef = useRef(null); // Ref for the file input

  if (!user) {
    navigate("/login");
    return;
  }

  const startGame = () => {
    setIsModalOpen(true); // Open the modal when Start Game is clicked
  };

  const handleStartGame = (mode) => {
    setIsModalOpen(false); // Close the modal
    navigate(`/game/${mode}`); // Navigate to the /game route with the selected mode
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("ProfilePicture", file);
    formData.append("username", user.username); // Replace with the actual username

    try {
      const response = await axios.post(
        "http://localhost:3011/api/fileUpload/upload-pfp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!");
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-yellow-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-yellow-500" />
            <div>
              <span className="text-2xl font-bold">BoilerGuess</span>
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
              View Leaderboard!
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
              <CardDescription>Your GeoGuesser Journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <img
                  src={`http://localhost:3011${user.ProfilePicture}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-500"
                />

                <h2 className="text-2xl font-bold">{user.username}</h2>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Star className="mr-2 text-yellow-500" /> Lifetime Points
                  </span>
                  <span className="font-bold">{user.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Flame className="mr-2 text-red-500" /> Current Streak
                  </span>
                  <span className="font-bold">{user.streak}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Target className="mr-2 text-green-500" /> Longest Streak
                  </span>
                  <span className="font-bold">{user.lifeTimeStreak}</span>
                </div>
                <div className="flex justify-center py-2">
                  {user.gamesPlayed > 0 && (
                    <AccuracyGauge accuracy={user.Accuracy} />
                  )}
                </div>
              </div>

              {/* File Upload Section */}
              <div className="text-center mt-4">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {/* Choose File Button */}
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
                  onClick={() => fileInputRef.current.click()}
                >
                  Choose Profile Picture
                </Button>
                {file && (
                  <p className="text-sm mt-2">Selected file: {file.name}</p>
                )}
                {/* Upload Button */}
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 mt-4"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>

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

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your Purdue GeoGuesser Milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {user.achievements
                  .sort((a, b) => (a.progress === "Completed!" ? -1 : 1))
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Select Game Mode</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Normal Mode</h3>
                <p>
                  Play the classic GeoGuesser game with standard rules. Designed
                  for those who are new to campus!
                </p>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 mt-2"
                  onClick={() => handleStartGame("Normal")}
                >
                  Start Normal Mode
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Exploration Mode</h3>
                <p>
                  Challenge yourself to find as many locations as you can in a
                  short amount of time. Designed for those who are experienced!
                </p>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 mt-2"
                  onClick={() => handleStartGame("Hard")}
                >
                  Start Hard Mode
                </Button>
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-gray-500 hover:bg-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
