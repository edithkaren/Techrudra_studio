/**
 * Cinematic portfolio hero recreation — soft pink radial glow backdrop with
 * giant ghost serif name, floating pill nav with avatar + red Contact pill,
 * "INTRODUCTION" intro copy, and Freelancer/AI Developer credit block.
 */
export default function CinematicVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAF7F7] font-sans">
      {/* Pink radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 75% at 50% 55%, rgba(244,178,196,0.75) 0%, rgba(247,208,220,0.45) 40%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      {/* Ghost name */}
      <p
        className="absolute top-[14%] left-1/2 w-full -translate-x-1/2 text-center text-[4.6rem] leading-none whitespace-nowrap text-black/[0.06] sm:text-[6rem]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Rudraksh Paliwal
      </p>

      {/* Floating pill nav */}
      <div className="relative z-10 mx-auto mt-2 flex w-fit items-center gap-3 rounded-full bg-white px-2 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 to-slate-900 text-[9px]">
          🧑
        </span>
        {["About", "Experience", "Projects", "Skills", "Awards"].map((l) => (
          <span key={l} className="hidden text-[9px] font-medium text-slate-600 sm:inline">{l}</span>
        ))}
        <span className="rounded-full bg-[#D81E4A] px-3 py-1 text-[9px] font-semibold text-white">Contact</span>
      </div>

      {/* 3D avatar silhouette */}
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <svg width="150" height="220" viewBox="0 0 150 220" xmlns="http://www.w3.org/2000/svg">
          {/* legs */}
          <rect x="55" y="140" width="17" height="75" rx="8" fill="#2A2A2E" />
          <rect x="78" y="140" width="17" height="75" rx="8" fill="#2A2A2E" />
          {/* shirt */}
          <path d="M48 78 C48 66 60 58 75 58 C90 58 102 66 102 78 L104 145 L46 145 Z" fill="#5A5F66" />
          {/* tee */}
          <path d="M66 62 L84 62 L82 100 L68 100 Z" fill="#F5F5F5" />
          {/* arms */}
          <rect x="40" y="80" width="12" height="62" rx="6" fill="#5A5F66" />
          <rect x="98" y="80" width="12" height="62" rx="6" fill="#5A5F66" />
          <circle cx="46" cy="146" r="7" fill="#8A5A3C" />
          <circle cx="104" cy="146" r="7" fill="#8A5A3C" />
          {/* head */}
          <circle cx="75" cy="30" r="22" fill="#9A6A45" />
          {/* hair */}
          <path d="M53 26 C53 12 64 6 75 6 C86 6 97 12 97 26 C97 18 88 14 75 14 C62 14 53 18 53 26 Z" fill="#1C1C20" />
          {/* glasses */}
          <circle cx="67" cy="30" r="6" fill="none" stroke="#2A2A2E" strokeWidth="1.6" />
          <circle cx="83" cy="30" r="6" fill="none" stroke="#2A2A2E" strokeWidth="1.6" />
          {/* smile */}
          <path d="M69 39 Q75 44 81 39" fill="none" stroke="#5A3420" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Intro block */}
      <div className="absolute bottom-4 left-[7%] z-10 max-w-[34%]">
        <p className="mb-1.5 text-[8px] font-bold tracking-[0.2em] text-slate-500">INTRODUCTION</p>
        <p className="text-[9px] leading-relaxed text-slate-700">
          I build fast, secure, and beautifully engineered products for the web — from design systems
          and marketing sites to production-grade full stack platforms.
        </p>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-full bg-[#D81E4A] px-3 py-1 text-[9px] font-semibold text-white">View work</span>
          <span className="rounded-full bg-white px-3 py-1 text-[9px] font-semibold text-slate-800 shadow-sm">Let's talk</span>
        </div>
      </div>

      {/* Currently block */}
      <div className="absolute right-[7%] bottom-4 z-10 text-right">
        <p className="text-[8px] font-bold tracking-[0.2em] text-slate-500">CURRENTLY</p>
        <p className="text-[15px] text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
          Freelancer, AI Developer
        </p>
        <p className="text-[10px] italic text-[#D81E4A]" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          Founder - Nexenity Tech, Design-minded developer
        </p>
      </div>
    </div>
  );
}
