// src/components/Journey.jsx
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import JourneyOverview from "./JourneyOverview";
import JourneyYear from "./JourneyYear";
import Marquee from "./Marquee";
import { StatCard } from "./StatsStrip";
import { JOURNEY_STAGES, JOURNEY_PAYOFF, JOURNEY_STATS } from "../data/journeyData";

export default function Journey() {
  const [activeYear, setActiveYear] = useState(JOURNEY_STAGES[0].year);
  const yearRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveYear(Number(entry.target.dataset.year));
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    yearRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Journey" title="Four years of becoming an engineer." />
        <p className="text-[15px] text-subtle -mt-8 mb-14 md:mb-16 max-w-xl">
          From electronics and fundamentals to software, systems, and building.
        </p>

        <div className="md:grid md:grid-cols-[140px_1fr] md:gap-16">
          <JourneyOverview stages={JOURNEY_STAGES} activeYear={activeYear} />

          <div>
            {JOURNEY_STAGES.map((stage, i) => (
              <JourneyYear
                key={stage.year}
                stage={stage}
                ref={(el) => (yearRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-hairline pt-14 md:pt-16 pb-20 md:pb-28">
        <div className="text-center mb-10">
          <div className="text-base text-ink">{JOURNEY_PAYOFF.degree}</div>
          <div className="text-sm text-subtle">{JOURNEY_PAYOFF.branch}</div>
          <div className="mt-2 text-sm text-faint">
            {JOURNEY_PAYOFF.startYear} &rarr; {JOURNEY_PAYOFF.endYear}
          </div>
        </div>

        <Marquee duration={22} gap="gap-6" className="px-6">
          {JOURNEY_STATS.map((s) => (
            <StatCard key={s.k} s={s} />
          ))}
          <div className="flex gap-6" aria-hidden="true" inert={true}>
            {JOURNEY_STATS.map((s) => (
              <StatCard key={`dup-${s.k}`} s={s} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
