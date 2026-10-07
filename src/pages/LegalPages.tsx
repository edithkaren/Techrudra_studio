import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/site";

interface LegalSection {
  heading: string;
  body: string[];
}

const lastUpdated = "October 2026";

const termsSections: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      `By accessing or using the ${siteConfig.name} website and its services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use the site.`,
    ],
  },
  {
    heading: "2. Services",
    body: [
      `${siteConfig.name} provides creative technology services including web design and development, AI and automation solutions, branding, and motion design. Project scope, timelines, and deliverables are governed by the separate agreement or statement of work agreed upon for each engagement.`,
    ],
  },
  {
    heading: "3. Use of the Website",
    body: [
      "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, or restrict the use of this site by, any third party.",
      "You may not attempt to gain unauthorized access to any part of the site, its servers, or any connected systems.",
    ],
  },
  {
    heading: "4. Intellectual Property",
    body: [
      `All content on this site — including text, graphics, logos, animations, and code — is the property of ${siteConfig.name} or its licensors and is protected by applicable intellectual property laws.`,
      "Portfolio projects displayed on this site may include client work used with permission; ownership of delivered project assets remains with the respective clients as per their agreements.",
    ],
  },
  {
    heading: "5. Links to Third-Party Sites",
    body: [
      "This site may contain links to external websites (such as live project demos and repositories). We are not responsible for the content or practices of those third-party sites.",
    ],
  },
  {
    heading: "6. Limitation of Liability",
    body: [
      `The website is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, ${siteConfig.name} shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site.`,
    ],
  },
  {
    heading: "7. Changes to These Terms",
    body: [
      "We may update these Terms & Conditions from time to time. Changes take effect when posted on this page. Continued use of the site after changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "8. Contact",
    body: [
      `Questions about these terms? Reach us at ${siteConfig.email}.`,
    ],
  },
];

const privacySections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: [
      "When you use this site, we may collect information you provide directly — such as your email address when you sign in or get in touch — and basic technical data such as browser type, device, and pages visited.",
      "We never ask for payment card details through this website.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: [
      "To provide and improve the website and its features.",
      "To respond to your enquiries and send you messages related to your requests (e.g. sign-in codes).",
      "To understand aggregate usage trends so we can improve the experience.",
    ],
  },
  {
    heading: "3. Data Sharing",
    body: [
      "We do not sell your personal data. We only share information with service providers who help us operate the site (for example, hosting and authentication), and only to the extent necessary to provide those services.",
    ],
  },
  {
    heading: "4. Data Security",
    body: [
      "We use reasonable technical and organizational measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "5. Cookies & Local Storage",
    body: [
      "This site may use cookies or local storage to keep you signed in and to remember preferences. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "6. Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal data at any time by contacting us. We will respond within a reasonable timeframe.",
    ],
  },
  {
    heading: "7. Retention",
    body: [
      "We keep personal data only for as long as needed to fulfil the purposes described here, unless a longer retention period is required by law.",
    ],
  },
  {
    heading: "8. Contact",
    body: [
      `For privacy-related questions, reach us at ${siteConfig.email}.`,
    ],
  },
];

function LegalLayout({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden bg-[#0A0A0A] pt-36 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">{eyebrow}</p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">{intro}</p>
            <p className="mt-3 text-xs text-white/35">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#0A0A0A] pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: "easeOut" }}
                className="border-b border-white/[0.05] py-6 first:pt-0 last:border-b-0 last:pb-0"
              >
                <h2 className="mb-3 text-lg font-semibold text-white">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mb-2 text-sm leading-relaxed text-white/55 last:mb-0">
                    {p}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro={`The terms that govern your use of the ${siteConfig.name} website and services.`}
      sections={termsSections}
    />
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How we collect, use, and protect your information when you visit our site."
      sections={privacySections}
    />
  );
}
