import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  "FULL-STACK DEVELOPMENT",
  "AI",
  "AI AUTOMATION",
  "UI/UX",
  "BRANDING",
  "MOTION DESIGN",
  "VIDEO",
  "DIGITAL MARKETING",
  "SOCIAL MEDIA",
  "CREATIVE TECHNOLOGY",
];

const Dot = () => (
  <span className="mx-5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] opacity-50" />
);

function LiquidMarqueeItem({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="cursor-default text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase select-none transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        filter: hovered ? "url(#fluid-distort-hover)" : "none",
        color: hovered ? "rgba(196,181,253,0.9)" : "rgba(255,255,255,0.28)",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}
    >
      {children}
    </span>
  );
}

function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  const repeated = [...items, ...items];
  return (
    <div className="flex overflow-hidden py-3">
      <motion.div
        className="flex shrink-0 items-center"
        animate={{ x: direction === "left" ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
      >
        {repeated.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <LiquidMarqueeItem>{item}</LiquidMarqueeItem>
            <Dot />
          </span>
          ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="group relative border-y border-white/[0.06] bg-[#0A0A0A] px-6 py-4">
      <MarqueeRow direction="left" />
      {/* Gradient edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      {/* Hover pause */}
      <style>{`@media (hover: hover) { .group:hover .marquee-track { animation-play-state: paused; } }`}</style>
    </div>
  );
}
