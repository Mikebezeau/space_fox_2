import React from "react";
import { Canvas } from "react-three-fiber";
import SkyBox from "./components/SkyBox";
import Planets from "./components/Planets";
import Player from "./components/Player";

export default function App() {
  const handleKeyDown = (e) => {
    //console.log(e.keyCode);//38 40
    if (e.keyCode === 38) {
      //up arrow, speed up
    }
  };

  return (
    <Canvas
      onKeyDown={handleKeyDown}
      tabIndex="0"
      camera={{ fov: 100, zoom: 5, position: [0, 2, 10] }}
    >
      <directionalLight intensity={1} />
      <ambientLight intensity={0.3} />
      <SkyBox />
      <Planets props={{ numPlanets: 2 }} />
      <Player />
    </Canvas>
  );
}
// tabindex="0" for keyboard controls
