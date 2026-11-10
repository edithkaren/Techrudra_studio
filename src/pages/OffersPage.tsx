import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  Copy,
  Flame,
  Palette,
  Snowflake,
  Sparkles,
  Sun,
  Tag,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  daysUntil,
  festiveOffers,
  formatOfferRange,
  resolveOfferWindow,
  splitCountdown,
  type FestiveOffer,
  type OfferTheme,
} from "@/data/offers";

const SERIF = '"Instrument Serif", "Iowan Old Style", Georgia, serif';
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const THEMES: Record<
  OfferTheme,
  { accent: string; soft: string; gradient: string; glow: string; icon: typeof Flame }
> = {
  diwali: {
    accent: "#F59E0B",
    soft: "#FDE68A",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FB7185 55%, #A78BFA 100%)",
    glow: "rgba(245, 158, 11, 0.35)",
    icon: Flame,
  },
  holi: {
    accent: "#F472B6",
    soft: "#FBCFE8",
    gradient: "linear-gradient(135deg, #F472B6 0%, #A78BFA 45%, #2DD4BF 100%)",
    glow: "rgba(244, 114, 182, 0.35)",
    icon: Palette,
  },
  winter: {
    accent: "#7DD3FC",
    soft: "#E0F2FE",
    gradient: "linear-gradient(135deg, #7DD3FC 0%, #818CF8 55%, #C4B5FD 100%)",
    glow: "rgba(125, 211, 252, 0.32)",
    icon: Snowflake,
  },
  summer: {
    accent: "#FBBF24",
    soft: "#FEF3C7",
    gradient: "linear-gradient(135deg, #FDE68A 0%, #FBBF24 45%, #FB923C 100%)",
    glow: "rgba(251, 191, 36, 0.32)",
    icon: Sun,
  },
};

type Row = FestiveOffer & { window: ReturnType<typeof resolveOfferWindow> };

