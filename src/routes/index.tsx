import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { COUPLE_AMP, SITE_URL } from "@/components/wedding/data";
import { Entry } from "@/components/wedding/Entry";
import { Microsite } from "@/components/wedding/Microsite";

// Derived from COUPLE so it cannot drift from the rest of the invitation.
// TODO(content): add the dates and place once they are set — this is what
// shows in a shared link, so it is worth being specific.
const TITLE = COUPLE_AMP;
const DESCRIPTION = `Open our invitation: celebrations, venue details and dress codes for the wedding of ${COUPLE_AMP}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // The microsite renders beneath the entry from the start, so going through
  // dissolves into the hero rather than cutting to it.
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);

  // Nothing scrolls until the hero is there to scroll.
  useEffect(() => {
    if (gone) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      el.style.overflow = prev;
    };
  }, [gone]);

  return (
    <>
      <Microsite live={revealed} />
      {!gone && (
        <div
          className="fixed inset-0 z-50"
          style={{ transition: "opacity 420ms ease", opacity: revealed ? 0 : 1 }}
        >
          <Entry
            onOpened={() => {
              setRevealed(true);
              window.setTimeout(() => setGone(true), 480);
            }}
          />
        </div>
      )}
    </>
  );
}
