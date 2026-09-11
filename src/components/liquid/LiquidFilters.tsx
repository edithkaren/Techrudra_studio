import { useEffect, useRef } from "react";

const FILTERS_HTML = `
<svg class="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false" style="position:fixed;inset:0;height:0;width:0;overflow:hidden;pointer-events:none">
  <defs>
    <filter id="fluid-distort" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="fluid-distort-hover" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="2" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="liquid-morph" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>
`;

export default function LiquidFilters() {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    const id = "liquid-filters-root";
    if (!document.getElementById(id)) {
      const wrapper = document.createElement("div");
      wrapper.id = id;
      wrapper.innerHTML = FILTERS_HTML;
      document.body.appendChild(wrapper);
    }
    mounted.current = true;
    return () => {
      const node = document.getElementById(id);
      if (node) node.remove();
      mounted.current = false;
    };
  }, []);
  return null;
}
