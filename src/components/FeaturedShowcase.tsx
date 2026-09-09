import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";

const accentColors: Record<string, string> = {
  Websites: "#A78BFA",
  AI: "#60A5FA",
  Branding: "#FB923C",
  Video: "#F87171",
  Marketing: "#2DD4BF",
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
    <section ref={containerRef} className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]"
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Our best projects, up close
          </motion.h2>
        </div>

        <div className="space-y-32">
          {featured.map((project, idx) => {
            const accent = accentColors[project.category] || "#A78BFA";
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
                <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                  <span
                    className="mb-3 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: accent }}
                  >
                    {project.category}
                  </span>
                  <h3 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mb-4 max-w-md text-sm leading-relaxed text-white/40">
                    {project.description}
                  </p>
                  <p className="mb-6 max-w-md text-sm leading-relaxed text-white/25">
                    {project.longDescription}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/40"
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
