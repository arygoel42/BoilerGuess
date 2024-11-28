import React, { useState, useEffect, useRef } from "react";
import "../MapComponent.css"; // Import the external CSS

const boundaryCoordinates = [
  { lat: 40.446, lng: -86.943 }, // Top-left
  { lat: 40.446, lng: -86.899 }, // Top-right
  { lat: 40.402, lng: -86.899 }, // Bottom-right
  { lat: 40.402, lng: -86.943 }, // Bottom-left
];

const MapComponent = () => {
  const mapRef = useRef(null);
  const streetViewRef = useRef(null);
  const [map, setMap] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isMapEnlarged, setIsMapEnlarged] = useState(false); // Track map enlargement

  // Utility function to get a random location within the boundary
  const getRandomLocation = () => {
    const latMin = Math.min(...boundaryCoordinates.map((coord) => coord.lat));
    const latMax = Math.max(...boundaryCoordinates.map((coord) => coord.lat));
    const lngMin = Math.min(...boundaryCoordinates.map((coord) => coord.lng));
    const lngMax = Math.max(...boundaryCoordinates.map((coord) => coord.lng));

    return {
      lat: latMin + Math.random() * (latMax - latMin),
      lng: lngMin + Math.random() * (lngMax - lngMin),
    };
  };

  useEffect(() => {
    // Initialize the map
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.424, lng: -86.9212 },
      zoom: 15,
      mapTypeId: "roadmap", // Use the original roadmap view
    });

    // Draw the boundary
    const boundary = new window.google.maps.Polygon({
      paths: boundaryCoordinates,
      strokeColor: "black",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "black",
      fillOpacity: 0.1,
      map: googleMap,
    });

    // Initialize the Street View panorama
    const streetViewPanorama = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
      position: getRandomLocation(),
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      addressControl: false,
      fullscreenControl: true,
    });

    googleMap.setStreetView(streetViewPanorama);

    setMap(googleMap);
    setPanorama(streetViewPanorama);

    return () => {
      boundary.setMap(null);
    };
  }, []);

  const handleMapClick = (event) => {
    if (!map || markers.length >= 2) {
      if (markers.length >= 2) alert("You can only select two locations.");
      return;
    }

    const clickLatLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };

    // Check if the point is inside the boundary
    const googleBoundary = new window.google.maps.Polygon({
      paths: boundaryCoordinates,
    });

    if (
      !window.google.maps.geometry.poly.containsLocation(
        new window.google.maps.LatLng(clickLatLng),
        googleBoundary
      )
    ) {
      alert("Point is outside the valid region!");
      return;
    }

    // Add marker
    const newMarker = new window.google.maps.Marker({
      position: clickLatLng,
      map: map,
    });

    setMarkers((prevMarkers) => {
      const updatedMarkers = [...prevMarkers, newMarker];

      // If two markers are placed, draw the polyline and calculate distance
      if (updatedMarkers.length === 2) {
        const line = new window.google.maps.Polyline({
          path: updatedMarkers.map((marker) => marker.getPosition()),
          geodesic: true,
          strokeColor: "black",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });

        setPolyline(line);

        const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
          updatedMarkers[0].getPosition(),
          updatedMarkers[1].getPosition()
        );

        setDistance(distanceInMeters);
      }

      return updatedMarkers;
    });
  };

  const resetMap = () => {
    // Clear markers
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // Clear polyline
    if (polyline) polyline.setMap(null);
    setPolyline(null);

    // Reset distance
    setDistance(null);

    // Set a new random location in Street View
    if (panorama) {
      panorama.setPosition(getRandomLocation());
    }
  };

  const toggleMapEnlargement = () => {
    setIsMapEnlarged((prev) => !prev);
  };

  useEffect(() => {
    if (map) {
      // Add a click listener to the map
      const listener = map.addListener("click", handleMapClick);

      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map, markers]);

  return (
    <div className="map-container">
      {/* Fullscreen Street View */}
      <div ref={streetViewRef} className="street-view"></div>

      {/* Roadmap-style Map */}
      <div
        ref={mapRef}
        className={`map-view ${isMapEnlarged ? "enlarged" : "small"}`}
        onClick={toggleMapEnlargement}
      ></div>

      {/* Distance and Controls */}
      <div className="controls">
        {distance && (
          <div>
            Distance between the markers: {distance.toFixed(2)} meters
          </div>
        )}
        <button onClick={resetMap}>Reset Map</button>
      </div>
    </div>
  );
};

export default MapComponent;
