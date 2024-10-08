"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

const PointsDisplay = ({ className }: Props) => {
  const [points, setPoints] = useState<null | number>(null);
  useEffect(() => {
    if (localStorage.getItem("points")) {
      setPoints(Number(localStorage.getItem("points")));
    }
  }, [points]);
  return (
    <div
      className={clsx(
        "flex flex-row gap-4 transition-all",
        points !== null ? "opacity-80" : "opacity-0",
        className,
      )}
    >
      Points: {points}
    </div>
  );
};

export default PointsDisplay;
