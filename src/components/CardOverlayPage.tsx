import { useEffect, useRef, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { ID } from "../utils";
import { CardSVG, CARD_CONFIG } from "./CardPanel";
import type { CardType } from "./SPA";

const MODAL_ID = `${ID}/card-overlay`;
const DISPLAY_DURATION = 8000;

function getCardFromUrl(): CardType | null {
  const params = new URLSearchParams(window.location.search);
  const card = params.get("card");
  if (card === "X" || card === "N" || card === "O") return card;
  return null;
}

export default function CardOverlayPage() {
  const card = getCardFromUrl();
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    timerRef.current && clearTimeout(timerRef.current);
    OBR.onReady(() => {
      setTimeout(() => OBR.modal.close(MODAL_ID), 400);
    });
  };

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, DISPLAY_DURATION);
    return () => { timerRef.current && clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!card) return null;
  const cfg = CARD_CONFIG[card];

  return (
    <div
      id="xnocards-overlay"
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${card} Card played`}
    >
      {/* Dismiss button */}
      <button
        id="xnocards-overlay-dismiss"
        onClick={dismiss}
        className="absolute top-4 right-4 text-white/50 hover:text-white/90 transition-colors text-3xl leading-none focus:outline-none rounded p-2"
        aria-label="Dismiss card"
      >
        ✕
      </button>

      {/* Card content */}
      <div
        className={[
          "flex flex-col items-center gap-8",
          exiting ? "overlay-card-exit" : "overlay-card-enter overlay-card-pulse",
        ].join(" ")}
      >
        <CardSVG type={card} size={220} />

        <div className="text-center">
          <p
            className="text-4xl font-bold tracking-wide"
            style={{ color: cfg.textColor, fontFamily: "'Cinzel', serif" }}
          >
            {cfg.label}
          </p>
          <p className="text-sm mt-2 uppercase tracking-widest text-white/50">
            {cfg.sublabel}
          </p>
        </div>

        {/* Progress bar */}
        {!exiting && (
          <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full progress-drain"
              style={{
                background: cfg.border,
                animationDuration: `${DISPLAY_DURATION}ms`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
