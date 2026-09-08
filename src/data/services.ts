export interface Service {
  id: number;
  number: string;
  title: string;
  summary: string;
  details: string[];
  tools: string[];
  price: string;
  duration: string;
}

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Full-Stack Web Development",
    summary:
      "Websites, SaaS platforms, web apps, e-commerce stores, dashboards, and startup MVPs — built to perform and designed to impress.",
    details: [
      "React & Next.js applications",
      "Node.js / TypeScript backends",
      "Database design (PostgreSQL, MongoDB, Supabase)",
      "Authentication & payments",
      "Performance optimization",
    ],
    tools: ["React", "Next.js", "Node.js", "TypeScript", "Supabase", "Firebase"],
    price: "From $2,500",
    duration: "2–8 weeks",
  },
  {
    id: 2,
    number: "02",
    title: "AI Chatbots & AI Applications",
    summary:
      "AI assistants, support bots, knowledge-base systems, and intelligent web products that work around the clock.",
    details: [
      "Conversational AI agents",
      "Retrieval-augmented generation",
      "Custom AI workflows",
      "AI-powered search",
    ],
    tools: ["OpenAI", "Gemini", "Claude", "Vector Databases"],
    price: "From $3,000",
    duration: "2–6 weeks",
  },
  {
    id: 3,
    number: "03",
    title: "AI Automation",
    summary:
      "Automated workflows for marketing, sales, lead generation, content creation, and business operations — so you can focus on growth.",
    details: [
      "Marketing automation pipelines",
      "Lead-generation funnels",
      "Content and social scheduling",
      "Business operations workflows",
    ],
    tools: ["n8n", "Make", "Zapier", "Webhooks", "AI APIs"],
    price: "From $1,500",
    duration: "1–4 weeks",
  },
  {
    id: 4,
    number: "04",
    title: "UI/UX Design",
    summary:
      "Interfaces that feel intuitive and look stunning — websites, SaaS dashboards, mobile apps, and design systems.",
    details: [
      "User research & wireframes",
      "High-fidelity UI design",
      "Prototyping & interaction design",
      "Design systems & component libraries",
    ],
    tools: ["Figma", "Framer", "Tailwind"],
    price: "From $1,800",
    duration: "1–4 weeks",
  },
  {
    id: 5,
    number: "05",
    title: "Graphic & Motion Design",
    summary:
      "Brand graphics, social media creatives, motion graphics, and animated visuals that make your brand unmissable.",
    details: [
      "Brand visual assets",
      "Social media creatives",
      "Motion graphics & animated visuals",
      "Promotional graphics",
    ],
    tools: ["Figma", "After Effects", "Illustrator", "Canva"],
    price: "From $800",
    duration: "1–3 weeks",
  },
  {
    id: 6,
    number: "06",
    title: "Video Creation & Editing",
    summary:
      "Product videos, short-form reels, YouTube content, and promotional films — with AI-powered production options.",
    details: [
      "Short-form reels & social clips",
      "YouTube & long-form editing",
      "Product & SaaS promo videos",
      "AI-powered video production",
    ],
    tools: ["Premiere Pro", "After Effects", "AI Video Tools"],
    price: "From $1,200",
    duration: "1–3 weeks",
  },
  {
    id: 7,
    number: "07",
    title: "Digital Marketing",
    summary:
      "SEO, content strategy, lead generation, email marketing, and conversion optimization — all dialed in for growth.",
    details: [
      "SEO & organic growth",
      "Content strategy & execution",
      "Email marketing & automation",
      "Analytics & conversion optimization",
    ],
    tools: ["Google Analytics", "SEO Tools", "Email Platforms"],
    price: "From $1,500/mo",
    duration: "Ongoing",
  },
  {
    id: 8,
    number: "08",
    title: "Social Media Marketing",
    summary:
      "Instagram management, LinkedIn content, reels strategy, content calendars, and community growth — all handled end to end.",
    details: [
      "Platform-specific content strategy",
      "Reels & short-form planning",
      "Community management",
      "Campaign analytics",
    ],
    tools: ["Instagram", "LinkedIn", "Analytics Tools", "Canva"],
    price: "From $1,200/mo",
    duration: "Ongoing",
  },
];
