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

/* Interlocked outlined "TR" monogram — T crossbar threads through R's stem,
   strokes drawn as white outer + dark inner to create the hollow outline effect */
const MONO_STROKES = [
  "M22 32 H126", // T crossbar
  "M65 32 V112", // T stem
  "M120 32 V112", // R stem
  "M120 36 H136 A22 22 0 0 1 136 80 H120", // R bowl
  "M138 80 L166 112", // R leg
];
const MONO_VIEWBOX = "10 20 168 104";
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
  const orbitGradId = `logo-orbit-${uid}`;

  /* Brand lockup: "Techrudra" + gradient ".Studio" */
  const dotIndex = siteConfig.name.indexOf(".");
  const brandName = dotIndex > 0 ? siteConfig.name.slice(0, dotIndex) : siteConfig.name;
  const brandTail = dotIndex > 0 ? siteConfig.name.slice(dotIndex) : "";

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

          {/* Orbit ring with comet head */}
          <motion.svg
            className="absolute -inset-1"
            viewBox="0 0 44 44"
            fill="none"
            animate={{ rotate: 360, opacity: hovered ? 1 : 0.5 }}
            transition={{
              rotate: {
                duration: hovered ? 2.4 : 9,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 0.3 },
            }}
          >
            <circle
              cx="22"
              cy="22"
              r="20.5"
              stroke={`url(#${orbitGradId})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="50 79"
            />
            <circle
              cx="22"
              cy="1.5"
              r="2"
              fill="#F472B6"
              style={{ filter: "drop-shadow(0 0 4px rgba(244,114,182,0.9))" }}
            />
            <defs>
              <linearGradient id={orbitGradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="55%" stopColor="#B49BE8" />
                <stop offset="100%" stopColor="#D4B896" />
              </linearGradient>
            </defs>
          </motion.svg>

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
              {/* Interlocked outlined TR monogram — strokes draw in on load,
                  hollow interior reveals a violet glow on hover ("emergent" effect) */}
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
                    x1="14"
                    y1="24"
                    x2="174"
                    y2="120"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="55%" stopColor="#B49BE8" />
                    <stop offset="100%" stopColor="#B08D57" />
                  </linearGradient>
                  <linearGradient
                    id={monoGlowId}
                    x1="14"
                    y1="24"
                    x2="174"
                    y2="120"
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

        {/* ── Wordmark lockup ─────────────────────────────────────── */}
        <span
          className={`relative inline-flex flex-col font-black leading-none tracking-tight ${s.text}`}
        >
          <span className="relative z-10 inline-flex items-baseline">
            <span className="text-white">{brandName}</span>
            {/* Always-on animated gradient suffix = the brand highlight */}
            <motion.span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B5CF6, #B49BE8, #D4B896, #8B5CF6)",
                backgroundSize: "220% 100%",
              }}
              animate={{
                backgroundPosition: hovered
                  ? ["0% 50%", "100% 50%"]
                  : "0% 50%",
              }}
              transition={{
                backgroundPosition: {
                  duration: 2.4,
                  repeat: hovered ? Infinity : 0,
                  ease: "linear",
                },
              }}
            >
              {brandTail}
            </motion.span>
          </span>
          {/* Gradient sweep overlay across the full wordmark on hover */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #8B5CF6, #B49BE8, #D4B896, #8B5CF6)",
              backgroundSize: "220% 100%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: hovered ? 1 : 0,
              backgroundPosition: hovered
                ? ["0% 50%", "100% 50%"]
                : "0% 50%",
            }}
            transition={{
              opacity: { duration: 0.3 },
              backgroundPosition: {
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {siteConfig.name}
          </motion.span>
          {/* Animated gradient underline on hover */}
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #B49BE8, #D4B896)",
            }}
            initial={false}
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.9 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </Link>
    </motion.div>
  );
}
