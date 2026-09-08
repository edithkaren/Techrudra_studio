import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { NoiseOverlay } from "@/components/AnimatedBackground";

const footerNav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "GitHub", href: siteConfig.social.github },
  { label: "YouTube", href: siteConfig.social.youtube },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-stone-200/60 bg-white px-6 pt-16 pb-8 lg:px-10">
      <NoiseOverlay opacity={0.015} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Large animated statement */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something{" "}
            <motion.span
              className="inline-block text-gradient-violet"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundSize: "200% 200%",
                background:
                  "linear-gradient(135deg, #6C3AED, #3B82F6, #EC4899, #FB923C, #6C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              great.
            </motion.span>
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="mb-3 text-base font-bold text-stone-900">
              {siteConfig.name}
            </p>
            <p className="text-sm leading-relaxed text-stone-500">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-stone-500">
                Available for projects
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex text-sm text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {l.label}
                    <span className="ml-0 h-px w-0 bg-[#6C3AED] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/booking"
                  className="group inline-flex text-sm text-stone-500 transition-colors hover:text-stone-900"
                >
                  Book a Session
                  <span className="ml-0 h-px w-0 bg-[#6C3AED] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Services
            </p>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="group inline-flex text-sm text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {s.title}
                    <span className="ml-0 h-px w-0 bg-[#6C3AED] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Connect
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {l.label}
                    <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-500">{siteConfig.email}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-stone-200/60 pt-8 sm:flex-row">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-stone-400">
            Designed &amp; built with code, AI &amp; creativity.
          </p>
        </div>
      </div>
    </footer>
  );
}
