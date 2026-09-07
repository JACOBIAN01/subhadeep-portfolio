// src/components/OpenSource.jsx
import SectionTitle from "./SectionTitle";
import GlassCard from "./GlassCard";
import { OPEN_SOURCE_CONTRIBUTIONS } from "../data/profileData";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function OpenSource() {
  return (
    <section id="open-source" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Open Source" title="Contributions to other people's code." />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {OPEN_SOURCE_CONTRIBUTIONS.map((c) => (
            <GlassCard key={c.url}>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-sm font-medium text-subtle">{c.repo}</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Merged
                </span>
              </div>
              <h3 className="text-lg font-semibold text-ink leading-snug">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-subtle leading-relaxed">{c.desc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-faint">{c.date}</span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                >
                  View PR <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
