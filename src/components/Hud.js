import { useState } from "react";
//import { useRecoilValue } from "recoil";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Object3D } from "three";
import { playerState } from "../recoil/player/playerData";
import { lasersState } from "../recoil/lasers/lasersData";
import { SCALE } from "../gameHelper";

import useKeyboardControls from "../hooks/useKeyboardControls";

//Laser creation function
function fireLaser(player, setLasers, laserSwitch) {
  //offset position to left or right
  const lazerDummy = new Object3D();

  lazerDummy.position.set(
    player.position.x,
    player.position.y,
    player.position.z
  );
  lazerDummy.rotation.set(
    player.rotation.x,
    player.rotation.y,
    player.rotation.z
  );
  lazerDummy.translateX(((laserSwitch % 2) - 0.5) * 0.04 * SCALE);

  const offsetPos = {
    x: lazerDummy.position.x,
    y: lazerDummy.position.y,
    z: lazerDummy.position.z,
  };

  lazerDummy.position.set(
    player.position.x,
    player.position.y,
    player.position.z
  );
  lazerDummy.rotation.set(
    player.rotation.x,
    player.rotation.y,
    player.rotation.z
  );
  lazerDummy.translateZ(-(player.speed + 1) * SCALE);

  setLasers((prev) => [
    ...prev,
    {
      id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
      position: {
        x: offsetPos.x,
        y: offsetPos.y,
        z: offsetPos.z,
      },
      rotation: {
        x: player.rotation.x,
        y: player.rotation.y,
        z: player.rotation.z,
      },
      velocity: {
        x: lazerDummy.position.x - player.position.x,
        y: lazerDummy.position.y - player.position.y,
        z: lazerDummy.position.z - player.position.z,
      },
    },
  ]);
}

// An invisible clickable element in the front of the scene.
// Manages creating lasers with the correct initial velocity on click.
function Hud() {
  const player = useRecoilValue(playerState);
  const setPlayer = useSetRecoilState(playerState);
  const setLasers = useSetRecoilState(lasersState); //useSetRecoilState make setter

  const [laserSwitch, setLaserSwitch] = useState(0);

  //const player = useRecoilValue(playerState);
  //const setPlayer = useSetRecoilState(playerState);

  //KEYBOARD CONTROLS FOR SHIP
  //SPEED UP
  function handleSpeedUp() {
    //console.log(player);
    setPlayer((prev) => ({
      ...prev,
      speed: player.speed + 0.2,
      speedMessage: "SPEED " + (player.speed + 0.2).toFixed(1),
    }));
  }
  useKeyboardControls("ArrowUp", handleSpeedUp);
  //SPEED DOWN
  function handleSpeedDown() {
    setPlayer((prev) => ({
      ...prev,
      speed: player.speed - 0.2,
      speedMessage: "SPEED " + (player.speed - 0.2).toFixed(1),
    }));
  }
  useKeyboardControls("ArrowDown", handleSpeedDown);
  //BEGIN/END ORBIT
  function handleToggleOrbit() {
    setPlayer((prev) => ({
      ...prev,
      orbit: prev.nearPlanet && !prev.orbit ? 1 : 0,
      //orbitMessage:""
    }));
    //console.log(player.orbit, player.nearPlanet, player.orbiting);
  }
  useKeyboardControls("ArrowRight", handleToggleOrbit);
  //-------------------

  return (
    <>
      <mesh
        position={[0, 0.1 * SCALE, 0.1 * SCALE]}
        onClick={() => {
          fireLaser(player, setLasers, laserSwitch);
          setLaserSwitch(laserSwitch + 1);
        }}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[0.6 * SCALE, 0.4 * SCALE]}
        />
        <meshStandardMaterial
          attach="material"
          color="orange"
          visible={false}
        />
      </mesh>
    </>
  );
}

export default Hud;
//https://github.com/mattdesl/three-line-2d

/*

      <mesh
        position={[0.3 * SCALE, 0.1 * SCALE, 0.05 * SCALE]}
        onClick={() => {
          handleSpeedUp();
          setLaserSwitch(laserSwitch + 1);
        }}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[0.1 * SCALE, 0.1 * SCALE]}
        />
        <meshStandardMaterial attach="material" color="orange" visible={true} />
      </mesh>
*/
