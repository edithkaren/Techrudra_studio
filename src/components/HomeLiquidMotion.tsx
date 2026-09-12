import { motion } from "framer-motion";

const blooms = [
  {
    size: 460,
    color: "rgba(167,139,250,0.10)",
    accent: "rgba(167,139,250,0.25)",
    speed: 16,
    left: "8%",
    top: "10%",
    delay: 0,
  },
  {
    size: 360,
    color: "rgba(59,130,246,0.08)",
    accent: "rgba(59,130,246,0.22)",
    speed: 18,
    left: "70%",
    top: "30%",
    delay: 1.2,
  },
  {
    size: 300,
    color: "rgba(236,72,153,0.07)",
    accent: "rgba(236,72,153,0.22)",
    speed: 20,
    left: "45%",
    top: "70%",
    delay: 2.4,
  },
  {
    size: 320,
    color: "rgba(20,184,166,0.06)",
    accent: "rgba(20,184,166,0.20)",
    speed: 17,
    left: "85%",
    top: "75%",
    delay: 0.6,
  },
  {
    size: 260,
    color: "rgba(251,146,60,0.06)",
    accent: "rgba(251,146,60,0.20)",
    speed: 19,
    left: "20%",
    top: "55%",
    delay: 3.2,
  },
];

export default function HomeLiquidMotion() {
  return (
    <div className="pointer-events-none relative h-64 overflow-hidden bg-[#0A0A0A]">
      {blooms.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
          }}
          animate={{
            scale: [1, 1.18, 0.92, 1.1, 1],
            rotate: [0, 9 * (i % 2 ? 1 : -1), -6, 4, 0],
            x: [0, 26 * (i % 2 ? 1 : -1), -20, 12, 0],
            y: [0, -22 * (i % 2 ? 1 : -1), 18, -10, 0],
          }}
          transition={{
            duration: b.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        >
          {/* Soft dark blob base */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${b.color} 0%, ${b.accent} 45%, transparent 72%)`,
              filter: `blur(${b.speed * 4}px)`,
            }}
          />
          {/* Morphing liquid accent path */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            style={{ filter: `blur(${b.speed * 2.4}px)` }}
          >
            <motion.path
              fill={b.accent}
              initial={{
                d:
                  "M44.5,-76.3C56.9,-69.2,65.6,-55.3,72.1,-40.9C78.6,-26.5,82.9,-11.6,81.3,2.8C79.7,17.2,72.1,31.1,62.5,42.2C52.9,53.3,41.3,61.6,28.4,67.8C15.5,74,1.3,78.1,-13.5,77.3C-28.3,76.5,-43.7,70.8,-55.3,60.9C-66.9,51,-74.7,36.9,-78.4,21.9C-82.1,6.9,-81.7,-9,-76.3,-22.5C-70.9,-36,-60.5,-47.1,-48,-55.1C-35.5,-63.1,-21,-68,-5.2,-61.5C10.6,-55,25.7,-37.1,32.1,-33.4Z",
              }}
              animate={{
                d: [
                  "M44.5,-76.3C56.9,-69.2,65.6,-55.3,72.1,-40.9C78.6,-26.5,82.9,-11.6,81.3,2.8C79.7,17.2,72.1,31.1,62.5,42.2C52.9,53.3,41.3,61.6,28.4,67.8C15.5,74,1.3,78.1,-13.5,77.3C-28.3,76.5,-43.7,70.8,-55.3,60.9C-66.9,51,-74.7,36.9,-78.4,21.9C-82.1,6.9,-81.7,-9,-76.3,-22.5C-70.9,-36,-60.5,-47.1,-48,-55.1C-35.5,-63.1,-21,-68,-5.2,-61.5C10.6,-55,25.7,-37.1,32.1,-33.4Z",
                  "M39.9,-67.7C52.8,-60.5,65.3,-52.1,72.5,-40.1C79.7,-28.1,81.6,-12.5,79.3,2.6C77,17.7,70.5,32.3,61.1,44C51.7,55.7,39.4,64.5,25.7,70.2C12,75.9,-3.1,78.5,-18.2,76.3C-33.3,74.1,-48.4,67.1,-58.4,55.8C-68.4,44.5,-73.3,28.9,-75.4,13.2C-77.5,-2.5,-76.8,-18.3,-70.4,-31.2C-64,-44.1,-51.9,-54.1,-39.1,-61.4C-26.3,-68.7,-12.8,-73.3,0.5,-74.1C13.8,-74.9,27,-74.9,39.9,-67.7Z",
                  "M46.8,-79.1C59.7,-72.3,68.5,-57.1,74.3,-41.3C80.1,-25.5,82.9,-9.1,80.2,6.1C77.5,21.3,69.3,35.3,59,46.6C48.7,57.9,36.3,66.5,22.5,72C8.7,77.5,-6.5,79.9,-21.2,77.3C-35.9,74.7,-50.1,67.1,-59.8,55.5C-69.5,43.9,-74.7,28.3,-76.9,12.4C-79.1,-3.5,-78.3,-19.7,-71.8,-33C-65.3,-46.3,-53.1,-56.7,-39.8,-63.3C-26.5,-69.9,-12.1,-72.7,2.3,-76C16.7,-79.3,33.9,-85.9,46.8,-79.1Z",
                  "M44.5,-76.3C56.9,-69.2,65.6,-55.3,72.1,-40.9C78.6,-26.5,82.9,-11.6,81.3,2.8C79.7,17.2,72.1,31.1,62.5,42.2C52.9,53.3,41.3,61.6,28.4,67.8C15.5,74,1.3,78.1,-13.5,77.3C-28.3,76.5,-43.7,70.8,-55.3,60.9C-66.9,51,-74.7,36.9,-78.4,21.9C-82.1,6.9,-81.7,-9,-76.3,-22.5C-70.9,-36,-60.5,-47.1,-48,-55.1C-35.5,-63.1,-21,-68,-5.2,-61.5C10.6,-55,25.7,-37.1,32.1,-33.4Z",
                ],
              }}
              transition={{
                d: {
                  duration: b.speed,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Liquid displacement overlay at the seam */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />

      {/* Glossy sweep across the top edge */}
      <motion.div
        className="absolute left-0 right-0 h-10"
        style={{
          top: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.22) 40%, rgba(59,130,246,0.18) 60%, transparent 100%)",
          filter: "blur(6px)",
        }}
        animate={{
          x: ["-10%", "10%", "-10%"],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
