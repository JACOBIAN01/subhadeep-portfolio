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
    <main className="min-h-screen text-white bg-[#0B0C10] relative">
      // eslint-disable-next-line no-unused-vars
      {/* global gradient gloss */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(255,255,255,0.15),rgba(255,255,255,0)_70%)]" />

      {/* Section Components */}
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
