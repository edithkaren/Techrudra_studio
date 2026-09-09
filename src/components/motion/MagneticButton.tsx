import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const Tag = href ? "a" : "button";
  const props = href ? { href } : { onClick };

  return (
    <motion.div
      className="inline-block"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Tag
        ref={ref as never}
        className={className}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
