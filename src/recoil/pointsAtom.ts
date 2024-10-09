import { atom } from "recoil";

export const pointsState = atom<number>({
  key: "pointsState",
  default: 0,
});
