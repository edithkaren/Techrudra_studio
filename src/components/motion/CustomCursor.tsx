import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only show on desktop
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", move);
    // Re-attach listeners periodically for dynamic content
    const interval = setInterval(addHoverListeners, 2000);
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-white/20 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovering ? 0 : 1,
          opacity: hovering ? 0 : 0.8,
        }}
      />
    </>
  );
}
