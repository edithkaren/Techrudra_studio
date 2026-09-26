import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { labExperiments, serviceSelectorOptions } from "@/data/homepage";
import ScrollReveal from "@/components/motion/ScrollReveal";
import KineticText from "@/components/motion/KineticText";
import MagneticButton from "@/components/motion/MagneticButton";

/* ── Particle canvas reacting to cursor ───────────────────────── */

function LabParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 30 : 70;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: -999, y: -999 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    canvas.parentElement?.addEventListener("mousemove", onMove);
    canvas.parentElement?.addEventListener("mouseleave", onLeave);

    interface P {
      x: number; y: number; vx: number; vy: number;
      r: number; hue: number;
    }
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.8,
      hue: 250 + Math.random() * 70,
    }));

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        // Cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0.1) {
          const force = ((120 - dist) / 120) * 0.35;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.35)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* ── Floating experiment cards ────────────────────────────────── */

function FloatingCard({
  exp,
  index,
}: {
  exp: (typeof labExperiments)[0];
  index: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: exp.x, top: exp.y }}
      animate={{
        y: [0, -12 - (index % 3) * 4, 8, 0],
        x: [0, 6 * (index % 2 === 0 ? 1 : -1), -4, 0],
      }}
      transition={{
        duration: 7 + index * 0.9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08, zIndex: 20 }}
    >
      <div
        className="rounded-2xl border bg-[#111111]/85 p-4 backdrop-blur-md transition-colors"
        style={{ borderColor: `${exp.color}30` }}
      >
        <p className="text-xs font-bold tracking-wide uppercase" style={{ color: exp.color }}>
          {exp.title}
        </p>
        <p className="mt-1 text-[10px] whitespace-nowrap text-white/35">
          {exp.description}
        </p>
        <div
          className="mt-2.5 h-0.5 w-8 rounded-full"
          style={{ backgroundColor: exp.color, opacity: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

/* ── 12. Creative Lab section ─────────────────────────────────── */

export function CreativeLab() {
  return (
    <section id="creative-lab" className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-[#A78BFA] uppercase">
                Creative Lab
              </span>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <KineticText
                text="Experiments at the intersection of AI, design and technology."
                as="h2"
                speed="medium"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              />
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              Explore Experiments
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </ScrollReveal>
        </div>

        {/* Interactive canvas + floating cards */}
        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="relative mt-10 h-[420px] overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0D0D0D]/60 sm:h-[460px]">
            <LabParticles />
            {labExperiments.map((exp, i) => (
              <FloatingCard key={exp.title} exp={exp} index={i} />
            ))}
            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.p
                className="text-[10px] font-semibold tracking-[0.35em] text-white/15 uppercase"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Move your cursor
              </motion.p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── 10. Interactive service selector ─────────────────────────── */

export function ServiceSelector() {
  const [active, setActive] = useState<string | null>(null);
  const selected = serviceSelectorOptions.find((o) => o.id === active) ?? null;

  return (
    <section id="selector" className="relative bg-[#0A0A0A] px-6 py-24 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <ScrollReveal>
            <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-[#A78BFA] uppercase">
              Interactive Consultation
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <KineticText
              text="What are you trying to build?"
              as="h2"
              speed="medium"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </ScrollReveal>
        </div>

        {/* Selectable cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {serviceSelectorOptions.map((opt) => {
            const isActive = active === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setActive(isActive ? null : opt.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center gap-2.5 rounded-2xl border p-5 text-center transition-all duration-300 ${
                  isActive
                    ? "border-[#A78BFA]/60 bg-[#A78BFA]/[0.08] shadow-[0_0_30px_rgba(167,139,250,0.15)]"
                    : "border-white/[0.06] bg-[#111111] hover:border-white/[0.15]"
                }`}
                aria-pressed={isActive}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-[#A78BFA]" : "text-white/60"
                  }`}
                >
                  {opt.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 grid gap-6 rounded-3xl border border-white/[0.08] bg-[#111111] p-7 sm:p-9 lg:grid-cols-2"
            >
              <div>
                <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                  What I can build
                </p>
                <ul className="space-y-2">
                  {selected.build.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#A78BFA]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 mb-3 text-[11px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                  Typical deliverables
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/50"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                  Recommended approach
                </p>
                <p className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 text-sm leading-relaxed text-white/50">
                  {selected.approach}
                </p>
                <p className="mt-6 mb-3 text-[11px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                  Relevant technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <MagneticButton
                  href="#contact"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 pt-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                >
                  <span className="mt-0 inline-flex items-center gap-2">
                    Start a Project <ArrowUpRight className="h-4 w-4" />
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
