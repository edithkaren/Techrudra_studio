import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "blur" | "fadeIn";
  delay?: number;
  className?: string;
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
    }),
  },
  blur: {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIndex((idx) => idx + 1);
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const v = variants[variant];

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="w-full"
        variants={v}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={delay}
      >
        {children}
      </motion.div>
    </div>
  );
}
