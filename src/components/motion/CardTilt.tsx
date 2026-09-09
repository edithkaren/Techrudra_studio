import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export default function CardTilt({
  children,
  className = "",
  maxTilt = 6,
  scale = 1.02,
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

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
  };

  const reset = () => setTilt({ rotateX: 0, rotateY: 0 });

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
      {children}
    </motion.div>
  );
}
