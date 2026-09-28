import "./NebulaBackground.css";

/**
 * Cinematic nebula background: several large, extremely soft violet /
 * indigo / blue clouds that drift and morph slowly (pure CSS, 60–92s
 * loops) with subtle 8–12s brightness pulses. Fully ambient — no mouse
 * interaction, no cursor following, no JavaScript.
 */
export default function NebulaBackground() {
  return (
    <div aria-hidden="true" className="nebula-bg">
      <div className="nebula nebula--violet" />
      <div className="nebula nebula--indigo" />
      <div className="nebula nebula--blue" />
      <div className="nebula nebula--deep" />
      <div className="nebula nebula--band" />
    </div>
  );
}
