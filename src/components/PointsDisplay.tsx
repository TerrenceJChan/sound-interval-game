"use client";

import { pointsState } from "@/recoil/pointsAtom";
import clsx from "clsx";
import { useRecoilState } from "recoil";

interface Props {
  className?: string;
}

const PointsDisplay = ({ className }: Props) => {
  const [points] = useRecoilState<number>(pointsState);

  return (
    <div
      className={clsx(
        "flex flex-row gap-4 transition-all",
        points !== null && points > 0 ? "opacity-80" : "opacity-0",
        className,
      )}
    >
      Points: {points}
    </div>
  );
};

export default PointsDisplay;
