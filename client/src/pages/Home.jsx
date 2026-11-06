// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import About from "../components/About";
import Projects from "../components/Projects";
import OpenSource from "../components/OpenSource";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import Journey from "../components/Journey";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main id="main">
      <Navbar />
      <Hero />
      <Projects />
      <OpenSource />
      <Experience />
      <Testimonials />
      <About />
      <Skills />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
