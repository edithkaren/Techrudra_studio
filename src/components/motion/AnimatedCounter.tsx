import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  color?: string;
  className?: string;
  ease?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  color,
  className = "",
  ease = "easeOut",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease === "easeOut"
        ? 1 - Math.pow(1 - progress, 3)
        : ease === "easeIn"
          ? Math.pow(progress, 3)
          : progress;
      const current = start + (value - start) * eased;
      setCount(parseFloat(current.toFixed(decimals)));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, ease, decimals]);

  return (
    <span ref={ref} className={className} style={color ? { color } : undefined}>
      {prefix}
      <motion.span
        className="tabular-nums"
        initial={false}
        animate={{ innerText: count }}
        transition={{ duration, ease }}
      />
      {suffix}
    </span>
  );
}
