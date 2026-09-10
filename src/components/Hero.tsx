import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/motion/AnimatedText";
import KineticText from "@/components/motion/KineticText";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import ParticleRing from "@/components/ParticleRing";

const words = [
  "native",
  "bold",
  "premium",
  "intelligent",
  "creative",
  "dynamic",
  "stunning",
  "powerful",
];
const WORD_INTERVAL = 2800;
const SCRAMBLE_DURATION = 600;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScrambleText(target: string, duration: number, active: boolean) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!active) {
      setDisplay(target);
      return;
    }
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

/* ── Mouse-following gradient blob ─────────────────────────────── */
function MouseGradient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouse = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] h-[600px] w-[600px] rounded-full opacity-[0.07]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(167,139,250,0.6) 0%, rgba(59,130,246,0.3) 30%, rgba(236,72,153,0.15) 60%, transparent 80%)",
        filter: "blur(60px)",
      }}
    />
  );
}

/* ── Animated grid background ──────────────────────────────────── */
function AnimatedGrid() {
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 800], [0, 100]);
  const gridOpacity = useTransform(scrollY, [0, 400], [0.06, 0]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity: gridOpacity, y: gridY }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="heroGrid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(167,139,250,0.3)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
      </svg>
      {/* Radial fade over grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 20%, #0A0A0A 70%)",
        }}
      />
    </motion.div>
  );
}

/* ── Floating geometric shapes ─────────────────────────────────── */
function FloatingGeometry() {
  const shapes = [
    { x: "12%", y: "18%", size: 80, rotate: 0, color: "rgba(167,139,250,0.12)", type: "ring", dur: 25 },
    { x: "85%", y: "25%", size: 60, rotate: 45, color: "rgba(59,130,246,0.1)", type: "square", dur: 30 },
    { x: "8%", y: "70%", size: 50, rotate: 0, color: "rgba(236,72,153,0.08)", type: "ring", dur: 22 },
    { x: "90%", y: "65%", size: 70, rotate: 20, color: "rgba(20,184,166,0.09)", type: "diamond", dur: 28 },
    { x: "20%", y: "40%", size: 40, rotate: -15, color: "rgba(167,139,250,0.06)", type: "triangle", dur: 35 },
    { x: "75%", y: "45%", size: 35, rotate: 30, color: "rgba(251,146,60,0.07)", type: "ring", dur: 20 },
    { x: "50%", y: "12%", size: 45, rotate: 0, color: "rgba(59,130,246,0.06)", type: "cross", dur: 32 },
    { x: "45%", y: "80%", size: 55, rotate: 60, color: "rgba(236,72,153,0.05)", type: "square", dur: 27 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            rotate: s.rotate,
          }}
          animate={{
            y: [0, -15 - Math.random() * 20, 10, -8, 0],
            x: [0, 10 * (i % 2 === 0 ? 1 : -1), -6, 4, 0],
            rotate: [s.rotate, s.rotate + 15, s.rotate - 10, s.rotate + 5, s.rotate],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          {s.type === "ring" && (
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke={s.color}
                strokeWidth="1"
              />
            </svg>
          )}
          {s.type === "square" && (
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <rect
                x="6"
                y="6"
                width="28"
                height="28"
                fill="none"
                stroke={s.color}
                strokeWidth="1"
                rx="2"
              />
            </svg>
          )}
          {s.type === "diamond" && (
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <rect
                x="10"
                y="10"
                width="20"
                height="20"
                fill="none"
                stroke={s.color}
                strokeWidth="1"
                transform="rotate(45 20 20)"
              />
            </svg>
          )}
          {s.type === "triangle" && (
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <polygon
                points="20,6 34,34 6,34"
                fill="none"
                stroke={s.color}
                strokeWidth="1"
              />
            </svg>
          )}
          {s.type === "cross" && (
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <line x1="20" y1="8" x2="20" y2="32" stroke={s.color} strokeWidth="1" />
              <line x1="8" y1="20" x2="32" y2="20" stroke={s.color} strokeWidth="1" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Orbiting energy rings ─────────────────────────────────────── */
function EnergyRings() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Ring 1 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 600, height: 600 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <ellipse
            cx="300"
            cy="300"
            rx="280"
            ry="100"
            fill="none"
            stroke="rgba(167,139,250,0.06)"
            strokeWidth="0.5"
            strokeDasharray="8 12"
          />
          {/* Orbiting dot */}
          <circle cx="580" cy="300" r="3" fill="rgba(167,139,250,0.3)">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M20,0 A280,100 0 1,1 19.9,0"
            />
          </circle>
        </svg>
      </motion.div>
      {/* Ring 2 — counter-rotating */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 500, height: 500 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 500 500" className="h-full w-full">
          <ellipse
            cx="250"
            cy="250"
            rx="230"
            ry="80"
            fill="none"
            stroke="rgba(59,130,246,0.05)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          <circle cx="480" cy="250" r="2" fill="rgba(59,130,246,0.25)">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path="M20,0 A230,80 0 1,1 19.9,0"
            />
          </circle>
        </svg>
      </motion.div>
      {/* Ring 3 — tilted */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 450, height: 450, rotate: "30deg" }}
        animate={{ rotate: [30, 390] }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 450 450" className="h-full w-full">
          <ellipse
            cx="225"
            cy="225"
            rx="200"
            ry="70"
            fill="none"
            stroke="rgba(236,72,153,0.04)"
            strokeWidth="0.5"
            strokeDasharray="6 10"
          />
          <circle cx="425" cy="225" r="2" fill="rgba(236,72,153,0.2)">
            <animateMotion
              dur="22s"
              repeatCount="indefinite"
              path="M20,0 A200,70 0 1,1 19.9,0"
            />
          </circle>
        </svg>
      </motion.div>
    </div>
  );
}

/* ── Particles with glow trails ────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2.5,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
    opacity: 0.06 + Math.random() * 0.15,
    color:
      i % 4 === 0
        ? "rgba(167,139,250,"
        : i % 4 === 1
          ? "rgba(59,130,246,"
          : i % 4 === 2
            ? "rgba(236,72,153,"
            : "rgba(20,184,166,",
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            backgroundColor: `${p.color}${p.opacity})`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}${p.opacity * 0.6})`,
          }}
          animate={{
            y: [0, -50 - Math.random() * 40, 15, -25, 0],
            x: [0, 20 * (Math.random() > 0.5 ? 1 : -1), -12, 8, 0],
            opacity: [
              p.opacity,
              p.opacity * 2,
              p.opacity * 0.5,
              p.opacity * 1.5,
              p.opacity,
            ],
            scale: [1, 1.4, 0.7, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Energy / light streaks ────────────────────────────────────── */
function LightStreaks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Streak 1 */}
      <motion.div
        className="absolute"
        style={{
          width: "120%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.2) 30%, rgba(59,130,246,0.15) 60%, transparent 100%)",
          top: "28%",
          left: "-20%",
          rotate: "-12deg",
        }}
        animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Streak 2 */}
      <motion.div
        className="absolute"
        style={{
          width: "120%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.12) 40%, rgba(167,139,250,0.1) 70%, transparent 100%)",
          top: "68%",
          left: "-20%",
          rotate: "8deg",
        }}
        animate={{ x: ["6%", "-6%", "6%"], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Streak 3 — horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.08) 20%, rgba(167,139,250,0.15) 50%, rgba(167,139,250,0.08) 80%, transparent 100%)",
        }}
        animate={{ top: ["10%", "90%", "10%"], opacity: [0, 0.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Horizontal glow bar */}
      <motion.div
        className="absolute"
        style={{
          width: "50%",
          height: "80px",
          left: "25%",
          top: "45%",
          background:
            "radial-gradient(ellipse, rgba(167,139,250,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scaleX: [0.7, 1.3, 0.7], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Gradient orb with parallax ────────────────────────────────── */
function GradientOrb() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.85]);

  return (
    <motion.div
      className="pointer-events-none absolute top-[30%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      style={{
        y,
        scale,
        background:
          "radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(59,130,246,0.06) 35%, rgba(236,72,153,0.03) 55%, transparent 75%)",
      }}
      animate={{
        scale: [1, 1.08, 0.95, 1.04, 1],
        rotate: [0, 5, -3, 2, 0],
        opacity: [0.5, 0.8, 0.4, 0.7, 0.5],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── Pulsing center dot ────────────────────────────────────────── */
function CenterPulse() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2">
      <motion.div
        className="h-2 w-2 rounded-full bg-[#A78BFA]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A78BFA]/20"
        style={{ width: 40, height: 40 }}
        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A78BFA]/10"
        style={{ width: 40, height: 40 }}
        animate={{ scale: [1, 3, 1], opacity: [0.2, 0, 0.2] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

/* ── Noise overlay ─────────────────────────────────────────────── */
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

/* ── Bottom liquid edge ────────────────────────────────────────── */
function LiquidEdge() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      <motion.svg
        viewBox="0 0 1440 120"
        className="absolute bottom-0 w-full"
        preserveAspectRatio="none"
        style={{ height: "120px" }}
      >
        <motion.path
          d="M0,60 C180,90 360,30 540,60 C720,90 900,30 1080,60 C1260,90 1440,30 1440,60 L1440,120 L0,120 Z"
          fill="#0A0A0A"
          animate={{
            d: [
              "M0,60 C180,90 360,30 540,60 C720,90 900,30 1080,60 C1260,90 1440,30 1440,60 L1440,120 L0,120 Z",
              "M0,70 C180,30 360,80 540,50 C720,80 900,40 1080,70 C1260,30 1440,60 1440,70 L1440,120 L0,120 Z",
              "M0,55 C180,85 360,35 540,65 C720,85 900,25 1080,55 C1260,85 1440,35 1440,55 L1440,120 L0,120 Z",
              "M0,60 C180,90 360,30 540,60 C720,90 900,30 1080,60 C1260,90 1440,30 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
      {/* Gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)",
        }}
      />
    </div>
  );
}

/* ── Typing cursor ─────────────────────────────────────────────── */
function TypingCursor() {
  return (
    <motion.span
      className="ml-0.5 inline-block h-[1.1em] w-[3px] align-middle bg-[#A78BFA]"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── Main Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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

  const scrambledWord = useScrambleText(
    words[wordIndex],
    SCRAMBLE_DURATION,
    isScrambling,
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6"
    >
      {/* Background layers */}
      <MouseGradient />
      <AnimatedGrid />
      <GradientOrb />
      <ParticleRing
        className="z-[1]"
        particleCount={1100}
        radiusX={440}
        radiusY={150}
        speed={0.0018}
        color="167,139,250"
      />
      <EnergyRings />
      <FloatingGeometry />
      <Particles />
      <LightStreaks />
      <CenterPulse />
      <NoiseOverlay />
      <LiquidEdge />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <ScrollReveal variant="blur" delay={0.1}>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-white/30">
            Techrudra.Studio
          </p>
        </ScrollReveal>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[80px]"
        >
          We build{" "}
          <span
            className="relative inline-block cursor-pointer"
            style={{
              filter: isScrambling ? "url(#fluid-distort-hover)" : "url(#fluid-distort)",
              transition: "filter 0.3s ease",
            }}
          >
            <span className="text-[#A78BFA]">{scrambledWord}</span>
            <TypingCursor />
          </span>
          <br />
          <br />
          <KineticText
            text="mobile experiences"
            as="span"
            speed="medium"
            delay={0.5}
            className="text-[#A78BFA] text-4xl font-medium sm:text-5xl md:text-6xl lg:text-[80px] tracking-tight"
          />
        </motion.h1>

        <ScrollReveal variant="fadeUp" delay={0.6}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg">
            Native iOS, cross-platform apps, creative animations, product
            design, and high-converting landing pages.
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

        {/* CTAs */}
        <ScrollReveal variant="fadeUp" delay={0.8}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]"
            >
              Book a call
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </MagneticButton>
            <MagneticButton
              href="#portfolio"
              strength={0.25}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(167,139,250,0.1)]"
            >
              See work
            </MagneticButton>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-14 left-0 right-0 px-6"
      >
        <p className="mb-5 text-center text-xs text-white/20">
          Trusted by 8+ product teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            "IngrediCheck",
            "Kin",
            "MedLogsRx",
            "anHour",
            "SOAPNoteAI",
            "RueBlur",
            "360io",
            "AI Memojis",
          ].map((name, i) => (
            <motion.span
              key={name}
              className="cursor-default text-sm font-medium text-white/15 transition-colors hover:text-white/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -3, color: "rgba(255,255,255,0.4)" }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
