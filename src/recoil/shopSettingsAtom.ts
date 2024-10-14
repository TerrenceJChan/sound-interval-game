import { atom } from "recoil";

export const shopSettingsState = atom({
  key: "shopState",
  default: {
    difficulty: [
      {
        name: "starter",
        purchased: true,
      },
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
      { name: "violin", purchased: true },
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
