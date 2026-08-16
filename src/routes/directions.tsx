import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

/**
 * SCRATCH ROUTE — visual directions for the invitation, at phone size.
 *
 * Each one is a whole identity, not a colour swap: typeface pairing, palette,
 * how an ornament behaves, how much air there is, whether photography leads or
 * type does. The words and dates are placeholders.
 *
 * Delete once a direction is chosen.
 */
export const Route = createFileRoute("/directions")({
  validateSearch: (search: Record<string, unknown>) => ({
    d: typeof search.d === "string" ? search.d.toUpperCase() : "A",
  }),
  head: () => ({
    meta: [{ title: "Design directions" }, { name: "robots", content: "noindex, nofollow" }],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300&family=Instrument+Serif:ital@0;1&family=Italiana&family=Jost:wght@300;400;500&family=Karla:wght@300;400;500;600&family=Inter:wght@300;400;500&family=Marcellus&family=Parisienne&display=swap",
      },
    ],
  }),
  component: Directions,
});

/* ------------------------------- the content ------------------------------- */

const NAMES = { a: "Ananya", b: "Vikram" };
const DATE_LONG = "From 15th to 27th August 2026";
const DATE_SHORT = "15 – 27 August 2026";
const EVENTS = [
  { day: "Friday, 1 January", name: "Mehendi", time: "10:00 AM", venue: "Venue One" },
  { day: "Saturday, 2 January", name: "Sangeet", time: "7:00 PM", venue: "Venue Two" },
  { day: "Sunday, 3 January", name: "Wedding", time: "10:05 AM", venue: "Venue Two" },
];

/* -------------------------------- the shell -------------------------------- */

type Skin = {
  key: string;
  name: string;
  note: string;
  /** Everything a direction needs, as CSS custom properties. */
  vars: CSSProperties;
  /** Painted behind the hero. */
  hero: ReactNode;
  ornament?: ReactNode;
};

/** A hairline that fades at both ends. */
function Rule({ color = "var(--d-line)", w = "100%" }: { color?: string; w?: string }) {
  return (
    <span
      aria-hidden="true"
      className="block h-px"
      style={{ width: w, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    />
  );
}

/** A small diamond, for the directions that want a mark between things. */
function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto block size-1.5 rotate-45"
      style={{ background: "var(--d-accent)" }}
    />
  );
}

