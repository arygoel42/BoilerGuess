import React from "react";
import {
  Trophy,
  Clock,
  Flame,
  RefreshCw,
  Share2,
  ChartLine,
} from "lucide-react";
import useStore from "../Store/useStore";
import { useNavigate } from "react-router-dom";

const FinishPage = () => {
  const {
    totalPoints,
    FinalStreak,
    setFinalStreak,
    setTotalTime,
    setAccuracy,
    setTotalPoints,
  } = useStore();
  const navigate = useNavigate();
  // Mock data - in real implementation, these would be passed as props
  const gameStats = {
    totalPoints: 1250,
    pointsEarned: 420,
    streak: 5,
    totalTime: "12:45",
    averageAccuracy: 85,
    bestGuess: "Campus Building",
  };

  const handleAgain = () => {
    setTotalPoints(0);
    setFinalStreak(0);
    setAccuracy(0);
    setTotalTime(0);

    navigate("/game");
  };

  const handleBack = () => {
    setTotalPoints(0);
    setFinalStreak(0);
    setAccuracy(0);
    setTotalTime(0);

    navigate("/profile");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[600px] rounded-2xl shadow-2xl border-4 border-primary overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground text-center py-6">
          <h1 className="text-3xl font-bold">Game Completed</h1>
          <p className="text-sm opacity-80">Great job exploring Purdue!</p>
        </div>

        {/* Stats Container */}
        <div className="p-8 space-y-6">
          {/* Points and Streak */}
          <div className="flex justify-between">
            <div className="bg-accent/10 p-4 rounded-xl flex items-center space-x-4 w-[45%]">
              <Trophy className="text-accent w-12 h-12" />
              <div>
                <h3 className="text-xl font-semibold">Points</h3>
                <p className="text-2xl font-bold text-accent">{totalPoints}</p>
              </div>
            </div>

            <div className="bg-accent/10 p-4 rounded-xl flex items-center space-x-4 w-[45%]">
              <Flame className="text-destructive w-12 h-12" />
              <div>
                <h3 className="text-xl font-semibold">Streak</h3>
                <p className="text-2xl font-bold text-destructive">
                  {FinalStreak}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-xl text-center">
              <Clock className="mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Total Time</h4>
              <p className="text-lg">{gameStats.totalTime}</p>
            </div>
            <div className="bg-muted p-4 rounded-xl text-center">
              <ChartLine className="mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Accuracy</h4>
              <p className="text-lg">{gameStats.averageAccuracy}%</p>
            </div>
            <div className="bg-muted p-4 rounded-xl text-center">
              <Trophy className="mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Best Guess</h4>
              <p className="text-lg">{gameStats.bestGuess}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleAgain()}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-primary/90 transition"
            >
              <RefreshCw />
              <span>Play Again</span>
            </button>
            <button
              onClick={() => handleBack()}
              className="bg-accent text-accent-foreground px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-accent/90 transition"
            >
              <Share2 />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
