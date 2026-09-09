import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/motion/AnimatedText";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";

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
      const result = target.split("").map((char, i) => {
        if (i / target.length < progress) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");
      setDisplay(result);
      if (frame >= frames) clearInterval(iv);
    }, step);
    return () => clearInterval(iv);
  }, [target, duration, active]);
  return display;
}

/* Floating particles */
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
    opacity: 0.08 + Math.random() * 0.12,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#A78BFA]"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y, opacity: p.opacity }}
          animate={{
            y: [0, -40 - Math.random() * 30, 10, -20, 0],
            x: [0, 15 * (Math.random() > 0.5 ? 1 : -1), -8, 5, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.6, p.opacity * 1.2, p.opacity],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* Gradient orb that follows mouse loosely */
function GradientOrb() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <motion.div
      className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
      style={{
        y,
        background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(96,165,250,0.08) 40%, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.05, 0.97, 1.03, 1],
        rotate: [0, 3, -2, 1, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  );
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
      {/* Background layers */}
      <GradientOrb />
      <Particles />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <ScrollReveal variant="blur" delay={0.1}>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-white/30">
            Techrudra.Studio
          </p>
        </ScrollReveal>

        {/* Main headline with character reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[80px]"
        >
          We build{" "}
          <span className="inline-block text-[#A78BFA]">{scrambledWord}</span>
          <br />
          <AnimatedText text="mobile experiences" className="inline" delay={0.5} staggerDelay={0.04} />
        </motion.h1>

        <ScrollReveal variant="fadeUp" delay={0.6}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg">
            Native iOS, cross-platform apps, creative animations, product design, and high-converting landing pages.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.7}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/25">
            <span>Native mobile development</span>
            <span className="text-white/10">·</span>
            <span>Mobile motion design</span>
            <span className="text-white/10">·</span>
            <span>UI/UX and landing pages</span>
          </div>
        </ScrollReveal>

        {/* CTAs with magnetic effect */}
        <ScrollReveal variant="fadeUp" delay={0.8}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              href="#contact"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90"
            >
              Book a call
            </MagneticButton>
            <MagneticButton
              href="#portfolio"
              strength={0.25}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              See work
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-12 left-0 right-0 px-6"
      >
        <p className="mb-5 text-center text-xs text-white/20">Trusted by 8+ product teams</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["IngrediCheck", "Kin", "MedLogsRx", "anHour", "SOAPNoteAI", "RueBlur", "360io", "AI Memojis"].map((name) => (
            <motion.span
              key={name}
              className="text-sm font-medium text-white/15 transition-colors hover:text-white/30"
              whileHover={{ y: -2, color: "rgba(255,255,255,0.35)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
