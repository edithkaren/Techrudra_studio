import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <LiquidFilters />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <FeaturedShowcase />
        <LiquidDivider color="#0A0A0A" height={60} />
        <Services />
        <LiquidDivider color="#0A0A0A" height={60} flip />
        <Portfolio />
        <LiquidDivider color="#0A0A0A" height={50} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
