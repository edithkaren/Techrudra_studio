import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  /** Where to place the glare (corner or edge) */
  glarePosition?: "top-left" | "top-right" | "center" | "sweep";
  /** Glare color (must include alpha for blend) */
  glareColor?: string;
  /** Glare opacity max */
  glareOpacity?: number;
  /** Whether glare is enabled */
  withGlare?: boolean;
}

export default function CardTilt({
  children,
  className = "",
  maxTilt = 6,
  scale = 1.02,
  glarePosition = "top-right",
  glareColor = "rgba(255,255,255,0.22)",
  glareOpacity = 0.25,
  withGlare = true,
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mouse, setMouse] = useState({ x: -1, y: -1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setTilt({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
    });
    setMouse({
      x: (clientX - left) / width,
      y: (clientY - top) / height,
    });
  };

  const reset = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setMouse({ x: -1, y: -1 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.rotateX === 0 && tilt.rotateY === 0 ? 1 : scale,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {withGlare && (
        <>
          {/* ── Soft fluid shimmer glare (cursor-follows) ─────── */}
          {glarePosition === "top-right" && (
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-[30%] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: mouse.x < 0
                  ? `translate(${mouse.x * 80}px, ${mouse.y * -20}px) rotate(25deg)`
                  : `translate(${mouse.x * 80}px, 0) rotate(25deg)`,
                opacity: mouse.x < 0 ? 0 : 1,
              }}
            >
              <div
                className="absolute left-0 top-0 h-full w-1/2 rounded-full blur-[40px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                  transform: "translateX(-50%)",
                }}
              />
              {/* Secondary tighter glare */}
              <div
                className="absolute left-1/2 top-0 h-full w-1/3 rounded-full blur-[20px] opacity-60"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 70%)",
                  transform: "translateX(calc(-50% + 20px))",
                }}
              />
            </div>
          )}

          {glarePosition === "top-left" && (
            <div
              className="pointer-events-none absolute left-0 top-0 h-[25%] w-1/2"
              style={{
                transform: `translate(${mouse.x * -60}px, ${mouse.y * -20}px)`,
                opacity: mouse.x > 0 ? 0 : 1,
              }}
            >
              <div
                className="absolute inset-0 rounded-full blur-[40px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.2), transparent 50%)",
                }}
              />
            </div>
          )}

          {glarePosition === "sweep" && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, transparent 30%, ${glareColor} 45%, transparent 60%)`,
                backgroundSize: "200% 200%",
                backgroundPosition: `${mouse.x * 100}% ${mouse.y * 100}%`,
                opacity: 0.6,
              }}
            />
          )}

          {glarePosition === "center" && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${glareColor} 0%, transparent 50%)`,
                opacity: 0.7,
              }}
            />
          )}
        </>
      )}

      {children}
    </motion.div>
  );
}
