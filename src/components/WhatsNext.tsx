import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, CalendarClock, Rocket, Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SERIF = '"Instrument Serif", "Iowan Old Style", Georgia, serif';

const TICKER = "COMING SOON ✦ NEW BEGINNINGS ✦ NEXENITY TECHNOLOGIES ✦";

function buildChoreography(reduce: boolean) {
  if (reduce) {
    const fade: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    };
    return {
      header: { hidden: {}, visible: {} } as Variants,
      word: fade,
      line: fade,
      card: {
        hidden: { opacity: 0 },
        visible: (i: number) => ({ opacity: 1, transition: { delay: i * 0.06 } }),
      } as Variants,
      item: fade,
    };
  }

  return {
    header: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
    } as Variants,
    word: {
      hidden: { y: "115%", rotate: 5, opacity: 0 },
      visible: {
        y: "0%",
        rotate: 0,
        opacity: 1,
        transition: { duration: 0.9, ease: EASE },
      },
    } as Variants,
    line: {
      hidden: { scaleX: 0, opacity: 0 },
      visible: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: EASE } },
    } as Variants,
    card: {
      hidden: { opacity: 0, y: 70, rotateX: 8, filter: "blur(10px)" },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: { delay: 0.08 + i * 0.12, duration: 0.8, ease: EASE },
      }),
    } as Variants,
    item: {
      hidden: { opacity: 0, y: 14 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    } as Variants,
  };
}

function Ticker({ reduce }: { reduce: boolean }) {
  const row = `${TICKER} ${TICKER} ${TICKER}`;
  return (
    <div
      aria-hidden="true"
      className="relative flex select-none overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap text-[11px] font-semibold tracking-[0.42em] text-white/25"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span>{row}</span>
        <span>{row}</span>
      </motion.div>
    </div>
  );
}

function SoonChip() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/25 bg-[#A78BFA]/[0.08] px-3 py-1 text-[10.5px] font-semibold tracking-[0.16em] text-[#CDBBFF] uppercase">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#A78BFA] opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[#A78BFA]" />
      </span>
      Coming soon
    </span>
  );
}

