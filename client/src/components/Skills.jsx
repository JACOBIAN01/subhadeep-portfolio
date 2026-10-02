// src/components/Skills.jsx
import TechMarquee from "./TechMarquee";

export default function Skills() {
  return (
    <section id="stack" className="bg-black text-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-sm font-medium tracking-wide text-[#2997ff] mb-3">
          Skills
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
          Tools &amp; technologies.
        </h2>
      </div>
      <TechMarquee />
    </section>
  );
}
