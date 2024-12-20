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
export function calculatePoints(distance, streak, time) {
  console.log(distance);
  const maxDistance = 50;
  let total = 0;
  if (time > 5) {
    let amtToSubtract = Math.floor((time - 5) / 3);
    total -= amtToSubtract * 200;
  }

  if (distance < 0.2) {
    console.log("engaged");
    streak += 1;
    total += streak * 500;
    // close enough to perfect
    return { points: total + 5000, correct: true, accuracy: 100 };
  }

  if (distance > maxDistance) {
    // max distance, or else no points
    return { points: 0, correct: false, accuracy: 0 };
  }

  total += 5000 * (1 - distance / maxDistance);
  if (total < 0) {
    total = 0;
  }

  const accuracy = calculateAccuracy(distance, 12);

  return { points: Math.round(total), correct: false, accuracy: accuracy }; // round score
}

const calculateAccuracy = (distance, maxRadius) => {
  //keep max radius 10. for now

  if (distance <= 0) return 100; // Perfect accuracy at 0 km
  if (distance >= maxRadius) return 0; // 0% accuracy beyond maxRadius

  // Linear scaling
  const linearAccuracy = 100 * (1 - distance / maxRadius);

  // Optional: Nonlinear scaling for sharper drop-off
  // const nonlinearAccuracy = 100 * Math.pow((1 - distance / maxRadius), 2);

  return Math.max(0, linearAccuracy); // Ensure accuracy is never negative
};

export function toNumber(Stringnumber) {
  const [numerator, denominator] = Stringnumber.split("/").map(Number);

  return numerator;
}
