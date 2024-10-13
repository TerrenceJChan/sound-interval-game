import { atom } from "recoil";

export const shopSettingsState = atom({
  key: "shopState",
  default: {
    difficulty: [
      {
        name: "beginner",
        purchased: false,
      },
      {
        name: "intermediate",
        purchased: false,
      },
      {
        name: "expert",
        purchased: false,
      },
    ],
    instrument: [
      {
        name: "xylophone",
        purchased: false,
      },
      {
        name: "flute",
        purchased: false,
      },
    ],
  },
});
