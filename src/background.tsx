import OBR from "@owlbear-rodeo/sdk";
import { BROADCAST_CHANNEL, ID } from "./main";
import type { CardType } from "./components/SPA";

const MODAL_ID = `${ID}/card-overlay`;

OBR.onReady(() => {
  // Listen for card broadcasts from any participant and open the full-screen modal
  OBR.broadcast.onMessage(BROADCAST_CHANNEL, async (event) => {
    const card = event.data as CardType;
    if (card !== "X" && card !== "N" && card !== "O") return;

    // Close any existing overlay first (e.g. rapid card plays)
    await OBR.modal.close(MODAL_ID).catch(() => {});

    await OBR.modal.open({
      id: MODAL_ID,
      url: `/overlay?card=${card}`,
      fullScreen: true,
      hideBackdrop: false,
    });
  });
});
