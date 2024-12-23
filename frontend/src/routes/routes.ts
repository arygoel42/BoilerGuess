// routes.ts

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GamePage from "../components/gamePage";
import SignUp from "../components/SignUp";
import LoginPage from "../components/LoginPage";
import LandingPage from "../components/landingPage";
import profile from "../components/profile";
import FinishPage from "../components/finishPage";
import PurdueGeoguesserLeaderboard from "../components/Leaderboard";
import ProfileDetail from "../components/ProfileDetail";

const router = createBrowserRouter([
  {
    path: "/game/:mode",
    element: React.createElement(GamePage),
  },
  {
    path: "/signup",
    element: React.createElement(SignUp),
  },
  {
    path: "/login",
    element: React.createElement(LoginPage),
  },
  {
    path: "/",
    element: React.createElement(LandingPage),
  },
  {
    path: "/profile",
    element: React.createElement(profile),
  },
  { path: "/End", element: React.createElement(FinishPage) },
  {
    path: "/leaderboard",
    element: React.createElement(PurdueGeoguesserLeaderboard),
  },
  {
    path: "/player/:username",
    element: React.createElement(ProfileDetail),
  },
]);

export default router;
