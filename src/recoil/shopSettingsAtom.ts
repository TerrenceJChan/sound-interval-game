import { atom } from "recoil";

export const shopSettingsState = atom({
  key: "shopState",
  default: {
    difficulty: [
      {
        name: "starter",
        price: 0,
        purchased: true,
      },
      {
        name: "beginner",
        price: 30,
        purchased: false,
      },
      {
        name: "intermediate",
        price: 50,
        purchased: false,
      },
      {
        name: "advanced",
        price: 70,
        purchased: false,
      },
    ],
    instrument: [
      { name: "violin", price: 0, purchased: true },
      {
        name: "saxophone",
        price: 30,
        purchased: false,
      },
      {
        name: "clarinet",
        price: 30,
        purchased: false,
      },
    ],
  },
});
