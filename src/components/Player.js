import { useRef, Suspense } from "react";
import { Object3D, Quaternion, Vector3 } from "three";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { useRecoilState } from "recoil";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { playerState } from "../recoil/player/playerData";
import { planetsState } from "../recoil/planets/planetsData";
import Loading from "./Loading";
import { distance, SCALE } from "../gameHelper";
import useKeyboardControls from "../hooks/useKeyboardControls";
import Hud from "./Hud";

function ArWing() {
  const ship = useRef();
  //const [player, setPlayer] = useRecoilState(playerState);
  const player = useRecoilValue(playerState);
  const planets = useRecoilValue(planetsState);
  const setPlayer = useSetRecoilState(playerState);
  const speed = player.speed * SCALE;

  const camDummy = new Object3D();

  useFrame(({ mouse, camera }) => {
    //SHIP
    const rotateQuat = new Quaternion().setFromAxisAngle(
      new Vector3(-mouse.y * 0.1, -mouse.x * 0.05, -mouse.x * 0.2),
      Math.PI / 10
    );

    const curQuat = new Quaternion().setFromEuler(ship.current.rotation);

    const newQuat = curQuat.multiply(rotateQuat);
    newQuat.normalize();

    ship.current.rotation.setFromQuaternion(newQuat);
    ship.current.translateZ(-speed);
    //console.log("playerZ", ship.current.position.z);
    setPlayer((prev) => ({
      ...prev,
      position: {
        x: ship.current.position.x,
        y: ship.current.position.y,
        z: ship.current.position.z,
      },
      rotation: {
        x: ship.current.rotation.x,
        y: ship.current.rotation.y,
        z: ship.current.rotation.z,
      },
    }));

    //CAMERA
    //get end rotation angle for camera for smooth follow
    //set camDUmmy to be behind ship
    camDummy.rotation.set(
      ship.current.rotation.x,
      ship.current.rotation.y,
      ship.current.rotation.z
    );
    camDummy.position.set(
      ship.current.position.x,
      ship.current.position.y,
      ship.current.position.z
    );
    camDummy.translateZ(1.25 * SCALE);
    camDummy.translateY(0.1 * SCALE);

    const lerpAmount = 1; //distance(state.camera.position, camDummy.position) / 0.8;
    camera.position.lerp(camDummy.position, lerpAmount);
    camera.rotation.set(
      ship.current.rotation.x,
      ship.current.rotation.y,
      ship.current.rotation.z
    );

    camera.updateProjectionMatrix();

    //close to any planets?
    planets.map((planet, index) => {
      if (
        distance(ship.current.position, planet.position) <
        100 * SCALE + planet.radius
      ) {
        if (player.orbit) {
          player.orbiting = index;
        } else {
          //console.log("Orbit planet", player.orbit, index);
        }
      }
    });
  });

  const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");

  return (
    <group
      ref={ship}
      position={[0, 4000 * SCALE, 4000 * SCALE]}
      rotation={[-0.7, 0, 0]}
    >
      <mesh
        visible
        geometry={nodes.Default.geometry}
        scale={[0.04 * SCALE, 0.04 * SCALE, 0.04 * SCALE]}
      >
        <meshStandardMaterial
          attach="material"
          color="grey"
          roughness={1}
          metalness={0}
        />
      </mesh>
      <Hud />
    </group>
  );
}

function Player() {
  //const [player, setPlayer] = useRecoilState(playerState);
  const player = useRecoilValue(playerState);
  const setPlayer = useSetRecoilState(playerState);
  //KEYBOARD CONTROLS FOR SHIP
  //SPEED UP
  function handleSpeedUp() {
    //console.log(player);
    setPlayer((prev) => ({
      ...prev,
      speed: player.speed + 0.2,
    }));
  }
  useKeyboardControls("ArrowUp", handleSpeedUp);
  //SPEED DOWN
  function handleSpeedDown() {
    setPlayer((prev) => ({
      ...prev,
      speed: player.speed - 0.2,
    }));
  }
  useKeyboardControls("ArrowDown", handleSpeedDown);
  //BEGIN ORBIT
  function handleToggleOrbit() {
    setPlayer((prev) => ({
      ...prev,
      orbit: prev.orbit ? 0 : 1,
      orbiting: prev.orbiting,
    }));
  }
  useKeyboardControls("ArrowRight", handleToggleOrbit);
  //-------------------

  return (
    <Suspense fallback={<Loading />}>
      <ArWing />
    </Suspense>
  );
}

export default Player;
