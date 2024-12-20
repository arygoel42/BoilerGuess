// learn about https requests and how node.js works
// distance in km
export function calculatePoints(distance, streak, time) {
  console.log(distance);
  const maxDistance = 3;
  let total = 0;
  if (time > 5) {
    let amtToSubtract = Math.floor((time - 5) / 3);
    total -= amtToSubtract * 400;
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

  total += 5000 * Math.pow((1 - distance / maxDistance), 3);
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
