import { pointsState } from "@/recoil/pointsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const RecoilInitializer = () => {
  const [, setPoints] = useRecoilState<number>(pointsState);

  useEffect(() => {
    if (!localStorage.getItem("points")) {
      localStorage.setItem("points", "0");
    } else {
      setPoints(Number(localStorage.getItem("points")));
    }
  }, [setPoints]);

  return <></>;
};

export default RecoilInitializer;
