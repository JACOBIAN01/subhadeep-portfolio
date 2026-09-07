// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import OpenSource from "../components/OpenSource";
import CompetitiveProgramming from "../components/CompetitiveProgramming";
import Experience from "../components/Experience";
import StatsStrip from "../components/StatsStrip";
import Skills from "../components/Skills";
import SkillCertificates from "../components/SkillCertificates";
import Journey from "../components/Journey";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <OpenSource />
      <CompetitiveProgramming />
      <Experience />
      <StatsStrip />
      <Skills />
      <SkillCertificates />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
