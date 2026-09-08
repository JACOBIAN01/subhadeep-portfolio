// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import About from "../components/About";
import Projects from "../components/Projects";
import OpenSource from "../components/OpenSource";
import Experience from "../components/Experience";
import Journey from "../components/Journey";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <OpenSource />
      <Experience />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
