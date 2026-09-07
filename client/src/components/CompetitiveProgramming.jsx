// src/components/CompetitiveProgramming.jsx
import SectionTitle from "./SectionTitle";
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
        <SectionTitle
          kicker="Competitive Programming"
          title="LeetCode."
          right={
            <a
              href={LEETCODE.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
            >
              <SiLeetcode aria-hidden="true" /> View live profile ↗
            </a>
          }
        />
        <p className="text-[15px] text-subtle -mt-8 mb-14 max-w-xl">
          {LEETCODE.easy.solved}/{LEETCODE.easy.total} Easy &middot;{" "}
          {LEETCODE.medium.solved}/{LEETCODE.medium.total} Medium &middot;{" "}
          {LEETCODE.hard.solved}/{LEETCODE.hard.total} Hard &middot; Latest badge:{" "}
          {LEETCODE.latestBadge}
        </p>
        <Marquee duration={22} gap="gap-6">
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
      </div>
    </section>
  );
}
