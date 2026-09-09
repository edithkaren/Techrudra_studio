import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowRight } from "lucide-react";
import { services, type Service } from "@/data/services";
import CardTilt from "@/components/motion/CardTilt";
import ScrollReveal from "@/components/motion/ScrollReveal";

const accentColors = [
  "#A78BFA", "#60A5FA", "#2DD4BF", "#F472B6",
  "#FB923C", "#C084FC", "#F87171", "#A78BFA",
];

function ServiceCard({
  service,
  index,
  onClick,
}: {
  service: Service;
  index: number;
  onClick: () => void;
}) {
  const accent = accentColors[index % accentColors.length];
  return (
    <ScrollReveal variant="fadeUp" delay={index * 0.06}>
      <CardTilt maxTilt={4} scale={1.01}>
        <motion.button
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] p-6 text-left transition-all duration-300 hover:border-white/[0.12] hover:bg-[#141414] sm:p-8"
        >
          {/* Animated glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle at 50% 0%, ${accent}08 0%, transparent 60%)` }}
          />
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: accent }}
          />
          <span className="mb-4 text-xs font-bold tracking-widest" style={{ color: accent }}>
            {service.number}
          </span>
          <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">{service.title}</h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-white/40">{service.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {service.tools.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/40">{t}</span>
              ))}
              {service.tools.length > 3 && (
                <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/25">+{service.tools.length - 3}</span>
              )}
            </div>
            <motion.div
              className="text-white/20"
              whileHover={{ x: 3, y: -3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.button>
      </CardTilt>
    </ScrollReveal>
  );
}

function ServiceModal({
  service,
  index,
  onClose,
}: {
  service: Service;
  index: number;
  onClose: () => void;
}) {
  const accent = accentColors[index % accentColors.length];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#111111] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-white/30 transition-colors hover:text-white/70" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <span className="text-xs font-bold tracking-widest" style={{ color: accent }}>{service.number}</span>
        <h2 className="mt-2 text-2xl font-bold text-white">{service.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/40">{service.summary}</p>
        <div className="mt-5 flex items-center gap-4">
          <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/60">{service.price}</span>
          <span className="text-xs text-white/30">{service.duration}</span>
        </div>
        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/25">What we deliver</h4>
          <ul className="space-y-2">
            {service.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-white/50">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/25">Tools & Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <span key={t} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/40">{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" onClick={onClose} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90">
            Discuss This Service <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/booking" onClick={onClose} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20">
            Book a Session
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="services" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <ScrollReveal>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">Services</span>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What we can build for you</h2>
          </ScrollReveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onClick={() => { setSelected(s); setSelectedIndex(i); }} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <ServiceModal service={selected} index={selectedIndex} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
