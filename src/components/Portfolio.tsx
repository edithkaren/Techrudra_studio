import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioProjects,
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import CardTilt from "@/components/motion/CardTilt";

const accentColors: Record<string, string> = {
  Websites: "#A78BFA", AI: "#60A5FA", Branding: "#FB923C",
  Video: "#F87171", Marketing: "#2DD4BF",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Diagonal wave across the 3-col grid: per-column delay + slight row offset */
const waveDelay = (i: number) => (i % 3) * 0.14 + Math.floor(i / 3) * 0.08;

interface Choreo {
  header: Variants;
  letters: Variants;
  letter: Variants;
  words: Variants;
  word: Variants;
  rule: Variants;
  pills: Variants;
  pill: Variants;
  card: Variants;
  media: Variants;
  mock: Variants;
  item: Variants;
  tags: Variants;
  tag: Variants;
  exitCard: TargetAndTransition;
}

function buildChoreography(reduced: boolean): Choreo {
  if (reduced) {
    const fade: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    };
    const group: Variants = { hidden: {}, visible: {} };
    return {
      header: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } },
      letters: group,
      letter: fade,
      words: group,
      word: fade,
      rule: fade,
      pills: group,
      pill: fade,
      card: {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
          opacity: 1,
          transition: { duration: 0.5, delay: (i % 3) * 0.08, staggerChildren: 0.04 },
        }),
      },
      media: fade,
      mock: group,
      item: fade,
      tags: group,
      tag: fade,
      exitCard: { opacity: 0, transition: { duration: 0.2 } },
    };
  }

  return {
    header: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
    },
    /* Eyebrow letters rise out of an invisible mask, one by one */
    letters: { hidden: {}, visible: { transition: { staggerChildren: 0.035 } } },
    letter: {
      hidden: { y: "115%", rotate: 8 },
      visible: { y: "0%", rotate: 0, transition: { duration: 0.65, ease: EASE } },
    },
    /* Heading words slide up from behind a clip line with a slight tilt */
    words: { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } },
    word: {
      hidden: { y: "112%", rotate: 4 },
      visible: { y: "0%", rotate: 0, transition: { duration: 0.85, ease: EASE } },
    },
    /* Accent rule draws itself across */
    rule: {
      hidden: { scaleX: 0, opacity: 0 },
      visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } },
    },
    pills: { hidden: {}, visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } },
    pill: {
      hidden: { opacity: 0, y: 16, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 420, damping: 26 },
      },
    },
    /* Card shell drifts up out of a blur, then cascades its children */
    card: {
      hidden: { opacity: 0, y: 64, scale: 0.96, filter: "blur(8px)" },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { delay: waveDelay(i), duration: 0.7, ease: EASE, staggerChildren: 0.09 },
      }),
    },
    /* Media frame opens like a camera aperture… */
    media: {
      hidden: { clipPath: "inset(14% 7% 14% 7% round 28px)" },
      visible: {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        transition: { duration: 1.05, ease: EASE },
      },
    },
    /* …while the mockup counter-zooms settle into place */
    mock: {
      hidden: { scale: 1.18 },
      visible: { scale: 1, transition: { duration: 1.15, ease: EASE } },
    },
    item: {
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    },
    tags: { hidden: {}, visible: { transition: { staggerChildren: 0.045 } } },
    tag: {
      hidden: { opacity: 0, y: 10, scale: 0.92 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
    },
    exitCard: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.3, ease: "easeIn" } },
  };
}

function FilterPill({
  label,
  active,
  onClick,
  enter,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  enter: Variants;
}) {
  return (
    <motion.button
      onClick={onClick}
      variants={enter}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
        active
          ? "border-[#A78BFA] bg-[#A78BFA] text-black"
          : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/60"
      }`}
    >
      {label}
    </motion.button>
  );
}

/* Liquid title that warps on hover */
function LiquidProjectTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ filter: hovered ? "url(#fluid-distort-hover)" : "none" }}
    >
      <span className="inline-block transition-colors duration-300" style={{ color: hovered ? accent : undefined }}>
        {children}
      </span>
    </span>
  );
}

function ProjectCard({
  project,
  index,
  choreo,
}: {
  project: (typeof portfolioProjects)[0];
  index: number;
  choreo: Choreo;
}) {
  const isLarge = project.featured && index % 3 === 0;
  const accent = accentColors[project.category] || "#A78BFA";

  return (
    <motion.div
      layout
      custom={index}
      variants={choreo.card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      exit={choreo.exitCard}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] transition-[border-color,box-shadow] duration-500 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-[#A78BFA]/[0.04] ${
        isLarge ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <a href={`/portfolio/${project.slug}`} className="block">
        <motion.div
          variants={choreo.media}
          className={`relative overflow-hidden bg-[#0D0D0D] ${isLarge ? "p-6 sm:p-8" : "p-4 sm:p-5"}`}
        >
          <motion.div variants={choreo.mock} className="will-change-transform">
            <CardTilt maxTilt={3} scale={1.01}>
              <ProjectMockup projectSlug={project.slug} category={project.category} />
            </CardTilt>
          </motion.div>
          <div className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: accent }} />
          {/* Liquid gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 80%, ${accent}15 0%, transparent 60%), linear-gradient(to top, #11111190 0%, transparent 50%)`,
            }}
          />
          <div className="absolute right-5 bottom-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
            <ArrowUpRight className="h-4 w-4 text-white/70" />
          </div>
        </motion.div>
        <div className="p-5 sm:p-6">
          <motion.div variants={choreo.item} className="mb-2 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{project.category}</span>
            <span className="text-[11px] text-white/10">&middot;</span>
            <span className="text-[11px] text-white/25">{project.year}</span>
          </motion.div>
          <motion.h3 variants={choreo.item} className="mb-2 text-base font-semibold text-white sm:text-lg">
            <LiquidProjectTitle accent={accent}>{project.title}</LiquidProjectTitle>
          </motion.h3>
          <motion.p variants={choreo.item} className="mb-4 text-sm leading-relaxed text-white/35">{project.description}</motion.p>
          <motion.div variants={choreo.tags} className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <motion.span key={t} variants={choreo.tag} className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/30">{t}</motion.span>
            ))}
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory>("All");
  const reduce = useReducedMotion() ?? false;
  const choreo = useMemo(() => buildChoreography(reduce), [reduce]);
  const filtered = active === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header choreography: letters → words → drawn rule */}
        <motion.div
          variants={choreo.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 max-w-2xl"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
            <motion.span variants={choreo.letters} className="inline-flex" aria-hidden="true">
              {"PORTFOLIO".split("").map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span variants={choreo.letter} className="inline-block will-change-transform">
                    {ch}
                  </motion.span>
                </span>
              ))}
            </motion.span>
            <span className="sr-only">Portfolio</span>
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <motion.span variants={choreo.words} className="inline-flex flex-wrap">
              {["Selected", "work"].map((w) => (
                <span key={w} className="inline-block overflow-hidden pb-1 pr-[0.28em] last:pr-0">
                  <motion.span variants={choreo.word} className="inline-block will-change-transform">
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h2>
          <motion.div
            variants={choreo.rule}
            className="mt-6 h-px w-28 origin-left bg-gradient-to-r from-[#A78BFA] to-transparent"
          />
        </motion.div>

        {/* Filter pills spring in one after another */}
        <motion.div
          variants={choreo.pills}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {portfolioCategories.map((cat) => (
            <FilterPill key={cat} label={cat} active={active === cat} onClick={() => setActive(cat)} enter={choreo.pill} />
          ))}
        </motion.div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} choreo={choreo} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
