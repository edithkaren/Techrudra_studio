import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <FeaturedShowcase />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
