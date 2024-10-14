import { pointsState } from "@/recoil/pointsAtom";
import { settingsState } from "@/recoil/settingsAtom";
import { shopSettingsState } from "@/recoil/shopSettingsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const RecoilInitializer = () => {
  const [, setPoints] = useRecoilState<number>(pointsState);
  const [settings, setSettings] = useRecoilState(settingsState);
  const [shopSettings, setShopSettings] = useRecoilState(shopSettingsState);

  useEffect(() => {
    if (!localStorage.getItem("points")) {
      localStorage.setItem("points", "0");
    } else {
      setPoints(Number(localStorage.getItem("points")));
    }

    if (!localStorage.getItem("settings")) {
      localStorage.setItem("settings", JSON.stringify(settings));
    } else {
      setSettings(JSON.parse(localStorage.getItem("settings") as string));
    }

    if (!localStorage.getItem("shopSettings")) {
      localStorage.setItem("shopSettings", JSON.stringify(shopSettings));
    } else {
      setShopSettings(
        JSON.parse(localStorage.getItem("shopSettings") as string),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default RecoilInitializer;
