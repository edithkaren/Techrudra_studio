import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ParticleRingProps {
  className?: string;
  particleCount?: number;
  radiusX?: number;
  radiusY?: number;
  speed?: number;
  color?: string;
  depth?: number;
  brightness?: number;
}

export default function ParticleRing({
  className = "",
  particleCount = 1400,
  radiusX = 460,
  radiusY = 160,
  speed = 0.0036,
  color = "167,139,250",
  depth = 7,
  brightness = 1.15,
}: ParticleRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 18 });

  const tiltX = useTransform(smoothX, [-1, 1], [-28, 28]);
  const tiltY = useTransform(smoothY, [-1, 1], [28, -28]);
  const spin = useTransform(
    smoothX,
    [-1, 1],
    [18, -18]
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mx.set(x);
      my.set(y);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const t = Math.random();
    const px = Math.cos(2 * Math.PI * t) * radiusX;
    const py = Math.sin(2 * Math.PI * t) * radiusY;
    const depthOffset = i % depth;
    const size = 0.7 + Math.random() * 1.6 * brightness;
    const hueShift = Math.floor(Math.random() * 70) - 35;
    const rColor = color.split(",").map(Number);
    const r = Math.min(255, Math.max(0, rColor[0] + hueShift));
    const g = Math.min(255, Math.max(0, rColor[1] + hueShift));
    const b = Math.min(255, Math.max(0, rColor[2] + hueShift));
    const brightnessLocal = 0.55 + Math.random() * 0.45 * brightness;
    const alpha = 0.35 + Math.random() * 0.55 * brightness;
    return {
      id: i,
      x: px,
      y: py,
      size,
      depth: depthOffset,
      r,
      g,
      b,
      alpha,
      speed: 0.0007 + Math.random() * 0.001 * brightness,
      offset: Math.random() * 1000,
      pulse: 0.5 + Math.random() * 0.5,
    };
  });

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{ position: "absolute", inset: 0 }}
    >
      <motion.svg
        viewBox={`-${radiusX} -${radiusY} ${radiusX * 2} ${radiusY * 2}`}
        className="h-full w-full"
        animate={{
          transform: [
            `rotate(${tiltY.get()} ${tiltX.get()}) translate(0 0) rotate(${spin.get()})`,
          ],
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="pr-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`rgba(${color},0.22)`} />
            <stop offset="55%" stopColor={`rgba(${color},0.08)`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="pr-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pr-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="0"
          cy="0"
          rx={radiusX * 0.75}
          ry={radiusY * 0.75}
          fill="url(#pr-grad)"
        />

        {particles.map((p) => {
          const brightnessLocal = 0.55 + Math.random() * 0.45 * brightness;

          return (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={`rgba(${p.r},${p.g},${p.b},${p.alpha * brightnessLocal})`}
              filter={p.depth % 2 === 0 ? "url(#pr-glow)" : "url(#pr-glow-soft)"}
              style={{
                opacity: p.alpha * brightnessLocal,
                transformOrigin: `${p.x}px ${p.y}px`,
              }}
              animate={{
                opacity: [
                  p.alpha * 0.4 * brightnessLocal,
                  p.alpha * 1.25 * brightnessLocal,
                  p.alpha * 0.6 * brightnessLocal,
                  p.alpha * 1.15 * brightnessLocal,
                  p.alpha * 0.4 * brightnessLocal,
                ],
                r: [
                  p.size * 0.8,
                  p.size * 1.5,
                  p.size * 0.7,
                  p.size * 1.25,
                  p.size * 0.8,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8 + p.pulse * 2.4,
                ease: "easeInOut",
                delay: p.offset * 0.001,
              }}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}
