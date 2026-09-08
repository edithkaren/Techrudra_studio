import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { services, type Service } from "@/data/services";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

function ServiceCard({
  service,
  onClick,
}: {
  service: Service;
  onClick: () => void;
}) {
  return (
    <motion.button
      custom={service.id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group flex flex-col rounded-2xl border border-stone-200/80 bg-white p-6 text-left transition-all duration-300 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-900/[0.04] sm:p-8"
    >
      <span className="mb-4 text-xs font-medium tracking-widest text-stone-400">
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
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
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

        <span className="text-xs font-medium tracking-widest text-stone-400">
          {service.number}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-stone-900">
          {service.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          {service.summary}
        </p>

        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
            What I deliver
          </h4>
          <ul className="space-y-2">
            {service.details.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2 text-sm text-stone-600"
              >
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-stone-300" />
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

        <a
          href="#contact"
          onClick={onClose}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-stone-800"
        >
          Discuss This Service
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-stone-400"
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
            What I can build for you
          </motion.h2>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onClick={() => setSelected(s)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ServiceModal service={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
