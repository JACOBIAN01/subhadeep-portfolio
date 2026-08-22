// src/components/JourneyYear.jsx
import { forwardRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const JourneyYear = forwardRef(function JourneyYear({ stage }, ref) {
  return (
    <motion.div
      ref={ref}
      data-year={stage.year}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="py-8 md:py-10 border-t border-hairline first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
          {stage.year}
        </span>
        <span className="text-xs font-medium tracking-wide uppercase text-accent">
          {stage.stage}
        </span>
      </div>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
        {stage.courses.map((course) => (
          <li
            key={course}
            className="flex items-start gap-3 text-[15px] text-ink leading-relaxed"
          >
            <span className="mt-2.5 h-1 w-1 rounded-full bg-faint shrink-0" />
            {course}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-faint tracking-wide">
        {stage.progression.map((label, i) => (
          <span key={label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">&rarr;</span>}
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

export default JourneyYear;
