"use client";

import { violinSounds } from "@/assets/data/soundMapping";

const Game = () => {
  return (
    <div>
      <p>Game</p>
      <audio autoPlay>
        <source src={violinSounds[0].sound} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Game;
