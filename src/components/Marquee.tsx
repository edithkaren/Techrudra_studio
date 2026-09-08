import { motion } from "framer-motion";

const items = [
  "Full-Stack Development",
  "AI",
  "Automation",
  "UI/UX",
  "Branding",
  "Motion Design",
  "Video",
  "Digital Marketing",
  "Social Media",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-4">
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{
          x: reverse ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          x: { duration: 40, repeat: Infinity, ease: "linear" },
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-sm font-medium tracking-wide text-stone-300 select-none"
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
    <div className="border-y border-stone-200/60 bg-stone-50/50 px-6">
      <div className="mx-auto max-w-7xl">
        <MarqueeRow />
      </div>
    </div>
  );
}
