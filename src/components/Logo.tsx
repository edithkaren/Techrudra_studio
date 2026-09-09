import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.a
      href="#home"
      className={`group relative inline-flex items-center gap-1.5 ${className}`}
    >
      {/* Icon mark */}
      <div className="relative mr-1 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#A78BFA] via-[#60A5FA] to-[#F472B6]">
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
        <span className="relative text-[11px] font-black text-white tracking-tight">TR</span>
      </div>

      {/* Text */}
      <span className="text-base font-extrabold tracking-tight text-white">
        {siteConfig.name}
      </span>
    </motion.a>
  );
}
