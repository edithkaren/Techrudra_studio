/**
 * Shiltr Cafe hero recreation — terracotta brewing banner, warm blurred
 * coffee-foam backdrop, serif "Coffee / with time." headline, cafe nav
 * and EST badge — matches the real site's landing look.
 */
export default function ShiltrVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#5A4326] font-sans">
      {/* Blurred coffee-foam backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 55% 45%, #E8DCC8 0%, #C9A468 30%, #8A6435 55%, #5A4326 80%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle 180px at 62% 30%, rgba(255,244,220,0.9) 0%, transparent 60%), radial-gradient(circle 260px at 78% 62%, rgba(210,160,90,0.7) 0%, transparent 65%)",
          filter: "blur(18px)",
        }}
      />

      {/* Terracotta brewing banner */}
      <div className="relative z-10 flex h-[6.5%] items-center justify-center bg-[#C96F4A]">
        <span className="text-[8px] font-semibold tracking-[0.18em] text-[#2B1A10] sm:text-[9px]">
          NOW BREWING: SLOW MORNINGS, LATE LUNCHES, AND GOOD REASONS TO STAY
        </span>
      </div>

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/70">
            <span className="font-serif text-[10px] text-[#F3E8CF]">S</span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#F3E8CF] sm:text-xs">SHILTR</span>
        </div>
        <div className="hidden items-center gap-4 text-[9px] font-semibold tracking-[0.15em] text-[#F3E8CF]/90 sm:flex">
          <span>STORY</span>
          <span>MENU</span>
          <span>THE ROOM</span>
          <span>VISIT</span>
          <span className="rounded-full bg-[#F3E8CF] px-3 py-1 text-[#4A3521]">RESERVE A TABLE</span>
        </div>
      </div>

      {/* Headline block */}
      <div className="relative z-10 mt-3 px-4 sm:px-8">
        <p className="mb-2 font-mono text-[8px] tracking-[0.2em] text-[#F3E8CF]/80 sm:text-[9px]">
          COFFEE SHOP / KITCHEN / GATHERING PLACE
        </p>
        <p className="mb-0.5 font-mono text-[9px] tracking-[0.35em] text-[#F3E8CF] sm:text-[11px]">SHILTR</p>
        <p
          className="text-[2.6rem] leading-[0.9] text-[#FBF3DF] sm:text-[3.4rem]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Coffee
        </p>
        <p
          className="-mt-1 text-[2.4rem] italic leading-[0.95] text-[#E89B7C] sm:text-[3.1rem]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          with time.
        </p>
        <p className="mt-2 font-mono text-[8px] tracking-[0.2em] text-[#F3E8CF]/70 sm:text-[9px]">
          COFFEE / FOOD / CONVERSATIONS
        </p>
      </div>

      {/* EST badge */}
      <div className="absolute top-[28%] right-[4%] z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#F3E8CF]/40 sm:h-16 sm:w-16">
        <span className="text-center font-mono text-[6px] leading-tight tracking-wider text-[#F3E8CF] sm:text-[7px]">
          EST.<br />2026<br />EAST SIDE
        </span>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-3 right-[5%] z-10 flex items-center gap-2">
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#F3E8CF]/80">SCROLL TO ENTER</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#F3E8CF]/40 text-[9px] text-[#F3E8CF]">↓</span>
      </div>
    </div>
  );
}
