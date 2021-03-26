// state/userData.js

import { atom } from "recoil";

export const playerState = atom({
  key: "player", // unique ID (with respect to other atoms/selectors)
  default: {
    speed: 0,
    orbit: 0,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  }, // default value (aka initial value)
});
