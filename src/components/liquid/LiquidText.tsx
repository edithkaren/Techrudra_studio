import { useState } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  filterId?: string;
  hoverScale?: number;
  morphScale?: number;
}

export default function LiquidText({
  children,
  className = "",
  accent = "#A78BFA",
  filterId = "fluid-text-hover",
  hoverScale = 1.04,
  morphScale = 18,
}: LiquidTextProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-0 w-0 overflow-hidden"
        aria-hidden
        focusable={false}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed={2}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={hovered ? morphScale : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="fluid-text-ripple" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018"
              numOctaves="2"
              seed={4}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={14}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span
        style={{
          filter: hovered ? `url(#${filterId})` : "none",
          transition: "filter 0.35s ease",
          transform: hovered ? `scale(${hoverScale})` : "scale(1)",
          transitionDuration: "0.35s",
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          color: hovered ? accent : undefined,
        }}
      >
        {children}
      </span>
    </span>
  );
}
