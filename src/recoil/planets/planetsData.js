// state/userData.js

import { atom } from "recoil";

export const planetsState = atom({
  key: "planets", // unique ID (with respect to other atoms/selectors)
  default: [
    //
    {
      name: "sun",
      color: "#ffffff",
      radius: 14,
      opacity: 1,
      transparent: "true",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    //
  ], // default value (aka initial value)
});
