import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import ScrollReveal from "@/components/motion/ScrollReveal";
import KineticText from "@/components/motion/KineticText";
import { siteConfig } from "@/data/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const facts = [
  { label: "Founded", value: "2024" },
  { label: "Projects delivered", value: "50+" },
  { label: "Brands served", value: "30+" },
];

export default function About() {
  const founder = siteConfig.founder;

  return (
    <section id="about" className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 h-[380px] w-[560px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[420px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)" }}
      />
      {/* Faded dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal>
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
            About the Studio
          </span>
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <KineticText
            text="Code, design & AI — under one roof"
            as="h2"
            speed="medium"
            className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          />
        </ScrollReveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: studio information */}
          <div>
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <p className="max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
                {siteConfig.name} is a creative technology studio that helps brands build bold
                digital products, automate complex workflows, and grow with strategy — all under
                one roof. From bold visuals to intelligent systems, we craft digital experiences
                that turn heads and drive results.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.25}>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/35">
                No hand-offs between five different vendors. Strategy, design, development, AI,
                and growth live in one place — so the vision that starts on day one survives all
                the way to launch day.
              </p>
            </ScrollReveal>

            {/* Quick facts */}
            <ScrollReveal variant="fadeUp" delay={0.35}>
              <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-2xl border border-white/[0.06] bg-[#111111] px-4 py-4 text-center transition-colors duration-300 hover:border-[#A78BFA]/30"
                  >
                    <p className="text-xl font-bold text-white sm:text-2xl">{f.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-white/35">{f.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.45}>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] transition-colors hover:text-[#C4B5FD]"
              >
                More about the studio <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right: founder card */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111111] p-7 sm:p-9"
            >
              {/* Corner accents */}
              <div className="pointer-events-none absolute top-0 left-0 h-14 w-14 border-t border-l border-[#A78BFA]/25 rounded-tl-3xl" />
              <div className="pointer-events-none absolute right-0 bottom-0 h-14 w-14 border-r border-b border-[#60A5FA]/25 rounded-br-3xl" />

              <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" /> Founder
              </span>

              <div className="flex items-center gap-4">
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-[0_10px_30px_-10px_rgba(167,139,250,0.6)]"
                  style={{ background: "linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)" }}
                  aria-hidden
                >
                  RP
                </span>
                <div>
                  <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {founder.name}
                  </p>
                  <p className="text-sm text-[#A78BFA]">{founder.role}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-white/45">{founder.bio}</p>

              {/* Focus tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Signature line */}
              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4">
                <p className="text-sm italic leading-relaxed text-white/50">
                  “Every project we ship gets the founder's hands on it — from the first
                  wireframe to launch day.”
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
