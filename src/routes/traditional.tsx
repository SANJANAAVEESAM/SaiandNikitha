import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * SCRATCH ROUTE — the traditional direction, as a whole page.
 *
 * Maroon and gold, with the ornament drawn rather than photographed: a toranam
 * of mango leaves across the head, kalasham flanking the invocation, a temple
 * arch framing the names, paisley between sections. All SVG, so it stays sharp
 * at any size and costs nothing to download.
 *
 * Names and dates are placeholders.
 */
export const Route = createFileRoute("/traditional")({
  head: () => ({
    meta: [{ title: "Traditional" }, { name: "robots", content: "noindex, nofollow" }],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Marcellus&family=Jost:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Traditional,
});

/* --------------------------------- palette --------------------------------- */

const C = {
  maroon: "#5E0F1E",
  maroonDeep: "#460A16",
  gold: "#CBA135",
  goldLight: "#E7C766",
  turmeric: "#E3A72F",
  cream: "#FBF3E4",
  creamDim: "rgba(251,243,228,0.72)",
};

/* -------------------------------- ornament -------------------------------- */

/** A single mango leaf, hanging. */
function Leaf({ x, h, tilt }: { x: number; h: number; tilt: number }) {
  return (
    <g transform={`translate(${x} 0) rotate(${tilt} 0 0)`}>
      <path
        d={`M0 0 C -5 ${h * 0.35}, -4 ${h * 0.8}, 0 ${h} C 4 ${h * 0.8}, 5 ${h * 0.35}, 0 0 Z`}
        fill={C.gold}
        opacity="0.9"
      />
      <path d={`M0 2 L0 ${h - 3}`} stroke={C.maroonDeep} strokeWidth="0.6" opacity="0.45" />
    </g>
  );
}

/** Toranam — the string of mango leaves hung across a doorway. */
function Toranam({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 21 }, (_, i) => i);
  return (
    <svg viewBox="0 0 320 42" className={className} aria-hidden="true" preserveAspectRatio="none">
      {/* The string dips in the middle, as a hung cord does. */}
      <path d="M0 6 Q160 20 320 6" fill="none" stroke={C.gold} strokeWidth="1.1" opacity="0.75" />
      {leaves.map((i) => {
        const t = i / (leaves.length - 1);
        const x = t * 320;
        // Height of the cord at this point, from the same quadratic.
        const y = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 20 + t * t * 6;
        const h = 15 + Math.sin(t * Math.PI) * 9;
        return (
          <g key={i} transform={`translate(0 ${y})`}>
            <Leaf x={x} h={h} tilt={(t - 0.5) * 26} />
          </g>
        );
      })}
    </svg>
  );
}

/** Kalasham — the pot with a coconut and leaves, set either side of a heading. */
function Kalasham({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 64" className={className} aria-hidden="true" fill="none">
      <g stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* coconut */}
        <ellipse cx="22" cy="12" rx="7" ry="8" />
        {/* leaves flanking it */}
        <path d="M15 12 C 8 8, 4 12, 3 18 C 9 19, 14 17, 15 12 Z" />
        <path d="M29 12 C 36 8, 40 12, 41 18 C 35 19, 30 17, 29 12 Z" />
        {/* the pot */}
        <path d="M13 22 h18 l-2 5 h-14 z" />
        <path d="M15 27 C 8 33, 8 47, 14 54 h16 c6 -7, 6 -21, -1 -27 z" />
        <path d="M12 54 h20 l-2 5 h-16 z" />
        <path d="M13 38 h18" opacity="0.6" />
      </g>
    </svg>
  );
}

/** A paisley with vines, used between sections. */
function Paisley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 26" className={className} aria-hidden="true" fill="none">
      <g stroke={C.gold} strokeWidth="1.1" strokeLinecap="round">
        <path d="M8 13 H74" opacity="0.55" />
        <path d="M126 13 H192" opacity="0.55" />
        {/* the paisley itself */}
        <path d="M100 3 C 112 6, 116 16, 108 21 C 102 24, 94 21, 94 15 C 94 10, 100 8, 103 11" />
        <path d="M100 3 C 88 6, 84 16, 92 21" opacity="0.75" />
        <circle cx="100" cy="14" r="1.6" fill={C.gold} stroke="none" />
        {/* small buds on the rules */}
        <circle cx="80" cy="13" r="1.5" fill={C.gold} stroke="none" opacity="0.8" />
        <circle cx="120" cy="13" r="1.5" fill={C.gold} stroke="none" opacity="0.8" />
      </g>
    </svg>
  );
}

