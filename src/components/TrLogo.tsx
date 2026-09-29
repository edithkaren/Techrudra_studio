/**
 * Techrudra.Studio "TR" interlocked monogram.
 * Inline SVG twin of src/assets/tr-logo.svg so the colors can be themed.
 */
export default function TrLogo({
  className = "",
  stroke = "#FFFFFF",
  background = "transparent",
}: {
  className?: string;
  stroke?: string;
  background?: string;
}) {
  const paths = [
    "M22 32 H126", // T crossbar
    "M65 32 V112", // T stem
    "M120 32 V112", // R stem
    "M120 36 H136 A22 22 0 0 1 136 80 H120", // R bowl
    "M138 80 L166 112", // R leg
  ];
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="140" rx="18" fill={background} />
      <g strokeLinecap="round" strokeLinejoin="round">
        <g stroke={stroke} strokeWidth={16}>
          {paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke={background === "transparent" ? "#0A0A0A" : background} strokeWidth={7}>
          {paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
