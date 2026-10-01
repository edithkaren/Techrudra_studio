import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { siteConfig } from "@/data/site";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  className?: string;
  size?: LogoSize;
}

const SIZE_STYLES: Record<LogoSize, { tile: string; mono: string; text: string }> = {
  sm: { tile: "h-8 w-8", mono: "w-[18px]", text: "text-sm" },
  md: { tile: "h-9 w-9", mono: "w-[21px]", text: "text-base" },
  lg: { tile: "h-11 w-11", mono: "w-[26px]", text: "text-lg" },
};

/* Interlocked outlined "TS" monogram — T crossbar meets a flowing S,
   strokes drawn as gradient outer + light inner for the engraved outline look */
const MONO_STROKES = [
  "M20 32 H104", // T crossbar
  "M62 32 V112", // T stem
  "M148 40 H126 A13 13 0 0 0 126 66 H138 A13 13 0 0 1 138 92 H116", // S curve
];
const MONO_VIEWBOX = "8 22 158 102";
const MONO_INNER = "#3A3422";
const SPARK =
  "M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z";

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const s = SIZE_STYLES[size];
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const monoGradId = `logo-mono-${uid}`;
  const monoGlowId = `logo-glow-${uid}`;

  /* Brand lockup: icon-only mark, no wordmark */
  const handleClick = (e: React.MouseEvent) => {
    // Already home: smooth-scroll to top instead of a no-op navigation.
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center ${className}`}
    >
      <Link
        to="/"
        onClick={handleClick}
        aria-label={siteConfig.name}
        className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]/60"
      >
        {/* ── Brand mark ──────────────────────────────────────────── */}
        <div className={`relative ${s.tile}`}>
          {/* Persistent ambient glow — the "highlight" halo */}
          <motion.div
            className="absolute -inset-1.5 rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(167,139,250,0.55), rgba(212,184,150,0.35) 45%, transparent 72%)",
              filter: "blur(9px)",
            }}
            animate={{
              opacity: hovered ? 1 : [0.45, 0.72, 0.45],
              scale: hovered ? 1.18 : 1,
            }}
            transition={{
              opacity: hovered
                ? { duration: 0.3 }
                : { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 300, damping: 20 },
            }}
          />

          {/* Circular badge tile with gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#B49BE8] to-[#D4B896] p-[2px] shadow-lg shadow-[#B49BE8]/30"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 32% 24%, #FFFDF6 0%, #FAF3E3 48%, #F0E2C6 100%)",
              }}
            >
              {/* Inner top-light glass sheen */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 25% 18%, rgba(255,255,255,0.85) 0%, transparent 55%)",
                }}
              />
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.4) 48%, rgba(255,255,255,0.1) 58%, transparent 72%)",
                  backgroundSize: "220% 220%",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                }}
              />
              {/* Gradient shading overlay across the badge */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.16) 0%, rgba(180,155,232,0.10) 42%, rgba(176,141,87,0.16) 100%)",
                }}
              />
              {/* Interlocked outlined TS monogram — strokes draw in on load */}
              <svg
                viewBox={MONO_VIEWBOX}
                fill="none"
                className={`relative z-10 ${s.mono}`}
                style={{
                  filter: hovered
                    ? "drop-shadow(0 0 8px rgba(167,139,250,0.85)) drop-shadow(0 0 18px rgba(212,184,150,0.5))"
                    : "drop-shadow(0 0 6px rgba(139,92,246,0.55))",
                  transition: "filter 0.45s ease",
                }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id={monoGradId}
                    x1="8"
                    y1="22"
                    x2="166"
                    y2="124"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="55%" stopColor="#B49BE8" />
                    <stop offset="100%" stopColor="#B08D57" />
                  </linearGradient>
                  <linearGradient
                    id={monoGlowId}
                    x1="8"
                    y1="22"
                    x2="166"
                    y2="124"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="55%" stopColor="#D4B896" />
                    <stop offset="100%" stopColor="#E8C87E" />
                  </linearGradient>
                </defs>
                <g strokeLinecap="round" strokeLinejoin="round">
                  {/* Soft echo stroke — engraved depth behind the mark */}
                  <g
                    stroke="#D8C49A"
                    strokeWidth={16}
                    opacity={0.55}
                    transform="translate(3.5,3.5)"
                  >
                    {MONO_STROKES.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                  {/* Hollow core — glows violet on hover */}
                  <g
                    stroke={hovered ? `url(#${monoGlowId})` : MONO_INNER}
                    strokeWidth={7}
                    style={{ transition: "stroke 0.5s ease" }}
                  >
                    {MONO_STROKES.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                  {/* Outer strokes — draw themselves in on load */}
                  <g stroke={`url(#${monoGradId})`} strokeWidth={16}>
                    {MONO_STROKES.map((d, i) => (
                      <motion.path
                        key={d}
                        d={d}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            duration: 1.8,
                            delay: 0.35 + i * 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.6,
                            delay: 0.35 + i * 0.3,
                          },
                        }}
                      />
                    ))}
                  </g>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Sparkle accent */}
          <motion.svg
            viewBox="0 0 10 10"
            className="absolute -top-1 -right-1 z-20 h-2.5 w-2.5"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7], rotate: [0, 18, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          >
            <path
              d={SPARK}
              fill="#E8C87E"
              style={{ filter: "drop-shadow(0 0 3px rgba(232,200,126,0.95))" }}
            />
          </motion.svg>
        </div>

      </Link>
    </motion.div>
  );
}
