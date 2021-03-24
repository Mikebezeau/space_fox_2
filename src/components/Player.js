import { useState, useRef, Suspense } from "react";
import { Object3D, Quaternion, Vector3 } from "three";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Loading from "./Loading";
import { SCALE } from "../gameHelper";

const ArWing = () => {
  const ship = useRef();
  const [speed, setSpeed] = useState(2 * SCALE);

  useFrame(({ mouse }) => {
    const rotateQuat = new Quaternion().setFromAxisAngle(
      new Vector3(-mouse.y * 0.1, -mouse.x * 0.05, -mouse.x * 0.2),
      Math.PI / 10
    );

    const curQuat = new Quaternion().setFromEuler(ship.current.rotation);

    const newQuat = curQuat.multiply(rotateQuat);
    newQuat.normalize();

    ship.current.rotation.setFromQuaternion(newQuat);

    //console.log(ship.current.rotation.x);
    //console.log(rotateQuaternion);

    //ship.current.rotation.x = ship.current.rotation.x - mouse.y * 0.1;
    //ship.current.rotation.z = ship.current.rotation.z - mouse.x * 0.2;
    ship.current.translateZ(-speed);
  });

  const camDummy = new Object3D();

  useFrame((state) => {
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
    camDummy.translateZ(1 * SCALE);
    camDummy.translateY(0.1 * SCALE);

    const lerpAmount = 0.9; //distance(state.camera.position, camDummy.position) / 0.8;
    state.camera.position.lerp(camDummy.position, lerpAmount);
    state.camera.rotation.set(
      ship.current.rotation.x,
      ship.current.rotation.y,
      ship.current.rotation.z
    );

    state.camera.updateProjectionMatrix();
  });

  const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");

  return (
    <group ref={ship} rotation={[0, 0, 0]}>
      <mesh
        visible
        geometry={nodes.Default.geometry}
        scale={[0.04 * SCALE, 0.04 * SCALE, 0.04 * SCALE]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

const Player = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ArWing />
    </Suspense>
  );
};

export default Player;
