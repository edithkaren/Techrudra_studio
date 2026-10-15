/**
 * CivicAssist portal recreation — a live government scheme & public services
 * guide: blue official header with live-data chip, scheme search hero,
 * category filter pills, scheme cards with deadline/live badges and document
 * rows, plus a stats strip (documents indexed · deadlines checked · sources).
 * All sizing is container-query relative (cqw) so it fills any frame.
 */
const schemes = [
  {
    tag: "Education",
    tagColor: "#2563EB",
    iconBg: "#DBEAFE",
    icon: "🎓",
    title: "National Scholarship",
    eligibility: "Students · Family income ≤ ₹8L",
    badge: "Apply by 18 Nov",
    badgeKind: "warn" as const,
    docs: ["Income certificate", "Mark sheets", "Bank details"],
  },
  {
    tag: "Health",
    tagColor: "#16A34A",
    iconBg: "#DCFCE7",
    icon: "🩺",
    title: "Public Health Cover",
    eligibility: "All families · Cashless care",
    badge: "● Live · Enrolling",
    badgeKind: "live" as const,
    docs: ["Aadhaar / ID", "Family record", "Hospital list"],
  },
  {
    tag: "Housing",
    tagColor: "#D97706",
    iconBg: "#FEF3C7",
    icon: "🏠",
    title: "Rural Housing Aid",
    eligibility: "BPL households · One-time grant",
    badge: "Closes in 3 days",
    badgeKind: "urgent" as const,
    docs: ["Proof of residence", "BPL card", "Site papers"],
  },
];

const categories = ["All", "Health", "Education", "Housing", "Agriculture", "Women & Child"];

export default function CivicAssistVisual() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#F3F6FC] font-sans"
      style={{ containerType: "inline-size" }}
    >
      {/* Official header */}
      <div
        className="flex items-center justify-between px-[4%] py-[2.2%]"
        style={{ background: "linear-gradient(90deg, #1E3A8A 0%, #2563EB 100%)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center rounded-md bg-white/15"
            style={{ width: "max(14px, 2.4cqw)", height: "max(14px, 2.4cqw)", fontSize: "max(8px, 1.3cqw)" }}
          >
            🏛
          </span>
          <span className="font-extrabold tracking-tight text-white" style={{ fontSize: "max(10px, 1.7cqw)" }}>
            CivicAssist
          </span>
          <span
            className="hidden rounded-full bg-white/15 px-2 py-0.5 font-medium text-blue-100 sm:inline"
            style={{ fontSize: "max(6px, 0.8cqw)" }}
          >
            gov schemes · made simple
          </span>
        </div>
        <div className="flex items-center gap-[1.6cqw]">
          {["Schemes", "Services", "Deadlines"].map((l) => (
            <span
              key={l}
              className="hidden font-medium text-blue-100 sm:inline"
              style={{ fontSize: "max(7px, 1cqw)" }}
            >
              {l}
            </span>
          ))}
          <span
            className="flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-1 font-semibold text-emerald-200 ring-1 ring-emerald-300/40"
            style={{ fontSize: "max(6px, 0.85cqw)" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            Live data
          </span>
        </div>
      </div>

      {/* Search hero */}
      <div className="px-[4%] pt-[2.4%] pb-[1.6%]">
        <p className="font-semibold text-slate-400" style={{ fontSize: "max(6px, 0.8cqw)", letterSpacing: "0.18em" }}>
          OFFICIAL SCHEME INDEX
        </p>
        <p className="mt-[0.5%] font-bold text-slate-900" style={{ fontSize: "max(11px, 2.1cqw)" }}>
          Find every scheme you&apos;re eligible for
        </p>
        <div
          className="mt-[1.6%] flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <span style={{ fontSize: "max(9px, 1.2cqw)" }}>🔎</span>
          <span className="flex-1 text-slate-400" style={{ fontSize: "max(8px, 1.05cqw)" }}>
            Search schemes, documents, application deadlines…
          </span>
          <span
            className="rounded-full px-3 py-1 font-semibold text-white"
            style={{ fontSize: "max(7px, 0.95cqw)", background: "linear-gradient(90deg,#2563EB,#1D4ED8)" }}
          >
            Search
          </span>
        </div>
        {/* Category pills */}
        <div className="mt-[1.6%] flex flex-wrap gap-[1%]">
          {categories.map((c, i) => (
            <span
              key={c}
              className="rounded-full px-2 py-1 font-medium"
              style={{
                fontSize: "max(6px, 0.82cqw)",
                background: i === 0 ? "#1D4ED8" : "#FFFFFF",
                color: i === 0 ? "#FFFFFF" : "#475569",
                border: i === 0 ? "none" : "1px solid #E2E8F0",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Scheme cards */}
      <div className="grid flex-1 grid-cols-3 gap-[1.6%] px-[4%] pb-[1.6%]">
        {schemes.map((s) => (
          <div
            key={s.title}
            className="flex flex-col rounded-lg border border-slate-200/80 bg-white p-[4%] shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-1">
              <span
                className="flex items-center justify-center rounded-md"
                style={{ background: s.iconBg, fontSize: "max(9px, 1.4cqw)", padding: "4% 6%" }}
              >
                {s.icon}
              </span>
              <span
                className="rounded-full px-1.5 py-0.5 font-bold ring-1"
                style={{
                  fontSize: "max(5.5px, 0.7cqw)",
                  background: s.badgeKind === "live" ? "#DCFCE7" : s.badgeKind === "urgent" ? "#FEE2E2" : "#FEF3C7",
                  color: s.badgeKind === "live" ? "#15803D" : s.badgeKind === "urgent" ? "#B91C1C" : "#B45309",
                  opacity: 0.95,
                }}
              >
                {s.badge}
              </span>
            </div>
            <p className="mt-[4%] font-bold text-slate-900" style={{ fontSize: "max(8px, 1.15cqw)" }}>
              {s.title}
            </p>
            <p className="mt-[1%] text-slate-500" style={{ fontSize: "max(6px, 0.78cqw)" }}>
              {s.eligibility}
            </p>
            <div
              className="mt-[3%] rounded px-1.5 py-1"
              style={{ background: "#F8FAFC", border: "1px solid #EEF2F7" }}
            >
              {s.docs.map((d, i) => (
                <div key={d} className="flex items-center gap-1 py-[1px]">
                  <span style={{ color: s.tagColor, fontSize: "max(5.5px, 0.72cqw)" }}>✓</span>
                  <span className="text-slate-500" style={{ fontSize: "max(5.5px, 0.72cqw)" }}>
                    {d}
                  </span>
                  {i === 0 && (
                    <span className="ml-auto text-slate-300" style={{ fontSize: "max(5.5px, 0.7cqw)" }}>
                      .pdf
                    </span>
                  )}
                </div>
              ))}
            </div>
            <span
              className="mt-auto pt-[3%] font-semibold"
              style={{ fontSize: "max(6px, 0.8cqw)", color: s.tagColor }}
            >
              View instructions →
            </span>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div
        className="flex items-center justify-between px-[4%] py-[1.4%] text-slate-500"
        style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0", fontSize: "max(6px, 0.8cqw)" }}
      >
        <span className="font-semibold text-slate-600">12,400+ official scheme documents indexed</span>
        <span className="hidden sm:inline">320 live deadlines checked today</span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Sourced from official portals
        </span>
      </div>
    </div>
  );
}