/** The pointed temple arch the hero sits inside. */
function Arch({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[21rem]">
      <div
        className="relative overflow-hidden px-6 pt-16 pb-12"
        style={{
          // A cusped arch: round shoulders rising to a point.
          borderRadius: "50% 50% 14px 14px / 34% 34% 14px 14px",
          background: `linear-gradient(180deg, ${C.maroon}, ${C.maroonDeep})`,
          border: `1px solid ${C.gold}55`,
          boxShadow: `0 26px 60px -28px rgba(0,0,0,0.55), inset 0 0 0 5px ${C.gold}22`,
        }}
      >
        {children}
      </div>
      {/* A second, outer line echoing the arch — the way a carved frame doubles. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2.5"
        style={{
          borderRadius: "50% 50% 18px 18px / 34% 34% 18px 18px",
          border: `1px solid ${C.gold}3a`,
        }}
      />
    </div>
  );
}

/* ---------------------------------- content ---------------------------------- */

const NAMES = { groom: "Vikram", bride: "Ananya" };
const EVENTS = [
  { day: "Friday, 1 January", name: "Mehendi", time: "10:00 AM", venue: "Venue One" },
  { day: "Saturday, 2 January", name: "Sangeet", time: "7:00 PM", venue: "Venue Two" },
  { day: "Sunday, 3 January", name: "Wedding", time: "10:05 AM", venue: "Venue Two" },
];

const eyebrow = {
  fontFamily: "Jost, sans-serif",
  fontSize: "0.6rem",
  fontWeight: 500,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
};

function Traditional() {
  return (
    <main style={{ background: C.cream, fontFamily: "Jost, sans-serif", color: C.maroonDeep }}>
      {/* ------------------------------- the head ------------------------------- */}
      <div style={{ background: C.cream }}>
        <Toranam className="block h-11 w-full" />
      </div>

      <section className="px-6 pt-4 pb-10 text-center">
        <div className="flex items-center justify-center gap-4">
          <Kalasham className="h-12 w-auto opacity-90" />
          <div>
            <p style={{ ...eyebrow, color: C.turmeric }}>Shubhamastu</p>
            <p
              className="mt-2"
              style={{ fontFamily: "Marcellus, serif", fontSize: "1.05rem", color: C.maroon }}
            >
              Sri Vighneshwaraya Namaha
            </p>
          </div>
          <Kalasham className="h-12 w-auto scale-x-[-1] opacity-90" />
        </div>
      </section>

      {/* -------------------------------- the arch -------------------------------- */}
      <section className="px-5 pb-14">
        <Arch>
          <p style={{ ...eyebrow, color: C.goldLight, opacity: 0.85 }}>With the blessings of our elders</p>

          <h1
            className="mt-7"
            style={{ fontFamily: "Marcellus, serif", fontSize: "clamp(2.2rem, 11vw, 2.9rem)", lineHeight: 1.18, color: C.cream }}
          >
            {NAMES.groom}
            <span className="mx-2" style={{ color: C.goldLight, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              &amp;
            </span>
            {NAMES.bride}
          </h1>

          <div className="mt-7 flex justify-center">
            <Paisley className="h-5 w-[13rem] opacity-90" />
          </div>

          <p className="mt-7" style={{ ...eyebrow, color: C.creamDim, letterSpacing: "0.24em" }}>
            27 August 2026
          </p>
          <p
            className="mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: C.goldLight }}
          >
            Muhurtham at 10:05 AM
          </p>
        </Arch>
      </section>

      {/* ------------------------------ the families ------------------------------ */}
      <section className="px-7 pb-14 text-center">
        <p style={{ ...eyebrow, color: C.maroon, opacity: 0.75 }}>Wedding ceremony of</p>

        <p className="mt-6" style={{ fontFamily: "Marcellus, serif", fontSize: "1.75rem", color: C.maroonDeep }}>
          {NAMES.groom} Surname
        </p>
        <p className="mx-auto mt-2 max-w-[17rem]" style={{ fontSize: "0.8rem", opacity: 0.72 }}>
          Son of A &amp; B
        </p>

        <div className="my-7 flex justify-center">
          <Paisley className="h-5 w-[11rem]" />
        </div>

        <p style={{ fontFamily: "Marcellus, serif", fontSize: "1.75rem", color: C.maroonDeep }}>
          {NAMES.bride} Surname
        </p>
        <p className="mx-auto mt-2 max-w-[17rem]" style={{ fontSize: "0.8rem", opacity: 0.72 }}>
          Daughter of C &amp; D
        </p>
      </section>

      {/* ------------------------------- the lineup ------------------------------- */}
      <section
        className="px-6 py-14"
        style={{ background: `linear-gradient(180deg, ${C.maroon}, ${C.maroonDeep})` }}
      >
        <div className="text-center">
          <p style={{ ...eyebrow, color: C.turmeric }}>The celebrations</p>
          <h2 className="mt-3" style={{ fontFamily: "Marcellus, serif", fontSize: "2rem", color: C.cream }}>
            Event Lineup
          </h2>
          <div className="mt-5 flex justify-center">
            <Paisley className="h-5 w-[12rem]" />
          </div>
        </div>

        <div className="relative mt-10 pl-10">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.35rem] w-px"
            style={{ background: `${C.gold}80` }}
          />
          {EVENTS.map((e) => (
            <div key={e.name + e.time} className="relative pb-8 last:pb-0">
              {/* A small gold lamp-flame of a marker rather than a plain dot. */}
              <span
                aria-hidden="true"
                className="absolute size-[10px] rotate-45"
                style={{
                  left: "-2.3rem",
                  marginTop: "0.45rem",
                  background: C.gold,
                  boxShadow: `0 0 0 4px ${C.maroonDeep}`,
                }}
              />
              <p style={{ ...eyebrow, fontSize: "0.58rem", letterSpacing: "0.18em", color: C.turmeric }}>
                {e.day}
              </p>
              <p className="mt-1.5" style={{ fontFamily: "Marcellus, serif", fontSize: "1.4rem", color: C.cream }}>
                {e.name}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: C.goldLight }}>
                {e.time}
              </p>
              <p className="mt-1.5" style={{ fontSize: "0.76rem", color: C.creamDim }}>
                {e.venue}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------- the close -------------------------------- */}
      <section className="px-8 py-16 text-center">
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.5rem", color: C.maroon }}>
          Your presence is our blessing
        </p>
        <div className="mt-7 flex justify-center">
          <Kalasham className="h-14 w-auto" />
        </div>
        <p className="mt-7" style={{ ...eyebrow, fontSize: "0.58rem", color: C.maroonDeep, opacity: 0.6 }}>
          {NAMES.groom} &amp; {NAMES.bride}
        </p>
      </section>

      <div className="rotate-180" style={{ background: C.cream }}>
        <Toranam className="block h-9 w-full opacity-70" />
      </div>
    </main>
  );
}
