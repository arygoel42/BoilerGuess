import React from "react";
import MapComponent from "./mapComponent";
import authHook from "../hooks/authHook";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();

  const { loggedIn, user } = authHook();

  if (!loggedIn) {
    navigate("/login");
  }
  //add scripts for map compile and how to fetch from mapillary
  return (
    <>
      <div>GamePage</div>
      <MapComponent />
    </>
  );
};

export default GamePage;
