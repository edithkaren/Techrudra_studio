import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * FluidSectionDivider — a smooth morphing wave between two sections.
 * The wave displaces/ripples as the section scrolls into view.
 *
 * Usage: place between two sections, or use as a standalone animated
 * section break. The wave is a layered SVG morphing path with accent
 * underglow.
 */
interface FluidSectionDividerProps {
  /** Height of the divider in pixels */
  h?: number;
  /** Wave color (accent) */
  accent?: string;
  /** Background behind the wave */
  bg?: string;
  /** Number of wave layers */
  layers?: 1 | 2 | 3;
  /** Flip vertical direction */
  flip?: boolean;
  className?: string;
}

const WAVES = [
  // Three base wave profiles
  {
    d1: "M0,50 C120,30 240,70 360,50 C480,30 600,70 720,50 C840,30 960,70 1080,50 C1200,30 1320,70 1440,50 L1440,0 L0,0 Z",
    d2: "M0,50 C120,70 240,30 360,50 C480,70 600,30 720,50 C840,70 960,30 1080,50 C1200,70 1320,30 1440,50 L1440,0 L0,0 Z",
  },
  {
    d1: "M0,60 C100,40 200,80 300,60 C400,40 500,80 600,60 C700,40 800,80 900,60 C1000,40 1100,80 1200,60 C1300,40 1400,80 1440,60 L1440,0 L0,0 Z",
    d2: "M0,60 C100,80 200,40 300,60 C400,80 500,40 600,60 C700,80 800,40 900,60 C1000,80 1100,40 1200,60 C1300,80 1400,40 1440,60 L1440,0 L0,0 Z",
  },
  {
    d1: "M0,40 C180,20 360,60 540,40 C720,20 900,60 1080,40 C1260,20 1380,60 1440,40 L1440,0 L0,0 Z",
    d2: "M0,40 C180,60 360,20 540,40 C720,60 900,20 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z",
  },
];

export default function FluidSectionDivider({
  h = 80,
  accent = "#A78BFA",
  bg = "#0A0A0A",
  layers = 2,
  flip = false,
  className = "",
}: FluidSectionDividerProps) {
  const dir = flip ? "-1" : "1";
  // Each layer has its own morph timing (offset)
  const layerConfig = [
    { wave: WAVES[0], duration: 8, delay: 0 },
    { wave: WAVES[1], duration: 11, delay: 2 },
    { wave: WAVES[2], duration: 6, delay: 3.5 },
  ].slice(0, layers);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height: h, transform: `${flip ? "rotate(180deg)" : ""}` }}>
      {/* Solid background fill */}
      <div
        className="absolute inset-0"
        style={{ background: bg, height: h, transform: flip ? "rotate(180deg)" : undefined }}
      />

      {/* Passive background fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            flip
              ? "linear-gradient(to top, transparent 30%, rgba(10,10,10,0.4) 100%)"
              : "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.4) 100%)",
        }}
      />

      {/* ── Morphing wave layers ───────────────────────────────── */}
      {layerConfig.map((cfg, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 1440 0"
          className="absolute bottom-0 left-0 w-full overflow-visible"
          preserveAspectRatio="none"
          style={{ height: h, opacity: 0.85 - i * 0.2, transform: flip ? "scaleY(-1)" : undefined }}
        >
          <motion.path
            d={cfg.wave.d1}
            fill={bg}
            animate={{
              d: [cfg.wave.d1, cfg.wave.d2, cfg.wave.d1],
            }}
            transition={{
              duration: cfg.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: cfg.delay,
            }}
          />
          {/* Accent stroke at the wave tip */}
          <motion.path
            d={cfg.wave.d1}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeOpacity="0.5"
            animate={{
              d: [cfg.wave.d1, cfg.wave.d2, cfg.wave.d1],
            }}
            transition={{
              duration: cfg.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: cfg.delay,
            }}
          />
        </motion.svg>
      ))}

      {/* Rising ripple dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full bg-white/10"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              left: 20 + i * 380,
              opacity: 0.3 - i * 0.05,
            }}
            animate={{
              y: [-h, -h * 0.2],
              scale: [0, 1 + i * 0.3],
              opacity: [0, 0.3 - i * 0.04],
            }}
            transition={{
              duration: 2.5 + i,
              repeat: Infinity,
              repeatDelay: 0.5 + i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
