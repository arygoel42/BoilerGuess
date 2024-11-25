import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, School, Home, Building, Map } from "lucide-react";

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const landmarks = [
    {
      icon: Building,
      name: "Bell Tower",
      description: "The iconic Purdue Bell Tower",
    },
    {
      icon: Home,
      name: "Hovde Hall",
      description: "Administrative heart of Purdue",
    },
    { icon: School, name: "PMU", description: "Purdue Memorial Union" },
    {
      icon: Map,
      name: "Engineering Mall",
      description: "Heart of the engineering campus",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-yellow-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-yellow-500" />
            <div>
              <span className="text-2xl font-bold">Purdue GeoGuesser</span>
              <div className="text-yellow-500 text-sm">
                Boiler Up! Hammer Down!
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsLogin(true);
                setShowAuth(true);
              }}
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setIsLogin(false);
                setShowAuth(true);
              }}
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <img
              src="/api/placeholder/150/150"
              alt="Purdue P"
              className="rounded-full border-4 border-yellow-500"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900">
            Ever Greater<span className="text-yellow-500">.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge of Purdue University's historic campus. From the
            Bell Tower to Ross-Ade Stadium, how well do you know your way
            around?
          </p>
          <Button
            size="lg"
            onClick={() => {
              setIsLogin(false);
              setShowAuth(true);
            }}
            className="bg-black text-white hover:bg-gray-800 text-lg px-8"
          >
            Start Your Journey
          </Button>
        </div>

        {/* Landmarks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {landmarks.map((landmark, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-yellow-500 transition-all"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <landmark.icon className="h-6 w-6 text-yellow-500" />
                  <CardTitle className="text-lg">{landmark.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{landmark.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600">
          <p className="font-bold">"One Brick Higher"</p>
          <p className="text-sm mt-2">
            A tribute to Purdue's spirit of perpetual growth
          </p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
