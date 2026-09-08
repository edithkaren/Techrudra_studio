import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.a
      href="#home"
      className={`group relative inline-flex items-center gap-1 ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Animated icon mark */}
      <motion.div className="relative mr-1 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#6C3AED] via-[#3B82F6] to-[#EC4899]">
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
          }}
          animate={{
            x: ["-120%", "120%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
        <span className="relative text-[11px] font-black text-white tracking-tight">
          TR
        </span>
      </motion.div>

      {/* Text */}
      <motion.span
        className="relative text-base font-extrabold tracking-tight"
        style={{
          background: "linear-gradient(135deg, #1C1917 0%, #6C3AED 50%, #3B82F6 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        variants={{
          rest: { backgroundPosition: "0% 50%" },
          hover: { backgroundPosition: "100% 50%" },
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {siteConfig.name}
      </motion.span>

      {/* Underline glow on hover */}
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#6C3AED] via-[#3B82F6] to-[#EC4899]"
        initial={{ width: 0, opacity: 0 }}
        variants={{
          hover: { width: "100%", opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.a>
  );
}
