import { useEffect } from "react";
import OBR from "@owlbear-rodeo/sdk";

export function useTheme() {
  useEffect(() => {
    OBR.theme.getTheme().then((theme) => {
      applyTheme(theme.mode);
    });
    return OBR.theme.onChange((theme) => {
      applyTheme(theme.mode);
    });
  }, []);
}

function applyTheme(mode: string) {
  document.documentElement.classList.toggle("dark", mode === "DARK");
}
