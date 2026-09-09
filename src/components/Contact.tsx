import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const projectTypes = [
  "Website",
  "AI Chatbot",
  "AI Application",
  "Automation",
  "UI/UX",
  "Branding",
  "Motion Design",
  "Video",
  "Digital Marketing",
  "Social Media",
  "Other",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
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
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]"
            >
              Contact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Have an idea?
              <br />
              <span className="text-gradient-violet">Let&apos;s make it real.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-md text-sm leading-relaxed text-white/40"
            >
              Whether you need a website, an AI tool, a brand overhaul, a video,
              or a full marketing strategy — drop us a message and we&apos;ll
              get back to you within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col gap-3"
            >
              <a
                href="/booking"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] transition-colors hover:text-[#C4B5FD]"
              >
                Or book a session directly
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-[#111111] p-10 text-center">
                <CheckCircle2 className="mb-4 h-10 w-10 text-[#2DD4BF]" />
                <h3 className="text-xl font-semibold text-white">Message received.</h3>
                <p className="mt-2 text-sm text-white/40">
                  We&apos;ll be in touch soon. Let&apos;s create something amazing.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/[0.06] bg-[#111111] p-6 sm:p-8"
              >
                <div className="grid gap-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/40">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA] focus:bg-white/[0.05]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/40">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA] focus:bg-white/[0.05]"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="mb-1.5 block text-xs font-medium text-white/40">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#A78BFA]"
                    >
                      <option value="" className="bg-[#111111]">Select a project type</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-[#111111]">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-xs font-medium text-white/40">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#A78BFA]"
                    >
                      <option value="" className="bg-[#111111]">Select budget range</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} className="bg-[#111111]">{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/40">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your project, goals, and timeline…"
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                  ) : (
                    <>
                      Send Project Inquiry
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
