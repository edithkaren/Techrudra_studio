import { motion } from "framer-motion";
import ShiltrVisual from "@/components/ShiltrVisual";
import NexenityVisual from "@/components/NexenityVisual";

type DeviceType = "browser" | "phone" | "laptop";

interface ProjectMockupProps {
  projectSlug: string;
  category: string;
  device?: DeviceType;
  className?: string;
  /** Size the mockup to fill a fixed-height parent (equal-height card grids). */
  fitHeight?: boolean;
}

const projectVisuals: Record<
  string,
  {
    device: DeviceType;
    title: string;
    accent: string;
    elements: "dashboard" | "chatbot" | "brand" | "automation" | "video" | "ecommerce" | "search" | "social";
  }
> = {
  "pg-finder-app": { device: "phone", title: "PG Finder", accent: "#60A5FA", elements: "search" },
  "shiltr-cafe": { device: "laptop", title: "Shiltr Cafe", accent: "#FB923C", elements: "ecommerce" },
  "jarvis": { device: "browser", title: "Jarvis", accent: "#3B82F6", elements: "chatbot" },
  "ultron": { device: "browser", title: "Ultron", accent: "#A78BFA", elements: "chatbot" },
  "techrudra-studio-website": { device: "laptop", title: "Techrudra Studio", accent: "#6C3AED", elements: "dashboard" },
  "nexenity-website": { device: "laptop", title: "Nexenity", accent: "#2DD4BF", elements: "dashboard" },
  "cinematic-website": { device: "browser", title: "Cinematic", accent: "#F87171", elements: "video" },
};

function DashboardVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dash-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D0D0D" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#dash-bg)" />
      <rect x="0" y="0" width="180" height="500" fill="#141414" />
      <rect x="20" y="24" width="80" height="10" rx="5" fill={accent} opacity="0.8" />
      <rect x="20" y="56" width="140" height="8" rx="4" fill="#E5E5E5" />
      <rect x="20" y="80" width="120" height="8" rx="4" fill="#F0F0F0" />
      <rect x="20" y="104" width="130" height="8" rx="4" fill="#F0F0F0" />
      <rect x="20" y="128" width="100" height="8" rx="4" fill="#F0F0F0" />
      <rect x="200" y="20" width="200" height="12" rx="6" fill="white" opacity="0.06" />
      <circle cx="750" cy="26" r="14" fill={accent} opacity="0.3" />
      {[
        { x: 200, y: 60, w: 180, h: 90, label: "Revenue", value: "$48.2K", change: "+12.5%" },
        { x: 400, y: 60, w: 180, h: 90, label: "Users", value: "2,847", change: "+8.3%" },
        { x: 600, y: 60, w: 180, h: 90, label: "Conversion", value: "3.2%", change: "+0.8%" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="12" fill="white" />
          <rect x={c.x + 16} y={c.y + 16} width="60" height="8" rx="4" fill="white" opacity="0.15" />
          <rect x={c.x + 16} y={c.y + 36} width="80" height="16" rx="4" fill="white" opacity="0.5" />
          <rect x={c.x + 16} y={c.y + 60} width="40" height="8" rx="4" fill="#2DD4BF" opacity="0.6" />
        </g>
      ))}
      <rect x="200" y="170" width="580" height="200" rx="12" fill="#141414" />
      <rect x="220" y="190" width="100" height="10" rx="5" fill="white" opacity="0.06" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={240 + i * 68}
          y={320 - Math.sin(i * 0.8 + 1) * 60 - 20}
          width="40"
          height={Math.sin(i * 0.8 + 1) * 60 + 40}
          rx="6"
          fill={accent}
          opacity={0.25 + (i % 3) * 0.15}
        />
      ))}
      <rect x="200" y="390" width="580" height="90" rx="12" fill="#141414" />
      <rect x="220" y="410" width="100" height="8" rx="4" fill="white" opacity="0.1" />
      <rect x="220" y="430" width="540" height="6" rx="3" fill="white" opacity="0.04" />
      <rect x="220" y="444" width="540" height="6" rx="3" fill="white" opacity="0.04" />
      <rect x="220" y="458" width="540" height="6" rx="3" fill="white" opacity="0.04" />
    </svg>
  );
}

function ChatbotVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chat-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0F7FF" />
          <stop offset="100%" stopColor="#E8F4FD" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#chat-bg)" />
      <rect x="200" y="40" width="400" height="420" rx="20" fill="white" />
      <rect x="200" y="40" width="400" height="60" rx="20" fill={accent} />
      <rect x="200" y="80" width="400" height="20" fill={accent} />
      <circle cx="240" cy="70" r="16" fill="white" opacity="0.3" />
      <rect x="266" y="62" width="100" height="10" rx="5" fill="white" opacity="0.7" />
      <rect x="266" y="76" width="60" height="6" rx="3" fill="white" opacity="0.4" />
      <rect x="220" y="120" width="260" height="50" rx="16" fill="#F0F0F0" />
      <rect x="240" y="134" width="200" height="6" rx="3" fill="#CCCCCC" />
      <rect x="240" y="148" width="160" height="6" rx="3" fill="#DDDDDD" />
      <rect x="240" y="162" width="180" height="6" rx="3" fill="#DDDDDD" />
      <rect x="320" y="190" width="240" height="44" rx="16" fill={accent} />
      <rect x="340" y="206" width="180" height="6" rx="3" fill="white" opacity="0.7" />
      <rect x="340" y="220" width="120" height="6" rx="3" fill="white" opacity="0.5" />
      <rect x="220" y="260" width="300" height="70" rx="16" fill="#F0F0F0" />
      <rect x="240" y="274" width="240" height="6" rx="3" fill="#CCCCCC" />
      <rect x="240" y="290" width="200" height="6" rx="3" fill="#DDDDDD" />
      <rect x="240" y="306" width="220" height="6" rx="3" fill="#DDDDDD" />
      <rect x="220" y="360" width="80" height="30" rx="15" fill="#F0F0F0" />
      <circle cx="245" cy="375" r="3" fill="#CCCCCC" />
      <circle cx="258" cy="375" r="3" fill="#CCCCCC" />
      <circle cx="271" cy="375" r="3" fill="#CCCCCC" />
      <rect x="220" y="420" width="360" height="28" rx="14" fill="#F8F8F8" stroke="#E5E5E5" strokeWidth="1" />
      <circle cx="560" cy="434" r="12" fill={accent} />
    </svg>
  );
}

function BrandVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#FAFAFA" />
      <rect x="160" y="60" width="240" height="320" rx="16" fill="white" />
      <rect x="160" y="60" width="240" height="140" rx="16" fill={accent} />
      <rect x="160" y="180" width="240" height="20" fill="white" />
      <rect x="180" y="220" width="100" height="12" rx="6" fill="#1C1917" opacity="0.15" />
      <rect x="180" y="244" width="180" height="8" rx="4" fill="#CCCCCC" />
      <rect x="180" y="260" width="160" height="8" rx="4" fill="#DDDDDD" />
      <rect x="180" y="290" width="80" height="24" rx="12" fill={accent} opacity="0.15" />
      <rect x="180" y="292" width="80" height="20" rx="10" fill={accent} />
      <rect x="440" y="60" width="240" height="140" rx="16" fill="white" />
      <rect x="460" y="80" width="60" height="10" rx="5" fill="#CCCCCC" />
      <rect x="460" y="100" width="200" height="30" rx="4" fill="#1C1917" opacity="0.7" />
      <rect x="460" y="144" width="140" height="8" rx="4" fill="#DDDDDD" />
      <rect x="460" y="158" width="160" height="8" rx="4" fill="#E5E5E5" />
      <rect x="440" y="220" width="240" height="160" rx="16" fill="white" />
      <rect x="460" y="240" width="60" height="10" rx="5" fill="#CCCCCC" />
      {["#1C1917", accent, "#FB923C", "#14B8A6", "#EC4899"].map((c, i) => (
        <g key={i}>
          <rect x={460 + i * 36} y={268} width={32} height={32} rx={8} fill={c} />
          <rect x={460 + i * 36} y={308} width={24} height={6} rx={3} fill="#E5E5E5" />
        </g>
      ))}
      <circle cx="280" cy="120" r="30" fill="white" opacity="0.3" />
      <rect x="260" y="140" width="40" height="14" rx="7" fill="white" opacity="0.5" />
    </svg>
  );
}

function AutomationVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#F8FFFE" />
      {[
        { x: 100, y: 120, w: 140, h: 60, label: "Trigger", color: accent },
        { x: 320, y: 80, w: 140, h: 60, label: "Filter", color: "#3B82F6" },
        { x: 320, y: 180, w: 140, h: 60, label: "Enrich", color: "#EC4899" },
        { x: 540, y: 120, w: 140, h: 60, label: "Send Email", color: "#FB923C" },
        { x: 540, y: 240, w: 140, h: 60, label: "Update CRM", color: "#14B8A6" },
        { x: 320, y: 320, w: 140, h: 60, label: "Notify Team", color: "#8B5CF6" },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="12" fill="white" />
          <rect x={n.x} y={n.y} width="4" height={n.h} rx="2" fill={n.color} />
          <rect x={n.x + 16} y={n.y + 20} width={n.w - 32} height="8" rx="4" fill="#1C1917" opacity="0.12" />
          <rect x={n.x + 16} y={n.y + 36} width={n.w - 48} height="6" rx="3" fill="#E5E5E5" />
        </g>
      ))}
      <path d="M240 150 Q280 150 320 110" stroke={accent} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M240 150 Q280 150 320 210" stroke={accent} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M460 110 Q500 110 540 150" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M460 210 Q500 210 540 270" stroke="#EC4899" strokeWidth="2" fill="none" opacity="0.4" />
      <rect x="100" y="280" width="200" height="180" rx="16" fill="white" />
      <rect x="120" y="300" width="80" height="10" rx="5" fill="#CCCCCC" />
      <rect x="120" y="324" width="60" height="20" rx="4" fill="#1C1917" opacity="0.1" />
      <rect x="120" y="358" width="160" height="8" rx="4" fill="#F0F0F0" />
      <rect x="120" y="374" width="140" height="8" rx="4" fill="#F0F0F0" />
      <rect x="120" y="390" width="120" height="8" rx="4" fill="#F0F0F0" />
      <rect x="120" y="416" width="80" height="24" rx="12" fill={accent} />
      <rect x="320" y="400" width="420" height="60" rx="12" fill="white" />
      <rect x="340" y="418" width="100" height="8" rx="4" fill="#10B981" opacity="0.5" />
      <rect x="340" y="434" width="160" height="8" rx="4" fill="#E5E5E5" />
    </svg>
  );
}

function VideoVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#0F0F0F" />
      <rect x="80" y="60" width="640" height="320" rx="12" fill="#1A1A2E" />
      <circle cx="300" cy="200" r="60" fill={accent} opacity="0.3" />
      <circle cx="320" cy="180" r="40" fill={accent} opacity="0.5" />
      <rect x="400" y="160" width="200" height="8" rx="4" fill="white" opacity="0.15" />
      <rect x="400" y="180" width="160" height="8" rx="4" fill="white" opacity="0.1" />
      <rect x="400" y="200" width="120" height="8" rx="4" fill="white" opacity="0.08" />
      <circle cx="400" cy="220" r="28" fill="white" opacity="0.15" />
      <polygon points="392,208 392,232 412,220" fill="white" opacity="0.6" />
      <rect x="80" y="400" width="640" height="4" rx="2" fill="#333" />
      <rect x="80" y="400" width="280" height="4" rx="2" fill={accent} />
      <circle cx="360" cy="402" r="6" fill={accent} />
      <rect x="80" y="416" width="30" height="8" rx="4" fill="white" opacity="0.2" />
      <rect x="690" y="416" width="30" height="8" rx="4" fill="white" opacity="0.2" />
      <rect x="370" y="440" width="20" height="20" rx="4" fill="white" opacity="0.15" />
      <rect x="400" y="440" width="20" height="20" rx="4" fill={accent} opacity="0.6" />
      <rect x="430" y="440" width="20" height="20" rx="4" fill="white" opacity="0.15" />
    </svg>
  );
}

function EcommerceVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ecom-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAF8F5" />
          <stop offset="100%" stopColor="#F5F0EB" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#ecom-bg)" />
      <rect x="40" y="20" width="60" height="10" rx="5" fill="#1C1917" opacity="0.5" />
      <rect x="600" y="20" width="160" height="10" rx="5" fill="#1C1917" opacity="0.08" />
      <rect x="40" y="60" width="720" height="200" rx="16" fill="white" />
      <rect x="60" y="80" width="200" height="14" rx="7" fill="#1C1917" opacity="0.7" />
      <rect x="60" y="106" width="260" height="8" rx="4" fill="#CCCCCC" />
      <rect x="60" y="124" width="220" height="8" rx="4" fill="#DDDDDD" />
      <rect x="60" y="160" width="120" height="32" rx="16" fill={accent} />
      <rect x="196" y="160" width="100" height="32" rx="16" fill="none" stroke="#1C1917" strokeWidth="1" opacity="0.2" />
      <rect x="440" y="80" width="300" height="160" rx="12" fill="#F0EDE8" />
      <circle cx="590" cy="160" r="40" fill={accent} opacity="0.15" />
      <rect x="560" y="150" width="60" height="20" rx="10" fill={accent} opacity="0.25" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={40 + i * 185} y={280} width={170} height={200} rx="12" fill="white" />
          <rect x={50 + i * 185} y={290} width={150} height={100} rx="8" fill="#F0EDE8" />
          <rect x={50 + i * 185} y={402} width={80} height="8" rx="4" fill="#1C1917" opacity="0.12" />
          <rect x={50 + i * 185} y={420} width={100} height="6" rx="3" fill="#CCCCCC" />
          <rect x={50 + i * 185} y={438} width={50} height="8" rx="4" fill={accent} opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

function SearchVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#F5F7FA" />
      <rect x="180" y="60" width="440" height="48" rx="24" fill="white" stroke="#E5E5E5" strokeWidth="1" />
      <circle cx="212" cy="84" r="10" fill="#CCCCCC" />
      <rect x="230" y="80" width="200" height="8" rx="4" fill="#CCCCCC" />
      {[
        { y: 140, score: "98%" },
        { y: 210, score: "92%" },
        { y: 280, score: "87%" },
        { y: 350, score: "81%" },
      ].map((r, i) => (
        <g key={i}>
          <rect x="180" y={r.y} width="440" height="56" rx="12" fill="white" />
          <rect x="200" y={r.y + 14} width="80" height="8" rx="4" fill={accent} opacity="0.5" />
          <rect x="200" y={r.y + 30} width="280" height="6" rx="3" fill="#CCCCCC" />
          <rect x="200" y={r.y + 42} width="200" height="6" rx="3" fill="#E5E5E5" />
          <rect x="560" y={r.y + 18} width="40" height="20" rx="10" fill={accent} opacity="0.1" />
          <rect x="568" y={r.y + 24} width="24" height="8" rx="4" fill={accent} opacity="0.5" />
        </g>
      ))}
      <rect x="640" y="60" width="140" height="380" rx="12" fill="white" />
      <rect x="660" y="80" width="60" height="8" rx="4" fill="#CCCCCC" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="660" y={110 + i * 36} width={80 + (i % 3) * 20} height="8" rx="4" fill="#F0F0F0" />
      ))}
    </svg>
  );
}

function SocialVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#FFF8F9" />
      <rect x="280" y="30" width="240" height="440" rx="24" fill="#1C1917" />
      <rect x="288" y="38" width="224" height="424" rx="20" fill="white" />
      <rect x="300" y="48" width="30" height="6" rx="3" fill="#CCCCCC" />
      <rect x="470" y="48" width="30" height="6" rx="3" fill="#CCCCCC" />
      <rect x="300" y="68" width="200" height="200" rx="4" fill={accent} opacity="0.15" />
      <rect x="340" y="140" width="120" height="40" rx="20" fill="white" opacity="0.5" />
      <rect x="300" y="280" width="200" height="8" rx="4" fill="#1C1917" opacity="0.08" />
      <rect x="300" y="296" width="140" height="6" rx="3" fill="#CCCCCC" />
      <rect x="300" y="312" width="180" height="6" rx="3" fill="#E5E5E5" />
      <rect x="300" y="340" width="200" height="60" rx="4" fill="#FAFAFA" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={324 + i * 40} cy={362} r="16" fill={accent} opacity={0.1 + i * 0.08} />
      ))}
      <rect x="300" y="420" width="200" height="30" rx="4" fill="#FAFAFA" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={316 + i * 38} y={432} width="12" height="12" rx="3" fill="#DDDDDD" />
      ))}
      <rect x="40" y="80" width="200" height="340" rx="16" fill="white" />
      <rect x="60" y="100" width="80" height="10" rx="5" fill="#CCCCCC" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="60" y={140 + i * 52} width="160" height="40" rx="8" fill="#F8F8F8" />
          <rect x="72" y={152 + i * 52} width="60" height="6" rx="3" fill="#CCCCCC" />
          <rect x="72" y={166 + i * 52} width="40" height="8" rx="4" fill={accent} opacity="0.4" />
        </g>
      ))}
      <rect x="560" y="80" width="200" height="340" rx="16" fill="white" />
      <rect x="580" y="100" width="80" height="10" rx="5" fill="#CCCCCC" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="580" y={140 + i * 80} width="160" height="60" rx="10" fill="#F8F8F8" />
          <rect x="600" y={158 + i * 80} width="80" height="8" rx="4" fill="#CCCCCC" />
          <rect x="600" y={178 + i * 80} width="50" height="16" rx="8" fill={accent} opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}

