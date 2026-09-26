import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Code2,
  Sparkles,
  Workflow,
  Palette,
  Braces,
  Bot,
} from "lucide-react";

/**
 * Interactive hero visual: floating glass cards, AI nodes, code snippets and
 * automation chips arranged around a large liquid gradient orb. The whole
 * composition parallaxes with scroll and reacts subtly to mouse movement.
 */

function useMouseParallax(strength = 1) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx * 40 * strength);
    my.set(ny * 40 * strength);
  };

  return { ref, sx, sy, onMouseMove };
}

function GlassCard({
  className,
  depth,
  sx,
  sy,
  children,
}: {
  className?: string;
  depth: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute ${className ?? ""}`}
    >
      <motion.div
        animate={{ y: [0, -10, 6, 0] }}
        transition={{ duration: 6 + depth, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function CodeChip() {
  return (
    <div className="font-mono text-[10px] leading-relaxed">
      <div className="flex gap-1.5 pb-2">
        <span className="h-2 w-2 rounded-full bg-[#F87171]/70" />
        <span className="h-2 w-2 rounded-full bg-[#FBBF24]/70" />
        <span className="h-2 w-2 rounded-full bg-[#34D399]/70" />
      </div>
      <p><span className="text-[#C084FC]">const</span> <span className="text-white">idea</span> <span className="text-white/30">=</span> <span className="text-[#60A5FA]">await</span> <span className="text-[#A78BFA]">build</span><span className="text-white/40">(</span><span className="text-[#2DD4BF]">"your-vision"</span><span className="text-white/40">)</span></p>
      <p><span className="text-[#C084FC]">return</span> <span className="text-white/40">&#123;</span> <span className="text-white">ship</span><span className="text-white/30">:</span> <span className="text-[#34D399]">true</span> <span className="text-white/40">&#125;</span></p>
    </div>
  );
}

function AINode() {
  const nodes = [
    { x: 16, y: 20 },
    { x: 60, y: 8 },
    { x: 96, y: 34 },
    { x: 30, y: 64 },
    { x: 78, y: 72 },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [1, 3]];

  return (
    <div className="relative h-20 w-28">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 112 80">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(167,139,250,0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{ strokeDashoffset: [0, -12] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={3}
            fill={i === 2 ? "#A78BFA" : "#60A5FA"}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

const chips = [
  { icon: Workflow, label: "n8n · Zapier", color: "#2DD4BF" },
  { icon: Bot, label: "AI Agents", color: "#60A5FA" },
  { icon: Palette, label: "Design Systems", color: "#F472B6" },
  { icon: Sparkles, label: "Generative AI", color: "#A78BFA" },
  { icon: Braces, label: "TypeScript", color: "#3B82F6" },
];

function TechChip({
  icon: Icon,
  label,
  color,
  className,
  depth,
  sx,
  sy,
}: {
  icon: typeof Workflow;
  label: string;
  color: string;
  className: string;
  depth: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5 + depth * 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#111111]/80 px-3 py-1.5 backdrop-blur-md"
        style={{ boxShadow: `0 0 20px ${color}14` }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <span className="text-[11px] font-medium text-white/60">{label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroVisual() {
  const { ref, sx, sy, onMouseMove } = useMouseParallax();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollDrift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="pointer-events-none relative mx-auto h-[420px] max-w-3xl select-none sm:h-[460px]"
      >
        {/* Large animated liquid gradient orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "conic-gradient(from 90deg, rgba(167,139,250,0.16), rgba(59,130,246,0.12), rgba(236,72,153,0.10), rgba(45,212,191,0.10), rgba(167,139,250,0.16))",
            y: scrollDrift,
          }}
          animate={{
            scale: [1, 1.12, 0.96, 1.06, 1],
            rotate: [0, 12, -6, 4, 0],
            borderRadius: [
              "50%",
              "46% 54% 52% 48% / 52% 46% 54% 48%",
              "52% 48% 55% 45% / 47% 53% 47% 53%",
              "50%",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Core glow */}
        <div
          className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Floating glass cards */}
        <GlassCard className="top-[8%] left-[2%] w-44 sm:w-52" depth={1.4} sx={sx} sy={sy}>
          <div className="mb-2 flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-[#A78BFA]" />
            <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
              build.ts
            </span>
          </div>
          <CodeChip />
        </GlassCard>

        <GlassCard className="top-[16%] right-[0%] w-40 sm:w-44" depth={0.8} sx={sx} sy={sy}>
          <div className="mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
            <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
              AI Network
            </span>
          </div>
          <AINode />
        </GlassCard>

        <GlassCard className="bottom-[14%] left-[8%] w-48 sm:w-56" depth={1.1} sx={sx} sy={sy}>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
              Automation
            </span>
            <span className="rounded-full bg-[#2DD4BF]/10 px-2 py-0.5 text-[9px] font-semibold text-[#2DD4BF]">
              RUNNING
            </span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Lead captured", pct: 100, color: "#2DD4BF" },
              { label: "AI qualified", pct: 72, color: "#60A5FA" },
              { label: "Follow-up sent", pct: 38, color: "#A78BFA" },
            ].map((row, i) => (
              <div key={row.label}>
                <div className="mb-1 flex justify-between text-[9px] text-white/35">
                  <span>{row.label}</span>
                  <span>{row.pct}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: row.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="right-[6%] bottom-[20%] w-36 sm:w-40" depth={1.6} sx={sx} sy={sy}>
          <div className="flex items-center gap-2.5">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#60A5FA]"
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="h-4.5 w-4.5 text-white" style={{ width: 18, height: 18 }} />
            </motion.div>
            <div>
              <p className="text-[11px] font-semibold text-white">AI Assistant</p>
              <p className="flex items-center gap-1 text-[9px] text-white/35">
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#34D399]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Online now
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Floating tech chips */}
        <TechChip icon={chips[0].icon} label={chips[0].label} color={chips[0].color} className="top-[4%] left-[38%] hidden sm:block" depth={0.5} sx={sx} sy={sy} />
        <TechChip icon={chips[2].icon} label={chips[2].label} color={chips[2].color} className="bottom-[2%] right-[34%] hidden sm:block" depth={0.6} sx={sx} sy={sy} />
        <TechChip icon={chips[3].icon} label={chips[3].label} color={chips[3].color} className="top-[42%] left-[-4%] hidden lg:block" depth={0.9} sx={sx} sy={sy} />
        <TechChip icon={chips[4].icon} label={chips[4].label} color={chips[4].color} className="top-[40%] right-[-3%] hidden lg:block" depth={1.3} sx={sx} sy={sy} />
      </div>
    </section>
  );
}
