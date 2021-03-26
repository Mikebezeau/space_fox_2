import React from "react";
import { Text } from "@react-three/drei/";
import { SCALE } from "../gameHelper";

function TextCanvas({ speedMessage, orbitMessage }) {
  return (
    <Text
      scale={[0.6 * SCALE, 0.6 * SCALE, 0.6 * SCALE]}
      position={[-0.45 * SCALE, 0, 0]}
      color="#03A062"
      anchorX="left"
      anchorY="top"
      fontSize={0.3 * SCALE}
      maxWidth={window.innerWidth}
      maxHeight={window.innerHeight}
      fillStyle="#CCCCCC"
    >
      {[speedMessage, orbitMessage]}
      <meshStandardMaterial attach="material" opacity={0.7} />
    </Text>
  );
}
export default TextCanvas;
