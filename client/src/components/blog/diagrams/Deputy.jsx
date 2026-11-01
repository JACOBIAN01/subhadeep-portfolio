// The signing path. A request travels laptop -> internal service -> signing service -> chain.
// The key stays put the whole time. A legitimate request runs, then a rogue one takes the
// same road, which is the point of the figure.
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiKey } from "react-icons/fi";
import DiagramFrame from "./DiagramFrame";

const STOPS = [
  { id: "laptop", title: "Engineer laptop", sub: "trusted by the next box" },
  { id: "service", title: "Internal service", sub: "asks for signatures" },
  { id: "signer", title: "Signing service", sub: "holds the key" },
  { id: "chain", title: "Blockchain", sub: "checks the maths only" },
];

const CYCLE = 7200; // ms for one full legit + rogue pass

export default function Deputy() {
  const [phase, setPhase] = useState(0); // 0 legit, 1 rogue
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % 2), CYCLE / 2);
    return () => clearInterval(id);
  }, [running]);

  const rogue = phase === 1;
  const accent = rogue ? "#d93025" : "#0066cc";

  return (
    <DiagramFrame label="How a withdrawal gets signed">
      <div ref={ref}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
          {STOPS.map((s, i) => {
            const isSigner = s.id === "signer";
            return (
              <div key={s.id} className="relative">
                <div
                  className="flex h-full flex-col rounded-2xl border bg-white p-3 transition-colors duration-500"
                  style={{
                    borderColor: isSigner ? "#1d1d1f" : "var(--color-hairline)",
                    borderWidth: isSigner ? 2 : 1,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] font-bold tracking-[0.1em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {isSigner && (
                      <motion.span
                        aria-hidden="true"
                        className="text-ink"
                        animate={running ? { scale: [1, 1.18, 1] } : {}}
                        transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 2.4 }}
                      >
                        <FiKey size={14} />
                      </motion.span>
                    )}
                  </div>
                  <div className="mt-1.5 font-sans text-[13px] font-semibold leading-tight text-ink">
                    {s.title}
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] leading-snug text-subtle">
                    {s.sub}
                  </div>
                </div>

                {/* travelling request */}
                {running && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                    style={{ background: accent }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
                    transition={{
                      duration: 0.95,
                      delay: i * 0.6,
                      repeat: Infinity,
                      repeatDelay: CYCLE / 1000 / 2 - 0.95,
                      times: [0, 0.25, 0.7, 1],
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: accent }}
              aria-hidden="true"
            />
            <span className="font-sans text-[13px] font-semibold" style={{ color: accent }}>
              {rogue ? "Rogue request: same road, same signature" : "Customer withdrawal: approved"}
            </span>
          </motion.div>

          <span className="font-sans text-[12px] text-subtle">
            The key never leaves box 03 in either case.
          </span>
        </div>
      </div>
    </DiagramFrame>
  );
}
