import { useEffect, useRef, useState } from "react";

/**
 * Fluid ink / smoke cursor trail (aimaven.tech style).
 *
 * Technique:
 *  - A chain of soft radial-gradient blobs follows the pointer with spring
 *    physics (each blob chases the previous one) -> organic trailing smear.
 *  - The canvas is never hard-cleared: each frame the previous ink is
 *    partially dissolved with `destination-out`, so the trail lingers like
 *    smoke before fading.
 *  - New ink is drawn with `lighter` (additive) so overlapping blobs build
 *    a hot bright core, like the reference.
 *  - The whole canvas is warped by an SVG feTurbulence + feDisplacementMap
 *    filter, giving the wavy, liquid edges. The turbulence slowly drifts so
 *    the edges keep morphing.
 */

interface BlobNode {
  x: number;
  y: number;
}

const BLOB_COUNT = 14;
const MIN_MOVE = 0.5;

// Palette along the tail: lime-green head -> cyan -> blue -> violet tail
// (matches the reference screenshot).
const STOPS: Array<readonly [number, number, number]> = [
  [163, 255, 90], // lime green
  [72, 240, 255], // cyan
  [86, 132, 255], // blue
  [158, 86, 255], // violet
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAt(t: number): [number, number, number] {
  const clamped = Math.min(Math.max(t, 0), 1);
  const seg = clamped * (STOPS.length - 1);
  const i = Math.min(Math.floor(seg), STOPS.length - 2);
  const f = seg - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return [
    Math.round(lerp(a[0], b[0], f)),
    Math.round(lerp(a[1], b[1], f)),
    Math.round(lerp(a[2], b[2], f)),
  ];
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const pointerRef = useRef({ x: -500, y: -500, active: false });
  const blobsRef = useRef<BlobNode[]>(
    Array.from({ length: BLOB_COUNT }, () => ({ x: -500, y: -500 })),
  );

  useEffect(() => {
    // Desktop fine pointers only.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    document.documentElement.addEventListener("mouseleave", onLeave);

    // Slowly drift the turbulence so the liquid edges keep morphing.
    const drift = window.setInterval(() => {
      const turb = turbulenceRef.current;
      if (!turb || reducedMotion) return;
      const t = performance.now();
      const bfx = 0.008 + 0.0035 * Math.sin(t * 0.0004);
      const bfy = 0.012 + 0.0035 * Math.cos(t * 0.0003);
      turb.setAttribute(
        "baseFrequency",
        `${bfx.toFixed(4)} ${bfy.toFixed(4)}`,
      );
    }, 240);

    const fade = reducedMotion ? 0.14 : 0.065; // per-frame dissolve amount
    let raf = 0;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(32, now - last) / 16.666;
      last = now;

      // Dissolve the previous frame -> smoke persistence.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${Math.min(1, fade * dt)})`;
      ctx.fillRect(0, 0, w, h);

      // Spring chain: each blob chases the one before it.
      const blobs = blobsRef.current;
      const p = pointerRef.current;
      let tx = p.x;
      let ty = p.y;
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const k =
          i === 0 ? 0.38 : Math.max(0.08, 0.3 - i * 0.016) * (reducedMotion ? 2 : 1);
        b.x += (tx - b.x) * Math.min(1, k * dt);
        b.y += (ty - b.y) * Math.min(1, k * dt);
        tx = b.x;
        ty = b.y;
      }

      // Draw additive ink blobs.
      ctx.globalCompositeOperation = "lighter";
      const n = blobs.length;
      const speed = Math.hypot(p.x - blobs[0].x, p.y - blobs[0].y);
      const speedScale = reducedMotion ? 1 : Math.min(1.6, 1 + speed / 500);

      for (let i = 0; i < n; i++) {
        const b = blobs[i];
        const f = i / (n - 1);
        const [r, g, bl] = colorAt(f);
        const wobble = reducedMotion ? 0 : Math.sin(now * 0.0025 + i * 0.9) * 2.4;
        const radius =
          Math.max(6, (i === 0 ? 30 * speedScale : 30 - i * 1.5) + wobble);
        const alpha = p.active ? 0.16 + (1 - f) * 0.5 : 0;
        if (alpha <= 0.001) continue;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        grad.addColorStop(0, `rgba(${r},${g},${bl},${alpha})`);
        grad.addColorStop(0.45, `rgba(${r},${g},${bl},${alpha * 0.55})`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Hot white core on the head blob.
        if (i === 0) {
          const core = ctx.createRadialGradient(
            b.x,
            b.y,
            0,
            b.x,
            b.y,
            radius * 0.35,
          );
          core.addColorStop(0, `rgba(255,255,255,${0.5 * speedScale - 0.35})`);
          core.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(b.x, b.y, radius * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(drift);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reducedMotion]);

  if (!enabled) return null;

  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter
            id="liquid-cursor-filter"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={reducedMotion ? 0 : 60}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          display: "block",
          filter: reducedMotion ? undefined : "url(#liquid-cursor-filter)",
        }}
      />
    </>
  );
}
