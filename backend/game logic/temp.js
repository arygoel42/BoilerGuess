// learn about https requests and how node.js works

export function calculateDistance(actualPoint, userPoint) {
  if (!actualPoint || !selectedPoint) {
    console.log("Error. Enter both points");
    return null;
  }

  // uses function provided by google maps API
  const point1 = new google.maps.LatLng(actualPoint.lat, actualPoint.lng);
  const point2 = new google.maps.LatLng(selectedPoint.lat, selectedPoint.lng);

  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    point1,
    point2
  ); // given in meters
  distance = distance / 1000; // convert to km since we prob deal with a decent-sized box

  console.log(`Distance: ${distanceInKilometers.toFixed(2)} km`);
  return distance;
}

// distance in km
export function calculatePoints(distance) {
  console.log(distance);
  const maxDistance = 50;

  if (distance < 0.2) {
    // close enough to perfect
    return { points: 5000, correct: true };
  }

  if (distance > maxDistance) {
    // max distance, or else no points
    return { points: 0, correct: false };
  }

  const score = 5000 * (1 - distance / maxDistance);
  return { points: Math.round(score), correct: false }; // round score
}

export function giveBonuses(streak, guessTime) {
  let totalBonus = 0;
  totalBonus += 100 * streak; // 100 points for each additional answer in a streak
  totalBonus += Math.max(0, 50 * (guessTime - 7)); // if user guessed within 7 seconds, give them a bonus for 50 points for each second they guessed early
  return totalBonus;
}
