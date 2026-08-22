// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import Journey from "../components/Journey";
import SkillCertificates from "../components/SkillCertificates";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <About />
      <Projects />
      <Experience />
      <Testimonials />
      <Journey />
      <SkillCertificates />
      <Contact />
      <Footer />
    </main>
  );
}
