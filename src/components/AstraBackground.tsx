import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

/* ── Floating informational particles ──────────────────────────── */
function FloatingParticles() {
  const count = 60;
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 350;
    return {
      id: i,
      x: 50 + Math.cos(angle) * dist * 0.15,
      y: 50 + Math.sin(angle) * dist * 0.15,
      size: 1.2 + Math.random() * 3,
      hue:
        i % 5 === 0
          ? "167"
          : i % 5 === 1
            ? "139"
            : i % 5 === 2
              ? "250"
              : i % 5 === 3
                ? "236"
                : "130",
      speed: 22 + Math.random() * 30,
      delay: Math.random() * 18,
      opacity: 0.15 + Math.random() * 0.25,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `rgba(255,255,255,0.9)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(${p.hue},${p.hue === "250" ? "72" : "153"},${p.hue === "250" ? "153" : "250"},0.5)`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 10, -15, 0],
            x: [0, 15 - Math.random() * 30, -8, 4, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity * 1.4, p.opacity],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Flowing liquid gradient washes ────────────────────────────── */
function LiquidWashes() {
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setSeed((s) => s + 1), 3500);
    return () => clearInterval(iv);
  }, []);

  const stops = [
    { x: 20, y: 25, color: "rgba(167,139,250,0.18)", size: 700 },
    { x: 70, y: 40, color: "rgba(59,130,246,0.14)", size: 800 },
    { x: 45, y: 70, color: "rgba(236,72,153,0.12)", size: 650 },
    { x: 85, y: 75, color: "rgba(20,184,166,0.10)", size: 500 },
    { x: 10, y: 60, color: "rgba(167,139,250,0.10)", size: 450 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="select-none">
        {stops.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: `radial-gradient(circle, ${s.color} 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 30, -20, 15, 0],
              y: [0, -25, 20, -10, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
              opacity: [0.7, 1, 0.75, 0.9, 0.7],
              rotate: [0, 8, -5, 3, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          />
        ))}
      </div>
      {/* Connective tissue — faint flowing curves */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="washGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(167,139,250,0.08)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.05)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.06)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,300 C240,200 480,400 720,280 C960,160 1200,380 1440,260"
          stroke="rgba(167,139,250,0.12)"
          strokeWidth="1.5"
          fill="none"
          animate={{
            d: [
              "M0,300 C240,200 480,400 720,280 C960,160 1200,380 1440,260",
              "M0,350 C240,250 480,420 720,320 C960,220 1200,420 1440,300",
              "M0,280 C240,180 480,380 720,260 C960,140 1200,360 1440,240",
              "M0,300 C240,200 480,400 720,280 C960,160 1200,380 1440,260",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,500 C300,350 600,600 900,480 C1200,360 1300,550 1440,450"
          stroke="rgba(59,130,246,0.10)"
          strokeWidth="1"
          fill="none"
          animate={{
            d: [
              "M0,500 C300,350 600,600 900,480 C1200,360 1300,550 1440,450",
              "M0,540 C300,390 600,640 900,520 C1200,400 1300,580 1440,480",
              "M0,480 C300,330 600,580 900,460 C1200,340 1300,530 1440,440",
              "M0,500 C300,350 600,600 900,480 C1200,360 1300,550 1440,450",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}

/* ── Ambient information nodes (glowing dots with soft halos) ─── */
function InfoNodes() {
  const nodes = [
    { x: 15, y: 20, color: "167,139,250", size: 3, delay: 0 },
    { x: 82, y: 18, color: "59,130,246", size: 2.5, delay: 1.2 },
    { x: 68, y: 72, color: "236,72,153", size: 3.2, delay: 2.5 },
    { x: 25, y: 78, color: "167,139,250", size: 2, delay: 0.8 },
    { x: 92, y: 45, color: "20,184,166", size: 2.8, delay: 3.1 },
    { x: 55, y: 85, color: "59,130,246", size: 2.2, delay: 1.7 },
    { x: 8, y: 45, color: "236,72,153", size: 2.4, delay: 2.1 },
    { x: 75, y: 30, color: "167,139,250", size: 1.8, delay: 0.4 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: n.size * 6,
            height: n.size * 6,
            left: `${n.x}%`,
            top: `${n.y}%`,
            background: `radial-gradient(circle, rgba(${n.color},0.25) 0%, transparent 70%)`,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 4 + n.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n.delay,
          }}
        />
      ))}
      {/* Core dots */}
      {nodes.map((n, i) => (
        <motion.div
          key={`core-${i}`}
          className="absolute rounded-full"
          style={{
            width: n.size,
            height: n.size,
            left: `${n.x}%`,
            top: `${n.y}%`,
            background: `rgba(255,255,255,0.8)`,
            boxShadow: `0 0 ${n.size * 3}px rgba(${n.color},0.6)`,
            zIndex: 2,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3.5 + n.delay * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Noise texture overlay ─────────────────────────────────────── */
function NoiseTexture() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

/* ── Orbiting satellite dots ───────────────────────────────────── */
function OrbitDots() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Orbit 1 */}
      <div className="absolute left-1/4 top-1/3 h-64 w-64">
        <motion.div
          className="absolute h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <ellipse
              cx="100"
              cy="100"
              rx="85"
              ry="30"
              fill="none"
              stroke="rgba(167,139,250,0.08)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              transform="rotate(-20 100 100)"
            />
          </svg>
          {[0, 1, 2].map((offset) => (
            <motion.span
              key={offset}
              className="absolute rounded-full bg-[#A78BFA]/40"
              style={{
                width: 2.5,
                height: 2.5,
                left: "100%",
                top: "50%",
                transform: `translate(-50%, -50%) translateX(${85 * 0.85}px)`,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                boxShadow: [
                  "0 0 4px rgba(167,139,250,0.3)",
                  "0 0 8px rgba(167,139,250,0.6)",
                  "0 0 4px rgba(167,139,250,0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: offset * 0.7,
              }}
            />
          ))}
        </motion.div>
      </div>
      {/* Orbit 2 — tilted */}
      <div
        className="absolute right-1/3 bottom-1/4 h-48 w-48"
        style={{ transform: "rotate(35deg)" }}
      >
        <motion.div
          className="absolute h-full w-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 160 160" className="h-full w-full">
            <ellipse
              cx="80"
              cy="80"
              rx="65"
              ry="22"
              fill="none"
              stroke="rgba(59,130,246,0.06)"
              strokeWidth="0.5"
              strokeDasharray="3 5"
            />
          </svg>
          {[-1, 0, 1].map((offset) => (
            <motion.span
              key={offset}
              className="absolute rounded-full bg-[#3B82F6]/40"
              style={{
                width: 2,
                height: 2,
                left: "100%",
                top: "50%",
                transform: `translate(-50%, -50%) translateX(${65 * 0.8}px)`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: offset * 0.9,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Soft ambient center glow ──────────────────────────────────── */
function AmbientGlow() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 80]);
  const opacity = useTransform(scrollY, [0, 600], [0.5, 0.2]);

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      style={{
        y,
        opacity,
        background:
          "radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(59,130,246,0.05) 30%, rgba(236,72,153,0.02) 55%, transparent 75%)",
      }}
    />
  );
}

export default function AstraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep base gradient — OpenAI-style subtle dark foundation */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(30,20,60,0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(20,15,50,0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(40,25,70,0.5) 0%, transparent 45%),
            #0A0A0A
          `,
        }}
      />
      {/* Liquid washes */}
      <LiquidWashes />
      {/* Ambient glow */}
      <AmbientGlow />
      {/* Floating particles */}
      <FloatingParticles />
      {/* Info nodes */}
      <InfoNodes />
      {/* Orbiting dots */}
      <OrbitDots />
      {/* Noise texture */}
      <NoiseTexture />
    </div>
  );
}
