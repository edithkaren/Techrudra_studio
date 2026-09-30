import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Globe, Github } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const accentColors: Record<string, string> = {
  Websites: "#A78BFA",
  AI: "#60A5FA",
  Branding: "#FB923C",
  Video: "#F87171",
  Marketing: "#2DD4BF",
};

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Project not found</h1>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] hover:text-[#C4B5FD]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  const accent = accentColors[project.category] || "#A78BFA";

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] pt-28 pb-16 px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)` }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            {project.category}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/40">
            {project.description}
          </p>
        </div>
      </section>

      {/* Mockup */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectMockup projectSlug={project.slug} category={project.category} />
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white">Overview</h2>
                <p className="text-sm leading-relaxed text-white/40">{project.longDescription}</p>
              </div>
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white">Challenge</h2>
                <p className="text-sm leading-relaxed text-white/40">
                  The client needed a solution that could handle their unique requirements while maintaining
                  high performance and a premium user experience. The project demanded both technical
                  sophistication and visual polish.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white">Solution</h2>
                <p className="text-sm leading-relaxed text-white/40">
                  We designed and built a custom solution from the ground up, leveraging modern frameworks
                  and best practices to deliver a product that exceeded expectations. Every detail was
                  crafted with intention.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white">Process</h2>
                <p className="text-sm leading-relaxed text-white/40">
                  Starting with deep research and strategy, we moved through wireframes and design systems
                  before entering a focused development phase. The result is a polished, production-ready
                  digital product.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
                <h3 className="mb-4 text-sm font-semibold text-white">Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/20 mb-1">Client</p>
                    <p className="text-sm font-medium text-white/60">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/20 mb-1">Year</p>
                    <p className="text-sm font-medium text-white/60">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/20 mb-1">Category</p>
                    <p className="text-sm font-medium text-white/60">{project.category}</p>
                  </div>
                </div>
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                    >
                      <Globe className="h-4 w-4" /> View Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-[#A78BFA]/40 hover:text-white"
                    >
                      <Github className="h-4 w-4" /> GitHub Repo
                    </a>
                  )}
                </div>
              )}
              <div className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
                <h3 className="mb-4 text-sm font-semibold text-white">Technologies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
              >
                Build Something Similar
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
