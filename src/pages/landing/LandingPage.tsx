import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Showcases } from "./components/Showcases";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-primary/30 selection:text-white custom-scrollbar overflow-x-hidden">
      <Navbar />
      <div className="max-w-[1440px] mx-auto">
        <Hero />
        <Features />
        <Showcases />
        <Stats />
        <Testimonials />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};
