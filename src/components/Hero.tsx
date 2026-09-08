import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NoiseOverlay } from "@/components/AnimatedBackground";
import {
  LiquidBlob,
  FlowingGradients,
  DarkParticles,
  LiquidWaves,
  blobPaths,
} from "@/components/DarkLiquidHero";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      style={{
        background:
          "linear-gradient(180deg, #0A0612 0%, #110D1F 30%, #15102A 60%, #0E0A1A 100%)",
      }}
    >
      {/* ── Dark liquid background layers ───────────────────────── */}
      {/* Morphing blobs */}
      {blobPaths.map((blob, i) => (
        <LiquidBlob key={i} blob={blob} index={i} />
      ))}

      {/* Flowing gradient streaks */}
      <FlowingGradients />

      {/* Dark particles */}
      <DarkParticles />

      {/* Liquid wave lines at bottom */}
      <LiquidWaves />

      {/* Noise texture */}
      <NoiseOverlay opacity={0.04} />

      {/* Dark radial overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(10,6,18,0.6) 60%, rgba(10,6,18,0.9) 100%)",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Status badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for projects
        </motion.div>

        {/* Main headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Make your project
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #A78BFA 0%, #818CF8 25%, #60A5FA 50%, #C084FC 75%, #A78BFA 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 4s ease-in-out infinite",
            }}
          >
            look trend.
          </span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg"
        >
          We build bold digital experiences for brands that want to stand out.
          From smart websites and AI tools to video, branding, and marketing —
          we make it happen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#6C3AED] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#7C4AFF] hover:shadow-2xl hover:shadow-[#6C3AED]/40"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Explore Our Work
          </a>
        </motion.div>

        {/* Availability note */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 text-xs text-white/30"
        >
          Currently accepting freelance projects &middot; Remote &middot; Worldwide
        </motion.p>
      </div>

      {/* Bottom fade into light section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #FAF8F5)",
        }}
      />

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
