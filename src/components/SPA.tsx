import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import CardPanel from "./CardPanel";

export type CardType = "X" | "N" | "O";

export default function SPA() {
  useTheme();

  useEffect(() => {
    OBR.onReady(() => {
      // nothing extra needed — overlay is handled by the background page
    });
  }, []);

  return <CardPanel />;
}
