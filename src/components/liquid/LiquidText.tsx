import { useState } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  filterId?: string;
}

export default function LiquidText({
  children,
  className = "",
  accent = "#A78BFA",
  filterId = "fluid-text-hover",
}: LiquidTextProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block cursory-pointer ${className}`}
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
              baseFrequency="0.025"
              numOctaves="2"
              seed={2}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={hovered ? 18 : 0}
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
          color: hovered ? accent : undefined,
        }}
      >
        {children}
      </span>
    </span>
  );
}
