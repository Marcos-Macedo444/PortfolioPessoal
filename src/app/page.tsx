import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hack27 } from "@/components/sections/Hack27";
import { ConnectionStory } from "@/components/sections/ConnectionStory";
import { Philosophy } from "@/components/sections/Philosophy";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Preferences } from "@/components/ui/Preferences";

export default function Home() {
  return (
    <Preferences>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <ConnectionStory />
        <About />
        <Projects />
        <Hack27 />
        <TechStack />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
    </Preferences>
  );
}
