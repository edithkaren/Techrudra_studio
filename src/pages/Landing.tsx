import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AstraBackground from "@/components/AstraBackground";
import Marquee from "@/components/Marquee";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/motion/CustomCursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import LiquidFilters from "@/components/liquid/LiquidFilters";
import LiquidDivider from "@/components/liquid/LiquidDivider";
import FluidSectionDivider from "@/components/motion/FluidSectionDivider";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <LiquidFilters />
      <ScrollProgress />
      <AstraBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <FeaturedShowcase />
        <FluidSectionDivider h={72} accent="#A78BFA" bg="#0A0A0A" layers={3} className="overflow-hidden" />
        <Services />
        <FluidSectionDivider h={64} accent="#A78BFA" bg="#0A0A0A" layers={2} flip />
        <Portfolio />
        <FluidSectionDivider h={56} accent="#A78BFA" bg="#0A0A0A" layers={1} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
