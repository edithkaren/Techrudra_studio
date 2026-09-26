import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AstraBackground from "@/components/AstraBackground";
import Marquee from "@/components/Marquee";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import LiquidFilters from "@/components/liquid/LiquidFilters";
import FluidSectionDivider from "@/components/motion/FluidSectionDivider";
import KineticText from "@/components/motion/KineticText";
import ScrollReveal from "@/components/motion/ScrollReveal";
import {
  WhatIBuild,
  ProblemSolution,
  ProcessTimeline,
  BuildInPublicSection,
  Toolbox,
  WhyMe,
  MetricsBand,
  WhoIBuildFor,
  TrustSection,
} from "@/components/HomeSections";
import { CreativeLab, ServiceSelector } from "@/components/CreativeLab";
import ProjectBrief from "@/components/ProjectBrief";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <LiquidFilters />
      <ScrollProgress />
      <AstraBackground />
      <Navbar />
      <main>
        {/* ── DISCOVER ─────────────────────────────────────────── */}
        <Hero />
        <Marquee />

        {/* ── UNDERSTAND ───────────────────────────────────────── */}
        <WhatIBuild />
        <ProblemSolution />

        {/* ── TRUST ────────────────────────────────────────────── */}
        <FeaturedShowcase />
        <FluidSectionDivider h={64} accent="#A78BFA" bg="#0A0A0A" layers={2} flip />
        <Portfolio />
        <MetricsBand />

        {/* ── EXPLORE ──────────────────────────────────────────── */}
        <ProcessTimeline />
        <FluidSectionDivider h={56} accent="#A78BFA" bg="#0A0A0A" layers={2} />
        <Services />
        <ServiceSelector />
        <CreativeLab />
        <BuildInPublicSection />
        <Toolbox />
        <WhyMe />
        <WhoIBuildFor />
        <TrustSection />

        {/* ── CONTACT ──────────────────────────────────────────── */}
        <ProjectBrief />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
