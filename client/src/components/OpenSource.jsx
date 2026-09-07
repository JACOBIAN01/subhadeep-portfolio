import { useState } from "react";
import SectionTitle from "./SectionTitle";
import GlassCard from "./GlassCard";
import { OPEN_SOURCE_CONTRIBUTIONS } from "../data/profileData";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GoGitMerge } from "react-icons/go";

function ContributionCard({ c }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard>
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-sm font-medium text-subtle">{c.repo}</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#8250df] px-2.5 py-1 rounded-full">
          <GoGitMerge aria-hidden="true" />
          Merged
        </span>
      </div>
      <h3 className="text-lg font-semibold text-ink leading-snug">{c.title}</h3>
      <p
        className={`mt-3 text-sm text-subtle leading-relaxed ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {c.desc}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-sm font-medium text-accent hover:text-ink transition-colors duration-300"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
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
  );
}

export default function OpenSource() {
  return (
    <section id="open-source" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Open Source" title="Open Source Contribution" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {OPEN_SOURCE_CONTRIBUTIONS.map((c) => (
            <ContributionCard key={c.url} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
