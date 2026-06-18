import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import CardPanel from "./CardPanel";
import { BROADCAST_CHANNEL, ID } from "../utils";

export type CardType = "X" | "N" | "O";

const MODAL_ID = `${ID}/card-overlay`;

export default function SPA() {
  useTheme();

  useEffect(() => {
    console.log("XNOCards: SPA mounted, registering broadcast listener on channel:", BROADCAST_CHANNEL);
    
    let isSubscribed = true;
    let unsubscribe: (() => void) | undefined;

    OBR.onReady(() => {
      if (!isSubscribed) return;

      console.log("XNOCards: OBR is ready in SPA.tsx, setting up broadcast listener.");
      
      unsubscribe = OBR.broadcast.onMessage(BROADCAST_CHANNEL, async (event) => {
        console.log("XNOCards: SPA received broadcast message:", event);
        const card = event.data as CardType;
        if (card !== "X" && card !== "N" && card !== "O") {
          console.warn("XNOCards: Ignored invalid card type:", card);
          return;
        }

        console.log("XNOCards: Opening modal for card:", card);

        // Close any existing overlay first (e.g. rapid card plays)
        await OBR.modal.close(MODAL_ID).catch(() => {});

        await OBR.modal.open({
          id: MODAL_ID,
          url: `/overlay.html?card=${card}`,
          fullScreen: true,
          hideBackdrop: false,
        });
        console.log("XNOCards: Modal open call completed in SPA.");
      });
    });

    return () => {
      isSubscribed = false;
      if (unsubscribe) {
        console.log("XNOCards: Cleaning up broadcast listener in SPA.");
        unsubscribe();
      }
    };
  }, []);

  return <CardPanel />;
}
