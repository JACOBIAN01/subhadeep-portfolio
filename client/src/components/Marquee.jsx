// src/components/Marquee.jsx
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

export default function Marquee({ children, duration = 26, gap = "gap-6", className = "" }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const isPaused = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (isPaused.current || prefersReducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const wrapWidth = track.scrollWidth / 2;
    if (!wrapWidth) return;

    const pxPerSecond = wrapWidth / duration;
    let next = x.get() - (pxPerSecond * delta) / 1000;
    if (next <= -wrapWidth) next += wrapWidth;
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
