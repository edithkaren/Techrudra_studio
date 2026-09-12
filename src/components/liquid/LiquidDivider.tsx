import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setKey((k) => k + 1);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-40px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pathA = "M0,120 C180,120 360,120 540,120 C720,120 900,120 1080,120 C1260,120 1440,120 1440,120 L1440,120 L0,120 Z";
  const pathB =
    "M0,120 C180,60 360,160 540,100 C720,40 900,160 1080,100 C1260,40 1440,120 1440,120 L1440,120 L0,120 Z";
  const pathC =
    "M0,120 C200,120 400,120 600,120 C800,120 1000,120 1200,120 L1440,120 L0,120 Z";
  const pathD =
    "M0,120 C200,160 400,80 600,140 C800,200 1000,80 1200,140 L1440,120 L0,120 Z";
  const pathE =
    "M0,120 C160,120 320,120 480,120 C640,120 800,120 960,120 C1120,120 1280,120 1440,120 L1440,120 L0,120 Z";
  const pathF =
    "M0,120 C160,100 320,140 480,100 C640,60 800,140 960,100 C1120,60 1280,120 1440,120 L1440,120 L0,120 Z";

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
            key={`a-${key}`}
            className="pointer-events-none"
            d={pathA}
            fill="#0A0A0A"
            animate={{ d: [pathA, pathB, pathA] }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], repeat: 1, repeatType: "reverse" }}
          />
          <motion.path
            key={`b-${key}`}
            className="pointer-events-none"
            d={pathC}
            fill="rgba(10,10,10,0.9)"
            animate={{ d: [pathC, pathD, pathC] }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], repeat: 1, repeatType: "reverse", delay: 0.2 }}
          />
          <motion.path
            key={`c-${key}`}
            className="pointer-events-none"
            d={pathE}
            fill="rgba(10,10,10,0.85)"
            animate={{ d: [pathE, pathF, pathE] }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], repeat: 1, repeatType: "reverse", delay: 0.4 }}
          />
        </svg>

        {/* Glow accent on edge */}
        <motion.div
          key={`g-${key}`}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, ${color}40, transparent)`,
          }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
