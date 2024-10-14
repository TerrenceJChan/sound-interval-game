"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  inline?: boolean;
  delay: number;
  removeDelay?: number;
}

const DelayedComponent = ({
  children,
  className,
  inline,
  delay,
  removeDelay,
}: Props) => {
  const [show, setShow] = useState(false);
  const [exitAnimation, setExitAnimation] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, delay);

    if (removeDelay) {
      setTimeout(() => {
        setExitAnimation("duration-1000 opacity-0 transition-all ease-in-out");
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }, removeDelay - 1000);
    }
  }, []);

  return (
    <>
      {show && (
        <div className={clsx(inline && "inline", exitAnimation, className)}>
          {children}
        </div>
      )}
    </>
  );
};

export default DelayedComponent;
