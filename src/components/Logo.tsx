import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { siteConfig } from "@/data/site";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  className?: string;
  size?: LogoSize;
}

const SIZE_STYLES: Record<LogoSize, { tile: string; mono: string }> = {
  sm: { tile: "h-10 w-10", mono: "w-[60%]" },
  md: { tile: "h-12 w-12", mono: "w-[62%]" },
  lg: { tile: "h-16 w-16", mono: "w-[64%]" },
};

/* Solid metallic "TR" monogram — the T stem threads behind the R,
   exactly like the brand tile: brushed-silver letterforms on charcoal. */
const MONO_T = "M6 6 H70 V22 H6 Z M28 22 H44 V96 H28 Z";
const MONO_R =
  "M56 14 H84 A22 22 0 0 1 84 58 H56 Z M70 26 H82 A10 10 0 0 1 82 46 H70 Z M78 52 L104 96 H85 L67 62 Z";
const MONO_VIEWBOX = "0 0 110 102";
const SPARK = "M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z";

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const s = SIZE_STYLES[size];
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const metalId = `logo-metal-${uid}`;
  const metalSheenId = `logo-sheen-${uid}`;
  const tileId = `logo-tile-${uid}`;

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
        className="group flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]/60"
      >
        <div className={`relative ${s.tile}`}>
          {/* Ambient glow halo — kept subtle so the mark stays premium */}
          <motion.div
            className="absolute -inset-1 rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 32% 26%, rgba(167,139,250,0.45), rgba(212,184,150,0.22) 48%, transparent 74%)",
              filter: "blur(8px)",
            }}
            animate={{ opacity: hovered ? 0.95 : [0.3, 0.5, 0.3] }}
            transition={{
              opacity: hovered
                ? { duration: 0.3 }
                : { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Dark tile — same charcoal family as the site background */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.08]"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.55)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(150deg, #17171A 0%, #0F0F12 45%, #0A0A0A 100%)`,
              }}
            />
            {/* Brushed-metal tile texture */}
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                background:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 3px)",
              }}
            />
            {/* Top-left light falloff */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 26% 18%, rgba(255,255,255,0.14) 0%, transparent 55%)",
              }}
            />
          </motion.div>

          {/* Metallic TR monogram */}
          <svg
            viewBox={MONO_VIEWBOX}
            className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${s.mono}`}
            style={{
              filter: hovered
                ? "drop-shadow(0 3px 6px rgba(0,0,0,0.65)) drop-shadow(0 0 10px rgba(167,139,250,0.5))"
                : "drop-shadow(0 3px 5px rgba(0,0,0,0.6))",
              transition: "filter 0.4s ease",
            }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FDFDFE" />
                <stop offset="34%" stopColor="#D6D9DE" />
                <stop offset="58%" stopColor="#A9AEB6" />
                <stop offset="78%" stopColor="#CFD3D9" />
                <stop offset="100%" stopColor="#8C9199" />
              </linearGradient>
              <linearGradient id={metalSheenId} x1="0" y1="0" x2="1" y2="0.4">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id={tileId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#B49BE8" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#D4B896" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Soft violet-to-bronze rim light on hover */}
            <rect
              x="0.6"
              y="0.6"
              width="108.8"
              height="100.8"
              rx="10"
              fill="none"
              stroke={`url(#${tileId})`}
              strokeWidth="1.2"
              opacity={hovered ? 1 : 0.35}
              style={{ transition: "opacity 0.4s ease" }}
            />

            <g fill={`url(#${metalId})`}>
              <path d={MONO_T} />
              <path d={MONO_R} fillRule="evenodd" />
            </g>
            {/* Specular sheen sweeping across the metal */}
            <g fill={`url(#${metalSheenId})`} opacity={0.55}>
              <path d={MONO_T} />
              <path d={MONO_R} fillRule="evenodd" />
            </g>
          </svg>

          {/* Sparkle accent */}
          <motion.svg
            viewBox="0 0 10 10"
            className="absolute -right-1 -bottom-1 z-20 h-2.5 w-2.5"
            animate={{ scale: [1, 1.3, 1], opacity: [0.55, 1, 0.55], rotate: [0, 18, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <path
              d={SPARK}
              fill="#E8E8EA"
              style={{ filter: "drop-shadow(0 0 3px rgba(232,232,234,0.9))" }}
            />
          </motion.svg>
        </div>
      </Link>
    </motion.div>
  );
}
