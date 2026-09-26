/**
 * Site-wide configuration: social links, testimonials, availability.
 * All values are editable — no fabricated links or testimonials.
 */

export interface SocialLink {
  label: string;
  href: string | null; // null = not configured yet; UI hides nulls
}

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/techrudra.studio" },
  { label: "LinkedIn", href: "https://linkedin.com/company/techrudra-studio" },
  { label: "GitHub", href: "https://github.com/techrudra-studio" },
  { label: "X", href: "https://twitter.com/techrudra_studio" },
  { label: "YouTube", href: "https://youtube.com/@techrudra.studio" },
  { label: "Behance", href: null },
  { label: "Dribbble", href: "https://dribbble.com/techrudra-studio" },
];

export const availability = {
  status: "AVAILABLE FOR PROJECTS" as const,
  subtext: "Currently accepting selected freelance projects",
  responseTime: "< 24 hours",
  location: "Remote • Worldwide",
};

/**
 * Testimonials — replace placeholders with genuine quotes.
 * `quote: null` entries render nothing; add real ones as they come in.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  projectType: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Add your first genuine client testimonial here. Real quote, real name, real project.",
    name: "Placeholder",
    role: "Role",
    company: "Company",
    projectType: "Project Type",
    initials: "PH",
  },
];

export const hasRealTestimonials = false; // flip to true when real ones are added
