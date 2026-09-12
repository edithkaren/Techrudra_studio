import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setProgress(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "rgba(167,139,250,0.08)",
        zIndex: 999,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background:
            "linear-gradient(90deg, #A78BFA, #60A5FA, #2DD4BF)",
          width: `${progress * 100}%`,
        }}
      />
    </div>
  );
}
