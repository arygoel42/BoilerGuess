import React from "react";
import MapComponent from "./mapComponent";
import authHook from "../hooks/authHook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GamePage = () => {
  const navigate = useNavigate();

  const { loggedIn, user } = authHook();
  const [round, setRound] = useState(1);

  if (!loggedIn) {
    navigate("/login");
  }

  //send distance to database

  //add scripts for map compile and how to fetch from mapillary

  return (
    <>
      <MapComponent
        round={round}
        key={round} // Add key prop tied to round
        setRound={setRound}
      />
    </>
  );
};

export default GamePage;
