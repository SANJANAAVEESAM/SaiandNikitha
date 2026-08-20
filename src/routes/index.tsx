import { createFileRoute } from "@tanstack/react-router";
import { COUPLE_AMP, SITE_URL } from "@/components/wedding/data";
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
  // No opening screen. The invitation is the page — nothing to tap through
  // and nothing held back, which also means nothing to mistake for a loading
  // state on a slow connection.
  return <Microsite live />;
}
