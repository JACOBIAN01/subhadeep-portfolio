// src/components/Teaching.jsx
import SectionTitle from "./SectionTitle";
import TeachingReel from "./TeachingReel";
import { TeachingStatsMarquee } from "./StatsStrip";
import { TEACHING_CLIPS, METRICS } from "../data/profileData";

export default function Teaching() {
  return (
    <section id="teaching" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle kicker="Teaching" title="How I teach." />
        <p className="-mt-8 mb-10 text-[15px] text-subtle max-w-xl">
          Moments from 100+ lectures and workshops: System Design, Electron, Node.js, CLI tooling.
        </p>
        <TeachingReel clips={TEACHING_CLIPS} />
        <div className="mt-12">
          <TeachingStatsMarquee />
        </div>
        <p className="mt-8 max-w-3xl text-[15px] text-subtle leading-relaxed">
          {METRICS.fullyUnderstood}% of {METRICS.responses} feedback responses said they understood the
          lecture completely. Two SESD workshops (OOP Backend Architecture, CLI Engineering) drew 514
          responses at 4.07/5 and 450+ GitHub project submissions.
        </p>
      </div>
    </section>
  );
}
