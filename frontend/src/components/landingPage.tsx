import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, School, Home, Building, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EngineeringMall from "../assets/EngineeringMall.jpg";
const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  const landmarks = [
    {
      icon: Building,
      name: "Bell Tower",
      description: "The iconic Purdue Bell Tower",
      fact: "The Bell Tower's clock plays the Purdue fight song every hour.",
      image: "/images/bell-tower.jpg", // Replace with the actual image path
    },
    {
      icon: Home,
      name: "Hovde Hall",
      description: "Administrative heart of Purdue",
      fact: "Hovde Hall was named after Purdue's longest-serving president.",
      image: "/images/hovde-hall.jpg", // Replace with the actual image path
    },
    {
      icon: School,
      name: "PMU",
      description: "Purdue Memorial Union",
      fact: "PMU has a bowling alley in its basement.",
      image: "/images/pmu.jpg", // Replace with the actual image path
    },
    {
      icon: Map,
      name: "Engineering Mall",
      description: "Heart of the engineering campus",
      fact: "The Engineering Fountain weighs 240 tons and was a gift from the Class of 1939.",
      image: EngineeringMall, // Replace with the actual image path
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
              <span className="text-2xl font-bold">BoilerGuess</span>
              <div className="text-yellow-500 text-sm">
                Boiler Up! Hammer Down!
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/login");
              }}
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate("/signup");
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
          <h1 className="text-5xl font-bold text-gray-900">
            Ever Greater<span className="text-yellow-500">.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge of Purdue University's historic campus. From the
            Bell Tower to Ross-Ade Stadium, how well do you know your way
            around?
          </p>
        </div>

        {/* Landmarks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {landmarks.map((landmark, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-yellow-500 transition-all cursor-pointer"
              onClick={() => setSelectedLandmark(landmark)}
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

        {/* Landmark Details */}
        {selectedLandmark && (
          <div className="mt-16 flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedLandmark.name}
              </h2>
              <p className="text-gray-600 mt-4">
                {selectedLandmark.description}
              </p>
              <p className="text-gray-700 font-medium mt-2">
                Fact: {selectedLandmark.fact}
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={selectedLandmark.image}
                alt={selectedLandmark.name}
                className="rounded-lg shadow-lg"
                width={500}
              />
            </div>
          </div>
        )}

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
