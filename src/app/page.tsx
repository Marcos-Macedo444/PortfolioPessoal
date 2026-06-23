import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Hack27 } from "@/components/sections/Hack27";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";
import { Timeline } from "@/components/sections/Timeline";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CyberBackground } from "@/components/ui/CyberBackground";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { SkillTicker } from "@/components/ui/SkillTicker";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <ScrollProgress />
      <CyberBackground />
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <SkillTicker />
        <About />
        <Hack27 />
        <Projects />
        <TechStack />
        <Stats />
        <Timeline />
        <Certifications />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
    </>
  );
}
