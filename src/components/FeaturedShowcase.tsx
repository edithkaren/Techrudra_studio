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

  // Mockup parallax — moves up faster than scroll (overshoots)
  const mockupY = useTransform(scrollYProgress, [0, 1], [100, -120]);
  // Mockup scale — starts slightly small, grows to 1, then shrinks slightly at exit
  const mockupScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.92, 1, 1.02, 1, 0.97]
  );
  // Mockup subtle rotation on scroll
  const mockupRotate = useTransform(scrollYProgress, [0, 0.5, 1], [isReversed ? 2 : -2, 0, isReversed ? -1 : 1]);
  // Mockup opacity — fades in and out at edges
  const mockupOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.3]
  );

  // Text parallax — slower, stays grounded
  const textY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.5]);

  // Background glow orb — parallax with different speed
  const glowY = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.8]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-12 lg:grid-cols-2 ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Text side */}
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

      {/* Mockup side with rich parallax */}
      <div
        className={`relative ${isReversed ? "lg:[direction:ltr]" : ""}`}
      >
        {/* Background glow orb — different parallax speed */}
        <motion.div
          className="pointer-events-none absolute inset-0 -m-16"
          style={{
            y: glowY,
            scale: glowScale,
            opacity: 0.3,
          }}
        >
          <div
            className="h-full w-full rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* The mockup itself */}
        <motion.div
          style={{
            y: mockupY,
            scale: mockupScale,
            rotate: mockupRotate,
            opacity: mockupOpacity,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative z-10"
        >
          <ProjectMockup
            projectSlug={project.slug}
            category={project.category}
          />
        </motion.div>

        {/* Floating accent decoration */}
        <motion.div
          className="absolute -right-4 -bottom-4 z-20 h-20 w-20 rounded-2xl opacity-20 blur-sm"
          style={{
            backgroundColor: accent,
            y: useTransform(scrollYProgress, [0, 1], [20, -40]),
            rotate: useTransform(scrollYProgress, [0, 1], [12, -8]),
          }}
        />
        <motion.div
          className="absolute -left-3 top-8 z-20 h-12 w-12 rounded-full opacity-10 blur-sm"
          style={{
            backgroundColor: accent,
            y: useTransform(scrollYProgress, [0, 1], [-15, 25]),
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

        <div className="space-y-32">
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
