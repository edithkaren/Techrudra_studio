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
import ParticleRing from "@/components/motion/ParticleRing";
import LiquidBlob from "@/components/liquid/LiquidBlob";
import KineticText from "@/components/motion/KineticText";
import CardTilt from "@/components/motion/CardTilt";
import LiquidText from "@/components/liquid/LiquidText";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

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
        {/* Liquid accent row just under hero */}
        <div className="pointer-events-none relative h-48 overflow-hidden bg-[#0A0A0A]">
          <LiquidBlob
            color="rgba(167,139,250,0.10)"
            size={320}
            blur={90}
            speed={14}
            style={{ left: "10%", top: "20%" }}
          />
          <LiquidBlob
            color="rgba(59,130,246,0.08)"
            size={280}
            blur={80}
            speed={18}
            style={{ right: "12%", top: "40%" }}
          />
          <LiquidBlob
            color="rgba(236,72,153,0.07)"
            size={240}
            blur={70}
            speed={16}
            style={{ left: "40%", bottom: "0%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
        </div>

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
