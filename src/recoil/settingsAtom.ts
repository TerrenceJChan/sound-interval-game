import { Difficulty } from "@/enums/difficulty";
import { Instrument } from "@/enums/instrument";
import { atom } from "recoil";

export const settingsState = atom<{
  instrument: Instrument;
  difficulty: Difficulty;
}>({
  key: "settingsState",
  default: {
    instrument: "violin",
    difficulty: "starter",
  },
});
