/**
 * Fitness App UI recreation for the portfolio card — dark dashboard with
 * concentric activity rings, live stat chips, a weekly volume chart, and
 * the day's workout list, in the site's violet accent palette.
 */
const WEEK = [
  { d: "M", h: 40 },
  { d: "T", h: 65 },
  { d: "W", h: 50 },
  { d: "T", h: 85 },
  { d: "F", h: 60 },
  { d: "S", h: 95 },
  { d: "S", h: 35 },
];

const WORKOUTS = [
  { name: "Push Day", meta: "45 min · Chest & Triceps", accent: "#A78BFA", done: true },
  { name: "5 km Run", meta: "28 min · Zone 2 Cardio", accent: "#A3E635", done: false },
];

const STATS = [
  { label: "Steps", value: "8,432", accent: "#F472B6" },
  { label: "BPM", value: "72", accent: "#60A5FA" },
];

export default function FitnessVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0B0B12] font-sans">
      {/* Ambient violet glow */}
      <div
        className="absolute -top-16 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Wednesday · Week 12
            </p>
            <p className="text-xs font-bold text-white sm:text-sm">
              Today&apos;s Plan
            </p>
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#A78BFA] to-[#60A5FA] text-[8px] font-black text-black">
            AR
          </div>
        </div>

        {/* Rings + stat chips */}
        <div className="flex min-h-0 flex-1 gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
            <svg viewBox="0 0 100 100" className="h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]">
              <g fill="none" strokeLinecap="round" transform="rotate(-90 50 50)">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#A78BFA"
                  strokeWidth="9"
                  strokeDasharray="251.3"
                  strokeDashoffset="63"
                />
                <circle cx="50" cy="50" r="28" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  stroke="#A3E635"
                  strokeWidth="9"
                  strokeDasharray="175.9"
                  strokeDashoffset="53"
                />
                <circle cx="50" cy="50" r="16" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="16"
                  stroke="#F472B6"
                  strokeWidth="8"
                  strokeDasharray="100.5"
                  strokeDashoffset="25"
                />
              </g>
              <text
                x="50"
                y="54"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="white"
              >
                75%
              </text>
            </svg>
            <div className="min-w-0 space-y-1.5">
              {[
                { c: "#A78BFA", l: "Move", v: "612 kcal" },
                { c: "#A3E635", l: "Exercise", v: "42 / 60 min" },
                { c: "#F472B6", l: "Streak", v: "12 days" },
              ].map((r) => (
                <div key={r.l} className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: r.c }}
                  />
                  <span className="truncate text-[8px] text-white/45">{r.l}</span>
                  <span className="ml-auto text-[8px] font-semibold text-white/80">
                    {r.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid shrink-0 grid-rows-2 gap-2">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex w-[64px] flex-col justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 sm:w-[76px]"
              >
                <span className="text-[7px] font-semibold uppercase tracking-wider text-white/40">
                  {s.label}
                </span>
                <span
                  className="text-sm font-black leading-tight sm:text-base"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly volume chart */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-white/50">
              Weekly Volume
            </span>
            <span className="text-[8px] font-bold text-[#A3E635]">+18%</span>
          </div>
          <div className="flex h-7 items-end gap-1.5 sm:h-8">
            {WEEK.map((w, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-[3px]"
                  style={{
                    height: `${w.h}%`,
                    background:
                      i === 5
                        ? "linear-gradient(180deg, #A78BFA, #7C3AED)"
                        : "rgba(255,255,255,0.12)",
                  }}
                />
                <span
                  className={`text-[6px] ${i === 5 ? "font-bold text-[#CDBBFF]" : "text-white/30"}`}
                >
                  {w.d}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workout list */}
        <div className="grid grid-cols-2 gap-2">
          {WORKOUTS.map((w) => (
            <div
              key={w.name}
              className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-2"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px]"
                style={{ backgroundColor: `${w.accent}26`, color: w.accent }}
              >
                {w.done ? "✓" : "▶"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[9px] font-bold text-white/85">
                  {w.name}
                </p>
                <p className="truncate text-[7px] text-white/40">{w.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
