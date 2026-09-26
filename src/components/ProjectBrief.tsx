import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import ScrollReveal from "@/components/motion/ScrollReveal";
import KineticText from "@/components/motion/KineticText";

/**
 * AI-style guided project brief. Runs fully client-side: it structures the
 * answers into a recommendation, then opens a prefilled email to send.
 * No fake API calls — the "intelligence" is deterministic mapping.
 */

const STEP1 = [
  "Website", "AI Product", "Automation", "UI/UX", "Brand", "Video", "Marketing", "Other",
];
const STEP3 = ["ASAP", "1–2 Weeks", "1 Month", "1–3 Months", "Flexible"];
const STEP4 = [
  "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+",
];

/* Deterministic "recommendation" mapping */
function recommend(projectType: string): {
  solution: string;
  services: string[];
  tech: string[];
} {
  const map: Record<
    string,
    { solution: string; services: string[]; tech: string[] }
  > = {
    Website: {
      solution:
        "A conversion-focused website: strategy-led UX, premium visual design, and a fast production build.",
      services: ["UI/UX Design", "Full-Stack Development", "SEO Foundation"],
      tech: ["React", "Next.js / Vite", "Tailwind", "Analytics"],
    },
    "AI Product": {
      solution:
        "A scoped AI product: start with a working prototype on your real data, then harden into production with guardrails.",
      services: ["AI Development", "Full-Stack Development", "Product Strategy"],
      tech: ["OpenAI / Claude / Gemini", "Vector DB", "Node.js", "React"],
    },
    Automation: {
      solution:
        "An automation audit followed by AI-powered workflows connecting your existing tools end-to-end.",
      services: ["AI Automation", "Integrations", "Process Design"],
      tech: ["n8n / Make / Zapier", "Webhooks", "AI APIs"],
    },
    "UI/UX": {
      solution:
        "A design system and high-fidelity product UI, delivered with prototypes and developer-ready specs.",
      services: ["UI/UX Design", "Design Systems", "Prototyping"],
      tech: ["Figma", "Framer", "Motion"],
    },
    Brand: {
      solution:
        "A complete visual identity: logo, typography, palette, guidelines and launch-ready brand assets.",
      services: ["Branding", "Graphic Design", "Motion Design"],
      tech: ["Figma", "Illustrator", "After Effects"],
    },
    Video: {
      solution:
        "A video system: hero film or reels with motion graphics, cut down for every platform.",
      services: ["Video Production", "Motion Design", "Social Content"],
      tech: ["Premiere Pro", "After Effects", "AI Video Tools"],
    },
    Marketing: {
      solution:
        "A growth engine: positioning, channel strategy and a content/lead system that compounds.",
      services: ["Digital Marketing", "SEO & Content", "Social Media"],
      tech: ["Analytics", "SEO Tools", "Email Platforms"],
    },
    Other: {
      solution:
        "A discovery session to shape the idea into a concrete product plan, then an execution roadmap.",
      services: ["Creative Strategy", "Product Strategy", "Full-Stack Development"],
      tech: ["Depends on scope — discussed in the call"],
    },
  };
  return map[projectType] ?? map.Other;
}

export default function ProjectBrief() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [problem, setProblem] = useState("");
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [generated, setGenerated] = useState(false);

  const rec = useMemo(
    () => (projectType ? recommend(projectType) : null),
    [projectType],
  );

  const canNext =
    (step === 0 && projectType) ||
    (step === 1 && problem.trim().length > 5) ||
    step === 2 ||
    step === 3 ||
    step === 4;

  const mailto = () => {
    const subject = `Project Inquiry — ${projectType ?? "New Project"}`;
    const body = [
      `PROJECT TYPE: ${projectType}`,
      `PROBLEM: ${problem}`,
      `TIMELINE: ${timeline ?? "Not specified"}`,
      `BUDGET: ${budget ?? "Not specified"}`,
      details ? `DETAILS: ${details}` : "",
      "",
      `— Recommended solution: ${rec?.solution}`,
      `— Suggested services: ${rec?.services.join(", ")}`,
      `— Potential technology: ${rec?.tech.join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const chip = (active: boolean) =>
    `rounded-xl border px-4 py-2.5 text-left text-sm transition-all duration-200 ${
      active
        ? "border-[#A78BFA]/60 bg-[#A78BFA]/[0.08] text-white"
        : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80"
    }`;

  const steps = ["Type", "Problem", "Timeline", "Budget", "Details"];

  return (
    <section id="brief" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <ScrollReveal>
            <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-[#A78BFA] uppercase">
              AI Project Brief
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <KineticText
              text="Tell me what you're building."
              as="h2"
              speed="medium"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="mt-4 text-sm text-white/40">
              Five quick questions. I'll structure it into a project brief you can send instantly.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111111]">
            {/* Progress bar */}
            <div className="h-1 bg-white/[0.04]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]"
                animate={{ width: `${((step + 1) / 5) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="p-7 sm:p-9">
              {/* Step indicator */}
              <div className="mb-7 flex items-center justify-between">
                {steps.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                        i <= step
                          ? "bg-[#A78BFA] text-black"
                          : "bg-white/[0.06] text-white/30"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`hidden text-[11px] font-medium sm:block ${
                        i === step ? "text-white" : "text-white/25"
                      }`}
                    >
                      {label}
                    </span>
                    {i < steps.length - 1 && (
                      <span className="mx-1 hidden h-px w-6 bg-white/10 sm:block" />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="s0"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-sm font-medium text-white/70">
                      What are you building?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {STEP1.map((t) => (
                        <button key={t} onClick={() => setProjectType(t)} className={chip(projectType === t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-sm font-medium text-white/70">
                      What problem are you trying to solve?
                    </p>
                    <textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      rows={5}
                      placeholder="e.g. We're losing leads because follow-ups are manual and slow…"
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]"
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-sm font-medium text-white/70">
                      What is your timeline?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {STEP3.map((t) => (
                        <button key={t} onClick={() => setTimeline(t)} className={chip(timeline === t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-sm font-medium text-white/70">
                      Budget range
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {STEP4.map((t) => (
                        <button key={t} onClick={() => setBudget(t)} className={chip(budget === t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] text-white/25">
                      Configurable ranges — set expectations early to save us both time.
                    </p>
                  </motion.div>
                )}

                {step === 4 && !generated && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-sm font-medium text-white/70">
                      Additional details (optional)
                    </p>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={4}
                      placeholder="Links, references, anything else I should know…"
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]"
                    />
                    <button
                      onClick={() => setGenerated(true)}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate Project Brief
                    </button>
                  </motion.div>
                )}

                {generated && rec && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="space-y-4">
                      {[
                        { label: "Project Type", value: projectType },
                        { label: "Problem", value: problem },
                        {
                          label: "Goal",
                          value: `${timeline ?? "Flexible"} · ${budget ?? "Budget open"}`,
                        },
                        { label: "Recommended Solution", value: rec.solution },
                        {
                          label: "Suggested Services",
                          value: rec.services.join(" · "),
                        },
                        { label: "Potential Technology", value: rec.tech.join(" · ") },
                      ].map((row) => (
                        <div key={row.label}>
                          <p className="text-[10px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                            {row.label}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/60">
                            {row.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={mailto}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                    >
                      <Send className="h-4 w-4" />
                      Send Project Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav buttons */}
              {!generated && (
                <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  {step < 4 && (
                    <button
                      onClick={() => canNext && setStep((s) => s + 1)}
                      disabled={!canNext}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  {step === 4 && (
                    <span className="text-xs text-white/25">
                      Step 5 of 5
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
