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
  /** Live deployed site URL — set when the project is live. */
  liveUrl?: string;
  /** Public Git repository URL — set when the code is public. */
  repoUrl?: string;
  /** Placeholder card for an upcoming project. */
  comingSoon?: boolean;
}

export const portfolioCategories = [
  "All",
  "Websites",
  "AI",
  "Apps",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "PG Finder App",
    slug: "pg-finder-app",
    category: "Apps",
    description:
      "A paying-guest accommodation finder — search PGs by location, compare amenities, and book a stay with ease.",
    longDescription:
      "PG Finder helps students and working professionals discover paying-guest accommodation without the usual hassle. It supports location-based search, filters for budget and amenities, detailed PG listings with photos, and a smooth enquiry/booking flow. Built as a full mobile-first experience.",
    client: "—",
    role: "Full-Stack Development, UI/UX Design",
    image: "",
    gallery: [],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    year: "2025",
    featured: true,
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "2",
    title: "Shiltr Cafe",
    slug: "shiltr-cafe",
    category: "Websites",
    description:
      "Café website with an elegant menu showcase, gallery, and online reservation experience.",
    longDescription:
      "Shiltr Cafe needed a web presence that felt as warm and crafted as the café itself. The site features a visually rich menu, photo gallery, story section, and table reservations — all wrapped in a cozy, premium design that loads fast on mobile.",
    client: "Shiltr Cafe",
    role: "Web Design & Development",
    image: "",
    gallery: [],
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2025",
    featured: true,
    liveUrl: "",
    repoUrl: "https://github.com/edithkaren/SHILTR-Cafe",
  },
  {
    id: "3",
    title: "Jarvis",
    slug: "jarvis",
    category: "AI",
    description:
      "A personal AI assistant that understands voice commands and automates everyday tasks.",
    longDescription:
      "Jarvis is a voice-driven AI assistant inspired by the Iron Man aesthetic. It listens, understands natural language, answers questions, controls tasks, and integrates with web services — a personal AI that actually helps you get things done.",
    client: "—",
    role: "AI Development, Voice Integration",
    image: "",
    gallery: [],
    technologies: ["Python", "OpenAI", "Speech Recognition"],
    year: "2025",
    featured: true,
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "4",
    title: "Ultron",
    slug: "ultron",
    category: "AI",
    description:
      "An advanced AI system with conversational intelligence and task automation at its core.",
    longDescription:
      "Ultron is the bigger sibling of Jarvis — an advanced AI assistant built for deeper conversational intelligence, context retention, and multi-step task automation. Designed as a playground for exploring the frontier of what a personal AI system can do.",
    client: "—",
    role: "AI Development, Systems Architecture",
    image: "",
    gallery: [],
    technologies: ["Python", "LLMs", "Automation APIs"],
    year: "2026",
    featured: false,
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "5",
    title: "Techrudra Studio Website",
    slug: "techrudra-studio-website",
    category: "Websites",
    description:
      "Our own studio site — cinematic visuals, liquid motion, and an interactive portfolio experience.",
    longDescription:
      "The Techrudra Studio website is our flagship showcase: a cinematic dark experience with a nebula hero, liquid-distortion typography, bento-style interactive portfolio cards, and hand-crafted motion design across every section. Built with React, Tailwind, and Framer Motion.",
    client: "Techrudra Studio",
    role: "Design & Full-Stack Development",
    image: "",
    gallery: [],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Convex"],
    year: "2026",
    featured: true,
    liveUrl: "https://techrudra-studio.vercel.app",
    repoUrl: "https://github.com/edithkaren/Techrudra_studio",
  },
  {
    id: "6",
    title: "Nexenity Website",
    slug: "nexenity-website",
    category: "Websites",
    description:
      "Modern marketing site with bold typography, smooth scroll choreography, and conversion-focused design.",
    longDescription:
      "Nexenity needed a marketing site that felt cutting-edge and trustworthy. We delivered a bold, typography-driven design with scroll-triggered animations, clear product storytelling, and a conversion-optimized page structure.",
    client: "Nexenity",
    role: "Web Design & Development",
    image: "",
    gallery: [],
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2025",
    featured: false,
    liveUrl: "https://nexenity-tech.vercel.app",
    repoUrl: "https://github.com/edithkaren/nexenity-tech-",
  },
  {
    id: "7",
    title: "Cinematic Website",
    slug: "cinematic-website",
    category: "Websites",
    description:
      "A cinematic scroll experience — fullscreen visuals, parallax depth, and film-like transitions.",
    longDescription:
      "An experimental cinematic website built to feel like a film: fullscreen scenes, parallax camera moves, letterboxed layouts, and choreographed transitions that respond to scroll. A demonstration of how far the web can be pushed toward a movie-like experience.",
    client: "—",
    role: "Creative Development, Motion Design",
    image: "",
    gallery: [],
    technologies: ["React", "GSAP", "Framer Motion"],
    year: "2026",
    featured: false,
    liveUrl: "",
    repoUrl: "",
  },
];

/* Upcoming projects — rendered as "coming soon" placeholder cards */
export const upcomingProjects: PortfolioProject[] = [
  { id: "up-1", title: "Project 08", slug: "upcoming-1", category: "Websites", description: "Something new is brewing in the studio.", longDescription: "", client: "", role: "", image: "", gallery: [], technologies: [], year: "2026", featured: false, comingSoon: true },
  { id: "up-2", title: "Project 09", slug: "upcoming-2", category: "AI", description: "Something new is brewing in the studio.", longDescription: "", client: "", role: "", image: "", gallery: [], technologies: [], year: "2026", featured: false, comingSoon: true },
  { id: "up-3", title: "Project 10", slug: "upcoming-3", category: "Apps", description: "Something new is brewing in the studio.", longDescription: "", client: "", role: "", image: "", gallery: [], technologies: [], year: "2026", featured: false, comingSoon: true },
  { id: "up-4", title: "Project 11", slug: "upcoming-4", category: "Websites", description: "Something new is brewing in the studio.", longDescription: "", client: "", role: "", image: "", gallery: [], technologies: [], year: "2026", featured: false, comingSoon: true },
  { id: "up-5", title: "Project 12", slug: "upcoming-5", category: "AI", description: "Something new is brewing in the studio.", longDescription: "", client: "", role: "", image: "", gallery: [], technologies: [], year: "2026", featured: false, comingSoon: true },
];
