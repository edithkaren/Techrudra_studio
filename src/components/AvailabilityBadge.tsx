import { motion } from "framer-motion";
import { availability } from "@/data/siteContent";

export function AvailabilityDot({ size = 8 }: { size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-0 rounded-full bg-[#34D399]"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-[#34D399]/40"
        animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="absolute inset-0 rounded-full bg-[#34D399]" />
    </span>
  );
}

export default function AvailabilityBadge({
  variant = "inline",
  className = "",
}: {
  variant?: "inline" | "card" | "footer";
  className?: string;
}) {
  if (variant === "card") {
    return (
      <div
        className={`rounded-2xl border border-white/[0.06] bg-[#111111] p-6 ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <AvailabilityDot />
          <span className="text-sm font-semibold tracking-wide text-white">
            🟢 {availability.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-white/40">{availability.subtext}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-white/[0.03] p-3">
            <p className="text-white/30">Response time</p>
            <p className="mt-0.5 font-semibold text-white/70">
              {availability.responseTime}
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-3">
            <p className="text-white/30">Location</p>
            <p className="mt-0.5 font-semibold text-white/70">
              {availability.location}
            </p>
          </div>
        </div>
      </div>
      );
  }

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <AvailabilityDot />
        <span className="text-sm text-white/40">
          Available for Projects — {availability.responseTime} response
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-[#34D399]/20 bg-[#34D399]/[0.06] px-4 py-1.5 backdrop-blur-md ${className}`}
    >
      <AvailabilityDot />
      <span className="text-xs font-medium tracking-wide text-[#34D399]">
        {availability.status}
      </span>
    </div>
  );
}
