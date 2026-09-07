// src/components/CompetitiveProgramming.jsx
import SectionTitle from "./SectionTitle";
import Marquee from "./Marquee";
import { StatCard } from "./StatsStrip";
import { LEETCODE } from "../data/profileData";
import { SiLeetcode } from "react-icons/si";

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
      </div>
    </section>
  );
}
