import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioProjects,
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";

const accentColors: Record<string, string> = {
  Websites: "#A78BFA",
  AI: "#60A5FA",
  Branding: "#FB923C",
  Video: "#F87171",
  Marketing: "#2DD4BF",
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
          ? "border-[#A78BFA] bg-[#A78BFA] text-black"
          : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/60"
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
  const accent = accentColors[project.category] || "#A78BFA";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] transition-all duration-300 hover:border-white/[0.12] hover:bg-[#141414] ${
        isLarge ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <a href={`/portfolio/${project.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-[#0D0D0D] ${
            isLarge ? "p-6 sm:p-8" : "p-4 sm:p-5"
          }`}
        >
          <motion.div
            className="transition-transform duration-500"
            whileHover={{ scale: 1.02 }}
          >
            <ProjectMockup
              projectSlug={project.slug}
              category={project.category}
            />
          </motion.div>

          <div
            className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: accent }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute right-5 bottom-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
            <ArrowUpRight className="h-4 w-4 text-white/70" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: accent }}
            >
              {project.category}
            </span>
            <span className="text-[11px] text-white/10">&middot;</span>
            <span className="text-[11px] text-white/25">{project.year}</span>
          </div>
          <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-white/35">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/30"
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
    <section id="portfolio" className="bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Selected work
          </motion.h2>
        </div>

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

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