function ShimmerTrack({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent"
        animate={reduce ? undefined : { x: ["-110%", "330%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
      />
    </div>
  );
}

export default function WhatsNext() {
  const reduce = useReducedMotion() ?? false;
  const c = buildChoreography(reduce);

  return (
    <section
      id="whats-next"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10"
    >
      {/* ── atmosphere ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
        <motion.div
          className="absolute -top-24 left-[8%] size-[26rem] rounded-full bg-[#A78BFA]/25 blur-[120px]"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 size-[24rem] rounded-full bg-[#38BDF8]/20 blur-[120px]"
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[#F472B6]/10 blur-[140px]"
          animate={reduce ? undefined : { opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13] blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, #A78BFA, transparent 45%, #38BDF8, transparent 80%)",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── header ───────────────────────────────────────────────── */}
        <motion.div
          variants={c.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={c.item} className="mb-6 flex justify-center">
            <SoonChip />
          </motion.div>

          <motion.p
            variants={c.item}
            className="mb-5 text-[11px] font-semibold tracking-[0.34em] text-[#A78BFA]/80 uppercase"
          >
            New things coming soon
          </motion.p>

          <h2 className="text-balance text-4xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            <span className="inline-flex flex-wrap justify-center gap-x-3">
              {["Something", "new", "is"].map((word) => (
                <span key={word} className="inline-block overflow-hidden pb-1">
                  <motion.span variants={c.word} className="inline-block will-change-transform">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="mt-1 inline-block overflow-hidden pb-2">
              <motion.span
                variants={c.word}
                className="inline-block bg-gradient-to-r from-white via-[#D8CCFF] to-[#7DD3FC] bg-clip-text italic text-transparent will-change-transform"
                style={{ fontFamily: SERIF }}
              >
                taking shape.
              </motion.span>
            </span>
          </h2>

          <motion.div
            variants={c.line}
            className="mx-auto mt-7 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent"
          />

          <motion.p
            variants={c.item}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/45 sm:text-[15px]"
          >
            Two launches are in the workshop right now — a new home for Nexenity
            Technologies, and a new chapter for the studio itself. Here's a first
            look at what's landing next.
          </motion.p>
        </motion.div>

        {/* ── cards ────────────────────────────────────────────────── */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Nexenity */}
          <motion.article
            custom={0}
            variants={c.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[#38BDF8]/35 sm:p-9"
          >
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-16 size-64 rounded-full bg-[#38BDF8]/15 blur-[90px] transition-opacity duration-700 group-hover:opacity-100 sm:opacity-70"
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[#38BDF8]/25 bg-[#38BDF8]/10 text-[#7DD3FC]">
                  <Rocket className="size-[18px]" strokeWidth={1.9} />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.28em] text-white/25 uppercase">
                  01 — Platform
                </span>
              </div>

              <h3
                className="mt-6 text-3xl leading-tight text-white sm:text-4xl"
                style={{ fontFamily: SERIF }}
              >
                Nexenity Technologies
              </h3>
              <p className="mt-1.5 text-[12.5px] font-semibold tracking-[0.2em] text-[#7DD3FC]/80 uppercase">
                Launch coming soon
              </p>

              <motion.p variants={c.item} className="mt-4 text-sm leading-relaxed text-white/45">
                A brand-new digital home for Nexenity Tech — the identity, the
                site, and the AI workflows behind it. Built to feel like a
                product, not a brochure.
              </motion.p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {["Brand system", "Web platform", "AI workflows"].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/45"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <ShimmerTrack reduce={reduce} />
            </div>
          </motion.article>

          {/* New beginnings */}
          <motion.article
            custom={1}
            variants={c.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#A78BFA]/[0.12] to-white/[0.01] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[#A78BFA]/40 sm:p-9"
          >
            <div
              aria-hidden="true"
              className="absolute -top-20 -left-16 size-64 rounded-full bg-[#A78BFA]/25 blur-[90px] transition-opacity duration-700 group-hover:opacity-100 sm:opacity-70"
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[#A78BFA]/25 bg-[#A78BFA]/10 text-[#CDBBFF]">
                  <Sparkles className="size-[18px]" strokeWidth={1.9} />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.28em] text-white/25 uppercase">
                  02 — Studio
                </span>
              </div>

              <h3 className="mt-6 text-3xl leading-tight text-white italic sm:text-4xl" style={{ fontFamily: SERIF }}>
                New beginnings
              </h3>
              <p className="mt-1.5 text-[12.5px] font-semibold tracking-[0.2em] text-[#CDBBFF]/80 uppercase">
                A fresh chapter
              </p>

              <motion.p variants={c.item} className="mt-4 text-sm leading-relaxed text-white/45">
                Techrudra.Studio is stepping into its next form — a sharper
                identity, fewer but bigger builds, and AI folded into everything
                from the first sketch to launch day.
              </motion.p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {["New identity", "AI-native builds", "Open collaborations"].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-[11px] text-white/45"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#CDBBFF] transition-colors hover:text-white"
              >
                Be first to hear
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.article>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7DD3FC] px-6 py-3 text-[13px] font-semibold text-[#0B0B0F] transition-shadow duration-300 hover:shadow-[0_10px_40px_-12px_rgba(167,139,250,0.9)]"
          >
            Be the first to know
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[13px] font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <CalendarClock className="size-4" />
            Book a call
          </a>
        </motion.div>
      </div>

      <div className="relative mt-20 -mx-6 lg:-mx-10">
        <Ticker reduce={reduce} />
        <span className="sr-only">
          Coming soon: new beginnings and the Nexenity Technologies launch.
        </span>
      </div>
    </section>
  );
}
