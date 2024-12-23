// routes.ts

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GamePage from "../components/gamePage.tsx";
import SignUp from "../components/SignUp.tsx";
import LoginPage from "../components/LoginPage.tsx";
import LandingPage from "../components/landingPage.tsx";
import profile from "../components/profile.tsx";
import FinishPage from "../components/finishPage.tsx";
import PurdueGeoguesserLeaderboard from "../components/Leaderboard.tsx";
import ProfileDetail from "../components/ProfileDetail.tsx";

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
