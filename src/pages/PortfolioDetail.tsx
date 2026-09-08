import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import { Orbs, NoiseOverlay } from "@/components/AnimatedBackground";

const accentColors: Record<string, string> = {
  Websites: "#6C3AED",
  AI: "#3B82F6",
  Branding: "#FB923C",
  Video: "#EF4444",
  Marketing: "#14B8A6",
};

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900">
            Project not found
          </h1>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#6C3AED] hover:text-[#5B2ED4]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const accent = accentColors[project.category] || "#6C3AED";

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            to="/"
            className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            &larr; Back
          </Link>
          <span className="text-sm font-bold text-stone-900">Techrudra.Studio</span>
          <a
            href="#contact"
            className="rounded-full bg-[#6C3AED] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#5B2ED4]"
          >
            Start a Project
          </a>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden px-6 pt-8 pb-16 lg:px-10"
        >
          <Orbs variant="hero" />
          <NoiseOverlay opacity={0.02} />
          <div className="relative z-10 mx-auto max-w-5xl">
            <span
              className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {project.category} &middot; {project.year}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg">
              {project.description}
            </p>
          </div>
        </motion.section>

        {/* Project mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-10 px-6 lg:px-10"
        >
          <div className="mx-auto max-w-5xl">
            <ProjectMockup
              projectSlug={project.slug}
              category={project.category}
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-6 py-16 lg:px-10"
        >
          <div className="mx-auto max-w-5xl grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Client
              </h3>
              <p className="text-sm font-medium text-stone-900">
                {project.client}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Role
              </h3>
              <p className="text-sm font-medium text-stone-900">
                {project.role}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Long description */}
          <div className="mx-auto max-w-3xl mt-12">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
              About this project
            </h3>
            <p className="text-base leading-relaxed text-stone-600">
              {project.longDescription}
            </p>
          </div>

          {/* CTA */}
          <div className="mx-auto max-w-3xl mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6C3AED] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#5B2ED4]"
            >
              Build Something Similar
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-stone-700 transition-all duration-300 hover:border-stone-300"
            >
              Back to Portfolio
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
