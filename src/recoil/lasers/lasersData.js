// state/userData.js

import { atom } from "recoil";

export const lasersState = atom({
  key: "lasers", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
