// src/components/CompetitiveProgramming.jsx
import SectionTitle from "./SectionTitle";
import GlassCard from "./GlassCard";
import Marquee from "./Marquee";
import { StatCard } from "./StatsStrip";
import { LEETCODE, LEETCODE_BADGES } from "../data/profileData";
import { SiLeetcode } from "react-icons/si";

function BadgeCard({ badge }) {
  return (
    <div className="shrink-0 w-32 bg-white border border-hairline rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <img src={badge.img} alt={badge.name} className="w-16 h-16 object-contain" />
      <span className="text-xs text-subtle text-center leading-snug">{badge.name}</span>
    </div>
  );
}

// One bordered card per CP platform, so a second profile (Codeforces,
// CodeChef, etc.) later just becomes another card in the grid below.
function PlatformCard({ icon, name, profileUrl, children }) {
  return (
    <GlassCard className="min-w-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-ink">
          {icon}
          {name}
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-ink hover:text-accent transition-colors duration-300"
        >
          View live profile ↗
        </a>
      </div>
      {children}
    </GlassCard>
  );
}

export default function CompetitiveProgramming() {
  const stats = [
    { k: "Problems Solved", v: LEETCODE.totalSolved, suffix: "" },
    { k: "Max Streak", v: LEETCODE.maxStreak, suffix: " days" },
    { k: "Active Days", v: LEETCODE.activeDays, suffix: "" },
    { k: "Submissions (1yr)", v: LEETCODE.submissionsPastYear, suffix: "" },
    { k: "Badges Earned", v: LEETCODE.badges, suffix: "" },
  ];

  return (
    <section id="competitive-programming" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Competitive Programming" title="Problem solving." />

        <div className="grid gap-6">
          <PlatformCard icon={<SiLeetcode aria-hidden="true" />} name="LeetCode" profileUrl={LEETCODE.profileUrl}>
            <p className="mt-4 text-[15px] text-subtle">
              {LEETCODE.easy.solved}/{LEETCODE.easy.total} Easy &middot;{" "}
              {LEETCODE.medium.solved}/{LEETCODE.medium.total} Medium &middot;{" "}
              {LEETCODE.hard.solved}/{LEETCODE.hard.total} Hard &middot; Latest badge:{" "}
              {LEETCODE.latestBadge}
            </p>

            <Marquee duration={22} gap="gap-6" className="mt-6">
              {stats.map((s) => (
                <StatCard key={s.k} s={s} />
              ))}
              <div className="flex gap-6" aria-hidden="true" inert={true}>
                {stats.map((s) => (
                  <StatCard key={`dup-${s.k}`} s={s} />
                ))}
              </div>
            </Marquee>

            <div className="flex flex-wrap gap-4 mt-6">
              {LEETCODE_BADGES.map((badge) => (
                <BadgeCard key={badge.name} badge={badge} />
              ))}
            </div>
          </PlatformCard>
        </div>
      </div>
    </section>
  );
}
