/**
 * Homepage section content. Edit here — UI reads from these objects.
 */

export const heroRotatingWords = ["BUILD", "DESIGN", "AUTOMATE", "CREATE", "GROW"];

export interface BuildCard {
  icon: string;
  title: string;
  tagline: string;
  items: string[];
  color: string;
}

export const buildCards: BuildCard[] = [
  {
    icon: "Layers",
    title: "Digital Products",
    tagline: "Websites, SaaS, e-commerce, dashboards & MVPs",
    items: ["Websites", "SaaS", "E-commerce", "Dashboards", "MVPs"],
    color: "#A78BFA",
  },
  {
    icon: "Brain",
    title: "AI Systems",
    tagline: "Chatbots, agents, AI search & assistants",
    items: ["AI Chatbots", "AI Agents", "AI Applications", "AI Search", "AI Assistants"],
    color: "#60A5FA",
  },
  {
    icon: "Workflow",
    title: "Automation",
    tagline: "AI workflows that remove repetitive work",
    items: ["AI Workflows", "Marketing Automation", "Lead Automation", "Business Automation"],
    color: "#2DD4BF",
  },
  {
    icon: "Palette",
    title: "Creative Experiences",
    tagline: "Interfaces, identity, motion & video",
    items: ["UI/UX", "Branding", "Motion", "Video", "Creative Development"],
    color: "#F472B6",
  },
  {
    icon: "TrendingUp",
    title: "Digital Growth",
    tagline: "SEO, content, social & lead generation",
    items: ["SEO", "Content", "Social Media", "Digital Marketing", "Lead Generation"],
    color: "#FB923C",
  },
];

export interface ProblemSolution {
  problem: string;
  solution: string;
  color: string;
}

export const problemSolutions: ProblemSolution[] = [
  {
    problem: "Your website isn't converting.",
    solution:
      "I design and build conversion-focused digital experiences that combine UX, performance and strong messaging.",
    color: "#F87171",
  },
  {
    problem: "Your business has too much repetitive work.",
    solution:
      "I create AI-powered workflows that automate repetitive tasks and connect your tools.",
    color: "#FB923C",
  },
  {
    problem: "Your brand doesn't stand out.",
    solution:
      "I build visual identities, creative systems, motion graphics and content designed around your brand.",
    color: "#F472B6",
  },
  {
    problem:
      "Your Instagram generates conversations but loses leads.",
    solution:
      "I build automation systems that help organize conversations, qualify leads and automate supported workflows.",
    color: "#60A5FA",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  color: string;
}

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Discover", description: "Understand the business, audience and goals.", color: "#A78BFA" },
  { number: "02", title: "Strategy", description: "Define the product, technology and growth strategy.", color: "#8B5CF6" },
  { number: "03", title: "Design", description: "Create UX, UI, branding and interaction systems.", color: "#60A5FA" },
  { number: "04", title: "Build", description: "Develop the website, product, AI system or automation.", color: "#2DD4BF" },
  { number: "05", title: "Launch", description: "Test, optimize and deploy.", color: "#F472B6" },
  { number: "06", title: "Grow", description: "Improve performance, marketing, automation and conversion.", color: "#FB923C" },
];

export interface LabExperiment {
  title: string;
  description: string;
  color: string;
  x: string;
  y: string;
}

export const labExperiments: LabExperiment[] = [
  { title: "AI Agents", description: "Autonomous assistants", color: "#60A5FA", x: "6%", y: "18%" },
  { title: "Generative AI", description: "Image & text systems", color: "#A78BFA", x: "34%", y: "8%" },
  { title: "3D Web", description: "Immersive scenes", color: "#F472B6", x: "64%", y: "16%" },
  { title: "Motion Design", description: "Kinetic storytelling", color: "#2DD4BF", x: "12%", y: "55%" },
  { title: "Automation", description: "Self-running systems", color: "#FB923C", x: "42%", y: "62%" },
  { title: "Experimental UI", description: "New interaction models", color: "#C084FC", x: "70%", y: "58%" },
  { title: "AI Video", description: "Generated film", color: "#F87171", x: "24%", y: "84%" },
  { title: "Creative Coding", description: "Code as a canvas", color: "#60A5FA", x: "55%", y: "88%" },
];

