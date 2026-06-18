import { useState, useCallback } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { BROADCAST_CHANNEL } from "../main";
import { analytics } from "../utils";
import type { CardType } from "./SPA";

/* ============================================================
   Playing-card SVG for X, N, O
   ============================================================ */

interface CardConfig {
  letter: string;
  label: string;
  sublabel: string;
  fill: string;
  border: string;
  textColor: string;
  glowClass: string;
  btnClass: string;
}

const CARD_CONFIG: Record<CardType, CardConfig> = {
  X: {
    letter: "X",
    label: "Stop",
    sublabel: "Change or rewind",
    fill: "#1e0505",
    border: "#ef4444",
    textColor: "#fca5a5",
    glowClass: "card-btn-x",
    btnClass: "hover:border-red-500 focus:ring-red-500",
  },
  N: {
    letter: "N",
    label: "Slow down",
    sublabel: "Fade to black",
    fill: "#1c1505",
    border: "#f59e0b",
    textColor: "#fcd34d",
    glowClass: "card-btn-n",
    btnClass: "hover:border-amber-500 focus:ring-amber-500",
  },
  O: {
    letter: "O",
    label: "Check in",
    sublabel: "Everyone OK?",
    fill: "#031a0a",
    border: "#22c55e",
    textColor: "#86efac",
    glowClass: "card-btn-o",
    btnClass: "hover:border-green-500 focus:ring-green-500",
  },
};

function CardSVG({ type, size = 80 }: { type: CardType; size?: number }) {
  const cfg = CARD_CONFIG[type];
  const w = size;
  const h = Math.round(size * 1.4);
  const r = Math.round(size * 0.1);
  const fontSize = Math.round(size * 0.52);
  const pipSize = Math.round(size * 0.18);
  const pipOffset = Math.round(size * 0.08);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${cfg.letter} Card — ${cfg.label}`}
      role="img"
    >
      {/* Card body */}
      <rect
        x="2"
        y="2"
        width={w - 4}
        height={h - 4}
        rx={r}
        ry={r}
        fill={cfg.fill}
        stroke={cfg.border}
        strokeWidth="2.5"
      />
      {/* Inner border glow */}
      <rect
        x="5"
        y="5"
        width={w - 10}
        height={h - 10}
        rx={r - 2}
        ry={r - 2}
        fill="none"
        stroke={cfg.border}
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Corner pips — top-left */}
      <text
        x={pipOffset}
        y={pipOffset + pipSize}
        fontSize={pipSize}
        fontFamily="'Cinzel', serif"
        fontWeight="700"
        fill={cfg.textColor}
        opacity="0.75"
      >
        {cfg.letter}
      </text>

      {/* Corner pips — bottom-right (rotated) */}
      <text
        x={w - pipOffset}
        y={h - pipOffset}
        fontSize={pipSize}
        fontFamily="'Cinzel', serif"
        fontWeight="700"
        fill={cfg.textColor}
        opacity="0.75"
        textAnchor="end"
        dominantBaseline="auto"
      >
        {cfg.letter}
      </text>

      {/* Main letter */}
      <text
        x={w / 2}
        y={h / 2 - 4}
        fontSize={fontSize}
        fontFamily="'Cinzel', serif"
        fontWeight="700"
        fill={cfg.textColor}
        textAnchor="middle"
        dominantBaseline="middle"
        className="card-letter"
      >
        {cfg.letter}
      </text>

      {/* Sub-label */}
      <text
        x={w / 2}
        y={h * 0.78}
        fontSize={Math.round(size * 0.1)}
        fontFamily="'Inter', sans-serif"
        fontWeight="500"
        fill={cfg.textColor}
        textAnchor="middle"
        opacity="0.8"
        letterSpacing="0.5"
      >
        {cfg.label.toUpperCase()}
      </text>
    </svg>
  );
}

/* ============================================================
   Card Panel — the popover content
   ============================================================ */

export default function CardPanel() {
  const [sent, setSent] = useState<CardType | null>(null);

  const handleCardClick = useCallback(async (card: CardType) => {
    analytics.track("card_played", { card });
    await OBR.broadcast.sendMessage(BROADCAST_CHANNEL, card, {
      destination: "ALL",
    });
    setSent(card);
    setTimeout(() => setSent(null), 1500);
  }, []);

  return (
    <div className="flex flex-col h-full select-none p-3 dark:bg-gray-900 bg-gray-50">
      {/* Header */}
      <div className="mb-3 text-center">
        <h1 className="text-sm font-semibold tracking-wide dark:text-slate-200 text-slate-700 uppercase">
          Safety Cards
        </h1>
        <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">
          Click a card — it's anonymous
        </p>
      </div>

      {/* Cards row */}
      <div className="flex items-center justify-center gap-4 flex-1">
        {(["X", "N", "O"] as CardType[]).map((card) => {
          const cfg = CARD_CONFIG[card];
          const isSent = sent === card;
          return (
            <button
              key={card}
              id={`xnocards-btn-${card.toLowerCase()}`}
              onClick={() => handleCardClick(card)}
              className={[
                "relative cursor-pointer rounded-lg border-2 p-1 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-1",
                "active:scale-95",
                cfg.glowClass,
                cfg.btnClass,
                "dark:border-gray-700 border-gray-300",
                isSent ? "sent-flash scale-110" : "hover:scale-105",
              ].join(" ")}
              title={`${card} Card — ${cfg.label}`}
              aria-label={`Play ${card} Card: ${cfg.label}`}
            >
              <CardSVG type={card} size={72} />
              {isSent && (
                <div
                  className="absolute inset-0 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.55)" }}
                >
                  <span className="text-white text-xs font-semibold tracking-widest uppercase">
                    Sent!
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-3 gap-1 text-center">
        <span className="text-xs text-red-400">Stop / Rewind</span>
        <span className="text-xs text-amber-400">Slow down</span>
        <span className="text-xs text-green-400">Check in</span>
      </div>
    </div>
  );
}

export { CardSVG, CARD_CONFIG };