function Countdown({ ms, label }: { ms: number; label: string }) {
  const { days, hours, minutes, seconds } = splitCountdown(ms);
  const parts = [
    { value: days, unit: "days" },
    { value: hours, unit: "hrs" },
    { value: minutes, unit: "min" },
    { value: seconds, unit: "sec" },
  ];

  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-white/40 uppercase">
        {label}
      </p>
      <div className="flex gap-2">
        {parts.map((part) => (
          <div
            key={part.unit}
            className="min-w-14 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2 text-center backdrop-blur-sm"
          >
            <span className="block font-mono text-lg leading-none font-semibold tabular-nums text-white">
              {String(part.value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.16em] text-white/35 uppercase">
              {part.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferCard({ row, index, reduce }: { row: Row; index: number; reduce: boolean }) {
  const theme = THEMES[row.theme];
  const Icon = theme.icon;
  const live = row.window.state === "live";

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
      whileHover={reduce ? undefined : { y: -5 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#101010] p-6 transition-colors duration-500 hover:border-white/20 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-20 size-56 rounded-full blur-[80px] opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: theme.glow }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <span
            className="inline-flex size-11 items-center justify-center rounded-2xl border"
            style={{
              borderColor: `${theme.accent}40`,
              background: `${theme.accent}1A`,
              color: theme.soft,
            }}
          >
            <Icon className="size-5" strokeWidth={1.8} />
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase"
            style={{
              borderColor: live ? `${theme.accent}55` : "rgba(255,255,255,0.1)",
              background: live ? `${theme.accent}14` : "rgba(255,255,255,0.03)",
              color: live ? theme.soft : "rgba(255,255,255,0.4)",
            }}
          >
            {live ? (
              <>
                <span className="relative flex size-1.5">
                  <span
                    className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                    style={{ background: theme.accent }}
                  />
                  <span
                    className="relative inline-flex size-1.5 rounded-full"
                    style={{ background: theme.accent }}
                  />
                </span>
                Live now
              </>
            ) : (
              `Opens in ${daysUntil(row.window.startsInMs)}d`
            )}
          </span>
        </div>

        <p className="mt-5 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
          {row.festival} offer
        </p>
        <h3
          className="mt-1.5 text-2xl leading-tight text-white sm:text-3xl"
          style={{ fontFamily: SERIF }}
        >
          {row.title}
        </h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span
            className="bg-clip-text text-3xl font-bold text-transparent"
            style={{ backgroundImage: theme.gradient }}
          >
            {row.discount}
          </span>
          <span className="text-[11px] text-white/30">on every package</span>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-white/45">{row.summary}</p>

        <ul className="mt-4 space-y-1.5">
          {row.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12.5px] text-white/50">
              <Check className="mt-[3px] size-3.5 shrink-0" style={{ color: theme.accent }} />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
          <span className="font-mono text-[11.5px] tracking-[0.14em] text-white/60">
            {row.code}
          </span>
          <span className="text-white/15">&middot;</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30">
            <CalendarClock className="size-3" />
            {formatOfferRange(row.window.start, row.window.end)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function CodePill({ code, accent }: { code: string; accent: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-mono text-[12px] tracking-[0.16em] text-white/85 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
      aria-label={`Copy offer code ${code}`}
    >
      {code}
      {copied ? (
        <Check className="size-3.5" style={{ color: accent }} />
      ) : (
        <Copy className="size-3.5 text-white/40" />
      )}
    </button>
  );
}

export default function OffersPage() {
  const reduce = useReducedMotion() ?? false;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo<Row[]>(() => {
    const date = new Date(now);
    return festiveOffers.map((offer) => ({ ...offer, window: resolveOfferWindow(offer, date) }));
  }, [now]);

  const live = rows.filter((row) => row.window.state === "live");
  const upcoming = rows
    .filter((row) => row.window.state === "upcoming")
    .sort((a, b) => a.window.startsInMs - b.window.startsInMs);

  const featured = live[0] ?? upcoming[0];
  const featuredTheme = THEMES[featured.theme];
  const FeaturedIcon = featuredTheme.icon;
  const featuredLive = featured.window.state === "live";
  const featuredMs = featuredLive ? featured.window.endsInMs : featured.window.startsInMs;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" /> Back
          </Link>
          <span className="text-sm font-bold text-white">{siteConfig.name}</span>
          <Link
            to="/booking"
            className="hidden text-sm font-medium text-white/40 transition-colors hover:text-white sm:block"
          >
            Book a call
          </Link>
        </div>
      </nav>

      <main className="relative overflow-hidden pt-28 pb-24">
        {/* atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse 65% 45% at 50% 0%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 45% at 50% 0%, black, transparent)",
            }}
          />
          <motion.div
            className="absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full blur-[130px]"
            style={{ background: featuredTheme.glow }}
            animate={reduce ? undefined : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          {/* hero */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10.5px] font-semibold tracking-[0.24em] text-white/60 uppercase">
              <Sparkles className="size-3" style={{ color: featuredTheme.accent }} />
              Festive offers
            </span>

            <h1 className="mt-6 text-4xl leading-[0.98] text-white sm:text-6xl">
              Celebrate more.
              <br />
              <span
                className="bg-clip-text italic text-transparent"
                style={{ fontFamily: SERIF, backgroundImage: featuredTheme.gradient }}
              >
                Spend less.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
              Every festival, a fresh reason to build. These offers run on fixed
              dates each year — when the window opens, the price drops
              automatically. No forms, no haggling.
            </p>
          </motion.div>

          {/* featured / live offer */}
          <motion.section
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative mt-14 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.01] p-7 backdrop-blur-md sm:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -top-28 -right-24 size-80 rounded-full blur-[100px]"
              style={{ background: featuredTheme.glow }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: featuredTheme.gradient }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{
                      borderColor: `${featuredTheme.accent}55`,
                      background: `${featuredTheme.accent}14`,
                      color: featuredTheme.soft,
                    }}
                  >
                    <span className="relative flex size-1.5">
                      <span
                        className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                        style={{ background: featuredTheme.accent }}
                      />
                      <span
                        className="relative inline-flex size-1.5 rounded-full"
                        style={{ background: featuredTheme.accent }}
                      />
                    </span>
                    {featuredLive ? "Live right now" : "Next offer"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                    {featured.festival}
                  </span>
                </div>

                <h2 className="mt-4 flex items-center gap-3 text-3xl leading-tight text-white sm:text-4xl">
                  <FeaturedIcon
                    className="size-7 shrink-0 sm:size-8"
                    style={{ color: featuredTheme.accent }}
                    strokeWidth={1.7}
                  />
                  {featured.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-baseline gap-3">
                  <span
                    className="bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
                    style={{ backgroundImage: featuredTheme.gradient }}
                  >
                    {featured.discount}
                  </span>
                  <span className="text-xs text-white/35">
                    {formatOfferRange(featured.window.start, featured.window.end)}
                  </span>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
                  {featured.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <CodePill code={featured.code} accent={featuredTheme.accent} />
                  <span className="text-[11.5px] text-white/30">
                    Mention the code when you enquire
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start gap-6 lg:items-end">
                <Countdown
                  ms={featuredMs}
                  label={featuredLive ? "Offer ends in" : "Offer opens in"}
                />
                <div className="flex flex-col gap-2.5 sm:flex-row lg:w-full lg:flex-col">
                  <Link
                    to="/#contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold text-[#0B0B0F] transition-shadow duration-300 hover:shadow-[0_12px_40px_-14px_rgba(255,255,255,0.6)]"
                    style={{ backgroundImage: featuredTheme.gradient }}
                  >
                    Claim this offer
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-[13px] font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <CalendarClock className="size-4" />
                    Book a call
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* all offers */}
          <section className="mt-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.3em] text-white/35 uppercase">
                  The yearly calendar
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Four windows. Four reasons to build.
                </h2>
              </div>
              <p className="text-[12px] text-white/30">
                {live.length > 0
                  ? `${live.length} offer${live.length > 1 ? "s" : ""} live now`
                  : "No offer live today — the next one is below"}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {rows.map((row, index) => (
                <OfferCard key={row.id} row={row} index={index} reduce={reduce} />
              ))}
            </div>
          </section>

          {/* how it works */}
          <section className="mt-20 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Check what's live",
                body: "The page reads the calendar for you — today's active offer is always highlighted at the top.",
              },
              {
                step: "02",
                title: "Pick a service",
                body: "Choose any service package from the studio. The festival discount applies to the full price.",
              },
              {
                step: "03",
                title: "Share the code",
                body: "Send the code with your enquiry or booking. We apply it to the quote before work starts.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#A78BFA]">
                  {item.step}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/40">{item.body}</p>
              </motion.div>
            ))}
          </section>

          {/* fine print */}
          <section className="mt-14 rounded-2xl border border-white/[0.06] bg-[#0D0D0D] p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-white/35" />
              <h2 className="text-[11px] font-semibold tracking-[0.24em] text-white/45 uppercase">
                The fine print
              </h2>
            </div>
            <ul className="mt-4 grid gap-2.5 text-[12.5px] leading-relaxed text-white/35 sm:grid-cols-2">
              {[
                "One offer per project — discounts can't be stacked.",
                "Valid only inside the dates listed for each festival.",
                "Applies to new projects booked during the window.",
                "Retainers, third-party costs and ad spend are excluded.",
                "The quote always shows the discount before you commit.",
                "The studio can close an offer early once slots fill up.",
              ].map((term) => (
                <li key={term} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#A78BFA]/60" />
                  {term}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-sm text-white/40">
              Missing the window? Ask about the next one —
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-[#0B0B0F] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Talk to the studio
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[13px] font-semibold text-white/60 transition-colors hover:border-white/25 hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
