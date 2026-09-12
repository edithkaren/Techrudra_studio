import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import ScrollReveal from "@/components/motion/ScrollReveal";

const accentColors: Record<string, string> = {
  Websites: "#A78BFA",
  AI: "#60A5FA",
  Branding: "#FB923C",
  Video: "#F87171",
  Marketing: "#2DD4BF",
};

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof portfolioProjects)[0];
  index: number;
}) {
  const accent = accentColors[project.category] || "#A78BFA";
  const isReversed = index % 2 === 1;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [120, -200]);
  const mockupScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.9, 1, 1.04, 1, 0.94]
  );
  const mockupRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isReversed ? 3 : -3, 0, isReversed ? -2 : 2]
  );
  const mockupOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0, 1, 1, 0.2]
  );

  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.78, 1],
    [0, 1, 1, 0.3]
  );

  const glowY = useTransform(scrollYProgress, [0, 1], [80, -140]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.3, 0.7]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.15]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-12 lg:grid-cols-2 ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className={isReversed ? "lg:[direction:ltr]" : ""}
      >
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
      </motion.div>

      <div className={`relative ${isReversed ? "lg:[direction:ltr]" : ""}`}>
        <motion.div
          className="pointer-events-none absolute inset-0 -m-20"
          style={{
            y: glowY,
            scale: glowScale,
            opacity: glowOpacity,
          }}
        >
          <div
            className="h-full w-full rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
            }}
          />
        </motion.div>

        <motion.div
          style={{
            y: mockupY,
            scale: mockupScale,
            rotate: mockupRotate,
            opacity: mockupOpacity,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="relative z-10"
        >
          <ProjectMockup
            projectSlug={project.slug}
            category={project.category}
          />
        </motion.div>          <motion.div
          className="absolute -right-6 -bottom-6 z-20 h-24 w-24 rounded-2xl opacity-30 blur-sm"
          style={{
            backgroundColor: accent,
            y: useTransform(scrollYProgress, [0, 1], [24, -60]),
            rotate: useTransform(scrollYProgress, [0, 1], [14, -10]),
          }}
        />
        <motion.div
          className="absolute -left-4 top-10 z-20 h-14 w-14 rounded-full opacity-15 blur-sm"
          style={{
            backgroundColor: accent,
            y: useTransform(scrollYProgress, [0, 1], [-20, 30]),
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 60%)",
            y: useTransform(scrollYProgress, [0, 0.5, 1], [40, -20, 60]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]),
            opacity: useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 0.6, 0.4, 0]),
          }}
        />
      </div>
    </div>
  );
}

export default function FeaturedShowcase() {
  const featured = portfolioProjects.filter((p) => p.featured).slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <ScrollReveal>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
              Featured Work
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our best projects, up close
            </h2>
          </ScrollReveal>
        </div>

        <div className="space-y-36">
          {featured.map((project, idx) => (
            <ScrollReveal key={project.id} variant="fadeUp" delay={0.05}>
              <FeaturedProject project={project} index={idx} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
