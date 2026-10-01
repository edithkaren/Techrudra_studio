/**
 * Cinematic portfolio hero recreation — full-bleed frame composition:
 * pink radial glow, giant ghost serif name bleeding off both edges,
 * floating pill nav, 3D avatar cropped at the frame bottom like the
 * real site, intro copy bottom-left, credits bottom-right.
 * All sizing is percentage/viewport-relative so it fills any frame.
 */
export default function CinematicVisual() {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#FAF8F8]"
      style={{ containerType: "inline-size" }}
    >
      {/* Soft pink radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 72% at 51% 55%, rgba(243,175,194,0.85) 0%, rgba(247,210,222,0.5) 42%, transparent 72%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute top-[4%] left-[16%] h-[14%] aspect-square rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)", filter: "blur(8px)" }}
      />

      {/* Giant ghost serif name, bleeding past both edges */}
      <p
        className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center leading-none whitespace-nowrap text-black/[0.055]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "17cqw" }}
      >
        Rudraksh Paliwal
      </p>

      {/* 3D avatar, anchored to frame bottom (cropped like the real hero) */}
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <svg
          viewBox="0 0 190 340"
          className="h-[88%] w-auto"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* trousers */}
          <rect x="72" y="222" width="21" height="118" rx="9" fill="#26262B" />
          <rect x="97" y="222" width="21" height="118" rx="9" fill="#2A2A30" />
          {/* shoes (partially cropped at frame bottom) */}
          <rect x="70" y="332" width="25" height="8" rx="4" fill="#EDEDED" />
          <rect x="95" y="332" width="25" height="8" rx="4" fill="#EDEDED" />
          {/* shirt body */}
          <path d="M60 108 C60 94 74 84 95 84 C116 84 130 94 130 108 L133 230 L57 230 Z" fill="#575C64" />
          {/* shirt opening shadow */}
          <path d="M95 88 L95 230 L74 230 C70 185 72 125 78 92 Z" fill="#4A4F57" />
          {/* white tee */}
          <path d="M84 92 C88 89 102 89 106 92 L104 155 L86 155 Z" fill="#F6F6F6" />
          {/* arms */}
          <rect x="50" y="108" width="15" height="96" rx="7.5" fill="#575C64" />
          <rect x="125" y="108" width="15" height="96" rx="7.5" fill="#575C64" />
          {/* rolled cuffs */}
          <rect x="50" y="192" width="15" height="10" rx="5" fill="#464B53" />
          <rect x="125" y="192" width="15" height="10" rx="5" fill="#464B53" />
          {/* hands */}
          <circle cx="57.5" cy="210" r="9" fill="#96683F" />
          <circle cx="132.5" cy="210" r="9" fill="#96683F" />
          {/* neck */}
          <rect x="88" y="72" width="14" height="16" rx="6" fill="#8A5E38" />
          {/* head */}
          <circle cx="95" cy="44" r="27" fill="#9A6A40" />
          {/* ears */}
          <circle cx="68" cy="46" r="5" fill="#8A5E38" />
          <circle cx="122" cy="46" r="5" fill="#8A5E38" />
          {/* hair */}
          <path d="M68 40 C66 20 80 12 95 12 C110 12 124 20 122 40 C122 28 110 22 95 22 C80 22 70 28 68 40 Z" fill="#191A1F" />
          {/* glasses */}
          <circle cx="85" cy="44" r="7.5" fill="none" stroke="#26262B" strokeWidth="2" />
          <circle cx="105" cy="44" r="7.5" fill="none" stroke="#26262B" strokeWidth="2" />
          <line x1="92.5" y1="44" x2="97.5" y2="44" stroke="#26262B" strokeWidth="2" />
          {/* smile */}
          <path d="M87 56 Q95 62 103 56" fill="none" stroke="#4E2E18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating pill nav, top-center */}
      <div className="absolute top-[4%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-2 shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-slate-600 to-slate-900 text-[10px]">🧑‍💼</span>
        {["About", "Experience", "Projects", "Skills", "Awards"].map((l) => (
          <span key={l} className="hidden text-[9.5px] font-medium text-slate-600 sm:inline">{l}</span>
        ))}
        <span className="rounded-full bg-[#D81E4A] px-3.5 py-1.5 text-[9.5px] font-semibold text-white shadow-sm">Contact</span>
      </div>

      {/* Intro block — bottom left */}
      <div className="absolute bottom-[4%] left-[6%] z-10 max-w-[30%]">
        <p className="mb-1.5 font-bold tracking-[0.22em] text-slate-500" style={{ fontSize: "max(8px, 0.9cqw)" }}>INTRODUCTION</p>
        <p className="leading-relaxed text-slate-700" style={{ fontSize: "max(9px, 1cqw)" }}>
          I build fast, secure, and beautifully engineered products for the web — from design systems
          and marketing sites to production-grade full stack platforms.
        </p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-[#D81E4A] px-3 py-1.5 font-semibold text-white shadow-sm" style={{ fontSize: "max(9px, 1cqw)" }}>View work</span>
          <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-slate-800 shadow-sm" style={{ fontSize: "max(9px, 1cqw)" }}>Let&apos;s talk</span>
        </div>
      </div>

      {/* Currently block — bottom right */}
      <div className="absolute right-[6%] bottom-[4%] z-10 text-right">
        <p className="mb-0.5 font-bold tracking-[0.22em] text-slate-500" style={{ fontSize: "max(8px, 0.9cqw)" }}>CURRENTLY</p>
        <p className="leading-tight text-slate-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "max(15px, 1.9cqw)" }}>
          Freelancer, AI Developer
        </p>
        <p className="mt-0.5 leading-snug text-[#D81E4A] italic" style={{ fontFamily: "'Segoe Script', 'Comic Sans MS', cursive", fontSize: "max(9px, 1.15cqw)" }}>
          Founder - Nexenity Tech , Design-minded developer
        </p>
      </div>
    </div>
  );
}
