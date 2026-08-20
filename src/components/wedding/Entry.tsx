import { useEffect, useRef, useState } from "react";

import backdrop from "@/assets/backdrop.jpg";
import { COUPLE_AMP, COUPLE_AND } from "./data";
import { startMusic } from "@/lib/music";

/**
 * The way in: the illustration behind glass, and a tap to go through.
 *
 * The glass is deliberately thin. An earlier version blurred at twenty pixels
 * behind a two-thirds veil, which did not soften the couple so much as delete
 * them — and since the picture behind it is a picture of them, that left the
 * screen with nothing to be about. At this weight they read clearly and the
 * glass still reads as glass.
 *
 * The tap matters beyond the animation: browsers will not start audio without
 * a user gesture, and this is the first one available.
 */
export function Entry({ onOpened }: { onOpened: () => void }) {
  const [going, setGoing] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = () => {
    if (going) return;
    setGoing(true);
    startMusic();
    // Long enough for the glass to lift before the hero takes over.
    timer.current = window.setTimeout(onOpened, 520);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Open the invitation"
      // Pointer-down rather than click: Safari holds a tap on a plain element
      // while it decides whether a double-tap is coming, which reads as the
      // first tap doing nothing. It still counts as the gesture audio needs.
      onPointerDown={go}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
      className="relative h-full w-full overflow-hidden outline-none"
      style={{
        cursor: going ? "default" : "pointer",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Opaque base, so nothing shows through before the illustration decodes. */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--background)" }} />

      <img
        src={backdrop}
        alt={COUPLE_AND}
        width={850}
        height={1277}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          transform: going ? "scale(1.04)" : "scale(1)",
          transition: "transform 900ms cubic-bezier(.16,1,.3,1)",
        }}
      />

      {/* The glass. Thin enough to see them through. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(6px) saturate(0.95)",
          WebkitBackdropFilter: "blur(6px)",
          background: "color-mix(in oklab, var(--background) 38%, transparent)",
          opacity: going ? 0 : 1,
          transition: "opacity 520ms ease",
        }}
      />

      {/* A pool of light under the type — the illustration is busy exactly where
          the names sit, and the glass alone does not give them a ground. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(62% 30% at 50% 62%, color-mix(in oklab, var(--background) 78%, transparent), transparent 72%)",
          opacity: going ? 0 : 1,
          transition: "opacity 420ms ease",
        }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        style={{
          opacity: going ? 0 : 1,
          transform: going ? "translateY(-10px)" : "translateY(0)",
          transition: "opacity 420ms ease, transform 520ms ease",
        }}
      >
        <p className="font-body text-[0.58rem] font-medium tracking-[0.34em] uppercase text-bronze-deep">
          Together with their families
        </p>

        <h1
          className="mt-6 font-display leading-[1.06] text-ink-strong"
          style={{ fontSize: "clamp(2.3rem, 12vw, 3.2rem)", fontWeight: 400, letterSpacing: "-0.015em" }}
        >
          {COUPLE_AMP}
        </h1>

        <span
          aria-hidden="true"
          className="mt-7 h-px w-20"
          style={{ background: "var(--gradient-gold)" }}
        />
      </div>

      <div
        className="absolute inset-x-0 flex justify-center"
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 8vh)",
          opacity: going ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: going ? "none" : "auto",
        }}
      >
        <span className="glass animate-cta-pulse rounded-full px-9 py-4 ring-1 ring-white/60">
          <span className="font-body text-[0.64rem] font-medium tracking-[0.3em] uppercase text-bronze-deep">
            Open Invitation
          </span>
        </span>
      </div>
    </div>
  );
}
