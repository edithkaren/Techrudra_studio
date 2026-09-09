import { useState, useEffect, useRef } from "react";
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
                  <Link
                    key={link.href}
                    to={link.href}
                    className="group relative text-[13px] font-medium text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#A78BFA] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group relative text-[13px] font-medium text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#A78BFA] transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden items-center gap-5 md:flex">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[13px] font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                Book a call
              </a>
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
            <div className="relative flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) =>
                link.href.startsWith("/") ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-medium text-white/70 transition-colors hover:text-[#A78BFA]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="text-2xl font-medium text-white/70 transition-colors hover:text-[#A78BFA]"
                  >
                    {link.label}
                  </motion.a>
                )
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-md"
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
