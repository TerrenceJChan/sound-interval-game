import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  delay: number;
}

const DelayedComponent = ({ children, delay }: Props) => {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, delay);

  return <>{show && children}</>;
};

export default DelayedComponent;
