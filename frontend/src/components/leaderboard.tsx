import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trophy,
  Flame,
  GamepadIcon,
  Search,
  User,
  ArrowLeft,
} from "lucide-react";
import SearchBar from "../components/SeachBar";
import { useNavigate } from "react-router-dom";

const PurdueGeoguesserLeaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "points",
    direction: "ascending",
  });
  const [hoveredUser, setHoveredUser] = useState(null);

  useEffect(() => {
    async function getUsers() {
      const token = localStorage.getItem("token");

      try {
        let response = await fetch(
          "http://localhost:3011/api/game/getPlayers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
            credentials: "include",
          }
        );

        let players = await response.json();

        // Add derived field `completedAchievements`
        players = players.map((player) => ({
          ...player,
          completedAchievements: player.achievements
            ? player.achievements.filter((a) => a.progress === "Completed!")
                .length
            : 0,
        }));

        // Sort by points (ascending) by default
        players.sort((a, b) => b.points - a.points);

        setLeaderboardData(players);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  const sortData = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "descending"
        ? "ascending"
        : "descending";

    const sortedData = [...leaderboardData].sort((a, b) => {
      if (direction === "descending") {
        return b[key] - a[key];
      }
      return a[key] - b[key];
    });

    setLeaderboardData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <a
            href="/profile"
            className="text-white hover:text-gold-500 transition-colors duration-300 flex items-center"
          >
            <ArrowLeft className="mr-2" />
            <span>Back</span>
          </a>
          <div className="flex items-center">
            <img
              src="/api/placeholder/50/50"
              alt="Purdue GeoGuesser Logo"
              className="w-10 h-10 mr-3 rounded-full border-2 border-gold"
            />
            <span className="text-xl font-bold text-gold">
              Purdue GeoGuesser
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchBar />
          </div>

          <a
            href="/profile"
            className="bg-gold text-black hover:bg-gold-600 p-2 rounded-full transition-colors duration-300"
          >
            <User />
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8">
        <div className="bg-black text-white p-6 rounded-t-xl flex justify-between items-center">
          <div></div>
          <h1 className="text-3xl font-bold text-center flex-grow">
            Leaderboard
          </h1>
          <div className="w-10"></div>
        </div>

        <div className="p-4 bg-gray-100 flex justify-between items-center">
          <div className="flex space-x-4">
            {["points", "gamesPlayed", "completedAchievements", "streak"].map(
              (key) => (
                <button
                  key={key}
                  onClick={() => sortData(key)}
                  className="flex items-center hover:bg-gold-100 p-2 rounded-md transition-colors duration-300 group"
                >
                  {key === "points" && (
                    <Trophy className="mr-2 text-gold group-hover:scale-110 transition-transform" />
                  )}
                  {key === "gamesPlayed" && (
                    <GamepadIcon className="mr-2 text-gold group-hover:scale-110 transition-transform" />
                  )}
                  {key === "completedAchievements" && (
                    <Trophy className="mr-2 text-gold group-hover:scale-110 transition-transform" />
                  )}
                  {key === "streak" && (
                    <Flame className="mr-2 text-gold group-hover:scale-110 transition-transform" />
                  )}

                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                    return str.toUpperCase();
                  })}

                  {sortConfig.key === key &&
                    (sortConfig.direction === "descending" ? (
                      <ChevronDown className="ml-1 text-black" />
                    ) : (
                      <ChevronUp className="ml-1 text-black" />
                    ))}
                </button>
              )
            )}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[500px]">
          {leaderboardData?.map((user, index) => (
            <div
              key={user._id}
              className={`
                flex items-center p-4 border-b hover:bg-gold-50 transition-all duration-300
                ${
                  hoveredUser === user._id
                    ? "bg-gold-100 scale-105 shadow-md"
                    : ""
                }
              `}
              onMouseEnter={() => setHoveredUser(user._id)}
              onClick={() => navigate(`/player/${user.username}`)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              <div className="mr-4 font-bold text-xl w-10 text-right text-gold">
                {index + 1}
              </div>
              <img
                src="/api/placeholder/50/50"
                alt="/api/placeholder/50/50"
                className="w-12 h-12 rounded-full mr-4 border-2 border-black transform hover:scale-110 transition-transform"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-black">
                  {user.username}
                </h3>
              </div>
              <div className="flex space-x-4 text-gray-700">
                <div className="flex items-center">
                  <Trophy className="mr-2 text-gold" />
                  {user.points} pts
                </div>
                <div className="flex items-center">
                  <GamepadIcon className="mr-2 text-black" />
                  {user.gamesPlayed}
                </div>
                <div className="flex items-center">
                  <Trophy className="mr-2 text-gold" />
                  {user.completedAchievements}
                </div>
                <div className="flex items-center">
                  <Flame className="mr-2 text-black" />
                  {user.lifeTimeStreak}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurdueGeoguesserLeaderboard;
