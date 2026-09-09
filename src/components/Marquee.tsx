import { motion } from "framer-motion";

const items = [
  "Native Mobile",
  "Motion Design",
  "Product UI",
  "iOS Development",
  "Cross-Platform",
  "Landing Pages",
  "App Design",
  "Animations",
  "UI/UX",
  "Creative Development",
];

function MarqueeRow() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-4">
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{ x: ["-33.333%", "0%"] }}
        transition={{
          x: { duration: 35, repeat: Infinity, ease: "linear" },
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-sm font-medium tracking-wide text-white/20 select-none transition-colors hover:text-white/50"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="border-y border-white/[0.06] bg-[#0A0A0A] px-6">
      <div className="mx-auto max-w-7xl">
        <MarqueeRow />
      </div>
    </div>
  );
}
