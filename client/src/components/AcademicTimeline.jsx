// src/components/AcademicTimeline.jsx
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ACADEMIC_TIMELINE } from "../data/journeyData";

const EASE = [0.16, 1, 0.3, 1];
const DWELL_MS = 2500;
const COUNT = ACADEMIC_TIMELINE.length;

export default function AcademicTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [railWidth, setRailWidth] = useState(0);
  const railRef = useRef(null);
  const isInView = useRef(false);
  const pausedUntil = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Only run the autoplay clock while the rail is actually on screen, and
  // measure its pixel width so the ball can animate via a GPU-composited
  // transform (x/scaleX) instead of layout-triggering left/width percentages.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const measure = () => setRailWidth(el.clientWidth);
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    intersectionObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!isInView.current || Date.now() < pausedUntil.current) return;
      setActiveIndex((i) => (i + 1) % COUNT);
    }, DWELL_MS);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleTickClick = (i) => {
    setActiveIndex(i);
    pausedUntil.current = Date.now() + DWELL_MS * 2;
  };

  const active = ACADEMIC_TIMELINE[activeIndex];
  const progress = activeIndex / (COUNT - 1);
  const ballX = progress * railWidth;
  const glide = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 90, damping: 18, mass: 1 };

  return (
    <div ref={railRef}>
      <div className="relative h-11">
        <div className="absolute top-[9px] left-0 right-0 h-[3px] rounded-full bg-hairline" />
        <motion.div
          className="absolute top-[9px] left-0 h-[3px] w-full rounded-full bg-accent"
          style={{ originX: 0 }}
          animate={{ scaleX: progress }}
          transition={glide}
        />
        <motion.div
          className="absolute top-0.5 h-4 w-4 rounded-full bg-accent ring-4 ring-canvas shadow-[0_2px_10px_rgba(0,113,227,0.45)]"
          style={{ left: -8 }}
          animate={{ x: ballX }}
          transition={glide}
        />

        {ACADEMIC_TIMELINE.map((t, i) => {
          const pct = (i / (COUNT - 1)) * 100;
          const translate = i === 0 ? "0%" : i === COUNT - 1 ? "-100%" : "-50%";
          return (
            <button
              key={t.year}
              type="button"
              onClick={() => handleTickClick(i)}
              className="absolute top-6"
              style={{ left: `${pct}%`, transform: `translateX(${translate})` }}
            >
              <span
                className={`text-xs whitespace-nowrap transition-colors duration-500 ${
                  i === activeIndex ? "text-ink font-medium" : "text-subtle"
                }`}
              >
                {t.year}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 min-h-[180px] sm:min-h-[150px]">
        {prefersReducedMotion ? (
          <YearPanel active={active} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active.year}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <YearPanel active={active} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function YearPanel({ active }) {
  return (
    <>
      <div className="text-sm text-subtle">{active.academicYear}</div>
      <h4 className="mt-1 text-base sm:text-lg font-medium text-ink whitespace-nowrap overflow-hidden text-ellipsis">
        {active.headline}
      </h4>

      <div className="mt-5 flex gap-8">
        <div>
          <div className="text-xl font-semibold text-ink">{active.courseCount}</div>
          <div className="text-xs text-subtle mt-1">Courses</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-ink">{active.credits}</div>
          <div className="text-xs text-subtle mt-1">Credits</div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-medium text-subtle uppercase tracking-wide mb-2">
          Key Courses
        </div>
        <div className="flex flex-wrap gap-2">
          {active.keyCourses.map((c) => (
            <span
              key={c}
              className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
