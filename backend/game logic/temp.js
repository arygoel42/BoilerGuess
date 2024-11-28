// make temp parameter with distance
// have other logic to give bonuses
// learn about https requests and how node.js works
// replace mapComponent.jsx with google maps API

export function calculateDistance(actualPoint, userPoint) {
    if (!actualPoint || !selectedPoint) {
        console.log("Error. Enter both points");
        return null;
    }

// uses function provided by google maps API
    const point1 = new google.maps.LatLng(actualPoint.lat, actualPoint.lng); 
    const point2 = new google.maps.LatLng(selectedPoint.lat, selectedPoint.lng);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2); // given in meters
    distance = distance/1000; // convert to km since we prob deal with a decent-sized box

    console.log(`Distance: ${distanceInKilometers.toFixed(2)} km`);
    return distance;
}