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
    <footer className="border-t border-stone-200/60 bg-white px-6 pt-16 pb-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Large statement */}
        <div className="mb-14">
          <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Let&apos;s build something great.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="mb-3 text-base font-semibold text-stone-900">
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
                    className="text-sm text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
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
                    className="text-sm text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {s.title}
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
                    className="text-sm text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {l.label}
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
