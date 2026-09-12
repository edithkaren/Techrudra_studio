import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "blur" | "fadeIn";
  delay?: number;
  className?: string;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const blurVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const variantsMap: Record<NonNullable<ScrollRevealProps["variant"]>, Variants> = {
  fadeUp: fadeUpVariants,
  blur: blurVariants,
  fadeIn: fadeInVariants,
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const resolvedVariant: NonNullable<ScrollRevealProps["variant"]> = variant;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="w-full"
        variants={variantsMap[resolvedVariant]}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={delay}
      >
        {children}
      </motion.div>
    </div>
  );
}