export interface BuildInPublic {
  status: "BUILDING" | "EXPERIMENTING" | "RESEARCHING";
  title: string;
  progress: number;
  color: string;
  note: string;
}

export const buildInPublic: BuildInPublic[] = [
  {
    status: "BUILDING",
    title: "AI Creator Automation",
    progress: 68,
    color: "#2DD4BF",
    note: "Instagram DM → CRM pipeline with AI lead qualification.",
  },
  {
    status: "EXPERIMENTING",
    title: "AI Content OS",
    progress: 42,
    color: "#FBBF24",
    note: "One brief → full content pack: captions, scripts, thumbnails.",
  },
  {
    status: "RESEARCHING",
    title: "AI Agent Platform",
    progress: 25,
    color: "#60A5FA",
    note: "Multi-agent orchestration patterns for small teams.",
  },
];

export interface ToolCategory {
  name: string;
  tools: { name: string; color: string }[];
}

export const toolbox: ToolCategory[] = [
  {
    name: "Development",
    tools: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#FFFFFF" },
      { name: "Node.js", color: "#8CC84B" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Tailwind", color: "#38BDF8" },
    ],
  },
  {
    name: "AI",
    tools: [
      { name: "OpenAI", color: "#10A37F" },
      { name: "Gemini", color: "#4E8CF7" },
      { name: "Claude", color: "#D97757" },
      { name: "AI APIs", color: "#A78BFA" },
    ],
  },
  {
    name: "Automation",
    tools: [
      { name: "n8n", color: "#EA4B71" },
      { name: "Make", color: "#6D00CC" },
      { name: "Zapier", color: "#FF4F00" },
    ],
  },
  {
    name: "Database",
    tools: [
      { name: "Supabase", color: "#3ECF8E" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "MongoDB", color: "#47A248" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "MySQL", color: "#00758F" },
    ],
  },
  {
    name: "Design",
    tools: [
      { name: "Figma", color: "#F24E1E" },
      { name: "Adobe", color: "#FF0000" },
      { name: "Canva", color: "#00C4CC" },
    ],
  },
  {
    name: "Video",
    tools: [
      { name: "Premiere Pro", color: "#9999FF" },
      { name: "After Effects", color: "#CF96FD" },
      { name: "AI Video Tools", color: "#A78BFA" },
    ],
  },
];

export interface AudienceCard {
  title: string;
  description: string;
  color: string;
}

export const audiences: AudienceCard[] = [
  { title: "Startups", description: "Turn ideas into MVPs.", color: "#A78BFA" },
  { title: "Small Businesses", description: "Build a stronger digital presence.", color: "#60A5FA" },
  { title: "Creators", description: "Automate workflows and content systems.", color: "#F472B6" },
  { title: "Founders", description: "Build and launch products faster.", color: "#2DD4BF" },
  { title: "Agencies", description: "Extend technical and creative capabilities.", color: "#FB923C" },
  { title: "Personal Brands", description: "Build a complete digital ecosystem.", color: "#C084FC" },
];

export interface WhyCard {
  title: string;
  description: string;
  color: string;
}

export const whyCards: WhyCard[] = [
  {
    title: "One Person. Multiple Disciplines.",
    description: "Development + AI + Design + Growth in a single, cohesive workflow.",
    color: "#A78BFA",
  },
  {
    title: "AI-First Mindset.",
    description: "Use AI to build faster and smarter — not as an afterthought.",
    color: "#60A5FA",
  },
  {
    title: "Design + Technology.",
    description: "Beautiful interfaces backed by strong engineering.",
    color: "#F472B6",
  },
  {
    title: "Business-Focused.",
    description: "Build around actual goals, not just aesthetics.",
    color: "#2DD4BF",
  },
];

