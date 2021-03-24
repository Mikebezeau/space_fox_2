export const SCALE = 0.09;

// A helper function to calculate the distance between two points in 3d space.
// Used to detect lasers intersecting with enemies.
export const distance = (p1, p2) => {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
};
