import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { siteConfig } from "@/data/site";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  className?: string;
  size?: LogoSize;
}

const SIZE_STYLES: Record<
  LogoSize,
  { tile: string; mark: string; text: string }
> = {
  sm: { tile: "h-8 w-8", mark: "text-[10px]", text: "text-sm" },
  md: { tile: "h-9 w-9", mark: "text-[11px]", text: "text-base" },
  lg: { tile: "h-11 w-11", mark: "text-[13px]", text: "text-lg" },
};

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const s = SIZE_STYLES[size];

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
        {/* ── Icon mark ─────────────────────────────────────────── */}
        <div className={`relative ${s.tile}`}>
          {/* Soft glow halo */}
          <motion.div
            className="absolute -inset-1 rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.55), transparent 65%)",
              filter: "blur(9px)",
            }}
            animate={{
              opacity: hovered ? 0.85 : 0.4,
              scale: hovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />

          {/* Rotating gradient orbit ring + comet head */}
          <motion.svg
            className="absolute -inset-1.5"
            viewBox="0 0 44 44"
            fill="none"
            animate={{ rotate: 360, opacity: hovered ? 1 : 0.55 }}
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
              r="20"
              stroke="url(#logo-orbit)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="58 68"
            />
            <circle
              cx="22"
              cy="2"
              r="2.1"
              fill="#F472B6"
              style={{ filter: "drop-shadow(0 0 4px rgba(244,114,182,0.9))" }}
            />
            <defs>
              <linearGradient id="logo-orbit" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="55%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Liquid glass tile */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-[length:600%_600%] bg-gradient-to-br from-[#A78BFA] via-[#60A5FA] to-[#F472B6] shadow-lg shadow-[#A78BFA]/25"
            animate={{
              borderRadius: ["12px", "7px", "17px", "10px", "12px"],
              scale: hovered ? 1.08 : 1,
            }}
            transition={{
              borderRadius: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 320, damping: 18 },
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.12) 58%, transparent 72%)",
                backgroundSize: "220% 220%",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            />
            {/* Glass highlight */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 25% 22%, rgba(255,255,255,0.4) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          {/* Monogram */}
          <span
            className={`relative z-10 flex h-full w-full items-center justify-center font-black tracking-tight text-white ${s.mark}`}
            style={{
              textShadow:
                "0 1px 2px rgba(0,0,0,0.35), 0 0 14px rgba(167,139,250,0.55)",
            }}
          >
            TR
          </span>
        </div>

        {/* ── Wordmark ──────────────────────────────────────────── */}
        <span
          className={`relative inline-block font-black tracking-tight ${s.text}`}
        >
          <span className="relative z-10 text-white">{siteConfig.name}</span>
          {/* Gradient sweep overlay on hover */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #A78BFA, #60A5FA, #F472B6, #A78BFA)",
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
          {/* Animated gradient underline */}
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full"
            style={{
              background: "linear-gradient(90deg, #A78BFA, #60A5FA, #F472B6)",
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
