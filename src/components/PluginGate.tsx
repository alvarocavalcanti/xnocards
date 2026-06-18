import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import OBRLoading from "./OBRLoading";
import App from "./App";

export default function PluginGate() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (OBR.isAvailable) {
      OBR.onReady(() => setAvailable(true));
    }
  }, []);

  return available ? <App /> : <OBRLoading />;
}
