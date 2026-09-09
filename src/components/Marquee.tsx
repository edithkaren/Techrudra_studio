import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  "Native Mobile", "Motion Design", "Product UI", "iOS Development",
  "Cross-Platform", "Landing Pages", "App Design", "Animations",
  "UI/UX", "Creative Development",
];

const Dot = () => (
  <span className="mx-3 inline-block h-1 w-1 rounded-full bg-white/10" />
);

/* Liquid text that distorts on hover */
function LiquidMarqueeItem({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="whitespace-nowrap text-sm font-medium tracking-wide select-none transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        filter: hovered ? "url(#fluid-distort-hover)" : "none",
        color: hovered ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.15)",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </span>
  );
}

function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-3">
      <motion.div
        className="flex shrink-0 items-center gap-0"
        animate={{ x: direction === "left" ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
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
    <div className="border-y border-white/[0.06] bg-[#0A0A0A] px-6 py-2">
      <div className="mx-auto max-w-7xl">
        <MarqueeRow direction="left" />
        <MarqueeRow direction="right" />
      </div>
    </div>
  );
}
