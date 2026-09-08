import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioProjects,
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";

const accentColors: Record<string, string> = {
  Websites: "#6C3AED",
  AI: "#3B82F6",
  Branding: "#FB923C",
  Video: "#EF4444",
  Marketing: "#14B8A6",
};

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
          ? "border-[#6C3AED] bg-[#6C3AED] text-white"
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
  const isLarge = project.featured && index % 3 === 0;
  const accent = accentColors[project.category] || "#6C3AED";

  const gradients: Record<string, string> = {
    Websites: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 50%, #C4B5FD 100%)",
    AI: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 50%, #93C5FD 100%)",
    Branding: "linear-gradient(135deg, #FFEDD5 0%, #FED7AA 50%, #FDBA74 100%)",
    Video: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%)",
    Marketing: "linear-gradient(135deg, #CCFBF1 0%, #99F6E4 50%, #5EEAD4 100%)",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all duration-300 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-900/[0.06] ${
        isLarge ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <a href={`/portfolio/${project.slug}`} className="block">
        {/* Image placeholder with category-colored gradient */}
        <div
          className={`relative overflow-hidden ${
            isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              background: gradients[project.category] || gradients.Websites,
            }}
          />
          {/* Accent stripe */}
          <div
            className="absolute top-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: accent }}
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
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: accent }}
            >
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
      </a>
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
            className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
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
