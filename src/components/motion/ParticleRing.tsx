import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ParticleRingProps {
  className?: string;
  particleCount?: number;
  radiusX?: number;
  radiusY?: number;
  speed?: number;
  color?: string;
  depth?: number;
}

export default function ParticleRing({
  className = "",
  particleCount = 1100,
  radiusX = 440,
  radiusY = 150,
  speed = 0.0018,
  color = "167,139,250",
  depth = 5,
}: ParticleRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback(() => {
    // handled in useEffect via window listener
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.active = true;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const t = Math.random();
    const px = Math.cos(2 * Math.PI * t) * radiusX;
    const py = Math.sin(2 * Math.PI * t) * radiusY;
    const depthOffset = i % depth;
    const size = 0.6 + Math.random() * 1.4;
    const hueShift = Math.floor(Math.random() * 60) - 30;
    const rColor = color.split(",").map(Number);
    const r = Math.min(255, Math.max(0, rColor[0] + hueShift));
    const g = Math.min(255, Math.max(0, rColor[1] + hueShift));
    const b = Math.min(255, Math.max(0, rColor[2] + hueShift));
    const brightness = 0.5 + Math.random() * 0.5;
    const alpha = 0.25 + Math.random() * 0.55;
    return {
      id: i,
      x: px,
      y: py,
      size,
      depth: depthOffset,
      color: `rgb(${Math.round(r * brightness)},${Math.round(g * brightness)},${Math.round(b * brightness)})`,
      alpha,
      glow: `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha * 0.9})`,
      speed: 0.0004 + Math.random() * 0.0006,
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
        ref={ringRef}
        viewBox={`-${radiusX} -${radiusY} ${radiusX * 2} ${radiusY * 2}`}
        className="h-full w-full"
        animate={{
          transform: mouseRef.current.active
            ? [
                `rotate(${(mouseRef.current.x * -25).toFixed(2)} ${(mouseRef.current.y * 25).toFixed(2)})`,
                `rotate(${(mouseRef.current.y * 20).toFixed(2)} ${(mouseRef.current.x * -20).toFixed(2)})`,
                `rotate(${(mouseRef.current.x * -25).toFixed(2)} ${(mouseRef.current.y * 25).toFixed(2)})`,
              ]
            : ["rotate(0 0)", "rotate(0 0)"],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.4,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        <defs>
          <radialGradient id="pr-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`rgba(${color},0.12)`} />
            <stop offset="60%" stopColor={`rgba(${color},0.03)`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="pr-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft ring glow */}
        <ellipse
          cx="0"
          cy="0"
          rx={radiusX * 0.7}
          ry={radiusY * 0.7}
          fill="url(#pr-grad)"
        />

        {/* Particles */}
        {particles.map((p) => {
          const rColor = color.split(",").map(Number);
          const hueShift = Math.floor(Math.random() * 60) - 30;
          const r = Math.min(255, Math.max(0, rColor[0] + hueShift));
          const g = Math.min(255, Math.max(0, rColor[1] + hueShift));
          const b = Math.min(255, Math.max(0, rColor[2] + hueShift));
          const brightness = 0.5 + Math.random() * 0.5;

          return (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={`rgba(${Math.round(r * brightness)},${Math.round(g * brightness)},${Math.round(b * brightness)},${p.alpha})`}
              filter="url(#pr-glow)"
              style={{
                opacity: p.alpha,
                transformOrigin: `${p.x}px ${p.y}px`,
              }}
              animate={{
                opacity: [
                  p.alpha * 0.4,
                  p.alpha * 1.2,
                  p.alpha * 0.6,
                  p.alpha * 1.1,
                  p.alpha * 0.4,
                ],
                r: [
                  p.size * 0.8,
                  p.size * 1.4,
                  p.size * 0.7,
                  p.size * 1.2,
                  p.size * 0.8,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + p.pulse * 3,
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
