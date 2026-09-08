import { motion } from "framer-motion";

/* ── Morphing blob paths — organic liquid shapes ────────────────── */
const blobPaths = [
  // Blob 1 — large primary
  {
    d: [
      "M40,30Q60,10,80,30T120,30Q140,50,120,70T80,70Q60,90,40,70T0,70Q-20,50,0,30T40,30Z",
      "M40,20Q70,0,100,25T130,35Q150,55,120,80T70,75Q40,95,15,70T-10,55Q-25,35,15,15T40,20Z",
      "M35,25Q55,5,85,20T125,40Q145,60,115,75T65,80Q35,100,10,75T-5,50Q-20,30,15,10T35,25Z",
    ],
    size: 500,
    position: { left: "8%", top: "12%" },
    color: "rgba(30,10,60,0.85)",
    accentColor: "rgba(108,58,237,0.4)",
    duration: 12,
    blur: 60,
  },
  // Blob 2 — secondary
  {
    d: [
      "M50,25Q75,5,100,25T150,30Q170,55,140,75T90,80Q55,100,25,75T0,50Q-15,30,25,15T50,25Z",
      "M45,20Q80,0,110,30T145,40Q165,65,130,85T80,80Q45,95,20,70T-10,45Q-30,25,20,10T45,20Z",
      "M55,30Q70,10,105,20T140,35Q160,55,135,80T85,85Q50,105,20,80T0,55Q-10,35,20,20T55,30Z",
    ],
    size: 450,
    position: { right: "5%", top: "25%" },
    color: "rgba(20,5,50,0.7)",
    accentColor: "rgba(59,130,246,0.35)",
    duration: 15,
    blur: 50,
  },
  // Blob 3 — accent top
  {
    d: [
      "M30,20Q50,0,70,20T110,25Q130,45,105,65T60,70Q30,85,10,60T-5,40Q-20,20,10,10T30,20Z",
      "M35,15Q60,0,85,20T115,30Q135,50,110,70T55,75Q25,90,5,65T-10,35Q-25,15,15,5T35,15Z",
    ],
    size: 350,
    position: { left: "30%", top: "5%" },
    color: "rgba(40,15,80,0.6)",
    accentColor: "rgba(236,72,153,0.3)",
    duration: 18,
    blur: 45,
  },
  // Blob 4 — bottom right
  {
    d: [
      "M45,30Q70,10,95,30T135,35Q155,55,130,75T80,80Q50,95,20,70T0,45Q-15,25,20,15T45,30Z",
      "M40,25Q65,5,90,25T130,30Q150,50,125,70T75,75Q45,90,15,65T-5,40Q-20,20,15,10T40,25Z",
    ],
    size: 400,
    position: { right: "15%", bottom: "15%" },
    color: "rgba(25,10,55,0.75)",
    accentColor: "rgba(20,184,166,0.3)",
    duration: 14,
    blur: 55,
  },
  // Blob 5 — small accent
  {
    d: [
      "M25,15Q40,0,55,15T85,20Q100,35,80,55T45,55Q20,70,5,45T-5,25Q-15,10,10,5T25,15Z",
      "M28,12Q45,0,60,12T90,18Q105,35,85,52T50,58Q22,72,8,48T-8,28Q-18,8,12,2T28,12Z",
    ],
    size: 280,
    position: { left: "55%", bottom: "20%" },
    color: "rgba(35,12,70,0.5)",
    accentColor: "rgba(251,146,60,0.25)",
    duration: 20,
    blur: 40,
  },
];

