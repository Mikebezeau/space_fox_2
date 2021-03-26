import { useFrame } from "react-three-fiber";
//import { useLoader, useFrame } from "react-three-fiber";
import { SCALE, distance } from "../gameHelper";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { playerState } from "../recoil/player/playerData";
import { lasersState } from "../recoil/lasers/lasersData";

// Draws all of the lasers existing in state.
function Lasers() {
  const player = useRecoilValue(playerState);
  const lasers = useRecoilValue(lasersState);
  const setLasers = useSetRecoilState(lasersState);

  useFrame(() => {
    // Calculate hits and remove lasers and enemies, increase score.
    /*
    const hitEnemies = enemies
      ? enemies.map(
          (enemy) =>
            lasers.filter(
              () =>
                lasers.filter((laser) => distance(laser, enemy) < 3).length > 0
            ).length > 0
        )
      : [];

    if (hitEnemies.includes(true) && enemies.length > 0) {
      setScore(score + 1);
      console.log("hit detected");
    }

    // Move all of the enemies. Remove enemies that have been destroyed, or passed the player.
    setEnemies(
      enemies
        .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z + ENEMY_SPEED }))
        .filter((enemy, idx) => !hitEnemies[idx] && enemy.z < 0)
    );
    */

    // Move the Lasers and remove lasers at end of range or that have hit the ground.
    setLasers(
      lasers
        .map((laser) => ({
          id: laser.id,
          position: {
            x: laser.position.x + laser.velocity.x,
            y: laser.position.y + laser.velocity.y,
            z: laser.position.z + laser.velocity.z,
          },
          rotation: {
            x: laser.rotation.x,
            y: laser.rotation.y,
            z: laser.rotation.z,
          },
          velocity: {
            x: laser.velocity.x,
            y: laser.velocity.y,
            z: laser.velocity.z,
          },
        }))
        .filter(
          (laser) => distance(laser.position, player.position) < 30 * SCALE
        )
    );
  });

  return (
    <group>
      {lasers.map((laser) => (
        <mesh
          position={[laser.position.x, laser.position.y, laser.position.z]}
          rotation={[laser.rotation.x, laser.rotation.y, laser.rotation.z]}
          key={`${laser.id}`}
        >
          <boxBufferGeometry
            attach="geometry"
            args={[0.001 * SCALE, 0.001 * SCALE, 0.9 * SCALE]}
          />
          <meshStandardMaterial attach="material" emissive="blue" wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default Lasers;
