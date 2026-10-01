/**
 * Cinematic portfolio hero recreation — soft pink radial glow backdrop with
 * giant ghost serif name, floating pill nav with avatar + red Contact pill,
 * 3D avatar in open shirt, "INTRODUCTION" intro copy, and
 * Freelancer/AI Developer credit block.
 */
export default function CinematicVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAF8F8] font-sans">
      {/* Soft pink radial glow, slightly right-of-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 68% at 52% 52%, rgba(243,175,194,0.85) 0%, rgba(247,210,222,0.5) 42%, transparent 72%)",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute top-[6%] left-[18%] h-24 w-24 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)", filter: "blur(10px)" }}
      />

      {/* Giant ghost serif name behind everything */}
      <p
        className="absolute top-[16%] left-1/2 -translate-x-1/2 text-center text-[5rem] leading-none whitespace-nowrap text-black/[0.055] sm:text-[6.4rem]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Rudraksh Paliwal
      </p>

      {/* Floating pill nav */}
      <div className="relative z-10 mx-auto mt-2.5 flex w-fit items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-2 shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-slate-600 to-slate-900 text-[10px]">🧑‍💼</span>
        {["About", "Experience", "Projects", "Skills", "Awards"].map((l) => (
          <span key={l} className="hidden text-[9.5px] font-medium text-slate-600 sm:inline">{l}</span>
        ))}
        <span className="rounded-full bg-[#D81E4A] px-3.5 py-1.5 text-[9.5px] font-semibold text-white shadow-sm">Contact</span>
      </div>

      {/* 3D avatar — open grey shirt over white tee, dark trousers */}
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <svg width="190" height="300" viewBox="0 0 190 300" xmlns="http://www.w3.org/2000/svg">
          {/* trousers */}
          <rect x="72" y="192" width="21" height="105" rx="9" fill="#26262B" />
          <rect x="97" y="192" width="21" height="105" rx="9" fill="#2A2A30" />
          {/* shoes */}
          <rect x="70" y="290" width="25" height="9" rx="4.5" fill="#EDEDED" />
          <rect x="95" y="290" width="25" height="9" rx="4.5" fill="#EDEDED" />
          {/* shirt body (open overshirt) */}
          <path d="M60 108 C60 94 74 84 95 84 C116 84 130 94 130 108 L133 200 L57 200 Z" fill="#575C64" />
          {/* shirt opening */}
          <path d="M95 88 L95 200 L74 200 C70 160 72 120 78 92 Z" fill="#4A4F57" />
          {/* white tee */}
          <path d="M84 92 C88 89 102 89 106 92 L104 150 L86 150 Z" fill="#F6F6F6" />
          {/* arms */}
          <rect x="50" y="108" width="15" height="86" rx="7.5" fill="#575C64" />
          <rect x="125" y="108" width="15" height="86" rx="7.5" fill="#575C64" />
          {/* cuffs rolled */}
          <rect x="50" y="182" width="15" height="10" rx="5" fill="#464B53" />
          <rect x="125" y="182" width="15" height="10" rx="5" fill="#464B53" />
          {/* hands */}
          <circle cx="57.5" cy="199" r="9" fill="#96683F" />
          <circle cx="132.5" cy="199" r="9" fill="#96683F" />
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

      {/* Intro block */}
      <div className="absolute bottom-4 left-[6%] z-10 max-w-[36%]">
        <p className="mb-1.5 text-[8px] font-bold tracking-[0.22em] text-slate-500">INTRODUCTION</p>
        <p className="text-[9.5px] leading-relaxed text-slate-700">
          I build fast, secure, and beautifully engineered products for the web — from design systems
          and marketing sites to production-grade full stack platforms.
        </p>
        <div className="mt-2.5 flex gap-2">
          <span className="rounded-full bg-[#D81E4A] px-3.5 py-1.5 text-[9.5px] font-semibold text-white shadow-sm">View work</span>
          <span className="rounded-full bg-white px-3.5 py-1.5 text-[9.5px] font-semibold text-slate-800 shadow-sm">Let&apos;s talk</span>
        </div>
      </div>

      {/* Currently block */}
      <div className="absolute right-[6%] bottom-4 z-10 text-right">
        <p className="mb-0.5 text-[8px] font-bold tracking-[0.22em] text-slate-500">CURRENTLY</p>
        <p className="text-[17px] leading-tight text-slate-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Freelancer, AI Developer
        </p>
        <p className="mt-0.5 text-[10.5px] italic leading-snug text-[#D81E4A]" style={{ fontFamily: "'Segoe Script', 'Comic Sans MS', cursive" }}>
          Founder - Nexenity Tech , Design-minded developer
        </p>
      </div>
    </div>
  );
}
