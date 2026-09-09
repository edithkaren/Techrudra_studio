import { motion } from "framer-motion";

const items = [
  "Native Mobile", "Motion Design", "Product UI", "iOS Development",
  "Cross-Platform", "Landing Pages", "App Design", "Animations",
  "UI/UX", "Creative Development",
];

const Dot = () => (
  <span className="mx-3 inline-block h-1 w-1 rounded-full bg-white/10" />
);

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
            <motion.span
              className="whitespace-nowrap text-sm font-medium tracking-wide text-white/15 select-none transition-colors"
              whileHover={{ color: "rgba(167,139,250,0.6)" }}
            >
              {item}
            </motion.span>
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
