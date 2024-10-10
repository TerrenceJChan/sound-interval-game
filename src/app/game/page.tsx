"use client";

import { intervals } from "@/assets/data/intervals";
import {
  standardMessagesFailure,
  standardMessagesSuccess,
} from "@/assets/data/result-messages/standardMessages";
import { violinSounds } from "@/assets/data/soundMapping";
import { Button } from "@/components/ui/button";
import { pointsState } from "@/recoil/pointsAtom";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import DelayedComponent from "../../components/DelayedComponent";

const Game = () => {
  const [points, setPoints] = useRecoilState<number>(pointsState);
  const [showMainContent, setShowMainContent] = useState(true);
  const [showResultMessage, setShowResultMessage] = useState(false);
  const [correct, setCorrect] = useState<null | boolean>(null);
  const [resultMessage, setResultMessage] = useState("");
  const [animateOut, setAnimateOut] = useState("");
  const [animateOutResults, setAnimateOutResults] =
    useState("animate-in fade-in");
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

  const sound1Ref = useRef<HTMLAudioElement>(null);
  const sound2Ref = useRef<HTMLAudioElement>(null);

  const handleSubmit = (inputValue: number) => {
    const result = Math.abs(
      (sound1?.reference ?? 0) - (sound2?.reference ?? 0),
    );

    setAnimateOut(
      "animate-out duration-1000 transition-all ease-in-out fade-out",
    );

    setTimeout(() => {
      setShowMainContent(false);
      setTimeout(() => {
        if ((inputValue ?? 0) === result) {
          setCorrect(true);
          setResultMessage(
            standardMessagesSuccess[
              Math.floor(Math.random() * standardMessagesSuccess.length)
            ].message,
          );
          setPoints(points + 10);
          if (localStorage.getItem("points")) {
            localStorage["points"] = String(points + 10);
          }
        } else {
          setCorrect(false);
          setResultMessage(
            standardMessagesFailure[
              Math.floor(Math.random() * standardMessagesFailure.length)
            ].message,
          );
        }

        setShowResultMessage(true);
      }, 1000);
    }, 1000);
  };

  const handleRestart = () => {
    setAnimateOutResults("duration-1000 transition-all ease-in-out opacity-0");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (!sound1 && !sound2) {
      const pickSounds = () => {
        const randomIndex1 = Math.floor(Math.random() * violinSounds.length);
        const randomIndex2 = Math.floor(Math.random() * violinSounds.length);

        setSoundIndex1(violinSounds[randomIndex1]);
        setSoundIndex2(violinSounds[randomIndex2]);
      };
      pickSounds();
    }
  }, [sound1, sound2]);

  return (
    <div className="flex w-full flex-grow flex-col">
      <h1 className="p-8 text-center text-3xl font-bold lg:text-5xl">
        Sound Test
      </h1>
      <div className="flex flex-grow items-center justify-center">
        {showMainContent && (
          <div
            className={clsx(
              "flex flex-grow items-center justify-center",
              animateOut,
            )}
          >
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

            <DelayedComponent delay={10000}>
              <div className="flex flex-col items-center gap-8 duration-500 animate-in fade-in">
                <p>How many semitones were between the two notes?</p>

                {/* Cheatsheet */}
                <div className="rounded-xl border-2 border-primary/50 p-4">
                  <div className="flex flex-col gap-2 p-2">
                    {intervals.map((interval) => (
                      <div
                        key={interval.difference}
                        className="flex items-center justify-between gap-x-6 text-xs opacity-50"
                      >
                        <button
                          className="underline"
                          onClick={() => {
                            handleSubmit(interval.difference);
                          }}
                        >
                          {interval.name}
                        </button>
                        <div>{interval.difference}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DelayedComponent>
          </div>
        )}
        {showResultMessage && (
          <DelayedComponent
            delay={1000}
            className={clsx(
              "flex flex-col gap-4 duration-1000",
              animateOutResults,
            )}
          >
            <div
              className={clsx(
                "text-4xl",
                correct ? "text-green-800" : "text-red-800",
              )}
            >
              {correct ? "Correct!" : "Incorrect!"}
            </div>
            <div>{resultMessage}</div>
            {sound1 && sound2 && (
              <div className="flex flex-row gap-8 text-sm opacity-50">
                <div>First Note: {sound1.note}</div>
                <div>Second Note: {sound2.note}</div>
                <div>
                  Interval:{" "}
                  {intervals[Math.abs(sound1.reference - sound2.reference)]
                    .name +
                    ` (${Math.abs(sound1.reference - sound2.reference)} semitones)`}
                </div>
              </div>
            )}
            <Button
              onClick={handleRestart}
              variant={"default"}
              className="w-fit rounded-xl duration-1000 animate-in fade-in"
            >
              Play Again
            </Button>
          </DelayedComponent>
        )}
      </div>
    </div>
  );
};

export default Game;
