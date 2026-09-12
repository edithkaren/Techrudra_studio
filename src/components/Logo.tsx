import { motion, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site";

/* ── Logo ────────────────────────────────────────────────────────── */
export default function Logo({ className = "" }: { className?: string }) {
  const hoverSpring = useSpring(0, { stiffness: 320, damping: 20 });

  return (
    <motion.a
      href="#home"
      onHoverStart={() => hoverSpring.set(1)}
      onHoverEnd={() => hoverSpring.set(0)}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden ${className}`}
      aria-label={siteConfig.name}
    >
      {/* ── Icon mark: liquid glass morph ────────────────────────── */}
      <div className="relative">
        {/* Outer glow halo */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.5), transparent 65%)",
            filter: "blur(8px)",
          }}
          animate={{
            scale: [1, 1 + hoverSpring.get() * 0.8, 1],
            opacity: [0.3, 0.3 + hoverSpring.get() * 0.6, 0.3],
            rotate: [0, 8, 0],
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Inner liquid gradient shell */}
        <motion.div
          className="absolute inset-0.5 rounded-xl bg-[length:600%_600%] bg-gradient-to-br from-[#A78BFA] via-[rgba(96,165,250,0.9)] to-[#F472B6] shadow-lg shadow-[#A78BFA]/25"
          animate={{
            borderRadius: ["16px", "8px", "22px", "12px", "16px"],
            scale: [1, 1 + hoverSpring.get() * 0.15, 1],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Diagonal shimmer sweep */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.15) 55%, transparent 75%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner subtle inner glow highlight */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35) 0%, transparent 40%)",
            }}
          />
        </motion.div>

        {/* Airy glass bubble */}
        <motion.div
          className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-white/20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1 + hoverSpring.get() * 0.4, 1],
            opacity: [0.5, 0.5 + hoverSpring.get() * 0.5, 0.5],
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Brand mark initials */}
        <span
          className="relative z-10 text-[12px] font-black tracking-tight text-white"
          style={{
            textShadow:
              "0 1px 2px rgba(0,0,0,0.3), 0 0 14px rgba(167,139,250,0.45)",
          }}
        >
          TR
        </span>
      </div>

      {/* ── Brand text with animated gradient underline ─────────── */}
      <span className="relative inline-block text-base font-black tracking-tight text-white">
        <span className="relative z-10">{siteConfig.name}</span>
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-[2px] origin-left"
          style={{
            background:
              "linear-gradient(90deg, #A78BFA, #3B82F6, #EC4899, #A78BFA)",
            backgroundSize: "200% 100%",
          }}
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1, originX: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="h-full w-full"
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(90deg, #A78BFA, #3B82F6, #EC4899, #A78BFA)",
              backgroundSize: "200% 100%",
              opacity: 0.6,
            }}
          />
        </motion.span>
      </span>
    </motion.a>
  );
}

