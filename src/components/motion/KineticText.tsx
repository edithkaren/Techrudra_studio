import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * KineticText — text that slides up from an invisible clipping boundary
 * using clip-path, with an elastic cubic-bezier easing.
 * Each word/line reveals independently on viewport entry.
 */
interface KineticTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  once?: boolean;
  speed?: "slow" | "medium" | "fast";
  revealType?: "word" | "line";
  style?: React.CSSProperties;
}

// When used inside an <h1>/<h2>/<p>, the clip-path reveal still works
// because each word is wrapped in a motion.span inside the parent.
// The `as` prop is kept for consumers that want a semantic wrapper,
// but the actual reveal element stays a <span> to keep clip-path reliable.

// Elastic cubic-bezier expressed as FRM easing array [x1, y1, x2, y2]
const EASING_ELASTIC = [0.68, -0.55, 0.265, 1.55] as const;

const SPEEDS = {
  slow: { duration: 1.4, stagger: 0.12 },
  medium: { duration: 0.9, stagger: 0.08 },
  fast: { duration: 0.55, stagger: 0.05 },
};

const ALLOWED_TAGS = new Set(["h1", "h2", "h3", "p", "span", "div", "strong", "b"]);

export default function KineticText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  once = true,
  speed = "medium",
  revealType = "word",
  style,
}: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px 0px" });
  const { duration, stagger } = SPEEDS[speed];
  const reveal = inView ? "visible" : "hidden";

  const items = revealType === "line" ? text.split("\n") : text.split(" ");

  return (
    <div ref={ref} style={style}>
      <motion.div
        className={`overflow-hidden ${className}`}
        initial="hidden"
        animate={reveal}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
      >
        {items.map((item, i) => (
          <motion.span
            key={i}
            className={`inline-block ${revealType === "line" ? "" : "whitespace-nowrap"}`}
            variants={{
              hidden: { clipPath: "inset(100% 0 0 0)" },
              visible: {
                clipPath: "inset(0% 0 0 0)",
                transition: {
                  duration,
                  ease: EASING_ELASTIC,
                },
              },
            }}
          >
            {item === "\n"
              ? "\u00A0"
              : item + (i < items.length - 1 && revealType === "word" ? " " : "")}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * KineticTextLine — single line reveal (children-ready).
 * Pass any inline-span children and they reveal with clip-path + elastic.
 */
interface KineticTextLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  speed?: "slow" | "medium" | "fast";
  style?: React.CSSProperties;
}

export function KineticTextLine({
  children,
  className = "",
  delay = 0,
  once = true,
  speed = "medium",
  style,
}: KineticTextLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-40px 0px" });
  const { duration } = SPEEDS[speed];
  const reveal = inView ? "visible" : "hidden";

  return (
    <motion.span
      ref={ref}
      className={`inline-block relative overflow-hidden display-block ${className}`}
      variants={{
        hidden: { clipPath: "inset(100% 0 0 0)" },
        visible: {
          clipPath: "inset(0% 0 0 0)",
          transition: { duration, ease: EASING_ELASTIC },
        },
      }}
      initial="hidden"
      animate={reveal}
      style={style}
    >
      {children}
    </motion.span>
  );
}
