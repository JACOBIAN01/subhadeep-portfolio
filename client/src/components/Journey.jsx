// src/components/Journey.jsx
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { EDUCATION } from "../data/journeyData";

export default function Journey() {
  return (
    <section id="education" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Education" title="Academic background." />
        <GlassCard className="max-w-xl">
          <div className="text-lg font-medium text-ink">
            {EDUCATION.degree}, {EDUCATION.branch}
          </div>
          <div className="mt-2 text-sm text-subtle">{EDUCATION.institution}</div>
          <div className="mt-4 flex items-center gap-4 text-sm text-faint">
            <span>Class of {EDUCATION.gradYear}</span>
            <span aria-hidden="true">&middot;</span>
            <span>CGPA {EDUCATION.cgpa}</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
