"use client";

import { intervals } from "@/assets/data/intervals";
import { violinSounds } from "@/assets/data/soundMapping";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import DelayedComponent from "../../components/DelayedComponent";

const Game = () => {
  const [sound1, setSoundIndex1] = useState<null | {
    note: string;
    sound: string;
    reference: number;
  }>(null);
  const [sound2, setSoundIndex2] = useState<null | {
    note: string;
    sound: string;
    reference: number;
  }>(null);
  const [inputValue, setInputValue] = useState<null | number>();

  const sound1Ref = useRef<HTMLAudioElement>(null);
  const sound2Ref = useRef<HTMLAudioElement>(null);

  const intervalDifferenceResult = () => {
    const result = Math.abs(
      (sound1?.reference ?? 0) - (sound2?.reference ?? 0),
    );
    return intervals.find((interval) => interval.difference === result)?.name;
  };

  useEffect(() => {
    if (!sound1 && !sound2) {
      const pickSounds = () => {
        const randomIndex1 = Math.floor(
          Math.random() * violinSounds.length - 1,
        );
        const randomIndex2 = Math.floor(
          Math.random() * violinSounds.length - 1,
        );

        if (randomIndex1 === randomIndex2) {
          return pickSounds();
        }

        setSoundIndex1(violinSounds[randomIndex1]);
        setSoundIndex2(violinSounds[randomIndex2]);
      };
      pickSounds();
    }
  }, []);

  return (
    <div className="flex flex-grow items-center justify-center">
      <DelayedComponent delay={100} removeDelay={3000}>
        <p className="duration-500 animate-in fade-in">
          Ready? Here comes the first sound.
        </p>
      </DelayedComponent>
      {sound1 && (
        <DelayedComponent delay={2000}>
          <audio ref={sound1Ref} autoPlay>
            <source src={sound1.sound} type="audio/mp3" />
          </audio>
        </DelayedComponent>
      )}

      <DelayedComponent delay={5100} removeDelay={8000}>
        <p className="duration-500 animate-in fade-in">
          Here comes the second sound.
        </p>
      </DelayedComponent>
      {sound2 && (
        <DelayedComponent delay={7000}>
          <audio ref={sound2Ref} autoPlay>
            <source src={sound2.sound} type="audio/mp3" />
          </audio>
        </DelayedComponent>
      )}

      <DelayedComponent delay={11000}>
        <div className="flex flex-col items-center gap-8 duration-500 animate-in fade-in">
          <p>How many semitones were between the two notes?</p>
          <div className="flex w-full flex-col items-center gap-4">
            <input
              onChange={(e) => setInputValue(parseInt(e.target.value))}
              type="number"
              placeholder="1-12"
              min={1}
              max={12}
              className="w-1/2 rounded-xl px-4 py-2 text-primary"
            />
            <div>
              {inputValue
                ? intervals.find(
                    (interval) => interval.difference === inputValue - 1,
                  )?.name
                : ""}
            </div>
          </div>

          <Button className="w-1/2 rounded-xl">Submit</Button>
        </div>
      </DelayedComponent>
    </div>
  );
};

export default Game;
