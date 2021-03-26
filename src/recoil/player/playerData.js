// state/userData.js

import { atom } from "recoil";

export const playerState = atom({
  key: "player", // unique ID (with respect to other atoms/selectors)
  default: {
    speed: 0,
    speedMessage: "SPEED 0",
    orbitMessage: " > Scanning >",
    orbit: 0,
    orbiting: 0,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  }, // default value (aka initial value)
});
