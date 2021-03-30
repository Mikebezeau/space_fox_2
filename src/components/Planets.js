import { useEffect, Suspense } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Loading from "./Loading";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { planetsState } from "../recoil/planets/planetsData";
import { SCALE, getRandomInt } from "../gameHelper";

//import jupitermap from "./images/jupitermap.jpg";

//import useKeyboardControls from "../hooks/useKeyboardControls";

function Planet({ planet, index }) {
  //console.log("planet", index);

  // create a texture loader.
  //const textureLoader = new TextureLoader();
  // load a texture
  const texture_maps = useLoader(TextureLoader, [
    "images/maps/sunmap.jpg",
    "images/maps/earthmap1k.jpg",
    "images/maps/jupitermap.jpg",
    "images/maps/mercurymap.jpg",
    "images/maps/moonmap1k.jpg",
    "images/maps/moonmap1k.jpg",
    "images/maps/venusmap.jpg",
  ]);

  return (
    <mesh
      castShadow={index === 0 ? "false" : "true"}
      receiveShadow={index === 0 ? "false" : "true"}
      visible
      position={[planet.position.x, planet.position.y, planet.position.z]}
      rotation={[planet.rotation.x, planet.rotation.y, planet.rotation.z]}
    >
      {planet.name === "sun" && (
        <sphereGeometry attach="geometry" args={[planet.radius, 30, 30]} />
      )}
      {planet.name === "planet" && (
        <sphereGeometry attach="geometry" args={[planet.radius, 10, 10]} />
      )}
      {planet.name === "asteroid" && (
        <boxGeometry
          attach="geometry"
          args={[planet.radius, planet.radius, planet.radius]}
        />
      )}
      <meshStandardMaterial
        map={texture_maps[index === 1 ? 0 : getRandomInt(6 + 1)]}
        attach="material"
        //color={planet.color}
        //emissive={planet.color}
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
  const planets = useRecoilValue(planetsState);
  const setPlanets = useSetRecoilState(planetsState);

  //KEYBOARD CONTROLS FOR PLANETS
  function handleAddPlanet(num) {
    for (let i = 0; i < num; i++) {
      const colors = ["#173f5f", "#20639b", "#3caea3", "#f6d55c", "#ed553b"];
      const radius =
        ((SCALE * (i + 1)) / 3) * 4 * (getRandomInt(5) + planets.length * 2);
      const a = 0.2;
      const b = 20 * SCALE;
      const angle = 20 * (planets.length + i + 2);
      const x = (a + b * angle) * Math.cos(angle);
      const z = (a + b * angle) * Math.sin(angle);
      setPlanets((prev) => [
        ...prev,
        {
          name: "planet",
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
  //useKeyboardControls("KeyP", () => handleAddPlanet(2));
  //-------------------

  //dirty function to try to make asteroids
  function handleAddAsteroidRing(num) {
    //Any point (x,y) on the path of the circle is x = rsin(θ), y = rcos(θ)
    //angle 115, radius 12: (x,y) = (12*sin(115), 12*cos(115))
    for (let i = 0; i < num; i++) {
      const colors = ["#999", "#aaa", "#bbb", "#ccc", "#ddd"];
      const radius = SCALE * 2;
      const ringRadius = SCALE * 300;
      const angle = (360 / num) * i;
      const x = ringRadius * Math.sin(angle);
      const z = ringRadius * Math.cos(angle);
      //console.log("xz", x, z);
      //console.log("r s", ringRadius, Math.sin(angle));
      setPlanets((prev) => [
        ...prev,
        {
          name: "asteroid",
          roughness: 1,
          metalness: 1,
          color: colors[getRandomInt(6)],
          texture_map: null,
          radius: radius,
          opacity: 1,
          transparent: false,
          position: { x, y: 0, z },
          rotation: {
            x: getRandomInt(100) / 1000,
            y: getRandomInt(100) / 1000,
            z: getRandomInt(100) / 1000,
          }, //getRandomInt(100)/1000
        },
      ]);
    }
  }
  //CREATE PLANETS
  useEffect(() => {
    handleAddPlanet(9);
    handleAddAsteroidRing(11);
    return null;
  }, []);
  //-------------------

  return (
    <>
      {planets.map((planet, index) => (
        <Suspense key={"sus" + index} fallback={<Loading />}>
          <Planet key={index} planet={planet} />
        </Suspense>
      ))}
    </>
  );
}

export default Planets;
