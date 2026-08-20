
export const COUPLE = { bride: "Nikhita", groom: "Sai" };

/**
 * As the printed card sets them, titles and letters and all. Used where the
 * invitation is formal; COUPLE carries the short forms for everywhere else.
 *
 * Note the spelling: the card reads Nikhita, with the h before the i. The
 * repository is named SaiandNikitha, which is not the same word.
 */
export const FORMAL = {
  groom: { name: "Dr. Lakshmana Sai", post: "MBBS, MS", honorific: "Chi." },
  bride: { name: "Dr. Nikhita Sree", post: "MBBS, DA", honorific: "Chi. La. Sow." },
};

/** The three benedictions across the head of the card. */
export const BENEDICTIONS = ["Srirasthu", "Subhamasthu", "Avighnamasthu"];

/**
 * The pair as it is written, everywhere it is written.
 *
 * Groom first, at the couple's request. Kept here rather than spelled out at
 * each of the fifteen places the two names appear together — the invitation,
 * the hero, the tab title, the share card, the calendar file — because an
 * order repeated that many times is an order that will eventually disagree
 * with itself.
 */
export const COUPLE_AMP = `${COUPLE.groom} & ${COUPLE.bride}`;
export const COUPLE_AND = `${COUPLE.groom} and ${COUPLE.bride}`;

/** ⚠️ Year is unconfirmed (reference doc said 2027) — change it here only. */
export const WEDDING_YEAR = 2026;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A wall-clock India time, as an instant.
 *
 * Every celebration is in Telangana, so times are IST — UTC+5:30, with no
 * daylight saving to account for. Written as an explicit offset rather than
 * arithmetic on UTC so the offset is reviewable. Month is zero-based, matching
 * Date.
 */
const IST = (month: number, day: number, hour: number, minute: number) =>
  new Date(`${WEDDING_YEAR}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00+05:30`);

/** Muhurtham — 27 August, 10:05 AM IST. */
// The Sumuhurtham: Friday 28 August 2026, 11:45 PM IST.
export const WEDDING_DATE = IST(7, 28, 23, 45);



export const WHATSAPP_NUMBER = "";  // TODO

/**
 * Fallback origin only.
 *
 * Share previews are built from the host the page was actually served on —
 * see __root.tsx. This is used solely when there is no request to read one
 * from, which in practice means nothing a guest will ever see. Left here so
 * the tags always have something absolute to fall back to.
 */
export const SITE_URL = "https://example.com";  // TODO: the real domain


/** Credited in the closing line. */
export const DESIGNER = "Sanjana Veesam";
export const DESIGNER_URL = "https://www.instagram.com/sanjanaa_vv/";

/**
 * Who to call. `tel` is the number that rings; `whatsapp` is only set when the
 * account lives on a different number, as sometimes happens — sending Chat to the
 * calling number would reach nobody.
 */
export const CONTACTS: {
  name: string;
  tel: string;
  display: string;
  whatsapp?: string;
}[] = [
  // TODO: the card carries no telephone numbers. Add them and the "reach out"
  // sheet appears; leave it empty and that section stays hidden.
];


/**
 * Shared Drive folders guests add their own photos to. Haldi and Mehendi share
 * one, as supplied by the couple.
 *
 * Each folder must be shared so that anyone with the link can *contribute*, not
 * just view — otherwise the button leads guests to a wall.
 */
export const GALLERY_FOLDERS: { label: string; url: string }[] = [];

export type Venue = {
  name: string;
  /** Street or area line shown under the venue name. */
  address?: string;
  /** A full Google Maps share link. Wins over mapsQuery when present. */
  mapsUrl?: string;
  /** Fallback: a search string. Directions stay hidden until one is set. */
  mapsQuery?: string;
};

export type WeddingEvent = {
  slug: string;
  name: string;
  theme?: string;
  time: string;
  /** Shared folder for this celebration's photos. */
  photosUrl?: string;
  /** Held at the same place as the event above it, so they list as one. */
  sharesVenueWithPrevious?: boolean;
  /**
   * The formal invitation, shown above the details. Structured rather than one
   * run-on sentence so each family can be set on its own lines, the way an
   * invitation card would.
   */
  invitation?: {
    lead: string;
    parties: { name: string; parents: string }[];
  };
  /** Renders a "Followed by" link to the event above it. */
  followsPrevious?: boolean;
  venue: Venue;
  start: Date;
  end: Date;
};

/** One line of a day's running order. */
export type ScheduleItem = { time: string; what: string };

export type EventDay = {
  date: string;
  weekday: string;
  events: WeddingEvent[];
  /**
   * The hour-by-hour running order for the whole day, shown in a sheet from
   * any of that day's events. Only the two days that have one carry it — the
   * rest simply do not offer the link.
   */
  schedule?: ScheduleItem[];
};

