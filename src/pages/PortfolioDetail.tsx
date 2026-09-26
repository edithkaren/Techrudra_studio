import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const project = portfolioProjects.find(
    (p) => p.slug === slug || p.slug === `/${slug}`,
  );

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

  const sections = [
    { num: "01", title: "Overview", body: project.longDescription },
    {
      num: "02",
      title: "The Problem",
      body:
        "This section is authored per project in `src/data/portfolio.ts` — add the specific challenge the client faced before this build, and keep it honest. No invented metrics.",
    },
    {
      num: "03",
      title: "Research",
      body:
        "Discovery notes, user interviews and competitive analysis for this project go here. Authored in `src/data/portfolio.ts`.",
    },
    {
      num: "04",
      title: "The Solution",
      body: `The build combined ${project.technologies.slice(0, 3).join(", ")} (and more) into a production-ready system designed around the project's goals — architecture, UX and content working as one.`,
    },
    {
      num: "05",
      title: "UX / UI",
      body:
        "Design process, wireframes, iteration and the final interface system are documented here per project.",
    },
    {
      num: "06",
      title: "Development",
      body: `Built with ${project.technologies.join(", ")}. Architecture notes, key technical decisions and integration points are documented per project.`,
    },
    ...(project.category === "AI" || project.category === "Marketing"
      ? [
          {
            num: "07",
            title: "AI / Automation",
            body:
              "For AI and automation projects, this section documents the model strategy, data flow and the automated pipeline architecture.",
          },
        ]
      : []),
    {
      num: project.category === "AI" || project.category === "Marketing" ? "08" : "07",
      title: "Final Product",
      body: "Screens, walkthroughs and the shipped experience.",
    },
    {
      num: project.category === "AI" || project.category === "Marketing" ? "09" : "08",
      title: "Results",
      body:
        "Genuine, verified outcomes appear here once available. No invented numbers — placeholders stay placeholders until they're real.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 pt-28 pb-16 lg:px-10">
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
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
              {project.category}
            </span>
            <span className="text-xs text-white/20">·</span>
            <span className="text-xs text-white/30">{project.year}</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/40">
            {project.description}
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-y border-white/[0.06] bg-[#0D0D0D] px-6 py-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: "Client", value: project.client },
            { label: "Year", value: project.year },
            { label: "Role", value: project.role },
            { label: "Category", value: project.category },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase">{m.label}</p>
              <p className="mt-1 text-sm font-medium text-white/60">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mockup */}
      <section className="px-6 py-20 lg:px-10">
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

      {/* Case study body */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-14">
            {sections.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                <div className="mb-4 flex items-baseline gap-4">
                  <span
                    className="text-sm font-black tabular-nums"
                    style={{ color: `${accent}90` }}
                  >
                    {s.num}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {s.title}
                  </h2>
                  {i === 0 && (
                    <span className="ml-auto hidden h-px flex-1 bg-white/[0.06] sm:block" />
                  )}
                </div>
                <p className="text-sm leading-relaxed text-white/45 sm:text-base">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Technology chips */}
          <div className="mt-16 rounded-2xl border border-white/[0.06] bg-[#111111] p-7">
            <h3 className="mb-4 text-sm font-semibold text-white">Technology</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0D0D0D] px-6 py-24 lg:px-10">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${accent}14 0%, transparent 70%)` }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black tracking-tight text-white sm:text-5xl"
          >
            HAVE A SIMILAR IDEA?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-md text-sm text-white/40"
          >
            Let's turn it into a real, shipped product.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8"
          >
            <Link
              to="/#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#contact";
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
            >
              Let's Build It <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
