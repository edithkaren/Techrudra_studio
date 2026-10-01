import { motion } from "framer-motion";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ParticleText from "@/components/ParticleText";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      {/* Ambient glow behind the particle text */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, rgba(212,184,150,0.06) 45%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal>
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
            Our Vision
          </span>
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-white/35">
            One guiding idea shapes everything we build at Techrudra.Studio —
            hover over it and watch it come alive.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.06] bg-[#09090f]"
        >
          {/* Subtle corner accents */}
          <div className="pointer-events-none absolute top-0 left-0 h-16 w-16 border-t border-l border-[#A78BFA]/20 rounded-tl-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-16 w-16 border-r border-b border-[#D4B896]/20 rounded-br-3xl" />

          <div className="h-[280px] w-full sm:h-[340px]">
            <ParticleText
              text="Simple. Accessible. Intelligent."
              particleSize={2}
              density={4}
              color="#F5F1EA"
              highlightColor="#8B5CF6"
              scatter={200}
              gatherDuration={1700}
              stagger={420}
              pointerRepel={48}
              repelRadius={130}
              idleDrift={0.7}
              trigger="hover"
              fontSize="clamp(2rem, 7vw, 5.2rem)"
              fontWeight={800}
              glow
            />
          </div>

          {/* Vision statement below the particles */}
          <div className="relative z-10 -mt-2 px-6 pb-8 text-center">
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-white/70 sm:text-lg">
              To make everyday complexities simple, accessible, and intelligent.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
