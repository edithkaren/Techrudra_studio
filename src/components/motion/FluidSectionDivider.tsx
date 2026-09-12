import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface FluidSectionDividerProps {
  h?: number;
  accent?: string;
  bg?: string;
  layers?: number;
  flip?: boolean;
  className?: string;
}

export default function FluidSectionDivider({
  h = 64,
  accent = "#A78BFA",
  bg = "#0A0A0A",
  layers = 2,
  flip = false,
  className = "",
}: FluidSectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { scrollY } = useScroll();

  const waveLayers = Array.from({ length: layers }, (_, i) => {
    const seed = i + 1;
    const wave1 = useTransform(
      scrollY,
      [0, 1],
      [
        `M0,120 C${180 + seed * 20},120 ${360 + seed * 20},120 ${540 + seed * 20},120 C${720 + seed * 20},120 ${900 + seed * 20},120 ${1080 + seed * 20},120 C${1260 + seed * 20},120 1440,120 1440,120 L1440,120 L0,120 Z`,
        `M0,120 C${180 + seed * 20},${60 + seed * 10} ${360 + seed * 20},${160 - seed * 10} ${540 + seed * 20},${100 + seed * 20} C${720 + seed * 20},${40 - seed * 20} ${900 + seed * 20},${160 + seed * 10} ${1080 + seed * 20},${100 - seed * 10} C${1260 + seed * 20},${40 + seed * 20} 1440,120 1440,120 L1440,120 L0,120 Z`,
      ]
    );
    const wave2 = useTransform(
      scrollY,
      [0, 1],
      [
        `M0,120 C${200 + seed * 10},120 ${400 + seed * 10},120 ${600 + seed * 10},120 C${800 + seed * 10},120 ${1000 + seed * 10},120 ${1200 + seed * 10},120 L1440,120 L0,120 Z`,
        `M0,120 C${200 + seed * 10},${160 - seed * 20} ${400 + seed * 10},${80 + seed * 20} ${600 + seed * 10},${140 - seed * 10} C${800 + seed * 10},${200 - seed * 10} ${1000 + seed * 10},${80 + seed * 10} ${1200 + seed * 10},${140 + seed * 20} L1440,120 L0,120 Z`,
      ]
    );
    return { seed, wave1, wave2 };
  });

  return (
    <div
      ref={ref}
      className={`overflow-hidden bg-[${bg}] ${className}`}
      style={{ height: `${h}px` }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0) 0%, #0A0A0A 40%)",
          }}
        />

        <svg
          className="absolute bottom-0 h-32 w-full fill-[${bg}]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          style={{ height: "120px" }}
        >
          {waveLayers.map(({ seed, wave1, wave2 }) => (
            <motion.path
              key={seed}
              className="pointer-events-none"
              d="M0,120 C180,120 360,120 540,120 C720,120 900,120 1080,120 C1260,120 1440,120 1440,120 L1440,120 L0,120 Z"
              fill={bg}
              animate={inView ? wave1 : wave1}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          ))}
          {waveLayers.map(({ seed, wave1, wave2 }) => (
            <motion.path
              key={`b-${seed}`}
              className="pointer-events-none"
              d="M0,120 C200,120 400,120 600,120 C800,120 1000,120 1200,120 L1440,120 L0,120 Z"
              fill="rgba(10,10,10,0.9)"
              animate={inView ? wave1 : wave1}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            />
          ))}
        </svg>

        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1"
          style={
            flip
              ? {
                  background: `linear-gradient(90deg, transparent, ${accent}80, ${accent}40, transparent)`,
                  transform: "scaleX(-1)",
                }
              : {
                  background: `linear-gradient(90deg, transparent, ${accent}80, ${accent}40, transparent)`,
                }
          }
          animate={{
            opacity: inView ? 0.5 : 0.2,
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
