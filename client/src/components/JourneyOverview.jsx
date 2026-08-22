// src/components/JourneyOverview.jsx
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function JourneyOverview({ stages, activeYear }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const flowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Mobile: compact strip, scrolls with the page */}
      <div className="md:hidden flex flex-wrap items-center gap-x-4 gap-y-2 mb-10">
        {stages.map((s) => {
          const active = s.year === activeYear;
          return (
            <div key={s.year} className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  active ? "bg-accent" : "bg-hairline"
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  active ? "text-ink" : "text-faint"
                }`}
              >
                {s.year}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop: a continuous river-like line fills as the page scrolls, instead of years popping in one by one */}
      <div ref={containerRef} className="hidden md:flex h-full flex-col justify-between relative">
        {/* Track stops well short of the container's bottom edge so it never crosses the divider below */}
        <div
          className="absolute left-[3px] top-2 bottom-10 w-0.5 rounded-full bg-hairline overflow-hidden"
          aria-hidden="true"
        >
          {!prefersReducedMotion && (
            <motion.div
              style={{ height: flowHeight }}
              className="absolute inset-x-0 top-0 bg-accent origin-top"
            />
          )}
        </div>

        {stages.map((s) => {
          const active = s.year === activeYear;
          return (
            <div key={s.year} className="relative flex items-start gap-3">
              <span
                className={`mt-1.5 h-[7px] w-[7px] rounded-full shrink-0 relative z-10 transition-colors duration-500 ${
                  active ? "bg-accent" : "bg-hairline"
                }`}
              />
              <div>
                <div
                  className={`text-sm font-medium transition-colors duration-500 ${
                    active ? "text-ink" : "text-faint"
                  }`}
                >
                  {s.year}
                </div>
                <div
                  className={`text-xs mt-0.5 tracking-wide transition-colors duration-500 ${
                    active ? "text-accent" : "text-subtle"
                  }`}
                >
                  {s.stage}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
