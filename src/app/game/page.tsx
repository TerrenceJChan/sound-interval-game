"use client";

import { intervals } from "@/assets/data/intervals";
import {
  standardMessagesFailure,
  standardMessagesSuccess,
} from "@/assets/data/result-messages/standardMessages";
import { violinSounds } from "@/assets/data/soundMapping";
import DescriptionTooltip from "@/components/DescriptionTooltip";
import { Button } from "@/components/ui/button";
import { Difficulty } from "@/enums/difficulty";
import { Instrument } from "@/enums/instrument";
import { pointsState } from "@/recoil/pointsAtom";
import { settingsState } from "@/recoil/settingsAtom";
import { shopSettingsState } from "@/recoil/shopSettingsAtom";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import DelayedComponent from "../../components/DelayedComponent";

const Game = () => {
  const [points, setPoints] = useRecoilState<number>(pointsState);
  const [settings, setSettings] = useRecoilState(settingsState);
  const [shopSettings] = useRecoilState(shopSettingsState);
  const [showSettings, setShowSettings] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showResultMessage, setShowResultMessage] = useState(false);
  const [correct, setCorrect] = useState<null | boolean>(null);
  const [resultMessage, setResultMessage] = useState("");
  const [animateOutSettings, setAnimateOutSettings] =
    useState("animate-in fade-in");
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

  const handleDifficultyChange = (setting: Difficulty) => {
    if (
      shopSettings.difficulty.find((difficulty) => difficulty.name === setting)
        ?.purchased
    ) {
      setSettings({
        ...settings,
        difficulty: setting,
      });
    }
  };

  const handleInstrumentChange = (setting: Instrument) => {
    if (
      shopSettings.difficulty.find((difficulty) => difficulty.name === setting)
        ?.purchased
    ) {
      setSettings({
        ...settings,
        instrument: setting,
      });
    }
  };

  const handleStart = () => {
    setAnimateOutSettings("opacity-0 duration-1000 transition-all ease-in-out");
    setTimeout(() => {
      setShowSettings(false);
      setShowMainContent(true);
    }, 1000);
  };

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
    const pickSounds = () => {
      const difficulty = settings.difficulty;
      const difficultyRange = () => {
        switch (difficulty) {
          case "beginner":
            return 7;
          case "intermediate":
            return 10;
          case "advanced":
            return 13;
          default:
            return 4;
        }
      };

      const randomIndex1 = Math.floor(Math.random() * violinSounds.length);
      let randomIndex2: number;
      const semiRandomizer = () => {
        const semiRandomIndex = Math.floor(
          Math.random() * difficultyRange() + 1,
        );

        if (semiRandomIndex + randomIndex1 > violinSounds.length) {
          randomIndex2 = Math.abs(semiRandomIndex - randomIndex1);
        } else {
          randomIndex2 = semiRandomIndex + randomIndex1;
        }

        if (Math.random() < 0.5) {
          setSoundIndex1(violinSounds[randomIndex1]);
          setSoundIndex2(violinSounds[randomIndex2]);
        } else {
          setSoundIndex1(violinSounds[randomIndex2]);
          setSoundIndex2(violinSounds[randomIndex1]);
        }

        console.log(randomIndex1, randomIndex2);
      };

      semiRandomizer();
    };
    pickSounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.difficulty]);

  return (
    <div className="flex w-full flex-grow flex-col">
      <h1 className="p-8 text-center text-3xl font-bold lg:text-5xl">
        Sound Test
      </h1>
      <div className="flex flex-grow items-center justify-center">
        {showSettings && (
          <div
            className={clsx(
              "flex w-fit flex-grow flex-col items-center justify-center gap-4",
              animateOutSettings,
            )}
          >
            <div className="flex flex-col gap-4 rounded-xl border-4 border-border bg-border/15 p-4 transition-all hover:bg-border/50">
              <h2 className="px-1 text-3xl font-semibold">Settings</h2>
              <div className="flex flex-row items-center gap-1">
                <div className="p-2 font-semibold">Difficulty: </div>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Allows intervals up to and including major third (4
                        semitones).
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleDifficultyChange("starter")}
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.difficulty === "starter"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Starter
                  </Button>
                </DescriptionTooltip>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Allows intervals up to and including perfect fifth (7
                        semitones).
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleDifficultyChange("beginner")}
                    disabled={
                      !shopSettings.difficulty.find(
                        (difficulty) => difficulty.name === "beginner",
                      )?.purchased
                    }
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.difficulty === "beginner"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Beginner
                  </Button>
                </DescriptionTooltip>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Allows intervals up to and including major sixths (10
                        semitones).
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleDifficultyChange("intermediate")}
                    disabled={
                      !shopSettings.difficulty.find(
                        (difficulty) => difficulty.name === "intermediate",
                      )?.purchased
                    }
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.difficulty === "intermediate"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Intermediate
                  </Button>
                </DescriptionTooltip>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Changes the instrument to a violin.
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleDifficultyChange("advanced")}
                    disabled={
                      !shopSettings.difficulty.find(
                        (difficulty) => difficulty.name === "advanced",
                      )?.purchased
                    }
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.difficulty === "advanced"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Advanced
                  </Button>
                </DescriptionTooltip>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-2 font-semibold">Instrument: </div>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Allows intervals up to and including major third (5
                        semitones).
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleInstrumentChange("violin")}
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.instrument === "violin"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Violin
                  </Button>
                </DescriptionTooltip>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Changes the instrument to a xylophone.
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleInstrumentChange("xylophone")}
                    disabled={
                      !shopSettings.instrument.find(
                        (instrument) => instrument.name === "xylophone",
                      )?.purchased
                    }
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.instrument === "xylophone"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Xylophone
                  </Button>
                </DescriptionTooltip>
                <DescriptionTooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">
                        Changes the instrument to a flute.
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => handleInstrumentChange("flute")}
                    disabled={
                      !shopSettings.instrument.find(
                        (instrument) => instrument.name === "flute",
                      )?.purchased
                    }
                    className={clsx(
                      "rounded-xl p-2 underline decoration-dotted transition-all",
                      settings.instrument === "flute"
                        ? "bg-accent"
                        : "hover:bg-yellow-100/10",
                    )}
                  >
                    Flute
                  </Button>
                </DescriptionTooltip>
              </div>
            </div>
            <Button onClick={handleStart} className="w-fit rounded-xl px-10">
              Begin Test
            </Button>
          </div>
        )}

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
