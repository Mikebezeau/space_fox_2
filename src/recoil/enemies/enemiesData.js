// state/userData.js

import { atom } from "recoil";

export const enemiesState = atom({
  key: "enemies",
  default: [
    { x: -10, y: 10, z: -80 },
    { x: 20, y: 20, z: -100 },
  ], // default value (aka initial value)
});
