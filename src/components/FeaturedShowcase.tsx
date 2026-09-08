import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";

const accentColors: Record<string, string> = {
  Websites: "#6C3AED",
  AI: "#3B82F6",
  Branding: "#FB923C",
  Video: "#EF4444",
  Marketing: "#14B8A6",
};

export default function FeaturedShowcase() {
  const featured = portfolioProjects.filter((p) => p.featured).slice(0, 2);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-10">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C3AED]/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            Our best projects, up close
          </motion.h2>
        </div>

        {/* Featured projects */}
        <div className="space-y-32">
          {featured.map((project, idx) => {
            const accent = accentColors[project.category] || "#6C3AED";
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid items-center gap-12 lg:grid-cols-2 ${isReversed ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Text */}
                <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                  <span
                    className="mb-3 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: accent }}
                  >
                    {project.category}
                  </span>
                  <h3 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mb-4 max-w-md text-sm leading-relaxed text-stone-500">
                    {project.description}
                  </p>
                  <p className="mb-6 max-w-md text-sm leading-relaxed text-stone-400">
                    {project.longDescription}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/portfolio/${project.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: accent }}
                  >
                    View case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                {/* Mockup */}
                <motion.div
                  style={{ y }}
                  className={isReversed ? "lg:[direction:ltr]" : ""}
                >
                  <ProjectMockup
                    projectSlug={project.slug}
                    category={project.category}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
