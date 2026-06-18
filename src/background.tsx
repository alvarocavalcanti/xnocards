import OBR from "@owlbear-rodeo/sdk";
import { BROADCAST_CHANNEL, ID } from "./main";
import type { CardType } from "./components/SPA";

console.log("XNOCards: background.tsx script loaded.");

const MODAL_ID = `${ID}/card-overlay`;

OBR.onReady(() => {
  console.log("XNOCards: OBR.onReady in background.tsx triggered.");

  // Listen for card broadcasts from any participant and open the full-screen modal
  OBR.broadcast.onMessage(BROADCAST_CHANNEL, async (event) => {
    console.log("XNOCards: Received broadcast message:", event);
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
    console.log("XNOCards: Modal open call completed.");
  });
});
