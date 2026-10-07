import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import KineticText from "@/components/motion/KineticText";
import MagneticButton from "@/components/motion/MagneticButton";

const projectTypes = [
  "Website", "AI Chatbot", "AI Application", "Automation", "UI/UX",
  "Branding", "Motion Design", "Video", "Digital Marketing", "Social Media", "Other",
];

const budgetRanges = [
  "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      {/* Subtle background orb */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)" }} />

      {/* ── Background art ───────────────────────────────── */}
      {/* Dot-grid texture, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(75% 65% at 50% 45%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(75% 65% at 50% 45%, black 0%, transparent 100%)",
        }}
      />
      {/* Drifting color orbs (site palette) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-0 h-[420px] w-[420px] rounded-full bg-[#A78BFA]/20 blur-[110px]"
        animate={{ x: [0, 70, -20, 0], y: [0, 50, -30, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[#60A5FA]/15 blur-[110px]"
        animate={{ x: [0, -60, 40, 0], y: [0, -40, 30, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-10 h-[340px] w-[340px] rounded-full bg-[#F472B6]/12 blur-[100px]"
        animate={{ x: [0, -50, 20, 0], y: [0, -30, -60, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Slowly rotating dashed orbit rings */}
      <motion.svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -left-20 bottom-12 h-[300px] w-[300px] text-[#A78BFA]/30 sm:h-[380px] sm:w-[380px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 9" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 7" />
        <circle cx="194" cy="100" r="2.2" fill="currentColor" />
        <circle cx="100" cy="30" r="1.6" fill="currentColor" />
      </motion.svg>
      {/* Twinkling sparkles */}
      {[
        { top: "18%", left: "46%", delay: 0, color: "#A78BFA" },
        { top: "62%", left: "12%", delay: 1.4, color: "#60A5FA" },
        { top: "34%", left: "88%", delay: 2.6, color: "#F472B6" },
      ].map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute select-none text-xs"
          style={{ top: s.top, left: s.left, color: s.color }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          ✦
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <ScrollReveal>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">Contact</span>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <KineticText
                text="Have an idea? Let&apos;s make it real."
                as="h2"
                speed="medium"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              />
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
                Whether you need a website, an AI tool, a brand overhaul, a video,
                or a full marketing strategy — drop us a message and we&apos;ll
                get back to you within 24 hours.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="mt-8 flex flex-col gap-3">
                <a href="/booking" className="inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] transition-colors hover:text-[#C4B5FD]">
                  Or book a session directly <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal variant="fadeUp" delay={0.15}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-[#111111] p-10 text-center"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                  <CheckCircle2 className="mb-4 h-10 w-10 text-[#2DD4BF]" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">Message received.</h3>
                <p className="mt-2 text-sm text-white/40">We&apos;ll be in touch soon. Let&apos;s create something amazing.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111111] p-6 sm:p-8"
              >
                {/* Auto-shifting gradient backdrop (site palette: violet → sky → pink → orange) */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(130deg, #A78BFA 0%, #60A5FA 22%, #F472B6 46%, #FB923C 70%, #A78BFA 100%)",
                    backgroundSize: "300% 300%",
                    opacity: 0.3,
                    transform: "translateZ(0)",
                    willChange: "background-position",
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
                {/* Faint dot-grid texture inside the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    opacity: 0.5,
                  }}
                />
                {/* Soft scrim so labels, inputs and button stay readable over the gradient */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 50% 50%, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0.6) 100%)",
                  }}
                />
                {/* Periodic light sheen sweeping across the card */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)",
                  }}
                  animate={{ x: [0, 520] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                />
                <div className="relative z-10 grid gap-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/40">Name</label>
                    <input id="name" name="name" required placeholder="Your name"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA] focus:bg-white/[0.05]" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/40">Email</label>
                    <input id="email" name="email" type="email" required placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA] focus:bg-white/[0.05]" />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="mb-1.5 block text-xs font-medium text-white/40">Project Type</label>
                    <select id="projectType" name="projectType" required
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#A78BFA]">
                      <option value="" className="bg-[#111111]">Select a project type</option>
                      {projectTypes.map((t) => <option key={t} value={t} className="bg-[#111111]">{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-xs font-medium text-white/40">Budget Range</label>
                    <select id="budget" name="budget"
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#A78BFA]">
                      <option value="" className="bg-[#111111]">Select budget range</option>
                      {budgetRanges.map((b) => <option key={b} value={b} className="bg-[#111111]">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/40">Project Details</label>
                    <textarea id="message" name="message" rows={4} required placeholder="Tell us about your project, goals, and timeline…"
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]" />
                  </div>
                </div>
                <div className="relative z-10 mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                    ) : (
                      <>Send Project Inquiry <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
