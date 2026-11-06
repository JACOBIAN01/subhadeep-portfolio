// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import About from "../components/About";
import Projects from "../components/Projects";
import OpenSource from "../components/OpenSource";
import Teaching from "../components/Teaching";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import Journey from "../components/Journey";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// The Writing section (components/Writing.jsx) is hidden until there are 3+ posts;
// add <Writing /> back after <Testimonials /> and its link to the Navbar then.
export default function Home() {
  return (
    <main id="main">
      <Navbar />
      <Hero />
      <Projects />
      <Teaching />
      <Testimonials />
      <Experience />
      <OpenSource />
      <About />
      <Skills />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
