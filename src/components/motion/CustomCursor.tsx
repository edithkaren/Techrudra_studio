import { useEffect, useRef, useState, useCallback } from "react";

// --- Neon trail types ---
interface TrailPoint {
  x: number;
  y: number;
  t: number;
}
interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  cyanLead: boolean;
}

const CYAN = { r: 0, g: 255, b: 242 };
const MAGENTA = { r: 255, g: 46, b: 196 };
const TRAIL_DURATION = 480;
const MAX_POINTS = 70;
const PARTICLE_CHANCE = 0.45;
const MIN_POINT_DIST = 3;

function lerpColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function spawnParticle(
  x: number,
  y: number,
  particles: Sparkle[],
) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.25 + Math.random() * 0.9;
  particles.push({
    x: x + (Math.random() - 0.5) * 8,
    y: y + (Math.random() - 0.5) * 8,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 1.2 + Math.random() * 2.2,
    life: 0,
    maxLife: 350 + Math.random() * 450,
    cyanLead: Math.random() < 0.5,
  });
}

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);

  // --- Canvas trail refs ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const particlesRef = useRef<Sparkle[]>([]);
  const lastPointRef = useRef<TrailPoint | null>(null);
  const rafRef = useRef<number>(0);

  const addPoint = useCallback((x: number, y: number) => {
    const now = performance.now();
    const last = lastPointRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_POINT_DIST) return;
    }
    const pt = { x, y, t: now };
    lastPointRef.current = pt;
    const pts = pointsRef.current;
    pts.push(pt);
    if (pts.length > MAX_POINTS) pts.shift();
    if (Math.random() < PARTICLE_CHANCE) {
      spawnParticle(x, y, particlesRef.current);
    }
  }, []);

  useEffect(() => {
    // Only show on desktop
    const checkMobile = () =>
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 768,
      );
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // --- Mouse move handler ---
    const move = (e: MouseEvent) => {
      addPoint(e.clientX, e.clientY);
    };

    // --- Touch move handler ---
    const touchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        e.preventDefault();
        addPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const touchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        addPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchstart", touchStart, { passive: true });

    // --- Canvas render loop ---
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const render = (now: number) => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Filter expired points
        const pts = pointsRef.current.filter(
          (p) => now - p.t < TRAIL_DURATION,
        );
        pointsRef.current = pts;

        // Draw trail
        if (pts.length > 1) {
          const n = pts.length;
          for (let i = 1; i < n; i++) {
            const p0 = pts[i - 1];
            const p1 = pts[i];
            const age = now - p1.t;
            const lifeRatio = Math.max(0, 1 - age / TRAIL_DURATION);
            if (lifeRatio <= 0) continue;

            const colorT = i / n;
            const color = lerpColor(CYAN, MAGENTA, colorT);
            const width = 0.6 + lifeRatio * 5.5;
            const alpha = lifeRatio;

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = width;
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
            ctx.shadowBlur = 16;
            ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.9})`;
            ctx.stroke();
          }
        }

        ctx.shadowBlur = 0;

        // Draw particles
        const sparks = particlesRef.current.filter(
          (p) => p.life < p.maxLife,
        );
        particlesRef.current = sparks;
        for (const p of sparks) {
          p.life += 16.6;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;

          const lifeRatio = Math.max(0, 1 - p.life / p.maxLife);
          const radius = Math.max(0.1, p.r * lifeRatio) * 3;
          const base = p.cyanLead ? CYAN : MAGENTA;

          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            radius,
          );
          grad.addColorStop(
            0,
            `rgba(${base.r}, ${base.g}, ${base.b}, ${lifeRatio})`,
          );
          grad.addColorStop(
            1,
            `rgba(${base.r}, ${base.g}, ${base.b}, 0)`,
          );

          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        rafRef.current = requestAnimationFrame(render);
      };

      rafRef.current = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener("mousemove", move);
        window.removeEventListener("touchmove", touchMove);
        window.removeEventListener("touchstart", touchStart);
        window.removeEventListener("resize", checkMobile);
        window.removeEventListener("resize", resizeCanvas);
      };
    }

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("resize", checkMobile);
    };
  }, [addPoint]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ display: "block" }}
    />
  );
}
