import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import OBRLoading from "./OBRLoading";
import SPA from "./SPA";

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    OBR.scene.isReady().then(setSceneReady);
    return OBR.scene.onReadyChange(setSceneReady);
  }, []);

  return sceneReady ? <SPA /> : <OBRLoading />;
}
