import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// Define a square boundary around Purdue University and West Lafayette
const boundaryCoordinates = [
  [40.446, -86.943], // Top-left
  [40.446, -86.899], // Top-right
  [40.402, -86.899], // Bottom-right
  [40.402, -86.943], // Bottom-left
  [40.446, -86.943], // Close the square (back to top-left)
];

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [distance, setDistance] = useState(null); // Store the distance between markers

  // Custom Map Event Handler
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (markers.length >= 2) {
          alert("You can only select two locations.");
          return;
        }

        // Check if the clicked point is inside the boundary
        const boundary = L.polygon(boundaryCoordinates);
        if (!boundary.getBounds().contains(e.latlng)) {
          alert("Point is outside the valid region!");
          return;
        }

        // Add marker
        setMarkers((prevMarkers) => [...prevMarkers, e.latlng]);

        // If two markers are placed, draw the line and calculate the distance
        if (markers.length === 1) {
          const newDistance = markers[0].distanceTo(e.latlng); // Calculate distance in meters
          setDistance(newDistance); // Store the distance

          setPolyline([markers[0], e.latlng]); // Draw the polyline
        }
      },
    });
    return null;
  };

  // Reset function
  const resetMap = () => {
    setMarkers([]);
    setPolyline([]);
    setDistance(null); // Reset distance
  };

  return (
    <div>
      <MapContainer
        center={[40.424, -86.9212]} // Center on Purdue University
        zoom={15}
        style={{ height: "500px", width: "1000px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Draw square boundary */}
        <Polygon
          positions={boundaryCoordinates}
          pathOptions={{ color: "black", weight: 2 }}
        />
        {/* Place markers */}
        {markers.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
        {/* Draw polyline */}
        {polyline.length > 0 && <Polyline positions={polyline} color="black" />}
        {/* Handle map events */}
        <MapEvents />
      </MapContainer>

      {/* Display distance if two markers are placed */}
      {distance && (
        <div style={{ marginTop: "10px" }}>
          Distance between the markers: {distance.toFixed(2)} meters
        </div>
      )}

      <button onClick={resetMap} style={{ marginTop: "10px" }}>
        Reset Map
      </button>
    </div>
  );
};

export default MapComponent;
