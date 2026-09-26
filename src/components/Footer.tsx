import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { socialLinks } from "@/data/siteContent";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Logo from "@/components/Logo";
import { AvailabilityDot } from "@/components/AvailabilityBadge";

const footerNav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Projects", href: "#portfolio" },
  { label: "Creative Lab", href: "#creative-lab" },
  { label: "Contact", href: "#contact" },
];

/* Liquid footer link with fluid distortion */
function LiquidFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const isRoute = href.startsWith("/");
  const Tag = isRoute ? "a" : "a";
  return (
    <Tag
      href={href}
      className="group inline-flex items-center text-sm text-white/35 transition-colors hover:text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="transition-all duration-300"
        style={{
          filter: hovered ? "url(#fluid-distort-hover)" : "none",
          color: hovered ? "#A78BFA" : undefined,
        }}
      >
        {children}
      </span>
      <span className="ml-0 h-px w-0 bg-[#A78BFA] transition-all duration-300 group-hover:ml-1 group-hover:w-2" />
    </Tag>
  );
}

export default function Footer() {
  const activeSocials = socialLinks.filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A] px-6 pt-16 pb-8 lg:px-10">
      {/* Liquid blob accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ filter: "url(#liquid-morph)" }}>
        <div className="absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#A78BFA]/[0.04]" />
        <div className="absolute top-10 right-[10%] h-48 w-48 rounded-full bg-[#60A5FA]/[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Brand row */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <Logo />
          <div className="flex items-center gap-2.5">
            <AvailabilityDot />
            <span className="text-sm text-white/40">Available for Projects</span>
          </div>
        </div>

        {/* Large animated statement with liquid distortion */}
        <div className="mb-14">
          <ScrollReveal>
            <p className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              LET&apos;S BUILD{" "}
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
                SOMETHING GREAT.
              </motion.span>
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/25 uppercase">Studio</p>
              <p className="text-sm leading-relaxed text-white/35">
                Building digital experiences where technology, AI and creativity meet.
              </p>
              <p className="mt-4 text-sm text-white/30">{siteConfig.email}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/25 uppercase">Explore</p>
              <ul className="space-y-2.5">
                {footerNav.map((l) => (
                  <li key={l.label}>
                    <LiquidFooterLink href={l.href}>{l.label}</LiquidFooterLink>
                  </li>
                ))}
                <li>
                  <LiquidFooterLink href="/booking">Book a Session</LiquidFooterLink>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/25 uppercase">Services</p>
              <ul className="space-y-2.5">
                {services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <LiquidFooterLink href="#services">{s.title}</LiquidFooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.25}>
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/25 uppercase">Connect</p>
              <ul className="space-y-2.5">
                {activeSocials.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-white/35 transition-colors hover:text-white"
                    >
                      {l.label}
                      <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-xs text-white/20">Designed &amp; Built with AI + Code + Creativity.</p>
        </div>
      </div>
    </footer>
  );
}
