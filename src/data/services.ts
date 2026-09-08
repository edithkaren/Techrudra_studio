export interface Service {
  id: number;
  number: string;
  title: string;
  summary: string;
  details: string[];
  tools: string[];
}

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Full-Stack Web Development",
    summary:
      "Business websites, SaaS platforms, web applications, e-commerce stores, dashboards, and startup MVPs.",
    details: [
      "React & Next.js applications",
      "Node.js / TypeScript backends",
      "Database design (PostgreSQL, MongoDB, Supabase)",
      "Authentication & payments",
      "Performance optimization",
    ],
    tools: ["React", "Next.js", "Node.js", "TypeScript", "Supabase", "Firebase"],
  },
  {
    id: 2,
    number: "02",
    title: "AI Chatbots & AI Applications",
    summary:
      "AI assistants, customer-support bots, knowledge-base systems, and AI-powered web products.",
    details: [
      "Conversational AI agents",
      "Retrieval-augmented generation",
      "Custom AI workflows",
      "AI-powered search",
    ],
    tools: ["OpenAI", "Gemini", "Claude", "Vector Databases"],
  },
  {
    id: 3,
    number: "03",
    title: "AI Automation",
    summary:
      "Automated workflows for marketing, sales, lead generation, content creation, and business operations.",
    details: [
      "Marketing automation pipelines",
      "Lead-generation funnels",
      "Content and social scheduling",
      "Business operations workflows",
    ],
    tools: ["n8n", "Make", "Zapier", "Webhooks", "AI APIs"],
  },
  {
    id: 4,
    number: "04",
    title: "UI/UX Design",
    summary:
      "Website interfaces, SaaS dashboards, landing pages, mobile apps, and design systems.",
    details: [
      "User research & wireframes",
      "High-fidelity UI design",
      "Prototyping & interaction design",
      "Design systems & component libraries",
    ],
    tools: ["Figma", "Framer", "Tailwind"],
  },
  {
    id: 5,
    number: "05",
    title: "Graphic & Motion Design",
    summary:
      "Brand graphics, social media creatives, motion graphics, promotional visuals, and animated content.",
    details: [
      "Brand visual assets",
      "Social media creatives",
      "Motion graphics & animated visuals",
      "Promotional graphics",
    ],
    tools: ["Figma", "After Effects", "Illustrator", "Canva"],
  },
  {
    id: 6,
    number: "06",
    title: "Video Creation & Editing",
    summary:
      "Product videos, short-form content, YouTube videos, promotional films, and AI-assisted video production.",
    details: [
      "Short-form reels & social clips",
      "YouTube & long-form editing",
      "Product & SaaS promo videos",
      "AI-powered video production",
    ],
    tools: ["Premiere Pro", "After Effects", "AI Video Tools"],
  },
  {
    id: 7,
    number: "07",
    title: "Digital Marketing",
    summary:
      "SEO, content strategy, lead generation, email marketing, conversion optimization, and growth strategy.",
    details: [
      "SEO & organic growth",
      "Content strategy & execution",
      "Email marketing & automation",
      "Analytics & conversion optimization",
    ],
    tools: ["Google Analytics", "SEO Tools", "Email Platforms"],
  },
  {
    id: 8,
    number: "08",
    title: "Social Media Marketing",
    summary:
      "Instagram management, LinkedIn content, content calendars, reels strategy, and community growth.",
    details: [
      "Platform-specific content strategy",
      "Reels & short-form planning",
      "Community management",
      "Campaign analytics",
    ],
    tools: ["Instagram", "LinkedIn", "Analytics Tools", "Canva"],
  },
];
