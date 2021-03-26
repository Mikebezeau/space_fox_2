import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { planetsState } from "../recoil/planets/planetsData";
import { SCALE, getRandomInt } from "../gameHelper";

import useKeyboardControls from "../hooks/useKeyboardControls";

function Planet({ index }) {
  const planets = useRecoilValue(planetsState);

  const planet = planets[index];
  //console.log("planet", index);

  return (
    <mesh
      visible
      position={[planet.position.x, planet.position.y, planet.position.z]}
      rotation={[0, 0, 0]}
    >
      <sphereGeometry attach="geometry" args={[planet.radius, 30, 30]} />
      <meshStandardMaterial
        attach="material"
        color={planet.color}
        emissive={planet.color}
        opacity={planet.opacity}
        transparent={planet.transparent}
        roughness={planet.roughness}
        metalness={planet.metalness}
        //wireframe
      />
    </mesh>
  );
}

function Planets() {
  const [planets, setPlanets] = useRecoilState(planetsState);

  //KEYBOARD CONTROLS FOR PLANETS
  function handleAddPlanet(num) {
    for (let i = 0; i < num; i++) {
      const colors = ["#173f5f", "#20639b", "#3caea3", "#f6d55c", "#ed553b"];
      const radius = SCALE * 4 * (getRandomInt(5) + planets.length * 2);
      const a = 0.2;
      const b = 20 * SCALE;
      const angle = 20 * (planets.length + i + 2);
      const x = (a + b * angle) * Math.cos(angle);
      const z = (a + b * angle) * Math.sin(angle);
      setPlanets((prev) => [
        ...prev,
        {
          name: "Planet",
          roughness: 1,
          metalness: 0,
          color: colors[getRandomInt(4)],
          radius: radius,
          opacity: 1,
          transparent: false,
          position: { x, y: 0, z },
          rotation: { x: 0, y: 0, z: 0 },
        },
      ]);
    }
  }
  //console.log("num planets", planets.length);
  useKeyboardControls("KeyP", () => handleAddPlanet(2));
  //-------------------

  //CREATE PLANETS
  useEffect(() => {
    handleAddPlanet(12);
    return null;
  }, []);
  //-------------------

  return (
    <>
      {planets.map((planet, index) => (
        <Planet key={index} index={index} />
      ))}
    </>
  );
}

export default Planets;
