// src/components/Journey.jsx
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { EDUCATION } from "../data/journeyData";

const RELEVANT_COURSES = [
  "Data Structures and Algorithms",
  "Object Oriented Programming",
  "Software Engineering",
  "AWS for Cloud Computing",
];

export default function Journey() {
  return (
    <section id="education" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle kicker="Education" title="Academic background." />
        <GlassCard>
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <div className="text-lg font-medium text-ink">
                {EDUCATION.degree}, {EDUCATION.branch}
              </div>
              <div className="mt-2 text-sm text-subtle">{EDUCATION.institution}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle">
                  Class of {EDUCATION.gradYear}
                </span>
                <span className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle">
                  CGPA {EDUCATION.cgpa}
                </span>
              </div>
              <div className="mt-4 text-sm text-subtle">
                Relevant coursework: {RELEVANT_COURSES.join(" · ")}
              </div>
            </div>
            <div className="text-xs text-faint text-right">
              {EDUCATION.totalCredits} credits &middot; {EDUCATION.totalCourses} courses
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
