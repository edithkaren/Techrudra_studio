import { useState, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface LiquidTextProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "a";
  href?: string;
}

/**
 * Text that warps into a fluid / ink-in-water shape on hover.
 * Uses two SVG filters toggled via CSS class for the distortion.
 * On hover, text morphs with turbulence noise — like red ink flowing in water.
 */
export default function LiquidText({
  children,
  className = "",
  as: Tag = "span",
  href,
}: LiquidTextProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ filter: hovered ? "url(#fluid-distort-hover)" : "url(#fluid-distort)" }}
      animate={{
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Tag
        href={href}
        className="relative inline-block cursor-pointer"
      >
        {children}
        {/* Underline that morphs on hover */}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-[1px] bg-current"
          animate={{
            width: hovered ? "100%" : "0%",
            opacity: hovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </Tag>
    </motion.div>
  );
}
