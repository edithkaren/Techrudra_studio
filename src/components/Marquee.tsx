import { motion } from "framer-motion";

const items = [
  { text: "Web Development", color: "#6C3AED" },
  { text: "AI Solutions", color: "#3B82F6" },
  { text: "Automation", color: "#14B8A6" },
  { text: "UI/UX Design", color: "#EC4899" },
  { text: "Branding", color: "#FB923C" },
  { text: "Motion Design", color: "#8B5CF6" },
  { text: "Video Production", color: "#EF4444" },
  { text: "Digital Marketing", color: "#6C3AED" },
  { text: "Social Media", color: "#3B82F6" },
];

function MarqueeRow() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-4">
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{ x: ["-33.333%", "0%"] }}
        transition={{
          x: { duration: 40, repeat: Infinity, ease: "linear" },
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item.text}-${i}`}
            className="whitespace-nowrap text-sm font-semibold tracking-wide select-none transition-colors hover:text-current"
            style={{ color: `${item.color}33` }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = item.color;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = `${item.color}33`;
            }}
          >
            {item.text}
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
