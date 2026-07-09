import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Trail from "@/components/Trail";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { TrackProvider } from "@/components/providers/TrackProvider";
import Affiliations from "@/components/sections/Affiliations";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Fork from "@/components/sections/Fork";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Syncode from "@/components/sections/Syncode";

export default function Home() {
  return (
    <TrackProvider>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main className="relative">
        <Trail />
        <Hero />
        <Fork />
        <Education />
        <Experience />
        <Syncode />
        <Projects />
        <Skills />
        <Affiliations />
        <Contact />
      </main>
    </TrackProvider>
  );
}
