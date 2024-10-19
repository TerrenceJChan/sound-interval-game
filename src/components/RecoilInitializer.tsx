import { pointsState } from "@/recoil/pointsAtom";
import { settingsState } from "@/recoil/settingsAtom";
import { shopSettingsState } from "@/recoil/shopSettingsAtom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const RecoilInitializer = () => {
  const [clientLoaded, setClientLoaded] = useState(false);
  const [points, setPoints] = useRecoilState<number>(pointsState);
  const [settings, setSettings] = useRecoilState(settingsState);
  const [shopSettings, setShopSettings] = useRecoilState(shopSettingsState);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  useEffect(() => {
    if (clientLoaded) {
      const storedPoints = localStorage.getItem("points");
      const storedSettings = localStorage.getItem("settings");
      const storedShopSettings = localStorage.getItem("shopSettings");

      if (storedPoints) {
        setPoints(Number(storedPoints));
      }
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
      if (storedShopSettings) {
        setShopSettings(JSON.parse(storedShopSettings));
      }
    }
  }, [clientLoaded]);

  useEffect(() => {
    if (clientLoaded) {
      localStorage["points"] = String(points);
      localStorage["settings"] = JSON.stringify(settings);
      localStorage["shopSettings"] = JSON.stringify(shopSettings);
    }
  }, [points, settings, shopSettings]);

  return <></>;
};

export default RecoilInitializer;
