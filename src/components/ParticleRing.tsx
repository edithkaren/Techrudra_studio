import { useRef, useEffect, useCallback } from "react";

interface ParticleRingProps {
  className?: string;
  particleCount?: number;
  radiusX?: number;
  radiusY?: number;
  speed?: number;
  color?: string;
}

/**
 * 3D elliptical particle ring — hundreds of purple particles orbiting
 * in a galaxy-like ring formation that slowly rotates in 3D space.
 * Uses Canvas 2D for maximum performance.
 */
export default function ParticleRing({
  className = "",
  particleCount = 800,
  radiusX = 420,
  radiusY = 140,
  speed = 0.0004,
  color = "167,139,250",
}: ParticleRingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Float32Array | null>(null);
  const timeRef = useRef(0);

  const initParticles = useCallback(() => {
    // Each particle: [angle, radiusOffset, zOffset, size, brightness, speedMult]
    const p = new Float32Array(particleCount * 6);
    for (let i = 0; i < particleCount; i++) {
      const i6 = i * 6;
      p[i6] = Math.random() * Math.PI * 2; // angle
      p[i6 + 1] = (Math.random() - 0.5) * 40; // radius offset (spread)
      p[i6 + 2] = (Math.random() - 0.5) * 30; // z offset
      p[i6 + 3] = 0.4 + Math.random() * 1.8; // size
      p[i6 + 4] = 0.15 + Math.random() * 0.85; // brightness
      p[i6 + 5] = 0.7 + Math.random() * 0.6; // speed multiplier
    }
    // Add dense clusters — brighter, bigger particles at specific arc positions
    const clusterPositions = [0, Math.PI * 0.6, Math.PI * 1.2, Math.PI * 1.7];
    for (const cp of clusterPositions) {
      for (let j = 0; j < 30; j++) {
        const i = particleCount - 120 + j + clusterPositions.indexOf(cp) * 30;
        if (i >= particleCount) continue;
        const i6 = i * 6;
        p[i6] = cp + (Math.random() - 0.5) * 0.3;
        p[i6 + 1] = (Math.random() - 0.5) * 20;
        p[i6 + 2] = (Math.random() - 0.5) * 15;
        p[i6 + 3] = 1.0 + Math.random() * 2.5;
        p[i6 + 4] = 0.5 + Math.random() * 0.5;
        p[i6 + 5] = 0.5 + Math.random() * 0.4;
      }
    }
    particlesRef.current = p;
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    initParticles();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const p = particlesRef.current;
      if (!p) return;

      const cx = w / 2;
      const cy = h / 2;
      const rx = radiusX * (w / 900);
      const ry = radiusY * (h / 500);
      timeRef.current += speed;
      const t = timeRef.current;

      // Sort by z for proper depth ordering
      const indices: number[] = [];
      for (let i = 0; i < particleCount; i++) indices.push(i);
      indices.sort((a, b) => {
        const aAngle = p[a * 6] + t * p[a * 6 + 5];
        const bAngle = p[b * 6] + t * p[b * 6 + 5];
        return Math.sin(aAngle) - Math.sin(bAngle);
      });

      for (const i of indices) {
        const i6 = i * 6;
        const baseAngle = p[i6];
        const rOff = p[i6 + 1];
        const zOff = p[i6 + 2];
        const size = p[i6 + 3];
        const brightness = p[i6 + 4];
        const speedMult = p[i6 + 5];

        const angle = baseAngle + t * speedMult;

        // 3D coordinates
        const x3d = Math.cos(angle) * (rx + rOff);
        const y3d = Math.sin(angle) * (ry + rOff * 0.3);
        const z3d = Math.sin(angle) * 40 + zOff;

        // Simple perspective projection
        const perspective = 600;
        const scale = perspective / (perspective + z3d);
        const px = cx + x3d * scale;
        const py = cy + y3d * scale;

        // Depth-based opacity and size
        const depthFactor = (z3d + 50) / 100; // 0 = far, 1 = near
        const alpha = brightness * (0.2 + depthFactor * 0.8);
        const drawSize = size * scale * (0.6 + depthFactor * 0.4);

        if (alpha < 0.02) continue;

        // Draw particle with glow
        ctx.globalAlpha = alpha * 0.15;
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, drawSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(${color},${Math.min(alpha * 1.5, 1)})`;
        ctx.beginPath();
        ctx.arc(px, py, drawSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting glow lines between nearby particles (sparse)
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = `rgba(${color},0.15)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < indices.length; i += 12) {
        const a = indices[i];
        const a6 = a * 6;
        const aAngle = p[a6] + t * p[a6 + 5];
        const ax = cx + Math.cos(aAngle) * (rx + p[a6 + 1]);
        const ay = cy + Math.sin(aAngle) * (ry + p[a6 + 1] * 0.3);

        if (i + 12 < indices.length) {
          const b = indices[i + 12];
          const b6 = b * 6;
          const bAngle = p[b6] + t * p[b6 + 5];
          const bx = cx + Math.cos(bAngle) * (rx + p[b6 + 1]);
          const by = cy + Math.sin(bAngle) * (ry + p[b6 + 1] * 0.3);
          const dist = Math.hypot(bx - ax, by - ay);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, radiusX, radiusY, speed, color, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
}
