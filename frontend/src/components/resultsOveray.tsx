import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  } = useStore();
  const miniMapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!miniMapRef.current) return;

    // Create mini map centered between street view and clicked locations
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

    // Add markers for street view and clicked locations
    const streetViewMarker = new window.google.maps.Marker({
      position: streetViewLocation,
      map: miniMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#0000FF",
        fillOpacity: 0.8,
        strokeColor: "#0000FF",
        strokeWeight: 2,
      },
    });

    const clickedMarker = new window.google.maps.Marker({
      position: clickedLocation,
      map: miniMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#FF0000",
        fillOpacity: 0.8,
        strokeColor: "#FF0000",
        strokeWeight: 2,
      },
    });

    // Draw a line between the two points
    const distanceLine = new window.google.maps.Polyline({
      path: [streetViewLocation, clickedLocation],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: miniMap,
    });

    // Fit bounds to show both markers
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
    setFinalStreak(streak);

    const token = localStorage.getItem("token");

    try {
      let response = await fetch("http://localhost:3011/api/game/End", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Inform server of JSON payload
        },
        credentials: "include",
        body: JSON.stringify({
          token: token,
          points: totalPoints,
          streak: streak,
        }),
      });

      if (response.ok) {
        navigate("/End");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={overlayContentStyle}>
        <h2>Round Results</h2>
        <p>Message : {message}</p>
        <p>Distance to target: {(distance / 1000).toFixed(2)} km</p>
        <p>points : {points}</p>
        <p>streak : {streak}</p>
        <div
          ref={miniMapRef}
          style={{
            width: "300px",
            height: "300px",
            margin: "20px auto",
          }}
        />
        {round < 5 ? (
          <button onClick={() => setRound(round + 1)}>Next Round</button>
        ) : (
          <button color="Green" onClick={() => finishGame()}>
            Finish!
          </button>
        )}
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
};

const overlayContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  maxWidth: "400px",
};

export default ResultsOverlay;
