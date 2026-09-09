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
 * in a galaxy-like ring formation that rotates based on mouse movement.
 * The ring tilts and spins in 360° following the cursor direction.
 * Uses Canvas 2D for maximum performance.
 */
export default function ParticleRing({
  className = "",
  particleCount = 800,
  radiusX = 420,
  radiusY = 140,
  speed = 0.0012,
  color = "167,139,250",
}: ParticleRingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Float32Array | null>(null);
  const timeRef = useRef(0);

  // Mouse-driven rotation state (current + target for smooth interpolation)
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ tiltX: 0, tiltY: 0, spin: 0 });
  const targetRef = useRef({ tiltX: 0, tiltY: 0, spin: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });

  const initParticles = useCallback(() => {
    // Each particle: [angle, radiusOffset, zOffset, size, brightness, speedMult]
    const p = new Float32Array(particleCount * 6);
    for (let i = 0; i < particleCount; i++) {
      const i6 = i * 6;
      p[i6] = Math.random() * Math.PI * 2; // angle
      p[i6 + 1] = (Math.random() - 0.5) * 40; // radius offset (spread)
      p[i6 + 2] = (Math.random() - 0.5) * 30; // z offset
      p[i6 + 3] = 0.5 + Math.random() * 2.2; // size
      p[i6 + 4] = 0.35 + Math.random() * 0.65; // brightness
      p[i6 + 5] = 0.8 + Math.random() * 0.7; // speed multiplier
    }
    // Dense clusters at specific arc positions
    const clusterPositions = [0, Math.PI * 0.6, Math.PI * 1.2, Math.PI * 1.7];
    for (const cp of clusterPositions) {
      for (let j = 0; j < 30; j++) {
        const i = particleCount - 120 + j + clusterPositions.indexOf(cp) * 30;
        if (i >= particleCount) continue;
        const i6 = i * 6;
        p[i6] = cp + (Math.random() - 0.5) * 0.3;
        p[i6 + 1] = (Math.random() - 0.5) * 20;
        p[i6 + 2] = (Math.random() - 0.5) * 15;
        p[i6 + 3] = 1.2 + Math.random() * 3.0;
        p[i6 + 4] = 0.7 + Math.random() * 0.3;
        p[i6 + 5] = 0.7 + Math.random() * 0.5;
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

    /* ── Mouse tracking ──────────────────────────────────────────── */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalized mouse position (-1 to 1) relative to canvas center
      const mx = ((e.clientX - cx) / (rect.width / 2));
      const my = ((e.clientY - cy) / (rect.height / 2));

      mouseRef.current = { x: mx, y: my };

      // Calculate mouse velocity for spin effect
      const now = performance.now();
      const dt = now - lastMouseRef.current.time;
      if (dt > 0) {
        const dx = e.clientX - lastMouseRef.current.x;
        const dy = e.clientY - lastMouseRef.current.y;
        // Velocity-based spin: horizontal mouse movement spins the ring around its normal
        const velocity = Math.sqrt(dx * dx + dy * dy) / dt;
        targetRef.current.spin += dx * 0.003;
      }
      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };

      // Mouse position maps to tilt: up/down tilts X, left/right tilts Y
      // Max tilt is ±65° (full 360° of view as mouse traverses the screen)
      targetRef.current.tiltX = my * 1.15;  // ~65° max
      targetRef.current.tiltY = mx * 1.15;  // ~65° max
    };

    const handleMouseLeave = () => {
      // Gently return to default when mouse leaves
      targetRef.current.tiltX = 0;
      targetRef.current.tiltY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── 3D rotation helpers ─────────────────────────────────────── */
    // Rotate a point around X axis
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    };
    // Rotate a point around Y axis
    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
    };
    // Rotate a point around Z axis (spin)
    const rotateZ = (x: number, y: number, _z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos - y * sin, y: x * sin + y * cos, z: _z };
    };

    /* ── Render loop ─────────────────────────────────────────────── */
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

      // Smooth interpolation toward target rotation (spring-like)
      const lerpFactor = 0.06;
      const rot = rotationRef.current;
      const tgt = targetRef.current;
      rot.tiltX += (tgt.tiltX - rot.tiltX) * lerpFactor;
      rot.tiltY += (tgt.tiltY - rot.tiltY) * lerpFactor;
      rot.spin += (tgt.spin - rot.spin) * lerpFactor;

      // Slowly decay spin when mouse stops
      tgt.spin *= 0.992;

      const tiltX = rot.tiltX;
      const tiltY = rot.tiltY;
      const spin = rot.spin;

      // Sort by z for proper depth ordering
      const indices: number[] = [];
      for (let i = 0; i < particleCount; i++) indices.push(i);
      indices.sort((a, b) => {
        const aAngle = p[a * 6] + t * p[a * 6 + 5];
        const bAngle = p[b * 6] + t * p[b * 6 + 5];

        // Apply rotation to get world-space Z for sorting
        const ax3d = Math.cos(aAngle) * (rx + p[a * 6 + 1]);
        const ay3d = Math.sin(aAngle) * (ry + p[a * 6 + 1] * 0.3);
        const az3d = Math.sin(aAngle) * 40 + p[a * 6 + 2];
        let aR = rotateX(ax3d, ay3d, az3d, tiltX);
        aR = rotateY(aR.x, aR.y, aR.z, tiltY);
        aR = rotateZ(aR.x, aR.y, aR.z, spin);

        const bx3d = Math.cos(bAngle) * (rx + p[b * 6 + 1]);
        const by3d = Math.sin(bAngle) * (ry + p[b * 6 + 1] * 0.3);
        const bz3d = Math.sin(bAngle) * 40 + p[b * 6 + 2];
        let bR = rotateX(bx3d, by3d, bz3d, tiltX);
        bR = rotateY(bR.x, bR.y, bR.z, tiltY);
        bR = rotateZ(bR.x, bR.y, bR.z, spin);

        return aR.z - bR.z;
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

        // Base 3D coordinates on the ellipse
        let x3d = Math.cos(angle) * (rx + rOff);
        let y3d = Math.sin(angle) * (ry + rOff * 0.3);
        let z3d = Math.sin(angle) * 40 + zOff;

        // Apply mouse-driven 3D rotations: tilt → tilt → spin
        let r = rotateX(x3d, y3d, z3d, tiltX);
        r = rotateY(r.x, r.y, r.z, tiltY);
        r = rotateZ(r.x, r.y, r.z, spin);

        // Perspective projection
        const perspective = 600;
        const scale = perspective / (perspective + r.z);
        const px = cx + r.x * scale;
        const py = cy + r.y * scale;

        // Depth-based opacity and size (z now ranges much wider due to rotation)
        const depthFactor = Math.max(0, Math.min(1, (r.z + 250) / 500));
        const alpha = brightness * (0.15 + depthFactor * 0.85);
        const drawSize = size * scale * (0.5 + depthFactor * 0.5);

        if (alpha < 0.02) continue;

        // Wide outer glow
        ctx.globalAlpha = alpha * 0.12;
        ctx.fillStyle = `rgba(${color},${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py, drawSize * 5, 0, Math.PI * 2);
        ctx.fill();

        // Medium glow
        ctx.globalAlpha = alpha * 0.35;
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, drawSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle (bright white center)
        ctx.globalAlpha = Math.min(alpha * 2, 1);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha * 0.8, 0.9)})`;
        ctx.beginPath();
        ctx.arc(px, py, drawSize * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Colored core
        ctx.globalAlpha = Math.min(alpha * 1.8, 1);
        ctx.fillStyle = `rgba(${color},${Math.min(alpha * 2, 1)})`;
        ctx.beginPath();
        ctx.arc(px, py, drawSize * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connecting lines between nearby particles
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = `rgba(${color},0.25)`;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < indices.length; i += 8) {
        const a = indices[i];
        const a6 = a * 6;
        const aAngle = p[a6] + t * p[a6 + 5];
        let ax = Math.cos(aAngle) * (rx + p[a6 + 1]);
        let ay = Math.sin(aAngle) * (ry + p[a6 + 1] * 0.3);
        let az = Math.sin(aAngle) * 40 + p[a6 + 2];
        let aR = rotateX(ax, ay, az, tiltX);
        aR = rotateY(aR.x, aR.y, aR.z, tiltY);
        aR = rotateZ(aR.x, aR.y, aR.z, spin);
        const as = 600 / (600 + aR.z);
        const apx = cx + aR.x * as;
        const apy = cy + aR.y * as;

        if (i + 8 < indices.length) {
          const b = indices[i + 8];
          const b6 = b * 6;
          const bAngle = p[b6] + t * p[b6 + 5];
          let bx = Math.cos(bAngle) * (rx + p[b6 + 1]);
          let by = Math.sin(bAngle) * (ry + p[b6 + 1] * 0.3);
          let bz = Math.sin(bAngle) * 40 + p[b6 + 2];
          let bR = rotateX(bx, by, bz, tiltX);
          bR = rotateY(bR.x, bR.y, bR.z, tiltY);
          bR = rotateZ(bR.x, bR.y, bR.z, spin);
          const bs = 600 / (600 + bR.z);
          const bpx = cx + bR.x * bs;
          const bpy = cy + bR.y * bs;
          const dist = Math.hypot(bpx - apx, bpy - apy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(apx, apy);
            ctx.lineTo(bpx, bpy);
            ctx.stroke();
          }
        }
      }

      // Ambient center glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx * 0.6);
      grd.addColorStop(0, `rgba(${color},0.06)`);
      grd.addColorStop(0.5, `rgba(${color},0.02)`);
      grd.addColorStop(1, "transparent");
      ctx.globalAlpha = 1;
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount, radiusX, radiusY, speed, color, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity: 1 }}
    />
  );
}