export const EVENT_DAYS: EventDay[] = [
  {
    date: "28 August",
    weekday: "Friday",
    events: [
      {
        slug: "muhurtham",
        name: "Sumuhurtham",
        // Late, as the card gives it. Written out in full because an
        // eleven-forty-five start is the kind of thing a guest re-reads.
        time: "11:45 PM",
        photosUrl: undefined,
        invitation: {
          lead: "We solicit your gracious presence with family on the auspicious occasion of the marriage of",
          parties: [
            {
              name: `${FORMAL.groom.name}`,
              parents: "Elder son of Sri Late Reddy Mallikharjuna Rao & Smt Vijaya Lakshmi",
            },
            {
              name: `${FORMAL.bride.name}`,
              parents:
                "Daughter of Sri Ganta Himakar Rao & Smt Indira, of Mugguru, Vizianagaram District",
            },
          ],
        },
        venue: {
          name: "D.I.A.V.S.V.K.P.D.P Samastha Gubba Marriage Hall",
          address: "No. 1, Ring Road (next to SV Museum), Tirumala 517504",
          mapsQuery: "Gubba Marriage Hall, Ring Road, Tirumala 517504",
        },
        start: IST(7, 28, 23, 45),
        end: IST(7, 29, 2, 0),
      },
    ],
  },
  {
    date: "30 August",
    weekday: "Sunday",
    events: [
      {
        slug: "vratham",
        name: "Sri Satyanarayanaswamy Vratham",
        // The card gives no time for this one.
        time: "Morning",
        photosUrl: undefined,
        venue: {
          name: "Ramakrishna Nilayam",
          address:
            "H.No. 8-265, Velama Bazar, opposite Manorama Mahila Grandhalayam, Sriramapuram, Gudivada 521301, Krishna Dist.",
          mapsQuery: "Velama Bazar, Sriramapuram, Gudivada 521301",
        },
        start: IST(7, 30, 9, 0),
        end: IST(7, 30, 11, 30),
      },
      {
        slug: "reception",
        name: "Reception",
        time: "Lunch at 12:30 PM",
        photosUrl: undefined,
        venue: {
          name: "TTD Kalyana Mandapam",
          address: "Rajendra Nagar, 4th Line, Gudivada",
          mapsQuery: "TTD Kalyana Mandapam, Rajendra Nagar, Gudivada",
        },
        start: IST(7, 30, 12, 30),
        end: IST(7, 30, 15, 30),
      },
    ],
  },
];


/**
 * Hotels near the celebrations. Linked by name rather than by a stored URL:
 * a Maps search resolves to the place page — address, photos, reviews and
 * booking links — and cannot rot the way a copied URL can.
 */
export const HOTELS: string[] = [];

export const hotelHref = (name: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

/** Directions link, or null while the venue is still unconfirmed. */
export function venueMapsHref(venue: Venue): string | null {
  if (venue.mapsUrl) return venue.mapsUrl;
  if (venue.mapsQuery)
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  return null;
}

/**
 * The span the celebrations cover, taken from the celebrations themselves.
 *
 * It was a literal string, inherited from another couple, and it went on
 * saying August 15th to 27th after these dates were entered — the sort of
 * quiet contradiction a guest notices and a developer does not.
 */
function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
}

export function celebrationSpan(): string {
  const all = EVENT_DAYS.flatMap((d) => d.events.map((e) => e.start));
  if (!all.length) return "";
  const first = new Date(Math.min(...all.map((d) => d.getTime())));
  const last = new Date(Math.max(...all.map((d) => d.getTime())));
  const month = (d: Date) => d.toLocaleString("en-GB", { month: "long", timeZone: "Asia/Kolkata" });
  const day = (d: Date) =>
    Number(d.toLocaleString("en-GB", { day: "numeric", timeZone: "Asia/Kolkata" }));
  const tail =
    month(first) === month(last)
      ? ordinal(day(last))
      : `${month(last)} ${ordinal(day(last))}`;
  return `${month(first)} ${ordinal(day(first))} – ${tail}, ${WEDDING_YEAR}`;
}

export const EVENTS: WeddingEvent[] = EVENT_DAYS.flatMap((day) => day.events);


export const FULL_WEDDING_CAL = {
  title: `${COUPLE_AMP} — Wedding Celebrations`,
  description: `Celebrations for the wedding of ${COUPLE_AMP}. Muhurtham on 27 August at 10:05 AM.`,
  location: "Hyderabad, Telangana",
  startUtc: IST(7, 15, 9, 0).toISOString(),
  endUtc: IST(7, 27, 14, 0).toISOString(),
};

export type DetailIcon = "bed" | "plane" | "camera" | "pin" | "calendar";

// TODO(content): hotel names, rates, booking codes and shuttle timings still
// need to be filled in by the couple — the copy below says so plainly rather
// than promising details that may not arrive.
export const DETAIL_CARDS: {
  title: string;
  icon: DetailIcon;
  /** The line under the title on the tile itself. */
  hint: string;
  body: string;
  venues?: boolean;
  gallery?: boolean;
  hotels?: boolean;
  /** Opens the calendar chooser instead of a details sheet. */
  calendar?: boolean;
}[] = [
  // TODO(content): accommodation, travel and a shared photo folder can each be
  // added back as a card once there is something true to put in them. The
  // machinery for all three is still in Microsite.tsx.
  {
    title: "Save the Date",
    icon: "calendar",
    hint: "Add to calendar",
    body: "",
    calendar: true,
  },
  {
    title: "Venues",
    icon: "pin",
    hint: "Directions & maps",
    body: "Where each celebration is held. Tap any address for directions.",
    venues: true,
  },
];
