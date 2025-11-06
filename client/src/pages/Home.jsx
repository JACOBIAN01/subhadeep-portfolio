// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import CertsAndAchievements from "../components/CertsAndAchievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingDock from "../components/FloatingDock";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <Projects />
      <Experience />
      <CertsAndAchievements />
      <Contact />
      <Footer />
      <FloatingDock />
    </main>
  );
}
