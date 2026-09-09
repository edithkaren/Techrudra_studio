import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
