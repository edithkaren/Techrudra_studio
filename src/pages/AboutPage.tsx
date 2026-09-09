import { motion } from "framer-motion";
import { ArrowRight, Zap, Palette, Code2, Megaphone, Lightbulb, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Orbs } from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const capabilities = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "We architect and ship production-grade web applications — from blazing-fast marketing sites to complex SaaS platforms with real-time data.",
    color: "#6C3AED",
  },
  {
    icon: Sparkles,
    title: "AI & Automation",
    description: "Custom AI agents, intelligent chatbots, and end-to-end automation workflows that save teams hundreds of hours every month.",
    color: "#3B82F6",
  },
  {
    icon: Palette,
    title: "Design & Branding",
    description: "Visual identities, UI/UX systems, and motion design that make brands impossible to ignore — crafted with precision and taste.",
    color: "#EC4899",
  },
  {
    icon: Megaphone,
    title: "Growth & Marketing",
    description: "Data-driven digital strategies, content systems, and social campaigns that turn attention into measurable business outcomes.",
    color: "#FB923C",
  },
  {
    icon: Zap,
    title: "Video & Motion",
    description: "Reels, product videos, promotional content, and motion graphics — produced with an editorial eye and a fast turnaround.",
    color: "#14B8A6",
  },
  {
    icon: Lightbulb,
    title: "Creative Strategy",
    description: "We don't just execute — we think. Every project starts with understanding your market, your audience, and your competitive edge.",
    color: "#6C3AED",
  },
];

const values = [
  {
    icon: Target,
    title: "Results Over Aesthetics",
    body: "A beautiful interface that doesn't convert is just decoration. We design for outcomes — every pixel earns its place.",
  },
  {
    icon: Users,
    title: "Partnership, Not Freelancing",
    body: "We embed into your team's workflow. You get a creative technology partner who understands your business, not a contractor shipping tickets.",
  },
  {
    icon: Sparkles,
    title: "AI-Native Thinking",
    body: "We don't bolt AI onto projects as an afterthought. We architect systems where intelligence is a core layer from day one.",
  },
  {
    icon: Lightbulb,
    title: "Relentless Craft",
    body: "We obsess over details that most people never notice — because your users feel them even if they can't name them.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered", color: "#6C3AED" },
  { value: "30+", label: "Brands Served", color: "#3B82F6" },
  { value: "10+", label: "Industries", color: "#EC4899" },
  { value: "∞", label: "Curiosity", color: "#FB923C" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-[#0A0612] via-[#110D1F] to-[#0E0A1A] pt-20">
        <Orbs variant="hero" />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2RvdHMpIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIvPjwvc3ZnPg==')] opacity-60" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FB923C]"
            >
              About Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              We are{" "}
              <span className="text-gradient-violet">Techrudra.Studio</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-stone-400"
            >
              A creative technology studio that helps brands build bold digital
              products, automate complex workflows, and grow with strategy — all
              under one roof.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 rounded-full bg-[#6C3AED] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#5B2ED4] hover:shadow-lg hover:shadow-[#6C3AED]/20"
              >
                What We Do
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              >
                Book a Session
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#FAF8F5]" />
      </section>

      {/* Stats Strip */}
      <section className="relative z-10 -mt-8">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="relative rounded-2xl border border-stone-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm"
              >
                <span
                  className="text-3xl font-bold md:text-4xl"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <p className="mt-1 text-sm text-stone-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl"
              >
                Built at the intersection of{" "}
                <span className="text-gradient-violet">code, AI &amp; creativity</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-6 max-w-lg text-lg leading-relaxed text-stone-500"
              >
                Techrudra.Studio was founded on a simple belief: the best digital
                products don't come from siloed teams — they come from a single
                creative technologist who can design, build, automate, and grow
                everything in one cohesive vision.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-4 max-w-lg text-base leading-relaxed text-stone-400"
              >
                We work with startups, agencies, creators, and established brands
                who need more than a freelancer — they need a studio partner who
                can turn ambitious ideas into polished, production-ready
                experiences.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="relative"
            >
              {/* Decorative card */}
              <div className="relative rounded-3xl border border-stone-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm">
                <div className="pointer-events-none absolute -top-4 -right-4 rounded-2xl bg-[#6C3AED]/10 px-4 py-2 text-xs font-semibold text-[#6C3AED] backdrop-blur-sm">
                  est. 2024
                </div>
                <div className="space-y-5">
                  {[
                    { label: "Mission", text: "Make every brand's digital presence impossible to ignore." },
                    { label: "Approach", text: "Design-driven, AI-powered, code-first." },
                    { label: "Promise", text: "One studio. Every capability. Zero compromise." },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-medium text-stone-800">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Logo />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-14 max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
            >
              Capabilities
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl"
            >
              Everything your brand needs, in one studio
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-lg text-stone-500"
            >
              We don't do one thing well — we do everything exceptionally. Here's
              what we bring to every engagement.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-stone-300 hover:shadow-xl"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${cap.color}12` }}
                >
                  <cap.icon className="h-5 w-5" style={{ color: cap.color }} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-stone-900">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {cap.description}
                </p>
                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: cap.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-14 text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
            >
              Our Values
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl"
            >
              What drives every decision
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid gap-6 sm:grid-cols-2"
          >
            {values.map((val) => (
              <motion.div
                key={val.title}
                variants={scaleIn}
                className="group rounded-2xl border border-stone-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C3AED]/10">
                  <val.icon className="h-5 w-5 text-[#6C3AED]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-stone-900">
                  {val.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {val.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-14 max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6C3AED]"
            >
              How We Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl"
            >
              From first call to final launch
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                step: "01",
                title: "Discover",
                desc: "We learn your business, audience, goals, and the problems worth solving — before writing a single line of code.",
              },
              {
                step: "02",
                title: "Strategize",
                desc: "A clear roadmap covering UX, technology, content, and AI opportunities — so every decision is intentional.",
              },
              {
                step: "03",
                title: "Design",
                desc: "Wireframes, visual systems, and interaction design that look premium and convert visitors into customers.",
              },
              {
                step: "04",
                title: "Build",
                desc: "Production-grade development using modern frameworks — fast, accessible, and built to scale.",
              },
              {
                step: "05",
                title: "Launch",
                desc: "Thorough QA, performance optimization, and a smooth deployment — zero surprises on launch day.",
              },
              {
                step: "06",
                title: "Grow",
                desc: "Ongoing marketing, SEO, content, and automation that compound over time and drive real business results.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={scaleIn}
                className="relative rounded-2xl border border-stone-200 bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              >
                <span className="text-4xl font-bold text-[#6C3AED]/15">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl font-bold tracking-tight text-stone-900 md:text-5xl"
            >
              Ready to work with a studio that{" "}
              <span className="text-gradient-violet">gets it</span>?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mx-auto mt-5 max-w-lg text-lg text-stone-500"
            >
              Whether you need a website, an AI product, a brand overhaul, or a
              full-scale digital strategy — let's talk.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-[#6C3AED] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#5B2ED4] hover:shadow-lg hover:shadow-[#6C3AED]/20"
              >
                Book a Session
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-8 py-3.5 text-sm font-medium text-stone-700 transition-all duration-300 hover:border-stone-400 hover:bg-stone-50"
              >
                Send a Message
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
