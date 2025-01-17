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
    totalTime,
    totalPoints,
    FinalStreak,
    setFinalStreak,
    setTotalTime,
    setAccuracy,
    setTotalPoints,
    Accuracy,
    hardMode,
    setStreak,
    streak,
  } = useStore();
  const navigate = useNavigate();

  const gameStats = {
    bestGuess: "Campus Building",
  };

  const handleAgain = () => {
    setTotalPoints(0);
    setFinalStreak(0);

    setAccuracy(0);
    setTotalTime(0);
    setStreak(0);
    navigate(hardMode ? "/game/Hard" : "/game/Normal");
  };

  const handleBack = () => {
    setTotalPoints(0);
    setFinalStreak(0);
    setAccuracy(0);
    setTotalTime(0);
    setStreak(0);
    navigate("/profile");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Map Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("/api/placeholder/1920/1080")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      />

      <div className="relative bg-white/95 w-[600px] rounded-2xl shadow-xl border-2 border-black overflow-hidden">
        {/* Header */}
        <div className="bg-black text-[#CEB888] text-center py-6">
          <h1 className="text-3xl font-bold">Boiler Up!</h1>
          <p className="text-sm text-[#CEB888]/80">
            Great job exploring Purdue!
          </p>
        </div>

        {/* Stats Container */}
        <div className="p-8 space-y-6 bg-gradient-to-b from-white/95 to-white">
          {/* Points and Streak */}
          <div className="flex justify-between">
            <div className="bg-black p-4 rounded-xl flex items-center space-x-4 w-[45%] border border-[#CEB888]">
              <Trophy className="text-[#CEB888] w-12 h-12" />
              <div>
                <h3 className="text-lg font-semibold text-[#CEB888]">Points</h3>
                <p className="text-2xl font-bold text-white">{totalPoints}</p>
              </div>
            </div>

            <div className="bg-black p-4 rounded-xl flex items-center space-x-4 w-[45%] border border-[#CEB888]">
              <Flame className="text-[#CEB888] w-12 h-12" />
              <div>
                <h3 className="text-lg font-semibold text-[#CEB888]">Streak</h3>
                <p className="text-2xl font-bold text-white">
                  {FinalStreak === 1 ? "0" : FinalStreak}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#CEB888]/10 p-4 rounded-xl text-center border border-black">
              <Clock className="mx-auto mb-2 text-black" />
              <h4 className="font-semibold text-black">Total Time</h4>
              <p className="text-lg text-black">
                {Math.round(totalTime) + " s"}
              </p>
            </div>
            <div className="bg-[#CEB888]/10 p-4 rounded-xl text-center border border-black">
              <ChartLine className="mx-auto mb-2 text-black" />
              <h4 className="font-semibold text-black">Accuracy</h4>
              <p className="text-lg text-black">{Math.round(Accuracy)}%</p>
            </div>
            <div className="bg-[#CEB888]/10 p-4 rounded-xl text-center border border-black">
              <Trophy className="mx-auto mb-2 text-black" />
              <h4 className="font-semibold text-black">Best Guess</h4>
              <p className="text-lg text-black">{gameStats.bestGuess}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleAgain}
              className="bg-black text-[#CEB888] px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-black/80 transition border border-[#CEB888]"
            >
              <RefreshCw className="text-[#CEB888]" />
              <span>Play Again</span>
            </button>
            <button
              onClick={handleBack}
              className="bg-[#CEB888] text-black px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-[#CEB888]/80 transition border border-black"
            >
              <Share2 className="text-black" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
