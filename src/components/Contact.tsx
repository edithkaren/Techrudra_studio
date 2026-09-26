import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import KineticText from "@/components/motion/KineticText";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { siteConfig } from "@/data/site";

const projectTypes = [
  "Website", "AI Chatbot", "AI Application", "Automation", "UI/UX",
  "Branding", "Motion Design", "Video", "Digital Marketing", "Social Media", "Other",
];

const budgetRanges = [
  "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+",
];

const timelines = ["ASAP", "1–2 Weeks", "1 Month", "1–3 Months", "Flexible"];

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

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Left: copy */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">Contact</span>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <KineticText
                text="Let's build something together."
                as="h2"
                speed="medium"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              />
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
                Have an idea, product, automation or brand that needs to become real?
                Drop a message and I&apos;ll get back to you within 24 hours.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="mt-8">
                <AvailabilityBadge variant="card" className="max-w-sm" />
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <div className="mt-6 flex flex-col gap-3">
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] transition-colors hover:text-[#C4B5FD]">
                  {siteConfig.email}
                </a>
                <a href="/booking" className="inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70">
                  Or book a session directly <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal variant="fadeUp" delay={0.15} className="lg:col-span-3">
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
                className="rounded-3xl border border-white/[0.06] bg-[#111111] p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
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
                    <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-white/40">Company <span className="text-white/20">(optional)</span></label>
                    <input id="company" name="company" placeholder="Company / brand"
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
                    <label htmlFor="timeline" className="mb-1.5 block text-xs font-medium text-white/40">Timeline</label>
                    <select id="timeline" name="timeline"
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#A78BFA]">
                      <option value="" className="bg-[#111111]">Select timeline</option>
                      {timelines.map((t) => <option key={t} value={t} className="bg-[#111111]">{t}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/40">Project Details</label>
                    <textarea id="message" name="message" rows={4} required placeholder="Tell me about your project, goals, and what success looks like…"
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]" />
                  </div>
                </div>
                <div className="mt-6">
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
