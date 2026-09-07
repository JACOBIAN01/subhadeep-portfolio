// src/components/Marquee.jsx
import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

export default function Marquee({ children, duration = 26, gap = "gap-6", className = "" }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const isPaused = useRef(false);
  const wrapWidth = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Measuring scrollWidth is a forced layout read; do it once on mount/resize
  // instead of on every animation frame across every mounted Marquee.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      wrapWidth.current = track.scrollWidth / 2;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [children]);

  useAnimationFrame((_, delta) => {
    if (isPaused.current || prefersReducedMotion) return;
    const width = wrapWidth.current;
    if (!width) return;

    const pxPerSecond = width / duration;
    let next = x.get() - (pxPerSecond * delta) / 1000;
    if (next <= -width) next += width;
    x.set(next);
  });

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <motion.div ref={trackRef} style={{ x }} className={`flex ${gap} w-max`}>
        {children}
      </motion.div>
    </div>
  );
}
