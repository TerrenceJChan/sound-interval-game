"use client";

import DelayedComponent from "@/components/DelayedComponent";
import Game from "@/components/Game";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [gameState, setGameState] = useState<"start" | "playing">("start");

  const startButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      startButton.current?.classList.remove("duration-1000");
    }, 1450);
  }, [startButton]);

  return (
    <div className="flex flex-grow items-center justify-center">
      {gameState === "start" && (
        <div className="flex flex-col items-center gap-8 transition-all">
          <div className="flex h-48 flex-col gap-4">
            <DelayedComponent delay={0}>
              <p className="duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left">
                Train your ears to tonal difference.
              </p>
            </DelayedComponent>
            <DelayedComponent delay={150}>
              <p className="duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left">
                Submit to the beauty of sound.
              </p>
            </DelayedComponent>
            <DelayedComponent delay={300}>
              <p className="duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left">
                Earn points to spend on the shop.
              </p>
            </DelayedComponent>
            <DelayedComponent delay={450}>
              <Button
                ref={startButton}
                variant={"default"}
                onClick={() => setGameState("playing")}
                className="w-fit rounded-xl duration-1000 animate-in fade-in slide-in-from-left"
              >
                Sell Your Soul
              </Button>
            </DelayedComponent>
          </div>
        </div>
      )}
      {gameState === "playing" && <Game />}
    </div>
  );
}
