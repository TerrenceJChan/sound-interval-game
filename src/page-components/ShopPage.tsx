"use client";

import DescriptionTooltip from "@/components/DescriptionTooltip";
import { Button } from "@/components/ui/button";
import { pointsState } from "@/recoil/pointsAtom";
import { shopSettingsState } from "@/recoil/shopSettingsAtom";
import clsx from "clsx";
import { useRecoilState } from "recoil";

const ShopPage = () => {
  const [points, setPoints] = useRecoilState(pointsState);
  const [shopSettings, setShopSettings] = useRecoilState(shopSettingsState);

  const handlePurchase = (
    item:
      | {
          name: string;
          price: number;
          purchased: boolean;
        }
      | undefined,
  ) => {
    if (item === undefined) {
      return;
    }

    if (!item.purchased && points >= item.price) {
      setShopSettings({
        ...shopSettings,
        difficulty: shopSettings.difficulty.map((difficulty) => {
          if (difficulty.name === item.name) {
            return {
              ...difficulty,
              purchased: true,
            };
          }
          return difficulty;
        }),
        instrument: shopSettings.instrument.map((instrument) => {
          if (instrument.name === item.name) {
            return {
              ...instrument,
              purchased: true,
            };
          }
          return instrument;
        }),
      });
      setPoints(points - item.price);
    }
  };

  return (
    <div className="flex w-full flex-grow flex-col">
      <h1 className="p-8 text-center text-3xl font-bold lg:text-5xl">Shop</h1>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-wrap justify-center gap-8">
          {/* Difficulty */}
          <div className="flex flex-col gap-4 rounded-xl border-4 border-border bg-border/15 p-4 transition-all hover:bg-border/50">
            <h2 className="px-1 text-3xl font-semibold">Difficulty</h2>
            <div className="flex flex-col gap-1">
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      For players who have warmed up with the starting
                      difficulty.
                    </p>
                    <p className="font-medium">
                      Allows intervals up to and including perfect fifth (7
                      semitones).
                    </p>
                  </div>
                }
              >
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    handlePurchase(
                      shopSettings.difficulty.find(
                        (difficulty) => difficulty.name === "beginner",
                      ),
                    )
                  }
                  className={clsx(
                    "flex flex-row justify-between gap-8 rounded-xl p-2 underline decoration-dotted transition-all",
                    shopSettings.difficulty.find(
                      (difficulty) => difficulty.name === "beginner",
                    )?.purchased === true
                      ? "bg-green-800"
                      : "hover:bg-yellow-100/10",
                  )}
                >
                  <div className="underline decoration-dotted">Beginner</div>
                  <div>30 Points</div>
                </Button>
              </DescriptionTooltip>
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Standard training that will expose additional intervals.
                    </p>
                    <p className="font-medium">
                      Allows intervals up to and including major sixths (9
                      semitones).
                    </p>
                  </div>
                }
              >
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    handlePurchase(
                      shopSettings.difficulty.find(
                        (difficulty) => difficulty.name === "intermediate",
                      ),
                    )
                  }
                  className={clsx(
                    "flex flex-row justify-between gap-8 rounded-xl p-2 underline decoration-dotted transition-all",
                    shopSettings.difficulty.find(
                      (difficulty) => difficulty.name === "intermediate",
                    )?.purchased === true
                      ? "bg-green-800"
                      : "hover:bg-yellow-100/10",
                  )}
                >
                  <div className="underline decoration-dotted">
                    Intermediate
                  </div>
                  <div>50 Points</div>
                </Button>
              </DescriptionTooltip>
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Advanced training that will expose all standard intervals.
                    </p>
                    <p className="font-medium">
                      Allows intervals up to and including perfect eighths (12
                      semitones).
                    </p>
                  </div>
                }
              >
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    handlePurchase(
                      shopSettings.difficulty.find(
                        (difficulty) => difficulty.name === "advanced",
                      ),
                    )
                  }
                  className={clsx(
                    "flex flex-row justify-between gap-8 rounded-xl p-2 underline decoration-dotted transition-all",
                    shopSettings.difficulty.find(
                      (difficulty) => difficulty.name === "advanced",
                    )?.purchased === true
                      ? "bg-green-800"
                      : "hover:bg-yellow-100/10",
                  )}
                >
                  <div className="underline decoration-dotted">Advanced</div>
                  <div>70 Points</div>
                </Button>
              </DescriptionTooltip>
            </div>
          </div>

          {/* Instrument */}
          <div className="flex flex-col gap-4 rounded-xl border-4 border-border bg-border/15 p-4 transition-all hover:bg-border/50">
            <h2 className="px-2 text-3xl font-semibold">Instrument</h2>
            <div className="flex flex-col gap-1">
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Adds the option to listen to a different instrument for
                      interval testing.
                    </p>
                    <p className="font-medium">
                      Unlocks the saxophone during game setup.
                    </p>
                  </div>
                }
              >
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    handlePurchase(
                      shopSettings.instrument.find(
                        (instrument) => instrument.name === "saxophone",
                      ),
                    )
                  }
                  className={clsx(
                    "flex flex-row justify-between gap-8 rounded-xl p-2 underline decoration-dotted transition-all",
                    shopSettings.instrument.find(
                      (instrument) => instrument.name === "saxophone",
                    )?.purchased === true
                      ? "bg-green-800"
                      : "hover:bg-yellow-100/10",
                  )}
                >
                  <div className="underline decoration-dotted">Saxophone</div>
                  <div>30 Points</div>
                </Button>
              </DescriptionTooltip>
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Adds the option to listen to a different instrument for
                      interval testing.
                    </p>
                    <p className="font-medium">
                      Unlocks the clarinet during game setup.
                    </p>
                  </div>
                }
              >
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    handlePurchase(
                      shopSettings.instrument.find(
                        (instrument) => instrument.name === "clarinet",
                      ),
                    )
                  }
                  className={clsx(
                    "flex flex-row justify-between gap-8 rounded-xl p-2 underline decoration-dotted transition-all",
                    shopSettings.instrument.find(
                      (instrument) => instrument.name === "clarinet",
                    )?.purchased === true
                      ? "bg-green-800"
                      : "hover:bg-yellow-100/10",
                  )}
                >
                  <div className="underline decoration-dotted">Clarinet</div>
                  <div>30 Points</div>
                </Button>
              </DescriptionTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
