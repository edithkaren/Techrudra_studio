import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { siteConfig } from "@/data/site";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  className?: string;
  size?: LogoSize;
}

const SIZE_STYLES: Record<LogoSize, string> = {
  sm: "h-11 w-auto",
  md: "h-14 w-auto",
  lg: "h-20 w-auto",
};

/* Solid metallic "TR" monogram — the T stem threads behind the R,
   exactly like the brand tile: brushed-silver letterforms. */
const MONO_T = "M6 6 H70 V22 H6 Z M28 22 H44 V96 H28 Z";
const MONO_R =
  "M56 14 H84 A22 22 0 0 1 84 58 H56 Z M70 26 H82 A10 10 0 0 1 82 46 H70 Z M78 52 L104 96 H85 L67 62 Z";
/* Full lockup viewBox: monogram centered above a letter-spaced STUDIO wordmark. */
const LOCKUP_VIEWBOX = "0 0 160 134";
const SPARK = "M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z";

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const metalId = `logo-metal-${uid}`;
  const metalSheenId = `logo-sheen-${uid}`;

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
        <div className={`relative ${SIZE_STYLES[size]}`}>
          {/* Ambient glow halo — kept subtle so the mark stays premium */}
          <motion.div
            className="absolute -inset-1 rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(167,139,250,0.4), rgba(212,184,150,0.18) 52%, transparent 76%)",
              filter: "blur(10px)",
            }}
            animate={{ opacity: hovered ? 0.9 : [0.25, 0.45, 0.25] }}
            transition={{
              opacity: hovered
                ? { duration: 0.3 }
                : { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Metallic TR + STUDIO lockup — no background, sits on the site's dark bg */}
          <motion.svg
            viewBox={LOCKUP_VIEWBOX}
            className="relative z-10 h-full w-full"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            style={{
              filter: hovered
                ? "drop-shadow(0 3px 6px rgba(0,0,0,0.65)) drop-shadow(0 0 10px rgba(167,139,250,0.5))"
                : "drop-shadow(0 3px 5px rgba(0,0,0,0.6))",
              transition: "filter 0.4s ease",
            }}
            role="img"
            aria-label={siteConfig.name}
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
            </defs>

            {/* TR monogram, centered */}
            <g transform="translate(25,0)" fill={`url(#${metalId})`}>
              <path d={MONO_T} />
              <path d={MONO_R} fillRule="evenodd" />
            </g>
            <g transform="translate(25,0)" fill={`url(#${metalSheenId})`} opacity={0.55}>
              <path d={MONO_T} />
              <path d={MONO_R} fillRule="evenodd" />
            </g>

            {/* STUDIO wordmark — wide-tracked, same metal gradient */}
            <text
              x="80"
              y="128"
              textAnchor="middle"
              textLength="152"
              lengthAdjust="spacing"
              fontFamily="ui-sans-serif, system-ui, 'Segoe UI', Arial, sans-serif"
              fontWeight={700}
              fontSize="24"
              fill={`url(#${metalId})`}
            >
              STUDIO
            </text>
            <text
              x="80"
              y="128"
              textAnchor="middle"
              textLength="152"
              lengthAdjust="spacing"
              fontFamily="ui-sans-serif, system-ui, 'Segoe UI', Arial, sans-serif"
              fontWeight={700}
              fontSize="24"
              fill={`url(#${metalSheenId})`}
              opacity={0.45}
            >
              STUDIO
            </text>
          </motion.svg>

          {/* Sparkle accent */}
          <motion.svg
            viewBox="0 0 10 10"
            className="absolute -top-1 -right-1 z-20 h-2.5 w-2.5"
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
