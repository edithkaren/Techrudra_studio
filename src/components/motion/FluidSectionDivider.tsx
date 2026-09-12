import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

type WaveMode = "morph" | "ripple";

interface FluidSectionDividerProps {
  h?: number;
  accent?: string;
  bg?: string;
  layers?: number;
  flip?: boolean;
  mode?: WaveMode;
  className?: string;
}

export default function FluidSectionDivider({
  h = 64,
  accent = "#A78BFA",
  bg = "#0A0A0A",
  layers = 2,
  flip = false,
  mode = "morph",
  className = "",
}: FluidSectionDividerProps) {
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

  const layersMeta = useMemo(
    () =>
      Array.from({ length: layers }, (_, i) => {
        const seed = i + 1;
        const baseA = `M0,120 C${180 + seed * 20},120 ${360 + seed * 20},120 ${540 + seed * 20},120 C${720 + seed * 20},120 ${900 + seed * 20},120 ${1080 + seed * 20},120 C${1260 + seed * 20},120 1440,120 1440,120 L1440,120 L0,120 Z`;
        const baseB = `M0,120 C${180 + seed * 20},${60 + seed * 10} ${360 + seed * 20},${160 - seed * 10} ${540 + seed * 20},${100 + seed * 20} C${720 + seed * 20},${40 - seed * 20} ${900 + seed * 20},${160 + seed * 10} ${1080 + seed * 20},${100 - seed * 10} C${1260 + seed * 20},${40 + seed * 20} 1440,120 1440,120 L1440,120 L0,120 Z`;
        const overlayA = `M0,120 C${200 + seed * 10},120 ${400 + seed * 10},120 ${600 + seed * 10},120 C${800 + seed * 10},120 ${1000 + seed * 10},120 ${1200 + seed * 10},120 L1440,120 L0,120 Z`;
        const overlayB = `M0,120 C${200 + seed * 10},${160 - seed * 20} ${400 + seed * 10},${80 + seed * 20} ${600 + seed * 10},${140 - seed * 10} C${800 + seed * 10},${200 - seed * 10} ${1000 + seed * 10},${80 + seed * 10} ${1200 + seed * 10},${140 + seed * 20} L1440,120 L0,120 Z`;
        return { seed, baseA, baseB, overlayA, overlayB };
      }),
    [layers]
  );

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
          key={`svg-${key}`}
          className="absolute bottom-0 h-32 w-full fill-[${bg}]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          style={{ height: "120px" }}
        >
          {layersMeta.map((layer) => (
            <motion.path
              key={`base-${layer.seed}-${key}`}
              className="pointer-events-none"
              d={layer.baseA}
              fill={bg}
              animate={{ d: [layer.baseA, layer.baseB, layer.baseA] }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
                repeat: 1,
                repeatType: "reverse",
              }}
            />
          ))}
          {layersMeta.map((layer) => (
            <motion.path
              key={`overlay-${layer.seed}-${key}`}
              className="pointer-events-none"
              d={layer.overlayA}
              fill="rgba(10,10,10,0.9)"
              animate={{ d: [layer.overlayA, layer.overlayB, layer.overlayA] }}
              transition={{
                duration: mode === "ripple" ? 1.8 : 1.6,
                ease: [0.25, 0.1, 0.25, 1],
                repeat: 1,
                repeatType: "reverse",
                delay: mode === "ripple" ? 0.1 * layer.seed : 0.2,
              }}
            />
          ))}
        </svg>

        <motion.div
          key={`g-${key}`}
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
