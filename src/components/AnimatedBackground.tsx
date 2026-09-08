import { motion } from "framer-motion";

/* ── Floating gradient orbs ─────────────────────────────────────── */
interface Orb {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}

const orbSets: Record<string, Orb[]> = {
  hero: [
    { color: "rgba(108,58,237,0.12)", size: 520, x: "15%", y: "20%", delay: 0, duration: 18 },
    { color: "rgba(59,130,246,0.08)", size: 400, x: "75%", y: "30%", delay: 2, duration: 22 },
    { color: "rgba(236,72,153,0.07)", size: 340, x: "60%", y: "70%", delay: 4, duration: 20 },
    { color: "rgba(20,184,166,0.06)", size: 280, x: "25%", y: "75%", delay: 1, duration: 24 },
  ],
  services: [
    { color: "rgba(108,58,237,0.06)", size: 400, x: "80%", y: "10%", delay: 0, duration: 20 },
    { color: "rgba(251,146,60,0.05)", size: 300, x: "10%", y: "80%", delay: 3, duration: 22 },
  ],
  contact: [
    { color: "rgba(108,58,237,0.08)", size: 460, x: "70%", y: "20%", delay: 0, duration: 18 },
    { color: "rgba(236,72,153,0.06)", size: 340, x: "20%", y: "70%", delay: 2, duration: 22 },
    { color: "rgba(59,130,246,0.05)", size: 260, x: "50%", y: "50%", delay: 4, duration: 20 },
  ],
};

function Orbs({ variant = "hero" }: { variant?: keyof typeof orbSets }) {
  const orbs = orbSets[variant] || orbSets.hero;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -40, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Dot grid pattern ───────────────────────────────────────────── */
function DotGrid({ opacity = 0.3 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, #78716C 0.5px, transparent 0.5px)",
        backgroundSize: "32px 32px",
        opacity,
      }}
    />
  );
}

/* ── Animated grid lines ────────────────────────────────────────── */
function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(108,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(108,58,237,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(108,58,237,0.04) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Floating geometric shapes ──────────────────────────────────── */
function FloatingShapes() {
  const shapes = [
    { x: "10%", y: "20%", size: 60, rotate: 0, color: "rgba(108,58,237,0.06)", delay: 0 },
    { x: "85%", y: "15%", size: 40, rotate: 45, color: "rgba(59,130,246,0.05)", delay: 1 },
    { x: "70%", y: "75%", size: 50, rotate: 22, color: "rgba(236,72,153,0.05)", delay: 2 },
    { x: "20%", y: "80%", size: 35, rotate: 67, color: "rgba(251,146,60,0.05)", delay: 3 },
    { x: "50%", y: "10%", size: 25, rotate: 15, color: "rgba(20,184,166,0.04)", delay: 1.5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg border border-stone-200/40"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: shape.color,
            rotate: shape.rotate,
          }}
          animate={{
            y: [0, -15, 10, -8, 0],
            rotate: [shape.rotate, shape.rotate + 10, shape.rotate - 5, shape.rotate + 3, shape.rotate],
            opacity: [0.6, 0.9, 0.7, 1, 0.6],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Noise texture overlay ──────────────────────────────────────── */
function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        opacity,
      }}
    />
  );
}

export { Orbs, DotGrid, GridLines, FloatingShapes, NoiseOverlay };