export interface Metric {
  value: number | null; // null renders the raw `raw` string (e.g. ∞)
  raw?: string;
  suffix?: string;
  label: string;
  color: string;
}

export const metrics: Metric[] = [
  { value: 50, suffix: "+", label: "Projects & Experiments", color: "#A78BFA" },
  { value: 10, suffix: "+", label: "Digital Solutions", color: "#60A5FA" },
  { value: null, raw: "Multiple", suffix: "", label: "Industries", color: "#F472B6" },
  { value: null, raw: "∞", suffix: "", label: "Ideas to Build", color: "#FB923C" },
];

/* ── Service selector ─────────────────────────────────────────── */

export interface ServiceSelectorOption {
  id: string;
  emoji: string;
  label: string;
  build: string[];
  deliverables: string[];
  approach: string;
  technologies: string[];
}

export const serviceSelectorOptions: ServiceSelectorOption[] = [
  {
    id: "website",
    emoji: "🌐",
    label: "Website",
    build: [
      "Marketing sites that load in under a second",
      "Conversion-focused landing pages",
      "E-commerce and headless storefronts",
      "SaaS dashboards and web apps",
    ],
    deliverables: ["Design + build", "CMS setup", "SEO foundation", "Analytics wiring"],
    approach:
      "Strategy → UX wireframes → high-fidelity design → production build → launch and iterate.",
    technologies: ["React", "Next.js", "Tailwind", "Vite"],
  },
  {
    id: "ai-product",
    emoji: "🤖",
    label: "AI Product",
    build: [
      "Custom chatbots trained on your data",
      "Autonomous AI agents for real workflows",
      "AI-powered search and recommendations",
      "Internal AI tools for your team",
    ],
    deliverables: ["AI architecture plan", "Working prototype", "Production integration", "Guardrails & evals"],
    approach:
      "Define jobs-to-be-done → model & data strategy → prototype → evaluate → ship with monitoring.",
    technologies: ["OpenAI", "Gemini", "Claude", "Vector DBs", "Node.js"],
  },
  {
    id: "automation",
    emoji: "⚡",
    label: "Automation",
    build: [
      "Lead capture → CRM → follow-up pipelines",
      "Content generation and scheduling systems",
      "Internal ops workflows that run themselves",
      "AI agents connected to your tools",
    ],
    deliverables: ["Workflow audit", "Automated pipeline", "Integrations", "Docs + handoff"],
    approach:
      "Map the manual process → design the trigger/flow → automate → monitor and improve.",
    technologies: ["n8n", "Make", "Zapier", "Webhooks", "AI APIs"],
  },
  {
    id: "design",
    emoji: "🎨",
    label: "Design",
    build: [
      "Complete UI/UX for web and mobile",
      "Design systems and component libraries",
      "Brand identities and guidelines",
      "Motion and interaction design",
    ],
    deliverables: ["Wireframes", "Hi-fi UI", "Prototype", "Design system"],
    approach:
      "Research → information architecture → wireframes → visual design → prototype → dev handoff.",
    technologies: ["Figma", "Framer", "After Effects"],
  },
  {
    id: "video",
    emoji: "🎬",
    label: "Video",
    build: [
      "Product films and launch videos",
      "Short-form reels engineered for retention",
      "Motion graphics and animated explainers",
      "AI-assisted video production",
    ],
    deliverables: ["Script + storyboard", "Edit + motion", "Sound design", "Platform cutdowns"],
    approach:
      "Concept → script → production → edit → motion polish → platform-specific exports.",
    technologies: ["Premiere Pro", "After Effects", "AI Video Tools"],
  },
  {
    id: "marketing",
    emoji: "📈",
    label: "Marketing",
    build: [
      "SEO and organic growth systems",
      "Content engines that compound",
      "Social media strategy and execution",
      "Lead generation funnels",
    ],
    deliverables: ["Growth audit", "Channel strategy", "Content system", "Reporting dashboard"],
    approach:
      "Audience research → positioning → channel plan → content production → measure → double down.",
    technologies: ["Analytics", "SEO Tools", "Email Platforms"],
  },
];
