import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";

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
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A] px-6 pt-16 pb-8 lg:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Large animated statement */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something{" "}
            <motion.span
              className="inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundSize: "200% 200%",
                background: "linear-gradient(135deg, #A78BFA, #60A5FA, #F472B6, #FB923C, #A78BFA)",
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
            <p className="mb-3 text-base font-bold text-white">{siteConfig.name}</p>
            <p className="text-sm leading-relaxed text-white/35">{siteConfig.description}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/20">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex text-sm text-white/35 transition-colors hover:text-white"
                  >
                    {l.label}
                    <span className="ml-0 h-px w-0 bg-[#A78BFA] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/booking"
                  className="group inline-flex text-sm text-white/35 transition-colors hover:text-white"
                >
                  Book a Session
                  <span className="ml-0 h-px w-0 bg-[#A78BFA] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/20">
              Services
            </p>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="group inline-flex text-sm text-white/35 transition-colors hover:text-white"
                  >
                    {s.title}
                    <span className="ml-0 h-px w-0 bg-[#A78BFA] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/20">
              Connect
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-white/35 transition-colors hover:text-white"
                  >
                    {l.label}
                    <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/30">{siteConfig.email}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Designed &amp; built with code, AI &amp; creativity.
          </p>
        </div>
      </div>
    </footer>
  );
}
