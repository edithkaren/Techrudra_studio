/**
 * Nexenity hero recreation — dark nebula backdrop with glowing wisps,
 * NEXENITY logo nav, "AFTERNOON / Good Afternoon, Thinker / DESKTOP" chip,
 * blue→purple gradient "BUILDING DIGITAL EXPERIENCES WORLDWIDE." headline,
 * and Start a Project / Explore My Work CTAs.
 */
export default function NexenityVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black font-sans">
      {/* Nebula wisps */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 90% at 15% 55%, rgba(180,170,160,0.35) 0%, transparent 55%), radial-gradient(ellipse 55% 85% at 85% 50%, rgba(180,170,160,0.3) 0%, transparent 55%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle 140px at 18% 40%, rgba(120,110,100,0.5) 0%, transparent 65%), radial-gradient(circle 150px at 82% 60%, rgba(120,110,100,0.45) 0%, transparent 65%)",
          filter: "blur(6px)",
        }}
      />
      {/* Star specks */}
      {[
        { l: "8%", t: "20%" }, { l: "22%", t: "65%" }, { l: "30%", t: "12%" },
        { l: "45%", t: "8%" }, { l: "60%", t: "15%" }, { l: "72%", t: "10%" },
        { l: "88%", t: "25%" }, { l: "92%", t: "70%" }, { l: "15%", t: "85%" },
        { l: "55%", t: "80%" },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute h-px w-px rounded-full bg-white/50"
          style={{ left: s.l, top: s.t }}
        />
      ))}

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-8">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">✦</span>
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-xs font-extrabold tracking-wide text-transparent">
            NEXENITY
          </span>
        </div>
        <div className="hidden items-center gap-3 text-[9px] font-medium text-white/80 sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Portfolio</span>
          <span>Contact</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-[8px] text-white/60 sm:inline">EN</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[8px] font-bold text-black">Start a Project</span>
        </div>
      </div>

      {/* Greeting chip */}
      <div className="relative z-10 mt-2 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 backdrop-blur-sm">
          <span className="rounded-full bg-cyan-400/15 px-1.5 py-0.5 text-[7px] font-bold tracking-wider text-cyan-300">
            ⏱ AFTERNOON
          </span>
          <span className="text-[8px] text-white/70">Good Afternoon, Thinker</span>
          <span className="hidden text-[7px] font-bold tracking-wider text-white/50 sm:inline">🖥 DESKTOP</span>
        </div>
      </div>

      {/* Availability pill */}
      <div className="relative z-10 mt-3 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-[7px] font-bold tracking-wider text-blue-300">
          <span className="h-1 w-1 rounded-full bg-blue-400" /> AVAILABLE FOR PROJECTS
        </span>
        <span className="hidden text-[7px] font-bold tracking-[0.25em] text-white/40 sm:inline">
          DIGITAL INNOVATION STUDIO
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 mt-2 px-4 text-center">
        <p className="text-[1.7rem] font-extrabold leading-[1.02] tracking-tight sm:text-[2.2rem]">
          <span className="text-white">BUILDING </span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DIGITAL</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">EXPERIENCES</span>
          <br />
          <span className="text-white">WORLDWIDE.</span>
        </p>
        <p className="mx-auto mt-2 max-w-[70%] text-[9px] leading-relaxed text-white/50 sm:text-[10px]">
          From AI systems and automation to websites, design and digital growth.
        </p>
      </div>

      {/* CTAs */}
      <div className="relative z-10 mt-3 flex items-center justify-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[9px] font-bold text-black">
          Start a Project →
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[9px] font-bold text-white">
          Explore My Work ↓
        </span>
      </div>

      {/* Right-side dot nav */}
      <div className="absolute top-[30%] right-2 z-10 hidden flex-col items-center gap-2 sm:flex">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-white/25" />
        ))}
      </div>
    </div>
  );
}
