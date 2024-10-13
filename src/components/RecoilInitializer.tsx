import { pointsState } from "@/recoil/pointsAtom";
import { shopSettingsState } from "@/recoil/shopSettingsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const RecoilInitializer = () => {
  const [, setPoints] = useRecoilState<number>(pointsState);
  const [shopSettings] = useRecoilState(shopSettingsState);

  useEffect(() => {
    if (!localStorage.getItem("points")) {
      localStorage.setItem("points", "0");
    } else {
      setPoints(Number(localStorage.getItem("points")));
    }
  }, [setPoints]);

  useEffect(() => {
    if (!localStorage.getItem("shopSettings")) {
      localStorage.setItem("shopSettings", JSON.stringify(shopSettings));
    }
  }, [shopSettings]);

  return <></>;
};

export default RecoilInitializer;
