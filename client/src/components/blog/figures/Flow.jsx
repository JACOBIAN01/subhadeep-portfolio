// kind: "flow" — labelled boxes in order, with a packet travelling through them.
// Several "runs" can take the same road in turn (e.g. a legit request, then a rogue one).
//
// { t: "figure", kind: "flow", label, caption, alt,
//   steps: [{ title, sub?, icon?, focus? }],        // 2–5 boxes; focus = drawn heavier
//   runs:  [{ label, tone? }],                       // 1–3 passes, cycled
//   note?: "small text under the legend" }
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Frame from "./Frame";
import Icon from "./icons";
import { tone } from "../../../content/tones";

const STEP_S = 0.6; // seconds between boxes
const COLS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5" };

export default function Flow({ spec }) {
  const { steps, runs = [{ label: "", tone: "blue" }], note, label } = spec;
  const [run, setRun] = useState(0);
  const [live, setLive] = useState(false);
  const ref = useRef(null);
  const passMs = (steps.length * STEP_S + 1.6) * 1000;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live || runs.length < 2) return;
    const id = setInterval(() => setRun((r) => (r + 1) % runs.length), passMs);
    return () => clearInterval(id);
  }, [live, runs.length, passMs]);

  const current = runs[run];
  const c = tone(current.tone).fg;

  return (
    <Frame label={label}>
      <div ref={ref}>
        <div className={`grid grid-cols-2 gap-3 sm:gap-2 ${COLS[steps.length] || "sm:grid-cols-4"}`}>
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div
                className="flex h-full flex-col rounded-2xl bg-white p-3"
                style={{
                  border: s.focus ? "2px solid #1d1d1f" : "1px solid var(--color-hairline)",
                }}
              >
                <div className="flex items-center justify-between text-ink">
                  <span className="font-sans text-[10px] font-bold tracking-[0.1em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.icon && (
                    <motion.span
                      animate={live && s.focus ? { scale: [1, 1.18, 1] } : {}}
                      transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 2.4 }}
                    >
                      <Icon name={s.icon} />
                    </motion.span>
                  )}
                </div>
                <div className="mt-1.5 font-sans text-[13px] font-semibold leading-tight text-ink">
                  {s.title}
                </div>
                {s.sub && (
                  <div className="mt-0.5 font-sans text-[11px] leading-snug text-subtle">{s.sub}</div>
                )}
              </div>

              {live && (
                <motion.div
                  key={`${run}-${i}`}
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                  style={{ background: c }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
                  transition={{
                    duration: 0.95,
                    delay: i * STEP_S,
                    repeat: runs.length < 2 ? Infinity : 0,
                    repeatDelay: passMs / 1000 - 0.95,
                    times: [0, 0.25, 0.7, 1],
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {(current.label || note) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {current.label && (
              <motion.div
                key={run}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                <span className="font-sans text-[13px] font-semibold" style={{ color: c }}>
                  {current.label}
                </span>
              </motion.div>
            )}
            {note && <span className="font-sans text-[12px] text-subtle">{note}</span>}
          </div>
        )}
      </div>
    </Frame>
  );
}
