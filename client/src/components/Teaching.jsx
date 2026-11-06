// src/components/Teaching.jsx
import SectionTitle from "./SectionTitle";
import TeachingReel from "./TeachingReel";
import { TeachingStats } from "./StatsStrip";
import { TEACHING_CLIPS } from "../data/profileData";

export default function Teaching() {
  return (
    <section id="teaching" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle kicker="Teaching" title="How I teach." />
        <p className="-mt-8 mb-10 text-[15px] text-subtle max-w-xl">
          Moments from 100+ lectures and workshops: System Design, Electron, Node.js, CLI tooling.
        </p>
        <TeachingReel clips={TEACHING_CLIPS} />
        <TeachingStats />
      </div>
    </section>
  );
}
