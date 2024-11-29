// routes.ts

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GamePage from "../components/GamePage";
import SignUp from "../components/SignUp";
import LoginPage from "../components/LoginPage";
import LandingPage from "../components/landingPage";
import profile from "../components/profile";

const router = createBrowserRouter([
  {
    path: "/game",
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
]);

export default router;
