/*
// Draws two sprites in front of the ship indicating the direction of fire.
// Uses a TextureLoader to load transparent PNG, and sprite to render on a 2d plane facing the camera.
function Target() {
  const rearTarget = useRef();
  const frontTarget = useRef();

  const loader = new TextureLoader();
  // A png with transparency to use as the target sprite.
  const texture = loader.load("target.png");

  // Update the position of the reticle based on the ships current position.
  useFrame(({ mouse }) => {
    rearTarget.current.position.y = -mouse.y * 10;
    rearTarget.current.position.x = -mouse.x * 30;

    frontTarget.current.position.y = -mouse.y * 20;
    frontTarget.current.position.x = -mouse.x * 60;
  });
  // Sprite material has a prop called map to set the texture on.
  return (
    <group>
      <sprite position={[0, 0, -8]} ref={rearTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
      <sprite position={[0, 0, -16]} ref={frontTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
    </group>
  );
}

// Manages Drawing enemies that currently exist in state
function Enemies() {
  const enemies = useRecoilValue(enemyPositionState);
  return (
    <group>
      {enemies.map((enemy) => (
        <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${enemy.x}`}>
          <sphereBufferGeometry attach="geometry" args={[2, 8, 8]} />
          <meshStandardMaterial attach="material" color="white" wireframe />
        </mesh>
      ))}
    </group>
  );
}

          <Target />
          <Enemies />
  
*/

import React from "react";
import { Canvas } from "react-three-fiber";
import { Stats } from "@react-three/drei/";
import { RecoilRoot } from "recoil";
import SkyBox from "./components/SkyBox";
import Planets from "./components/Planets";
import Player from "./components/Player";
import Lasers from "./components/Lasers";
//import Boxes from "./components/Boxes";
import { EffectComposer, Bloom } from "react-postprocessing";

export default function App() {
  return (
    <>
      <Canvas camera={{ fov: 80, zoom: 5, position: [0, 2, 10] }}>
        <pointLight intensity={0.7} />
        <ambientLight intensity={0.3} />
        <SkyBox />
        <RecoilRoot>
          <Planets />
          <Player />
          <Lasers />
        </RecoilRoot>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            opacity={0.3}
          />
        </EffectComposer>
      </Canvas>
      <Stats />
    </>
  );
}
// tabindex="0" for keyboard controls ???
/*

      <EffectComposer>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={1}
        />
      </EffectComposer>
      
      <Boxes />

      */
