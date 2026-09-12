import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glarePosition?: "top-left" | "top-right" | "center" | "sweep";
  glareColor?: string;
  glareOpacity?: number;
  withGlare?: boolean;
}

export default function CardTilt({
  children,
  className = "",
  maxTilt = 6,
  scale = 1.02,
  glarePosition = "top-right",
  glareColor = "rgba(167,139,250,0.35)",
  glareOpacity = 0.4,
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
      rotateX: -y * maxTilt * 1.1,
      rotateY: x * maxTilt * 1.1,
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
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    >
      {withGlare && (
        <>
          {glarePosition === "top-right" && (
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-[40%] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: mouse.x < 0
                  ? `translate(${mouse.x * 120}px, ${mouse.y * -30}px) rotate(25deg)`
                  : `translate(${mouse.x * 120}px, 0) rotate(25deg)`,
                opacity: mouse.x < 0 ? 0 : 1,
              }}
            >
              <div
                className="absolute left-0 top-0 h-full w-1/2 rounded-full blur-[50px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                  transform: "translateX(-50%)",
                }}
              />
              <div
                className="absolute left-1/2 top-0 h-full w-1/3 rounded-full blur-[25px] opacity-70"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(167,139,250,0.25), transparent 70%)",
                  transform: "translateX(calc(-50% + 20px))",
                }}
              />
            </div>
          )}

          {glarePosition === "top-left" && (
            <div
              className="pointer-events-none absolute left-0 top-0 h-[30%] w-1/2"
              style={{
                transform: `translate(${mouse.x * -90}px, ${mouse.y * -30}px)`,
                opacity: mouse.x > 0 ? 0 : 1,
              }}
            >
              <div
                className="absolute inset-0 rounded-full blur-[50px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(167,139,250,0.25), transparent 50%)",
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
                opacity: 0.8,
              }}
            />
          )}

          {glarePosition === "center" && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${glareColor} 0%, transparent 55%)`,
                opacity: 0.85,
              }}
            />
          )}
        </>
      )}

      {children}
    </motion.div>
  );
}
