import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

/* Liquid link with fluid distortion on hover */
function LiquidNavLink({
  to,
  href,
  onClick,
  children,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <span className="group relative inline-block cursor-pointer">
      <span
        className="inline-block transition-all duration-300"
        style={{
          filter: hovered ? "url(#fluid-distort-hover)" : "none",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          color: hovered ? "#A78BFA" : undefined,
        }}
      >
        {children}
      </span>
      {/* Liquid underline — morphs into place */}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-[#A78BFA]"
        animate={{
          width: hovered ? "100%" : "0%",
          opacity: hovered ? 0.7 : 0,
          scaleX: hovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </span>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="text-[13px] font-medium text-white/50 transition-colors hover:text-white"
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-[13px] font-medium text-white/50 transition-colors hover:text-white"
    >
      {inner}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Logo />

            {/* Desktop nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <LiquidNavLink key={link.href} to={link.href}>
                    {link.label}
                  </LiquidNavLink>
                ) : (
                  <LiquidNavLink key={link.href} href={link.href}>
                    {link.label}
                  </LiquidNavLink>
                ),
              )}
            </div>

            {/* CTA */}
            <div className="hidden items-center gap-5 md:flex">
              <motion.a
                href="#contact"
                className="group relative inline-flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[13px] font-medium text-white/80 backdrop-blur-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Liquid blob that follows cursor */}
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#A78BFA]/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ filter: "blur(12px)" }}
                />
                <span className="relative z-10">Book a call</span>
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 flex items-center justify-center md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl md:hidden"
          >
            {/* Gooey blob background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ filter: "url(#gooey)" }}>
              <motion.div
                className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-[#A78BFA]/10"
                animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.2, 0.9, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-1/4 bottom-1/3 h-36 w-36 rounded-full bg-[#60A5FA]/10"
                animate={{ x: [0, -25, 15, 0], y: [0, 20, -10, 0], scale: [1, 0.9, 1.15, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-medium text-white/70 transition-colors hover:text-[#A78BFA]"
                      style={{ filter: "url(#liquid-ripple)" }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-medium text-white/70 transition-colors hover:text-[#A78BFA]"
                      style={{ filter: "url(#liquid-ripple)" }}
                    >
                      {link.label}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-md"
                  style={{ filter: "url(#liquid-ripple)" }}
                >
                  Book a call
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
