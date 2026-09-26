import { motion } from "framer-motion";
import {
  Layers,
  Brain,
  Workflow,
  Palette,
  TrendingUp,
  ArrowRight,
  Target,
  Users,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import {
  buildCards,
  problemSolutions,
  whyCards,
  audiences,
  metrics,
  processSteps,
  buildInPublic,
  toolbox,
  labExperiments,
  type BuildCard,
} from "@/data/homepage";
import { testimonials, hasRealTestimonials } from "@/data/siteContent";
import CardTilt from "@/components/motion/CardTilt";
import ScrollReveal from "@/components/motion/ScrollReveal";
import KineticText from "@/components/motion/KineticText";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import MagneticButton from "@/components/motion/MagneticButton";

const ICONS: Record<string, typeof Layers> = {
  Layers,
  Brain,
  Workflow,
  Palette,
  TrendingUp,
};

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <ScrollReveal>
        <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-[#A78BFA] uppercase">
          {eyebrow}
        </span>
      </ScrollReveal>
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <KineticText
          text={title}
          as="h2"
          speed="medium"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        />
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <p className="mt-4 text-sm leading-relaxed text-white/40 sm:text-base">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

/* ── 05. What I Build ─────────────────────────────────────────── */

function BuildCardItem({ card, index }: { card: BuildCard; index: number }) {
  const Icon = ICONS[card.icon] ?? Layers;
  return (
    <ScrollReveal variant="fadeUp" delay={index * 0.06}>
      <CardTilt maxTilt={4} scale={1.01}>
        <motion.a
          href="#services"
          whileHover={{ y: -4 }}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] p-6 transition-colors duration-300 hover:border-white/[0.12] sm:p-7"
        >
          {/* Cursor-following gradient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at 50% 0%, ${card.color}12 0%, transparent 65%)`,
            }}
          />
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${card.color}14` }}
          >
            <motion.div
              whileHover={{ rotate: 12, scale: 1.12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="h-5.5 w-5.5 text-white" style={{ width: 22, height: 22, color: card.color }} />
            </motion.div>
          </div>
          <span className="mb-2 text-[11px] font-bold tracking-widest text-white/20">
            0{index + 1}
          </span>
          <h3 className="mb-1.5 text-lg font-bold tracking-tight text-white uppercase">
            {card.title}
          </h3>
          <p className="mb-4 text-xs leading-relaxed text-white/35">{card.tagline}</p>
          <ul className="mb-5 flex-1 space-y-1.5">
            {card.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-white/45">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: card.color }} />
                {item}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: card.color }}>
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <div
            className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: card.color }}
          />
        </motion.a>
      </CardTilt>
    </ScrollReveal>
  );
}

export function WhatIBuild() {
  return (
    <section id="what-i-build" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What I Build"
          title="From ideas to digital products, systems and experiences."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((card, i) => (
            <BuildCardItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 06. Problem → Solution ───────────────────────────────────── */

export function ProblemSolution() {
  return (
    <section id="problem-solution" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Sound Familiar?"
          title="You have the idea. I'll help build the system."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {problemSolutions.map((ps, i) => (
            <ScrollReveal key={ps.problem} variant="fadeUp" delay={i * 0.07}>
              <CardTilt maxTilt={3} scale={1.01}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] p-7 transition-colors duration-300 hover:border-white/[0.12]">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: ps.color }} />
                    <h3 className="text-base font-bold text-white uppercase sm:text-lg">
                      {ps.problem}
                    </h3>
                  </div>
                  <div className="mt-5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="mb-1.5 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ps.color }}>
                      The Fix
                    </p>
                    <p className="text-sm leading-relaxed text-white/45">{ps.solution}</p>
                  </div>
                  <motion.div
                    className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: ps.color }}
                  />
                </div>
              </CardTilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 11. Process timeline ─────────────────────────────────────── */

export function ProcessTimeline() {
  return (
    <section id="process" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Process"
          title="How I turn ideas into reality"
        />
        {/* Horizontal on desktop */}
        <div className="relative hidden lg:block">
          <div className="absolute top-6 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-6 gap-4">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} variant="fadeUp" delay={i * 0.1}>
                <div className="group relative">
                  <motion.div
                    className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border text-xs font-bold"
                    style={{ borderColor: `${step.color}40`, color: step.color, backgroundColor: "#0A0A0A" }}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                  >
                    {step.number}
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: `0 0 24px ${step.color}30` }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    />
                  </motion.div>
                  <h3 className="mb-1.5 text-sm font-bold tracking-wide text-white uppercase">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/35">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        {/* Vertical on mobile */}
        <div className="relative space-y-8 lg:hidden">
          <div className="absolute top-2 bottom-2 left-[23px] w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.number} variant="fadeUp" delay={i * 0.08}>
              <div className="relative flex gap-5 pl-0">
                <div
                  className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold"
                  style={{ borderColor: `${step.color}40`, color: step.color, backgroundColor: "#0A0A0A" }}
                >
                  {step.number}
                </div>
                <div className="pt-1.5">
                  <h3 className="mb-1 text-sm font-bold tracking-wide text-white uppercase">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/35">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 13. Build in public ──────────────────────────────────────── */

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  BUILDING: { dot: "#34D399", text: "text-[#34D399]" },
  EXPERIMENTING: { dot: "#FBBF24", text: "text-[#FBBF24]" },
  RESEARCHING: { dot: "#60A5FA", text: "text-[#60A5FA]" },
};

export function BuildInPublicSection() {
  return (
    <section id="building" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Build in Public"
          title="Currently building"
          subtitle="Ideas I'm turning into real products — with live status and honest progress."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {buildInPublic.map((p, i) => {
            const st = STATUS_STYLES[p.status];
            return (
              <ScrollReveal key={p.title} variant="fadeUp" delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-white/[0.06] bg-[#111111] p-6 transition-colors duration-300 hover:border-white/[0.12]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`flex items-center gap-2 text-[11px] font-bold tracking-widest ${st.text}`}>
                      <motion.span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: st.dot }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                      {p.status}
                    </span>
                    <span className="text-2xl font-bold tabular-nums text-white">
                      {p.progress}%
                    </span>
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mb-5 text-xs leading-relaxed text-white/35">{p.note}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${p.color}90, ${p.color})`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 14. Toolbox ──────────────────────────────────────────────── */

export function Toolbox() {
  return (
    <section id="toolbox" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Technology Ecosystem"
          title="My digital toolbox"
          subtitle="The stack behind the products, systems and content."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolbox.map((cat, ci) => (
            <ScrollReveal key={cat.name} variant="fadeUp" delay={ci * 0.05}>
              <div className="h-full rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
                <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-white/25 uppercase">
                  {cat.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map((tool, ti) => (
                    <motion.span
                      key={tool.name}
                      className="cursor-default rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-white/55"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3 + (ci + ti) * 0.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{ scale: 1.08, borderColor: `${tool.color}50` }}
                      title={tool.name}
                    >
                      <span
                        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: tool.color }}
                      />
                      {tool.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 15. Why me ───────────────────────────────────────────────── */

const WHY_ICONS = [Users, Sparkles, Target, Lightbulb];

export function WhyMe() {
  return (
    <section id="why-me" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Work With Me"
          title="More than a freelancer."
          subtitle="I combine development, AI, design, content and marketing so you can turn an idea into a complete digital experience without coordinating multiple specialists."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((card, i) => {
            const Icon = WHY_ICONS[i % WHY_ICONS.length];
            return (
              <ScrollReveal key={card.title} variant="fadeUp" delay={i * 0.06}>
                <CardTilt maxTilt={4} scale={1.02}>
                  <div className="h-full rounded-2xl border border-white/[0.06] bg-[#111111] p-6 transition-colors duration-300 hover:border-white/[0.12]">
                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${card.color}14` }}
                    >
                      <Icon style={{ width: 18, height: 18, color: card.color }} />
                    </div>
                    <h3 className="mb-2 text-sm font-bold tracking-wide text-white uppercase">
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/35">{card.description}</p>
                  </div>
                </CardTilt>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 16. Metrics ──────────────────────────────────────────────── */

export function MetricsBand() {
  return (
    <section id="metrics" className="relative border-y border-white/[0.06] bg-[#0D0D0D] px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {metrics.map((m, i) => (
          <ScrollReveal key={m.label} variant="fadeUp" delay={i * 0.07}>
            <div className="text-center">
              <div className="text-4xl font-bold tabular-nums md:text-5xl" style={{ color: m.color }}>
                {m.value === null ? (
                  <span>{m.raw}</span>
                ) : (
                  <AnimatedCounter
                    value={m.value}
                    suffix={m.suffix}
                    duration={2000}
                    color={m.color}
                  />
                )}
              </div>
              <p className="mt-1.5 text-xs text-white/35">{m.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ── 17. Who I build for ──────────────────────────────────────── */

export function WhoIBuildFor() {
  return (
    <section id="who" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Who I Build For" title="Built for" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <ScrollReveal key={a.title} variant="fadeUp" delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] p-6 transition-colors duration-300 hover:border-white/[0.12]"
              >
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: a.color }}
                />
                <h3 className="mb-1.5 text-sm font-bold tracking-wide text-white uppercase">
                  {a.title}
                </h3>
                <p className="text-xs text-white/35">{a.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 19. Availability block + 20. Testimonials ────────────────── */

export function TrustSection() {
  return (
    <section id="trust" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Availability"
              title="Let's talk about your project"
            />
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <AvailabilityBadge variant="card" className="max-w-md" />
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.25}>
              <MagneticButton
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </ScrollReveal>
          </div>
          {hasRealTestimonials && (
            <div>
              <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-white/25 uppercase">
                People I've worked with
              </p>
              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6"
                  >
                    <p className="text-sm leading-relaxed text-white/60">"{t.quote}"</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#A78BFA] to-[#60A5FA] text-xs font-bold text-white">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-white/30">
                          {t.role}, {t.company} · {t.projectType}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
