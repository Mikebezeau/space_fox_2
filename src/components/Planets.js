//import { useRef } from "react";

import { SCALE } from "../gameHelper";

const createPlanets = () => {
  let planets = [];
  console.log("numPlanets", 3);
  // Outer loop to create parent
  for (let i = 0; i < 100; i++) {
    //Create the parent and add the children
    const planetR = (i * 1 + 5) * SCALE;
    planets.push(
      <mesh
        visible
        position={[0, 200 * i * SCALE, -planetR - 1000 * (i + 1) * SCALE]}
        rotation={[0, 0, 0]}
      >
        <sphereGeometry attach="geometry" args={[planetR, 30, 30]} />
        <meshStandardMaterial
          attach="material"
          color="purple"
          roughness={1}
          metalness={0}
          wireframe
        />
      </mesh>
    );
  }
  return planets;
};
const Planets = () => {
  // Returns a mesh at GROUND_HEIGHT below the player. Scaled to 5000, 5000 with 128 segments.
  // X Rotation is -Math.PI / 2 which is 90 degrees in radians.
  return <>{createPlanets(10)}</>;
};

export default Planets;
