import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioProjects,
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
        active
          ? "border-stone-900 bg-stone-900 text-white"
          : "border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-700"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof portfolioProjects)[0];
  index: number;
}) {
  // Alternate between large and small for editorial feel
  const isLarge = project.featured && index % 3 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all duration-300 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-900/[0.04] ${
        isLarge ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      {/* Image placeholder with gradient */}
      <div
        className={`relative overflow-hidden ${
          isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            background:
              index % 3 === 0
                ? "linear-gradient(135deg, #E7E5E4 0%, #D6D3D1 50%, #C4C0BA 100%)"
                : index % 3 === 1
                  ? "linear-gradient(135deg, #F0EDE8 0%, #E0DBD4 50%, #C8C3BB 100%)"
                  : "linear-gradient(135deg, #EAE6E1 0%, #D8D3CB 50%, #C0BBB3 100%)",
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-stone-900/0 transition-colors duration-300 group-hover:bg-stone-900/5" />
        {/* Arrow */}
        <div className="absolute right-5 bottom-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-stone-700" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            {project.category}
          </span>
          <span className="text-[11px] text-stone-300">&middot;</span>
          <span className="text-[11px] text-stone-400">{project.year}</span>
        </div>
        <h3 className="mb-2 text-base font-semibold text-stone-900 sm:text-lg">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-stone-500">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory>("All");

  const filtered =
    active === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-stone-400"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            Selected work
          </motion.h2>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {portfolioCategories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={active === cat}
              onClick={() => setActive(cat)}
            />
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