/* ── Individual morphing blob ──────────────────────────────────── */
function LiquidBlob({
  blob,
  index,
}: {
  blob: (typeof blobPaths)[0];
  index: number;
}) {
  const pathVariants = {
    animate: {
      d: blob.d,
      transition: {
        d: {
          duration: blob.duration,
          repeat: Infinity,
          ease: "easeInOut" as const,
          repeatType: "loop" as const,
        },
      },
    },
  };

  return (
    <motion.div
      className="absolute"
      style={{
        width: blob.size,
        height: blob.size,
        ...blob.position,
      }}
      animate={{
        x: [0, 30 * (index % 2 === 0 ? 1 : -1), -20, 15, 0],
        y: [0, -25 * (index % 2 === 0 ? 1 : -1), 20, -10, 0],
        scale: [1, 1.08, 0.95, 1.04, 1],
        rotate: [0, 5 * (index % 2 === 0 ? 1 : -1), -3, 2, 0],
      }}
      transition={{
        duration: blob.duration + 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 1.5,
      }}
    >
      {/* Dark blob with blur for liquid feel */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${blob.color} 0%, ${blob.accentColor} 40%, transparent 70%)`,
          filter: `blur(${blob.blur}px)`,
        }}
      />
      {/* SVG morphing accent */}
      <svg
        viewBox="0 0 160 100"
        className="absolute inset-0 h-full w-full"
        style={{ filter: `blur(${blob.blur * 0.6}px)` }}
      >
        <motion.path
          d={blob.d[0]}
          fill={blob.accentColor}
          variants={pathVariants}
          animate="animate"
        />
      </svg>
    </motion.div>
  );
}

/* ── Dark flowing gradient streaks ─────────────────────────────── */
function FlowingGradients() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Diagonal dark streak 1 */}
      <motion.div
        className="absolute"
        style={{
          width: "150%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(108,58,237,0.15) 30%, rgba(59,130,246,0.1) 60%, transparent 100%)",
          top: "30%",
          left: "-25%",
          rotate: "-15deg",
        }}
        animate={{
          x: ["-10%", "10%", "-10%"],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Diagonal dark streak 2 */}
      <motion.div
        className="absolute"
        style={{
          width: "150%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.1) 40%, rgba(108,58,237,0.12) 70%, transparent 100%)",
          top: "65%",
          left: "-25%",
          rotate: "8deg",
        }}
        animate={{
          x: ["8%", "-8%", "8%"],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Thin horizontal glow */}
      <motion.div
        className="absolute"
        style={{
          width: "60%",
          height: "60px",
          left: "20%",
          top: "45%",
          background:
            "radial-gradient(ellipse, rgba(108,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scaleX: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Particle-like dark dots ───────────────────────────────────── */
function DarkParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 1.5 + Math.random() * 2.5,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            backgroundColor: `rgba(108,58,237,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(108,58,237,${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 10, -20, 0],
            x: [0, 15 * (Math.random() > 0.5 ? 1 : -1), -10, 5, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity * 1.4, p.opacity],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Liquid wave lines ─────────────────────────────────────────── */
function LiquidWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Wave 1 */}
      <motion.svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 left-0 w-[200%]"
        preserveAspectRatio="none"
        style={{ height: "180px" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z"
          fill="rgba(250,248,245,0.03)"
          animate={{
            d: [
              "M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z",
              "M0,120 C240,60 480,140 720,80 C960,140 1200,60 1440,120 L1440,200 L0,200 Z",
              "M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
      {/* Wave 2 — darker, slower */}
      <motion.svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 left-0 w-[200%]"
        preserveAspectRatio="none"
        style={{ height: "120px" }}
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d="M0,80 C360,130 600,30 840,80 C1080,130 1320,30 1440,80 L1440,200 L0,200 Z"
          fill="rgba(250,248,245,0.05)"
          animate={{
            d: [
              "M0,80 C360,130 600,30 840,80 C1080,130 1320,30 1440,80 L1440,200 L0,200 Z",
              "M0,100 C360,40 600,120 840,60 C1080,120 1320,40 1440,100 L1440,200 L0,200 Z",
              "M0,80 C360,130 600,30 840,80 C1080,130 1320,30 1440,80 L1440,200 L0,200 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

export {
  LiquidBlob,
  FlowingGradients,
  DarkParticles,
  LiquidWaves,
  blobPaths,
};
