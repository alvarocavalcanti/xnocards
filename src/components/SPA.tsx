import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { BROADCAST_CHANNEL } from "../main";
import { useTheme } from "../hooks/useTheme";
import CardPanel from "./CardPanel";
import CardOverlay from "./CardOverlay";

export type CardType = "X" | "N" | "O";

export default function SPA() {
  useTheme();

  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  /* Listen for card broadcasts from any participant */
  useEffect(() => {
    return OBR.broadcast.onMessage(BROADCAST_CHANNEL, (event) => {
      const card = event.data as CardType;
      if (card === "X" || card === "N" || card === "O") {
        setActiveCard(card);
      }
    });
  }, []);

  const handleDismiss = () => setActiveCard(null);

  return (
    <>
      <CardPanel />
      {activeCard && (
        <CardOverlay card={activeCard} onDismiss={handleDismiss} />
      )}
    </>
  );
}
