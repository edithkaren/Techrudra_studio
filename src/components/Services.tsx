import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowRight } from "lucide-react";
import { services, type Service } from "@/data/services";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

const accentColors = [
  "#6C3AED",
  "#3B82F6",
  "#14B8A6",
  "#EC4899",
  "#FB923C",
  "#8B5CF6",
  "#EF4444",
  "#6C3AED",
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
    <motion.button
      custom={service.id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 text-left transition-all duration-300 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-900/[0.06] sm:p-8"
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: accent }}
      />
      <span
        className="mb-4 text-xs font-bold tracking-widest"
        style={{ color: accent }}
      >
        {service.number}
      </span>
      <h3 className="mb-3 text-lg font-semibold text-stone-900 sm:text-xl">
        {service.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-500">
        {service.summary}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {service.tools.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600"
            >
              {t}
            </span>
          ))}
          {service.tools.length > 3 && (
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-400">
              +{service.tools.length - 3}
            </span>
          )}
        </div>
        <ArrowUpRight className="h-4 w-4 text-stone-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-stone-600" />
      </div>
    </motion.button>
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/20 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stone-200 bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-stone-400 transition-colors hover:text-stone-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="text-xs font-bold tracking-widest" style={{ color: accent }}>
          {service.number}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-stone-900">
          {service.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          {service.summary}
        </p>

        {/* Price + Duration */}
        <div className="mt-5 flex items-center gap-4">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            {service.price}
          </span>
          <span className="text-xs text-stone-400">{service.duration}</span>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
            What we deliver
          </h4>
          <ul className="space-y-2">
            {service.details.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2 text-sm text-stone-600"
              >
                <span
                  className="mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
            Tools &amp; Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <span
                key={t}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6C3AED] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#5B2ED4]"
          >
            Discuss This Service
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/booking"
            onClick={onClose}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-all duration-300 hover:border-stone-300"
          >
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
    <section id="services" className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
          >
            Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            What we can build for you
          </motion.h2>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              onClick={() => { setSelected(s); setSelectedIndex(i); }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ServiceModal
            service={selected}
            index={selectedIndex}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
