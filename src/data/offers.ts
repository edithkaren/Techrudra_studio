export type MonthDay = { month: number; day: number }; // month is 1-12

export type OfferTheme = "diwali" | "holi" | "winter" | "summer";

export interface FestiveOffer {
  id: string;
  festival: string;
  title: string;
  tagline: string;
  /** Headline discount, e.g. "25% off". */
  discount: string;
  code: string;
  /** Recurring annual window — the offer is valid between these dates. */
  start: MonthDay;
  end: MonthDay;
  summary: string;
  includes: string[];
  theme: OfferTheme;
}

/**
 * Every offer repeats on the same dates each year. Edit the windows here and
 * the page, the countdowns and the "live now" states all follow automatically.
 */
export const festiveOffers: FestiveOffer[] = [
  {
    id: "diwali",
    festival: "Diwali",
    title: "Festival of Lights",
    tagline: "Light up your launch",
    discount: "30% off",
    code: "DIWALI30",
    start: { month: 10, day: 20 },
    end: { month: 11, day: 20 },
    summary:
      "Our biggest offer of the year. Bring a new website, brand identity or AI workflow to life while the diyas are lit — with priority delivery so it ships before the celebrations end.",
    includes: [
      "30% off any service package",
      "Priority 2-week delivery slot",
      "Complimentary launch page animation",
    ],
    theme: "diwali",
  },
  {
    id: "holi",
    festival: "Holi",
    title: "Colour Your Brand",
    tagline: "Fresh palette, fresh start",
    discount: "25% off",
    code: "HOLI25",
    start: { month: 3, day: 1 },
    end: { month: 3, day: 31 },
    summary:
      "A festival of colour deserves a brand that stands out. Rebrand, redesign or refresh your visuals at a festival price, with a free palette and typography exploration.",
    includes: [
      "25% off branding & web design",
      "Free colour + type exploration",
      "Two rounds of revisions included",
    ],
    theme: "holi",
  },
  {
    id: "winter",
    festival: "Winter",
    title: "Winter Warm-up",
    tagline: "Build now, launch in spring",
    discount: "20% off",
    code: "WINTER20",
    start: { month: 12, day: 1 },
    end: { month: 2, day: 15 },
    summary:
      "Quiet season, loud results. Lock in your build across December and January and we'll use the slow months to ship something substantial before the spring rush.",
    includes: [
      "20% off all service packages",
      "Free technical audit of your current site",
      "Flexible January start dates",
    ],
    theme: "winter",
  },
  {
    id: "summer",
    festival: "Summer",
    title: "Summer Sprint",
    tagline: "Six weeks, one launch",
    discount: "15% off",
    code: "SUMMER15",
    start: { month: 5, day: 1 },
    end: { month: 7, day: 15 },
    summary:
      "A focused sprint for teams that want to launch before the season ends. Tight scope, weekly demos, and a full build delivered inside six weeks.",
    includes: [
      "15% off sprint packages",
      "Weekly demo + async updates",
      "Post-launch support for 30 days",
    ],
    theme: "summer",
  },
];

export type OfferState = "live" | "upcoming";

export interface OfferWindow {
  state: OfferState;
  start: Date;
  end: Date;
  /** Milliseconds until the offer opens (state "upcoming"). */
  startsInMs: number;
  /** Milliseconds until the offer closes (state "live"). */
  endsInMs: number;
}

function windowForYear(offer: FestiveOffer, year: number) {
  const start = new Date(year, offer.start.month - 1, offer.start.day, 0, 0, 0, 0);
  // An end month earlier than the start month means the window wraps the new year.
  const endYear = offer.end.month < offer.start.month ? year + 1 : year;
  const end = new Date(endYear, offer.end.month - 1, offer.end.day, 23, 59, 59, 999);
  return { start, end };
}

/**
 * Resolves the window that matters right now: the one currently running, or —
 * when the festival is off-season — the next time it comes around.
 */
export function resolveOfferWindow(offer: FestiveOffer, now: Date = new Date()): OfferWindow {
  const year = now.getFullYear();
  const candidates = [-1, 0, 1, 2].map((offset) => windowForYear(offer, year + offset));

  const live = candidates.find((w) => now >= w.start && now <= w.end);
  if (live) {
    return {
      state: "live",
      start: live.start,
      end: live.end,
      startsInMs: 0,
      endsInMs: live.end.getTime() - now.getTime(),
    };
  }

  const next = candidates
    .filter((w) => w.start > now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

  return {
    state: "upcoming",
    start: next.start,
    end: next.end,
    startsInMs: next.start.getTime() - now.getTime(),
    endsInMs: 0,
  };
}

export function formatOfferDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatOfferRange(start: Date, end: Date) {
  return `${formatOfferDate(start)} – ${formatOfferDate(end)}`;
}

export function daysUntil(ms: number) {
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function splitCountdown(ms: number) {
  const total = Math.max(0, ms);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}
