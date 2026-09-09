import { motion } from "framer-motion";

interface LiquidDividerProps {
  color?: string;
  height?: number;
  flip?: boolean;
  className?: string;
}

/**
 * A morphing liquid wave that separates sections.
 * Multiple layered SVG paths with offset animations create a fluid edge.
 */
export default function LiquidDivider({
  color = "#0A0A0A",
  height = 80,
  flip = false,
  className = "",
}: LiquidDividerProps) {
  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden ${className}`}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
    >
      {/* Layer 1 — main wave */}
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          fill={color}
          fillOpacity={0.5}
          animate={{
            d: [
              "M0,40 C120,70 240,20 360,45 C480,70 600,25 720,50 C840,75 960,30 1080,55 C1200,80 1320,35 1440,50 L1440,100 L0,100 Z",
              "M0,55 C120,25 240,65 360,40 C480,15 600,60 720,35 C840,10 960,55 1080,30 C1200,5 1320,50 1440,35 L1440,100 L0,100 Z",
              "M0,45 C120,75 240,30 360,50 C480,70 600,20 720,45 C840,70 960,25 1080,50 C1200,75 1320,30 1440,45 L1440,100 L0,100 Z",
              "M0,40 C120,70 240,20 360,45 C480,70 600,25 720,50 C840,75 960,30 1080,55 C1200,80 1320,35 1440,50 L1440,100 L0,100 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Layer 2 — secondary wave, offset timing */}
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          fill={color}
          fillOpacity={0.3}
          animate={{
            d: [
              "M0,50 C180,80 360,30 540,55 C720,80 900,35 1080,60 C1260,85 1440,40 1440,55 L1440,100 L0,100 Z",
              "M0,60 C180,30 360,70 540,45 C720,20 900,65 1080,40 C1260,15 1440,55 1440,40 L1440,100 L0,100 Z",
              "M0,50 C180,80 360,30 540,55 C720,80 900,35 1080,60 C1260,85 1440,40 1440,55 L1440,100 L0,100 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.svg>

      {/* Layer 3 — thin accent wave */}
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          fill="none"
          stroke="rgba(167,139,250,0.08)"
          strokeWidth="1"
          animate={{
            d: [
              "M0,55 C240,85 480,25 720,55 C960,85 1200,25 1440,55",
              "M0,45 C240,15 480,75 720,45 C960,15 1200,75 1440,45",
              "M0,55 C240,85 480,25 720,55 C960,85 1200,25 1440,55",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.svg>
    </div>
  );
}
