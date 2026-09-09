import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const words = ["native", "bold", "premium", "intelligent", "creative", "dynamic"];
const WORD_INTERVAL = 2800;
const SCRAMBLE_DURATION = 600;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScrambleText(target: string, duration: number, active: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active) { setDisplay(target); return; }
    const frames = 12;
    const step = duration / frames;
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const result = target
        .split("")
        .map((char, i) => {
          if (i / target.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(result);
      if (frame >= frames) clearInterval(iv);
    }, step);
    return () => clearInterval(iv);
  }, [target, duration, active]);

  return display;
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setIsScrambling(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setTimeout(() => setIsScrambling(false), SCRAMBLE_DURATION);
      }, 100);
    }, WORD_INTERVAL);
    return () => clearInterval(iv);
  }, []);

  const scrambledWord = useScrambleText(words[wordIndex], SCRAMBLE_DURATION, isScrambling);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6"
    >
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, rgba(96,165,250,0.04) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-white/30"
        >
          Techrudra.Studio
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[80px]"
        >
          We build{" "}
          <span className="text-[#A78BFA]">{scrambledWord}</span>
          <br />
          mobile experiences
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg"
        >
          Native iOS, cross-platform apps, creative animations, product design, and high-converting landing pages.
        </motion.p>

        {/* Keyword strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/25"
        >
          <span>Native mobile development</span>
          <span className="text-white/10">·</span>
          <span>Mobile motion design</span>
          <span className="text-white/10">·</span>
          <span>UI/UX and landing pages</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
          >
            Book a call
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            See work
          </a>
        </motion.div>
      </div>

      {/* Trust bar at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-12 left-0 right-0 px-6"
      >
        <p className="mb-5 text-center text-xs text-white/20">
          Trusted by 8+ product teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["IngrediCheck", "Kin", "MedLogsRx", "anHour", "SOAPNoteAI", "RueBlur", "360io", "AI Memojis"].map(
            (name) => (
              <span
                key={name}
                className="text-sm font-medium text-white/15 transition-colors hover:text-white/30"
              >
                {name}
              </span>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
