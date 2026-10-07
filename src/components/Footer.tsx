import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Logo from "@/components/Logo";

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

/* Column accent colors — one per footer section */
const NAV_ACCENT = "#A78BFA"; // violet
const SERVICES_ACCENT = "#60A5FA"; // sky blue
const CONNECT_ACCENT = "#F472B6"; // pink

/* Liquid footer link with fluid distortion */
function LiquidFooterLink({
  href,
  children,
  accent = NAV_ACCENT,
}: {
  href: string;
  children: React.ReactNode;
  accent?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="group inline-flex items-center text-sm"
      style={{ color: accent }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="transition-all duration-300"
        style={{
          filter: hovered ? "url(#fluid-distort-hover)" : "none",
          color: hovered ? "#FFFFFF" : accent,
        }}
      >
        {children}
      </span>
      <span
        className="ml-0 h-px w-0 transition-all duration-300 group-hover:ml-1 group-hover:w-2"
        style={{ backgroundColor: accent }}
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A] px-6 pt-20 pb-10 lg:px-10 lg:pt-24">
      {/* Liquid blob accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ filter: "url(#liquid-morph)" }}>
        <div className="absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#A78BFA]/[0.04]" />
        <div className="absolute top-10 right-[10%] h-48 w-48 rounded-full bg-[#60A5FA]/[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Large animated statement with liquid distortion */}
        <div className="mb-16 lg:mb-20">
          <ScrollReveal>
            <p className="text-3xl leading-[1.2] font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Let&apos;s build something{" "}
              <motion.span
                className="inline-block will-change-[background-position]"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  /* shorthand FIRST — later keys override it, so backgroundSize
                     must come after `background` or it gets reset to auto and
                     the clipped text paints partially transparent. */
                  background:
                    "linear-gradient(135deg, #A78BFA, #60A5FA, #F472B6, #FB923C, #A78BFA)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transform: "translateZ(0)",
                }}
              >
                great.
              </motion.span>
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <Logo size="lg" className="mb-4" />
              <div
                className="mb-4 h-px w-20"
                style={{ background: "linear-gradient(90deg, #A78BFA, #60A5FA, transparent)" }}
              />
              <p className="mb-5 text-sm leading-relaxed text-white/75">{siteConfig.description}</p>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/25 bg-[#A78BFA]/[0.08] px-3.5 py-1.5 text-sm font-medium text-[#CDBBFF]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A78BFA] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A78BFA]" />
                </span>
                {siteConfig.email}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: NAV_ACCENT }}
              >
                Navigation
              </p>
              <div
                className="mb-4 h-px w-10"
                style={{ background: `linear-gradient(90deg, ${NAV_ACCENT}, transparent)` }}
              />
              <ul className="space-y-2.5">
                {footerNav.map((l) => (
                  <li key={l.href}>
                    <LiquidFooterLink href={l.href} accent={NAV_ACCENT}>
                      {l.label}
                    </LiquidFooterLink>
                  </li>
                ))}
                <li>
                  <LiquidFooterLink href="/booking" accent={NAV_ACCENT}>
                    Book a Session
                  </LiquidFooterLink>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: SERVICES_ACCENT }}
              >
                Services
              </p>
              <div
                className="mb-4 h-px w-10"
                style={{ background: `linear-gradient(90deg, ${SERVICES_ACCENT}, transparent)` }}
              />
              <ul className="space-y-2.5">
                {services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <LiquidFooterLink href="#services" accent={SERVICES_ACCENT}>
                      {s.title}
                    </LiquidFooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.25}>
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: CONNECT_ACCENT }}
              >
                Connect
              </p>
              <div
                className="mb-4 h-px w-10"
                style={{ background: `linear-gradient(90deg, ${CONNECT_ACCENT}, transparent)` }}
              />
              <ul className="space-y-2.5">
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-[#F472B6] transition-colors hover:text-white"
                    >
                      {l.label}
                      <span
                        className="translate-x-0 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        style={{ color: CONNECT_ACCENT }}
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/55">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              to="/terms"
              className="text-xs text-white/55 transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-xs text-white/55 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <p className="text-xs text-white/55">
              Designed &amp; built with code, AI &amp; creativity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