function BrowserFrame({
  children,
  title,
  fitHeight = false,
}: {
  children: React.ReactNode;
  title: string;
  fitHeight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-[#111111] shadow-2xl overflow-hidden ${
        fitHeight ? "w-[94%]" : "w-full"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0D0D0D] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="mx-auto flex-1 text-center">
          <div className="mx-auto flex h-6 max-w-xs items-center rounded-md bg-white/[0.05] px-3 text-[10px] text-white/30 border border-white/[0.06]">
            {title.toLowerCase().replace(/\s/g, "")}.com
          </div>
        </div>
        <div className="w-14" />
      </div>
      <div className="aspect-[16/10] w-full">{children}</div>
    </div>
  );
}

function PhoneFrame({
  children,
  fitHeight = false,
}: {
  children: React.ReactNode;
  fitHeight?: boolean;
}) {
  return (
    <div
      className={
        fitHeight
          ? "flex h-full w-full items-center justify-center"
          : "mx-auto w-full max-w-[280px]"
      }
    >
      {/* fitHeight: stretch to the parent height, width follows the 9/19 ratio.
          Default: width-driven (max 280px), height follows the ratio. */}
      <div
        className={`rounded-[2rem] border-4 border-[#222] bg-[#1A1A1A] p-2 shadow-2xl ${
          fitHeight ? "aspect-[9/19] w-auto self-stretch" : "w-full"
        }`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#0D0D0D]">
          <div className="absolute top-0 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-[#222]" />
          {children}
        </div>
      </div>
    </div>
  );
}

function LaptopFrame({
  children,
  title,
  fitHeight = false,
}: {
  children: React.ReactNode;
  title: string;
  fitHeight?: boolean;
}) {
  return (
    <div className={`relative mx-auto ${fitHeight ? "w-[80%]" : "max-w-2xl"}`}>
      <div className="rounded-t-2xl border-4 border-[#333] bg-[#222] pb-1 pt-1 shadow-2xl">
        <div className="overflow-hidden rounded-t-xl">{children}</div>
      </div>
      <div className="h-4 rounded-b-2xl bg-gradient-to-b from-[#2A2A2A] to-[#222]" />
      <div className="mx-auto h-2 w-32 rounded-b-xl bg-[#1A1A1A]" />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1A1A1A] border border-white/[0.06] px-3 py-1 text-[10px] font-medium text-white/60">
        {title}
      </div>
    </div>
  );
}

const visuals = {
  dashboard: DashboardVisual,
  chatbot: ChatbotVisual,
  brand: BrandVisual,
  automation: AutomationVisual,
  video: VideoVisual,
  ecommerce: EcommerceVisual,
  search: SearchVisual,
  social: SocialVisual,
};

export default function ProjectMockup({
  projectSlug,
  category,
  device,
  fitHeight,
  className = "",
}: ProjectMockupProps) {
  const config = projectVisuals[projectSlug] || {
    device: "browser" as DeviceType,
    title: category,
    accent: "#6C3AED",
    elements: "dashboard" as const,
  };
  const effectiveDevice = device || config.device;
  const Visual = visuals[config.elements];

  const mockup =
    projectSlug === "shiltr-cafe" ? (
      <motion.div className={className} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.4, ease: "easeOut" }}>
        <ShiltrVisual />
      </motion.div>
    ) : projectSlug === "nexenity-website" ? (
      <motion.div className={className} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.4, ease: "easeOut" }}>
        <NexenityVisual />
      </motion.div>
    ) : (
      <motion.div
        className={className}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Visual accent={config.accent} />
      </motion.div>
    );

  if (effectiveDevice === "phone") {
    return <PhoneFrame fitHeight={fitHeight}>{mockup}</PhoneFrame>;
  }
  if (effectiveDevice === "laptop") {
    return <LaptopFrame title={config.title} fitHeight={fitHeight}>{mockup}</LaptopFrame>;
  }
  return <BrowserFrame title={config.title} fitHeight={fitHeight}>{mockup}</BrowserFrame>;
}

export { projectVisuals };