function Sampler({ skin }: { skin: Skin }) {
  return (
    <div style={{ ...skin.vars, background: "var(--d-bg)", color: "var(--d-ink)" }}>
      {/* Hero */}
      <section className="relative flex h-[86dvh] flex-col items-center justify-center overflow-hidden px-8 text-center">
        {skin.hero}
        <div className="relative">
          <p
            className="font-[var(--d-body)]"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "var(--d-muted)",
            }}
          >
            Together with their families
          </p>

          <h1
            className="font-[var(--d-display)]"
            style={{
              marginTop: "1.6rem",
              fontSize: "var(--d-h1)",
              lineHeight: 1.02,
              fontWeight: "var(--d-h1-weight)" as never,
              fontStyle: "var(--d-h1-style)" as never,
              letterSpacing: "var(--d-h1-track)" as never,
              color: "var(--d-ink)",
            }}
          >
            {NAMES.a}
            <span style={{ color: "var(--d-accent)" }}> &amp; </span>
            {NAMES.b}
          </h1>

          <div className="mt-8 flex flex-col items-center gap-4">
            {skin.ornament ?? <Rule w="5rem" />}
            <p
              className="font-[var(--d-body)]"
              style={{
                fontSize: "0.66rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--d-muted)",
              }}
            >
              {DATE_SHORT}
            </p>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-8 font-[var(--d-body)]"
          style={{ fontSize: "0.56rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--d-muted)" }}
        >
          Scroll
        </span>
      </section>

      {/* An invitation line, to see the display face at a middle size */}
      <section className="px-8 py-16 text-center">
        <p
          className="font-[var(--d-body)]"
          style={{ fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--d-accent-deep)" }}
        >
          Wedding ceremony of
        </p>
        <p
          className="mx-auto mt-6 font-[var(--d-display)]"
          style={{ fontSize: "1.9rem", lineHeight: 1.15, fontStyle: "var(--d-h1-style)" as never }}
        >
          {NAMES.b} Surname
        </p>
        <p className="mx-auto mt-2 max-w-[16rem] font-[var(--d-body)]" style={{ fontSize: "0.78rem", color: "var(--d-muted)" }}>
          Son of A &amp; B
        </p>
        <p className="my-6 font-[var(--d-script)]" style={{ fontSize: "1.7rem", color: "var(--d-accent)" }}>
          &amp;
        </p>
        <p className="mx-auto font-[var(--d-display)]" style={{ fontSize: "1.9rem", lineHeight: 1.15, fontStyle: "var(--d-h1-style)" as never }}>
          {NAMES.a} Surname
        </p>
        <p className="mx-auto mt-2 max-w-[16rem] font-[var(--d-body)]" style={{ fontSize: "0.78rem", color: "var(--d-muted)" }}>
          Daughter of C &amp; D
        </p>
        <div className="mt-9 flex justify-center">{skin.ornament ?? <Rule w="6rem" />}</div>
      </section>

      {/* The lineup, to see how a list behaves */}
      <section className="px-7 pb-20">
        <div className="text-center">
          <p
            className="font-[var(--d-body)]"
            style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--d-accent-deep)" }}
          >
            The celebrations
          </p>
          <h2 className="mt-3 font-[var(--d-display)]" style={{ fontSize: "2rem", lineHeight: 1 }}>
            Event Lineup
          </h2>
        </div>

        <div className="relative mt-10 pl-9">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.3rem] w-px"
            style={{ background: "var(--d-line)" }}
          />
          {EVENTS.map((e) => (
            <div key={e.name} className="relative pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute size-[9px] -translate-x-1/2 rounded-full"
                style={{ left: "-2.95rem", marginTop: "0.4rem", background: "var(--d-accent)", boxShadow: "0 0 0 4px var(--d-bg)" }}
              />
              <p
                className="font-[var(--d-body)]"
                style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--d-accent-deep)" }}
              >
                {e.day}
              </p>
              <p className="mt-1.5 font-[var(--d-display)]" style={{ fontSize: "1.5rem", lineHeight: 1.1 }}>
                {e.name}
              </p>
              <p className="font-[var(--d-display)]" style={{ fontSize: "1rem", color: "var(--d-muted)" }}>
                {e.time}
              </p>
              <p className="mt-2 font-[var(--d-body)]" style={{ fontSize: "0.76rem", color: "var(--d-muted)" }}>
                {e.venue}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <span
            className="font-[var(--d-body)]"
            style={{
              display: "inline-block",
              borderRadius: "var(--d-radius)",
              padding: "0.95rem 2rem",
              fontSize: "0.6rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              background: "var(--d-btn-bg)",
              color: "var(--d-btn-ink)",
              border: "1px solid var(--d-btn-border)",
            }}
          >
            {DATE_LONG}
          </span>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------- directions ------------------------------- */

const wash = (from: string, to: string) => (
  <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${from}, ${to})` }} />
);

const SKINS: Skin[] = [
  {
    key: "A",
    name: "Cream & gold",
    note: "Warm, traditional, close to what you have",
    vars: {
      "--d-bg": "oklch(0.965 0.012 80)",
      "--d-ink": "oklch(0.18 0.015 60)",
      "--d-muted": "oklch(0.5 0.03 65)",
      "--d-accent": "oklch(0.72 0.075 85)",
      "--d-accent-deep": "oklch(0.4 0.1 62)",
      "--d-line": "oklch(0.72 0.075 85 / 0.6)",
      "--d-display": "'Cormorant Garamond', serif",
      "--d-body": "Karla, sans-serif",
      "--d-script": "Parisienne, cursive",
      "--d-h1": "clamp(2.6rem, 13vw, 3.6rem)",
      "--d-h1-weight": 400,
      "--d-h1-style": "italic",
      "--d-h1-track": "0",
      "--d-radius": "999px",
      "--d-btn-bg": "transparent",
      "--d-btn-ink": "oklch(0.4 0.1 62)",
      "--d-btn-border": "oklch(0.72 0.075 85 / 0.7)",
    } as CSSProperties,
    hero: wash("oklch(0.98 0.014 85)", "oklch(0.94 0.02 80)"),
  },
  {
    key: "B",
    name: "Ink on paper",
    note: "Editorial and spare — no gold at all",
    vars: {
      "--d-bg": "oklch(0.975 0.004 90)",
      "--d-ink": "oklch(0.14 0.005 60)",
      "--d-muted": "oklch(0.48 0.006 60)",
      "--d-accent": "oklch(0.14 0.005 60)",
      "--d-accent-deep": "oklch(0.3 0.006 60)",
      "--d-line": "oklch(0.14 0.005 60 / 0.35)",
      "--d-display": "'Instrument Serif', serif",
      "--d-body": "Inter, sans-serif",
      "--d-script": "'Instrument Serif', serif",
      "--d-h1": "clamp(3rem, 15vw, 4.2rem)",
      "--d-h1-weight": 400,
      "--d-h1-style": "normal",
      "--d-h1-track": "-0.02em",
      "--d-radius": "2px",
      "--d-btn-bg": "oklch(0.14 0.005 60)",
      "--d-btn-ink": "oklch(0.98 0 0)",
      "--d-btn-border": "oklch(0.14 0.005 60)",
    } as CSSProperties,
    hero: wash("oklch(0.985 0.004 90)", "oklch(0.955 0.005 90)"),
    ornament: <Rule w="3rem" color="oklch(0.14 0.005 60 / 0.5)" />,
  },
  {
    key: "C",
    name: "Emerald & brass",
    note: "Dark, jewelled, evening",
    vars: {
      "--d-bg": "oklch(0.22 0.045 165)",
      "--d-ink": "oklch(0.95 0.02 90)",
      "--d-muted": "oklch(0.72 0.03 120)",
      "--d-accent": "oklch(0.78 0.11 85)",
      "--d-accent-deep": "oklch(0.82 0.1 85)",
      "--d-line": "oklch(0.78 0.11 85 / 0.5)",
      "--d-display": "Marcellus, serif",
      "--d-body": "Jost, sans-serif",
      "--d-script": "Parisienne, cursive",
      "--d-h1": "clamp(2.5rem, 12.5vw, 3.4rem)",
      "--d-h1-weight": 400,
      "--d-h1-style": "normal",
      "--d-h1-track": "0.01em",
      "--d-radius": "999px",
      "--d-btn-bg": "transparent",
      "--d-btn-ink": "oklch(0.85 0.1 85)",
      "--d-btn-border": "oklch(0.78 0.11 85 / 0.6)",
    } as CSSProperties,
    hero: wash("oklch(0.26 0.05 165)", "oklch(0.19 0.04 165)"),
    ornament: <Diamond />,
  },
  {
    key: "D",
    name: "Blush & terracotta",
    note: "Soft and hand-made, botanical",
    vars: {
      "--d-bg": "oklch(0.965 0.018 40)",
      "--d-ink": "oklch(0.28 0.05 30)",
      "--d-muted": "oklch(0.53 0.05 35)",
      "--d-accent": "oklch(0.62 0.13 40)",
      "--d-accent-deep": "oklch(0.5 0.12 38)",
      "--d-line": "oklch(0.62 0.13 40 / 0.45)",
      "--d-display": "Fraunces, serif",
      "--d-body": "Karla, sans-serif",
      "--d-script": "Parisienne, cursive",
      "--d-h1": "clamp(2.5rem, 12.5vw, 3.4rem)",
      "--d-h1-weight": 300,
      "--d-h1-style": "italic",
      "--d-h1-track": "-0.01em",
      "--d-radius": "999px",
      "--d-btn-bg": "oklch(0.62 0.13 40 / 0.12)",
      "--d-btn-ink": "oklch(0.45 0.12 38)",
      "--d-btn-border": "oklch(0.62 0.13 40 / 0.4)",
    } as CSSProperties,
    hero: wash("oklch(0.975 0.02 45)", "oklch(0.93 0.03 35)"),
    ornament: <Diamond />,
  },
  {
    key: "E",
    name: "Midnight & silver",
    note: "Cool, modern, high contrast",
    vars: {
      "--d-bg": "oklch(0.17 0.012 260)",
      "--d-ink": "oklch(0.96 0.002 260)",
      "--d-muted": "oklch(0.68 0.012 260)",
      "--d-accent": "oklch(0.82 0.02 250)",
      "--d-accent-deep": "oklch(0.75 0.02 250)",
      "--d-line": "oklch(0.85 0.01 250 / 0.4)",
      "--d-display": "Italiana, serif",
      "--d-body": "Inter, sans-serif",
      "--d-script": "Italiana, serif",
      "--d-h1": "clamp(2.7rem, 13.5vw, 3.8rem)",
      "--d-h1-weight": 400,
      "--d-h1-style": "normal",
      "--d-h1-track": "0.06em",
      "--d-radius": "2px",
      "--d-btn-bg": "transparent",
      "--d-btn-ink": "oklch(0.9 0.01 250)",
      "--d-btn-border": "oklch(0.85 0.01 250 / 0.5)",
    } as CSSProperties,
    hero: wash("oklch(0.21 0.014 260)", "oklch(0.14 0.01 260)"),
    ornament: <Rule w="4rem" color="oklch(0.85 0.01 250 / 0.6)" />,
  },
  {
    key: "F",
    name: "Sand & olive",
    note: "Earthy and quiet, the coastal one",
    vars: {
      "--d-bg": "oklch(0.955 0.016 95)",
      "--d-ink": "oklch(0.26 0.03 130)",
      "--d-muted": "oklch(0.51 0.03 125)",
      "--d-accent": "oklch(0.58 0.07 135)",
      "--d-accent-deep": "oklch(0.44 0.07 135)",
      "--d-line": "oklch(0.58 0.07 135 / 0.45)",
      "--d-display": "Fraunces, serif",
      "--d-body": "Jost, sans-serif",
      "--d-script": "Parisienne, cursive",
      "--d-h1": "clamp(2.5rem, 12.5vw, 3.4rem)",
      "--d-h1-weight": 400,
      "--d-h1-style": "normal",
      "--d-h1-track": "-0.015em",
      "--d-radius": "999px",
      "--d-btn-bg": "oklch(0.58 0.07 135 / 0.12)",
      "--d-btn-ink": "oklch(0.4 0.07 135)",
      "--d-btn-border": "oklch(0.58 0.07 135 / 0.4)",
    } as CSSProperties,
    hero: wash("oklch(0.97 0.018 100)", "oklch(0.92 0.025 120)"),
    ornament: <Diamond />,
  },
];

function Directions() {
  const { d } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const found = SKINS.findIndex((s) => s.key === d);
  const i = found === -1 ? 0 : found;
  const skin = SKINS[i];

  return (
    <main className="relative mx-auto w-full max-w-[26rem]">
      <div style={{ paddingBottom: "7rem" }}>
        <Sampler skin={skin} />
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-[26rem] flex-col items-center gap-2 px-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      >
        <div
          className="flex max-w-full flex-wrap justify-center gap-1 rounded-2xl p-1.5"
          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
        >
          {SKINS.map((s, idx) => (
            <button
              key={s.key}
              type="button"
              onClick={() => void navigate({ search: { d: s.key }, replace: true })}
              className="flex size-9 items-center justify-center rounded-full font-body text-[0.8rem]"
              style={{
                background: idx === i ? "oklch(0.28 0.02 60)" : "transparent",
                color: idx === i ? "white" : "oklch(0.28 0.02 60)",
              }}
            >
              {s.key}
            </button>
          ))}
        </div>
        <p
          className="rounded-full px-4 py-1.5 font-body text-[0.62rem] tracking-[0.12em] uppercase"
          style={{ background: "rgba(255,255,255,0.82)", color: "oklch(0.28 0.02 60)" }}
        >
          {skin.key} · {skin.name} — {skin.note}
        </p>
      </div>
    </main>
  );
}
