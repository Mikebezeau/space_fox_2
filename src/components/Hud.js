import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Object3D } from "three";
import { playerState } from "../recoil/player/playerData";
import { lasersState } from "../recoil/lasers/lasersData";
import { SCALE } from "../gameHelper";

const lazerDummy = new Object3D();

//Laser creation function
function fireLaser(player, setLasers, laserSwitch) {
  //offset position to left or right

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
  const setLasers = useSetRecoilState(lasersState); //useSetRecoilState make setter

  const [laserSwitch, setLaserSwitch] = useState(0);

  return (
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
      <meshStandardMaterial attach="material" color="orange" visible={false} />
    </mesh>
  );
}

export default Hud;
//https://github.com/mattdesl/three-line-2d
