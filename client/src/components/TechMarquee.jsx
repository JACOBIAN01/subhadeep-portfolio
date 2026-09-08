// src/components/TechMarquee.jsx
import { STACK_GROUPS, LEETCODE } from "../data/profileData";

function StackItem({ t }) {
  return (
    <div className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors duration-500">
      <span className="text-lg" aria-hidden="true">
        {t.icon}
      </span>
      <span className="text-xs tracking-wide">{t.name}</span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div id="stack" className="border-t border-white/10 mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        {STACK_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="w-full sm:w-32 shrink-0 text-[11px] font-medium tracking-wide uppercase text-white/30">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {group.items.map((t) => (
                <StackItem key={t.name} t={t} />
              ))}
            </div>
          </div>
        ))}

        <a
          href={LEETCODE.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors duration-500"
        >
          {LEETCODE.totalSolved} LeetCode problems solved · {LEETCODE.maxStreak}-day streak ↗
        </a>
      </div>
    </div>
  );
}
