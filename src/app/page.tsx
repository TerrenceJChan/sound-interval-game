"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Home() {
  const startButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      startButton.current?.classList.remove("duration-1000", "delay-500");
    }, 1000);
  }, [startButton]);

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left">
          Train your ears to tonal difference.
        </p>
        <p className="delay-150 duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left">
          Submit to the beauty of sound.
        </p>
        <p className="delay-300 duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left">
          Earn points to spend on the shop.
        </p>
        <Button
          ref={startButton}
          variant={"default"}
          className="w-fit rounded-xl px-4 delay-500 duration-1000 ease-in-out animate-in fade-in zoom-in-75 slide-in-from-left hover:delay-0 hover:duration-150"
        >
          Sell Your Soul
        </Button>
      </div>
    </div>
  );
}
