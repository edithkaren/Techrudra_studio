import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface LiquidDividerProps {
  height?: number;
  color?: string;
  seed?: number;
  className?: string;
}

export default function LiquidDivider({
  height = 64,
  color = "#A78BFA",
  seed = 1,
  className = "",
}: LiquidDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const opacity = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  }).opacity;

  const wave1 = useTransform(
    opacity,
    [0, 1],
    [
      "M0,120 C180,120 360,120 540,120 C720,120 900,120 1080,120 C1260,120 1440,120 1440,120 L1440,120 L0,120 Z",
      "M0,120 C180,60 360,160 540,100 C720,40 900,160 1080,100 C1260,40 1440,120 1440,120 L1440,120 L0,120 Z",
    ]
  );

  const wave2 = useTransform(
    opacity,
    [0, 1],
    [
      "M0,120 C200,120 400,120 600,120 C800,120 1000,120 1200,120 L1440,120 L0,120 Z",
      "M0,120 C200,160 400,80 600,140 C800,200 1000,80 1200,140 L1440,120 L0,120 Z",
    ]
  );

  const wave3 = useTransform(
    opacity,
    [0, 1],
    [
      "M0,120 C160,120 320,120 480,120 C640,120 800,120 960,120 C1120,120 1280,120 1440,120 L1440,120 L0,120 Z",
      "M0,120 C160,100 320,140 480,100 C640,60 800,140 960,100 C1120,60 1280,120 1440,120 L1440,120 L0,120 Z",
    ]
  );

  return (
    <div
      ref={ref}
      className={`overflow-hidden bg-[#0A0A0A] ${className}`}
      style={{ height: `${height}px` }}
    >
      <div className="relative h-full w-full">
        {/* Base fade from section above */}
        <div
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0) 0%, #0A0A0A 40%)",
          }}
        />

        {/* Fluid morphing wave at the bottom edge */}
        <svg
          className="absolute bottom-0 h-32 w-full fill-[#0A0A0A]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          style={{ height: "120px" }}
        >
          <motion.path
            className="pointer-events-none"
            d="M0,120 C180,120 360,120 540,120 C720,120 900,120 1080,120 C1260,120 1440,120 1440,120 L1440,120 L0,120 Z"
            fill="#0A0A0A"
            animate={inView ? wave1 : wave1}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.path
            className="pointer-events-none"
            d="M0,120 C200,120 400,120 600,120 C800,120 1000,120 1200,120 L1440,120 L0,120 Z"
            fill="rgba(10,10,10,0.9)"
            animate={inView ? wave2 : wave2}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          />
          <motion.path
            className="pointer-events-none"
            d="M0,120 C160,120 320,120 480,120 C640,120 800,120 960,120 C1120,120 1280,120 1440,120 L1440,120 L0,120 Z"
            fill="rgba(10,10,10,0.85)"
            animate={inView ? wave3 : wave3}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
          />
        </svg>

        {/* Glow accent on edge */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, ${color}40, transparent)`,
          }}
          animate={{
            opacity: inView ? [0.2, 0.9, 0.2] : [0.2, 0.2],
          }}
          transition={{
            duration: 2.4,
            repeat: inView ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
