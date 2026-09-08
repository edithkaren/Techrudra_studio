export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  client: string;
  role: string;
  image: string;
  gallery: string[];
  technologies: string[];
  year: string;
  featured: boolean;
}

export const portfolioCategories = [
  "All",
  "Websites",
  "AI",
  "Branding",
  "Video",
  "Marketing",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "Meridian",
    slug: "meridian-saas",
    category: "Websites",
    description:
      "Full product design and build for an analytics platform that helps early-stage startups track what matters.",
    longDescription:
      "Meridian needed a clean, intuitive analytics dashboard that made complex data feel simple. We designed and built the entire product from scratch — a responsive web app with real-time charts, custom reporting, and seamless onboarding. The result: a product that investors loved and users stuck with.",
    client: "Meridian Analytics",
    role: "Full-Stack Development, UI/UX Design, Product Strategy",
    image: "",
    gallery: [],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    year: "2026",
    featured: true,
  },
  {
    id: "2",
    title: "Novalith",
    slug: "novalith-ai-agent",
    category: "AI",
    description:
      "Custom AI assistant with knowledge-base retrieval for a B2B SaaS support workflow.",
    longDescription:
      "Novalith's support team was drowning in repetitive tickets. We built a custom AI agent that reads their entire knowledge base and gives instant, accurate answers to customers — triaging complex issues to humans automatically. Support volume dropped 60% in the first month.",
    client: "Novalith Technologies",
    role: "AI Development, Integration, Fine-Tuning",
    image: "",
    gallery: [],
    technologies: ["OpenAI", "Python", "Pinecone", "Next.js"],
    year: "2026",
    featured: true,
  },
  {
    id: "3",
    title: "Velvet Studio",
    slug: "velvet-studio-branding",
    category: "Branding",
    description:
      "Complete visual identity system for a creative production studio.",
    longDescription:
      "Velvet Studio wanted an identity that felt both premium and approachable. We developed a full brand system — logo, typography, color palette, photography direction, and a comprehensive brand guidelines document. Everything from business cards to social templates.",
    client: "Velvet Studio",
    role: "Brand Strategy, Visual Identity, Design Systems",
    image: "",
    gallery: [],
    technologies: ["Figma", "Illustrator", "After Effects"],
    year: "2025",
    featured: false,
  },
  {
    id: "4",
    title: "Pulse",
    slug: "pulse-automation",
    category: "Marketing",
    description:
      "Automated lead-nurture engine built for a D2C brand with 3× conversion lift.",
    longDescription:
      "Pulse's marketing team was spending hours on manual follow-ups. We designed an end-to-end automation workflow — from lead capture to personalized nurture sequences to sales handoff — that runs 24/7. Conversions tripled. Time spent on manual outreach dropped to near zero.",
    client: "Pulse Direct",
    role: "Marketing Automation, Workflow Design, Analytics",
    image: "",
    gallery: [],
    technologies: ["n8n", "Make", "Zapier", "Webhooks"],
    year: "2025",
    featured: true,
  },
  {
    id: "5",
    title: "Kinetic",
    slug: "kinetic-product-film",
    category: "Video",
    description:
      "Hero product film combining live-action footage with 3D motion graphics.",
    longDescription:
      "Kinetic needed a show-stopping product film for their launch. We directed and produced a hero video blending live-action product shots with cinematic 3D motion graphics — the kind of piece that stops people mid-scroll and makes them want to learn more.",
    client: "Kinetic Labs",
    role: "Video Direction, Motion Graphics, Post-Production",
    image: "",
    gallery: [],
    technologies: ["After Effects", "Premiere Pro", "Cinema 4D"],
    year: "2025",
    featured: false,
  },
  {
    id: "6",
    title: "Ostra",
    slug: "ostra-ecommerce",
    category: "Websites",
    description:
      "Headless commerce build for a sustainable fashion brand with a custom checkout flow.",
    longDescription:
      "Ostra is a sustainable fashion brand that needed an e-commerce experience as thoughtful as their products. We built a headless commerce site with a blazing-fast frontend, custom checkout, inventory management, and a content-rich shopping experience that conversion-tested beautifully.",
    client: "Ostra Fashion",
    role: "E-Commerce Development, UI/UX, Payment Integration",
    image: "",
    gallery: [],
    technologies: ["Next.js", "Stripe", "Sanity", "Tailwind"],
    year: "2026",
    featured: true,
  },
  {
    id: "7",
    title: "Cortex",
    slug: "cortex-ai-search",
    category: "AI",
    description:
      "Semantic search system for a knowledge-heavy SaaS product.",
    longDescription:
      "Cortex's users were struggling to find what they needed in a massive documentation library. We built a semantic search engine powered by vector embeddings and AI ranking — turning keyword frustration into natural-language discovery that feels almost magical.",
    client: "Cortex Systems",
    role: "AI Search Architecture, Backend Development",
    image: "",
    gallery: [],
    technologies: ["Gemini", "Vector DB", "Node.js", "React"],
    year: "2026",
    featured: false,
  },
  {
    id: "8",
    title: "Atelier",
    slug: "atelier-social",
    category: "Marketing",
    description:
      "Social media campaign strategy and creative execution for a lifestyle brand launch.",
    longDescription:
      "Atelier was launching a new lifestyle brand and needed a social presence that felt both polished and personal. We built the full campaign — content strategy, visual direction, creative assets, and posting schedule — resulting in strong engagement from day one.",
    client: "Atelier Living",
    role: "Social Strategy, Creative Direction, Content Production",
    image: "",
    gallery: [],
    technologies: ["Figma", "After Effects", "Analytics"],
    year: "2025",
    featured: false,
  },
];
