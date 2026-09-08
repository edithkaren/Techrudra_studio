export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
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
    title: "Meridian — SaaS Platform",
    slug: "meridian-saas",
    category: "Websites",
    description:
      "End-to-end product design and development for an analytics platform serving early-stage startups.",
    image: "",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    year: "2026",
    featured: true,
  },
  {
    id: "2",
    title: "Novalith — AI Agent",
    slug: "novalith-ai-agent",
    category: "AI",
    description:
      "Custom AI assistant with knowledge-base retrieval for a B2B SaaS support workflow.",
    image: "",
    technologies: ["OpenAI", "Python", "Pinecone", "Next.js"],
    year: "2026",
    featured: true,
  },
  {
    id: "3",
    title: "Velvet Studio — Brand Identity",
    slug: "velvet-studio-branding",
    category: "Branding",
    description:
      "Complete visual identity system for a creative production studio.",
    image: "",
    technologies: ["Figma", "Illustrator", "After Effects"],
    year: "2025",
    featured: false,
  },
  {
    id: "4",
    title: "Pulse — Marketing Automation",
    slug: "pulse-automation",
    category: "Marketing",
    description:
      "Automated lead-nurture engine built for a D2C brand with 3× conversion lift.",
    image: "",
    technologies: ["n8n", "Make", "Zapier", "Webhooks"],
    year: "2025",
    featured: true,
  },
  {
    id: "5",
    title: "Kinetic — Product Film",
    slug: "kinetic-product-film",
    category: "Video",
    description:
      "Hero product film combining live-action footage with 3D motion graphics.",
    image: "",
    technologies: ["After Effects", "Premiere Pro", "Cinema 4D"],
    year: "2025",
    featured: false,
  },
  {
    id: "6",
    title: "Ostra — E-commerce",
    slug: "ostra-ecommerce",
    category: "Websites",
    description:
      "Headless commerce build for a sustainable fashion brand with custom checkout flow.",
    image: "",
    technologies: ["Next.js", "Stripe", "Sanity", "Tailwind"],
    year: "2026",
    featured: true,
  },
  {
    id: "7",
    title: "Cortex — AI Search",
    slug: "cortex-ai-search",
    category: "AI",
    description:
      "Semantic search system for a knowledge-heavy SaaS product.",
    image: "",
    technologies: ["Gemini", "Vector DB", "Node.js", "React"],
    year: "2026",
    featured: false,
  },
  {
    id: "8",
    title: "Atelier — Social Campaign",
    slug: "atelier-social",
    category: "Marketing",
    description:
      "Social media campaign strategy and creative execution for a lifestyle brand launch.",
    image: "",
    technologies: ["Figma", "After Effects", "Analytics"],
    year: "2025",
    featured: false,
  },
];
