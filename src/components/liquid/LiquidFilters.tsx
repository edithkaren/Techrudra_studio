/**
 * Global SVG filter definitions for liquid / gooey / fluid effects.
 * Render once at the root — components reference these via filter="url(#filterName)".
 */
export default function LiquidFilters() {
  return (
    <svg className="pointer-events-none absolute" style={{ width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* ── Gooey merge filter ───────────────────────────────
            Blurs shapes together, then pulls edges tight via
            high-contrast colorMatrix — makes adjacent blobs "melt" into one. */}
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* ── Fluid text distortion ────────────────────────────
            Turbulent noise displaces text for ink-in-water feel. */}
        <filter id="fluid-distort" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            seed="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="12s"
              values="0.015;0.025;0.015"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            result="distorted"
          >
            {/* scale animates from 0 → 14 on hover via CSS/class toggle */}
          </feDisplacementMap>
        </filter>

        {/* ── Intense fluid distortion (for hover state) ─────── */}
        <filter id="fluid-distort-hover" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="4"
            seed="5"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="4s"
              values="0.02;0.035;0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ── Liquid morph for blobs ─────────────────────────── */}
        <filter id="liquid-morph" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            seed="1"
            result="warp"
          >
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.01;0.02;0.01"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ── Soft liquid ripple ──────────────────────────────── */}
        <filter id="liquid-ripple" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            seed="8"
            result="noise"
          >
            <animate
              attributeName="seed"
              dur="3s"
              values="8;12;8"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
}
