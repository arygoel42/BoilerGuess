import React from "react";

const AccuracyGauge = ({ accuracy = 0 }) => {
  // Calculate the circumference of the circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash offset based on the accuracy percentage
  const dashOffset = circumference - (accuracy / 100) * circumference;

  // Determine color based on accuracy
  const getColor = () => {
    if (accuracy >= 80) return "text-green-500";
    if (accuracy >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          {/* Foreground circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className={`${getColor()} transition-all duration-1000 ease-out`}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Accuracy text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getColor()}`}>
            {Math.round(accuracy)}%
          </span>
          <span className="text-sm text-gray-600">Accuracy</span>
        </div>
      </div>

      {/* Status message */}
      <div className="mt-4 text-center">
        <span className={`font-medium ${getColor()}`}>
          {accuracy >= 80
            ? "Outstanding!"
            : accuracy >= 60
            ? "Keep it up!"
            : "Room to improve!"}
        </span>
      </div>
    </div>
  );
};

export default AccuracyGauge;
