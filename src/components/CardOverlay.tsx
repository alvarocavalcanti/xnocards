import { useEffect, useRef, useState } from "react";
import type { CardType } from "./SPA";
import { CardSVG, CARD_CONFIG } from "./CardPanel";

const DISPLAY_DURATION = 8000; // ms

interface Props {
  card: CardType;
  onDismiss: () => void;
}

export default function CardOverlay({ card, onDismiss }: Props) {
  const cfg = CARD_CONFIG[card];
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    timerRef.current && clearTimeout(timerRef.current);
    setTimeout(onDismiss, 400); // wait for exit animation
  };

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, DISPLAY_DURATION);
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="xnocards-overlay"
      className="overlay-backdrop fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${card} Card played`}
    >
      {/* Dismiss button */}
      <button
        id="xnocards-overlay-dismiss"
        onClick={dismiss}
        className="absolute top-4 right-4 text-white/60 hover:text-white/90 transition-colors text-2xl leading-none focus:outline-none focus:ring-2 focus:ring-white/30 rounded p-1"
        aria-label="Dismiss card"
      >
        ✕
      </button>

      {/* Card — animated entrance / exit */}
      <div
        className={[
          exiting ? "overlay-card-exit" : "overlay-card-enter overlay-card-pulse",
          "flex flex-col items-center gap-6",
        ].join(" ")}
      >
        {/* Large card SVG */}
        <div
          style={{
            filter: `drop-shadow(0 0 40px ${cfg.border}88)`,
          }}
        >
          <CardSVG type={card} size={200} />
        </div>

        {/* Card meaning text */}
        <div className="text-center">
          <p
            className="text-3xl font-bold tracking-wide"
            style={{ color: cfg.textColor, fontFamily: "'Cinzel', serif" }}
          >
            {cfg.label}
          </p>
          <p className="text-base mt-1 text-white/60 tracking-widest uppercase text-sm">
            {cfg.sublabel}
          </p>
        </div>

        {/* Progress bar */}
        {!exiting && (
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
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
