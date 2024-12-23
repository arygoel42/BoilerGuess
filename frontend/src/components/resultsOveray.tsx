import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Medal, Map, Target, Flame, Trophy } from "lucide-react";
import useStore from "../Store/useStore";

interface ResultsOverlayProps {
  distance: number;
  setRound: (round: number) => void;
  streetViewLocation: google.maps.LatLng;
  clickedLocation: google.maps.LatLng;
  round: number;
  points: number;
  streak: number;
  message: string;
  setMessage: (message: string) => void;
}

const ResultsOverlay: React.FC<ResultsOverlayProps> = ({
  distance,
  setRound,
  streetViewLocation,
  clickedLocation,
  round,
  points,
  streak,
  message,
  setMessage,
}) => {
  const {
    totalPoints,
    totalTime,
    FinalStreak,
    setTotalPoints,
    setTotalTime,
    setFinalStreak,
    setAccuracy,
    Accuracy,
    hardMode,
  } = useStore();
  const miniMapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!miniMapRef.current) return;

    const midpoint = new window.google.maps.LatLng(
      (streetViewLocation.lat() + clickedLocation.lat()) / 2,
      (streetViewLocation.lng() + clickedLocation.lng()) / 2
    );

    const miniMap = new window.google.maps.Map(miniMapRef.current, {
      center: midpoint,
      zoom: 12,
      mapTypeId: "roadmap",
      disableDefaultUI: true,
      gestureHandling: "none",
    });

    const streetViewMarker = new window.google.maps.Marker({
      position: streetViewLocation,
      map: miniMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#22C55E",
        fillOpacity: 0.8,
        strokeColor: "#22C55E",
        strokeWeight: 2,
      },
    });

    const clickedMarker = new window.google.maps.Marker({
      position: clickedLocation,
      map: miniMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#EF4444",
        fillOpacity: 0.8,
        strokeColor: "#EF4444",
        strokeWeight: 2,
      },
    });

    const distanceLine = new window.google.maps.Polyline({
      path: [streetViewLocation, clickedLocation],
      geodesic: true,
      strokeColor: "#6B7280",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      map: miniMap,
    });

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(streetViewLocation);
    bounds.extend(clickedLocation);
    miniMap.fitBounds(bounds);

    return () => {
      streetViewMarker.setMap(null);
      clickedMarker.setMap(null);
      distanceLine.setMap(null);
    };
  }, [streetViewLocation, clickedLocation]);

  const finishGame = async () => {
    const token = localStorage.getItem("token");
    const updatedStreak = FinalStreak + 1;
    setFinalStreak(updatedStreak);
    const updatedAccuracy = Accuracy / 5;
    setAccuracy(Accuracy / 5);

    try {
      let response = await fetch(
        `{import.meta.env.VITE_BACKEND_URL}/api/game/End`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            token: token,
            points: totalPoints,
            streak: updatedStreak,
            Accuracy: updatedAccuracy,
            hardMode: hardMode,
            time: totalTime,
          }),
        }
      );

      if (response.ok) {
        navigate("/End");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-6 text-center relative">
          <h2 className="text-2xl font-bold mb-2">Round {round} Results</h2>
          <p className="text-yellow-500 text-lg">{message}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Target className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Distance</p>
            <p className="text-xl font-bold">
              {(distance / 1000).toFixed(2)} km
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Points</p>
            <p className="text-xl font-bold">{points}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Streak</p>
            <p className="text-xl font-bold">{streak}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Medal className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Progress</p>
            <p className="text-xl font-bold">{round}/5</p>
          </div>
        </div>

        {/* Map */}
        <div className="p-6 pt-0">
          <div className="relative">
            <div
              ref={miniMapRef}
              className="w-full h-64 rounded-lg overflow-hidden shadow-md"
            />
            <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Location Comparison</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-0">
          {round < 5 ? (
            <button
              onClick={() => setRound(round + 1)}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Next Round
            </button>
          ) : (
            <button
              onClick={finishGame}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Finish Game!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsOverlay;
